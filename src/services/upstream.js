import axios from "axios";
import Chance from "chance";

import { cowAbi, strawAbi } from "../abi";
import { openRelayApiUrl, cowAddress, strawAddress } from "../constants";
import TransformerService from "./transformer";

const cache = {
  cowsForSale: null,
  strawsForSale: null,
  myCows: null,
  myStraws: null
};

const idToHex = id => {
  if (typeof window !== "undefined") {
    return window.web3
      .toBigNumber(id)
      .toString(16)
      .padStart(64, 0);
  }
};

export default class Upstream {
  static async setApprovals() {
    if (typeof window !== "undefined") {
      const approved = window.localStorage.getItem("approvalsSet");

      if (!approved) {
        // Cow
        const cowContract = window.web3.eth.contract(cowAbi).at(cowAddress);
        const setCowApprovalForAll = () =>
          new Promise((resolve, reject) => {
            cowContract.setApprovalForAll(
              "0x2a9127c745688a165106c11cd4d647d2220af821",
              true,
              err => {
                err ? reject(err) : resolve();
              }
            );
          });
        const getCowApprovedForAll = () =>
          new Promise((resolve, reject) => {
            cowContract.isApprovedForAll(
              window.ethereum.selectedAddress,
              "0x2a9127c745688a165106c11cd4d647d2220af821",
              (err, result) => (err ? reject(err) : resolve(result))
            );
          });

        await setCowApprovalForAll();

        // Straw
        const strawContract = window.web3.eth
          .contract(strawAbi)
          .at(strawAddress);
        const setStrawApprovalForAll = () =>
          new Promise((resolve, reject) => {
            strawContract.setApprovalForAll(
              "0x2a9127c745688a165106c11cd4d647d2220af821",
              true,
              err => {
                err ? reject(err) : resolve();
              }
            );
          });
        const getStrawApprovedForAll = () =>
          new Promise((resolve, reject) => {
            strawContract.isApprovedForAll(
              window.ethereum.selectedAddress,
              "0x2a9127c745688a165106c11cd4d647d2220af821",
              (err, result) => (err ? reject(err) : resolve(result))
            );
          });

        await setStrawApprovalForAll();

        return new Promise(resolve => {
          let cowApproved = false;
          let strawApproved = false;
          let checkingApprovalsComplete = setInterval(async () => {
            if (!cowApproved) {
              const approved = await getCowApprovedForAll();

              if (approved) {
                cowApproved = true;
              }
            }

            if (!strawApproved) {
              const approved = await getStrawApprovedForAll();

              if (approved) {
                strawApproved = true;
              }
            }

            if (cowApproved && strawApproved) {
              clearInterval(checkingApprovalsComplete);

              window.localStorage.setItem("approvalsSet", true);

              resolve();
            }
          }, 500);
        });
      }
    }
  }

  static async getCowsForSale() {
    try {
      if (cache.cowsForSale) {
        return cache.cowsForSale;
      }

      const {
        data: { records: cows }
      } = await axios.get(
        `${openRelayApiUrl}/v2/orders?networkId=42&makerAssetAddress=${cowAddress}&perPage=99999`
      );

      // Add logic for listed vs. others;

      cache.cowsForSale = cows;

      return cows;
    } catch {
      return [];
    }
  }

  static async getStrawsForSale() {
    try {
      if (cache.strawsForSale) {
        return cache.strawsForSale;
      }

      const {
        data: { records: straws }
      } = await axios.get(
        `${openRelayApiUrl}/v2/orders?networkId=42&makerAssetAddress=${strawAddress}&perPage=99999`
      );

      // Add logic for listed vs. others;

      cache.strawsForSale = straws;

      return straws;
    } catch {
      return [];
    }
  }

  static async getMyCows() {
    try {
      if (cache.myCows) {
        return cache.myCows;
      }

      if (typeof window !== "undefined" && window.web3) {
        const cowContract = window.web3.eth.contract(cowAbi).at(cowAddress);
        const currentAddress = window.ethereum.selectedAddress;
        const getBalanceOf = address =>
          new Promise((resolve, reject) =>
            cowContract.balanceOf(address, (err, count) =>
              err ? reject(err) : resolve(count)
            )
          );
        const getTokenOfOwnerByIndex = (address, index) =>
          new Promise((resolve, reject) =>
            cowContract.tokenOfOwnerByIndex(address, index, (err, tokenId) =>
              err ? reject(err) : resolve(tokenId)
            )
          );
        const getTokenUri = tokenId =>
          new Promise((resolve, reject) =>
            cowContract.tokenURI(tokenId, (err, metadataUrl) =>
              err ? reject(err) : resolve(metadataUrl)
            )
          );
        const count = await getBalanceOf(currentAddress);
        const tokenIds = await Promise.all(
          Array.from(
            {
              length: count
            },
            (_, i) =>
              getTokenOfOwnerByIndex(currentAddress, i).then(result =>
                result.toString()
              )
          )
        );
        const metadataUrls = await Promise.all(
          tokenIds.map(id => getTokenUri(id))
        );
        const cows = await Promise.all(
          metadataUrls.map((url, index) =>
            axios.get(url).then(payload => ({
              ...payload.data,
              id: tokenIds[index]
            }))
          )
        );
        const transformedCows = cows.map(TransformerService.transformCow);

        cache.myCows = transformedCows;

        return transformedCows;
      }
    } catch {
      return [];
    }
  }

  static async getMyStraws() {
    try {
      if (cache.myStraws) {
        return cache.myStraws;
      }

      if (typeof window !== "undefined" && window.web3) {
        const strawContract = window.web3.eth
          .contract(strawAbi)
          .at(strawAddress);
        const currentAddress = window.ethereum.selectedAddress;
        const getBalanceOf = address =>
          new Promise((resolve, reject) =>
            strawContract.balanceOf(address, (err, count) =>
              err ? reject(err) : resolve(count)
            )
          );
        const getTokenOfOwnerByIndex = (address, index) =>
          new Promise((resolve, reject) =>
            strawContract.tokenOfOwnerByIndex(address, index, (err, tokenId) =>
              // TODO: Potential bug in contract necessitates this workaround; will eventually be fixed upstream.
              err ? resolve(null) : resolve(tokenId)
            )
          );
        const getTokenUri = tokenId =>
          new Promise((resolve, reject) =>
            strawContract.tokenURI(tokenId, (err, metadataUrl) =>
              err ? reject(err) : resolve(metadataUrl)
            )
          );
        const count = await getBalanceOf(currentAddress).then(result =>
          result.toNumber()
        );
        const tokenIds = await Promise.all(
          Array.from(
            {
              length: count
            },
            (_, i) =>
              getTokenOfOwnerByIndex(currentAddress, i).then(
                result => result && result.toFixed(0)
              )
          )
        );
        const metadataUrls = await Promise.all(
          tokenIds.filter(Boolean).map(id => getTokenUri(id))
        );
        const straws = await Promise.all(
          metadataUrls.map(url => axios.get(url).then(payload => payload.data))
        );

        cache.myStraws = straws;

        return straws;
      }
    } catch (err) {
      return [];
    }
  }

  static async sellCow(id, price) {
    try {
      if (typeof window !== "undefined" && window.web3) {
        await Upstream.setApprovals();

        const { elementutilities } = window;
        const unsignedOrder = new elementutilities.UnsignedOrder.default({
          exchangeAddress: "0x35dd2932454449b14cee11a94d3674a936d5d7b2",
          expirationTimeSeconds:
            parseInt(new Date().getTime() / 1000) + 10 * 24 * 60 * 60,
          feeRecipientAddress: "0x74430e1338613b5a9166032cfd8f8f0a717bac67",
          makerAddress: window.ethereum.selectedAddress,
          makerAssetAmount: 1,
          makerAssetData: `0x02571792000000000000000000000000${cowAddress.slice(
            2
          )}${idToHex(id)}`.toLowerCase(),
          makerFee: 0,
          salt: parseInt(new Date().getTime() / 1000),
          senderAddress: "0x0000000000000000000000000000000000000000",
          takerAddress: "0x0000000000000000000000000000000000000000",
          takerAssetAmount: price,
          takerAssetData: `0xf47261b0000000000000000000000000${"0xd0a1e359811322d97991e03f863a0c30c2cf029c".slice(
            2
          )}`,
          takerFee: 0
        });
        const orderConfig = await axios
          .post(`https://api.openrelay.xyz/v2/order_config`, unsignedOrder.json)
          .then(response => response.data);

        unsignedOrder.takerFee = window.web3
          .toBigNumber(orderConfig.makerFee)
          .plus(orderConfig.takerFee);

        const signer = new elementutilities.Signer.default(
          window.web3,
          window.ethereum.selectedAddress
        );

        unsignedOrder.signature = await signer.signMessage(unsignedOrder.hash);

        await axios.post(
          `https://api.openrelay.xyz/v2/order`,
          unsignedOrder.json,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        return true;
      }
    } catch (error) {
      console.error("fuuuu", error);

      return false;
    }
  }
}
