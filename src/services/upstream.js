import axios from "axios";
import Chance from "chance";

import { cowAbi, strawAbi } from "../abi";
import { openRelayApiUrl, cowAddress, strawAddress } from "../constants";
import TransformerService from "./transformer";

const chance = new Chance();
const cache = {
  cowsForSale: null,
  strawsForSale: null,
  myCows: null,
  myStraws: null
};
const random = (min, max) => chance.integer({ min, max });

export default class Upstream {
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
              console.log(metadataUrl) || err
                ? reject(err)
                : resolve(metadataUrl)
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
              id: tokenIds[index],
              attributes: {
                ...payload.data.attributes,
                generation: random(0, 6)
              }
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
}
