import axios from "axios";

import { cowAbi, strawAbi } from "../abi";
import { openRelayApiUrl, cowAddress, strawAddress } from "../constants";
import TransformerService from "./transformer";

export default class Upstream {
  static async getCowsForSale() {
    try {
      const {
        data: { records: cows }
      } = await axios.get(
        `${openRelayApiUrl}/v2/orders?networkId=42&makerAssetAddress=${cowAddress}&perPage=99999`
      );

      // Add logic for listed vs. others;

      return cows;
    } catch {
      return [];
    }
  }

  static async getStrawsForSale() {
    try {
      const {
        data: { records: cows }
      } = await axios.get(
        `${openRelayApiUrl}/v2/orders?networkId=42&makerAssetAddress=${strawAddress}&perPage=99999`
      );

      // Add logic for listed vs. others;

      return cows;
    } catch {
      return [];
    }
  }

  static async getMyCows() {
    try {
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
              id: tokenIds[index]
            }))
          )
        );

        return cows.map(TransformerService.transformCow);
      }
    } catch {
      return [];
    }
  }

  static async getMyStraws() {
    try {
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
        console.log("\n\n\n", "count", count, "\n\n\n");
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
        console.log("\n\n\n", "tokenIds", tokenIds, "\n\n\n");
        const metadataUrls = await Promise.all(
          tokenIds.filter(Boolean).map(id => getTokenUri(id))
        );
        console.log("\n\n\n", "metadataUrls", metadataUrls, "\n\n\n");
        const straws = await Promise.all(
          metadataUrls.map(url => axios.get(url).then(payload => payload.data))
        );

        return straws;
      }
    } catch (err) {
      console.log("\n\n\n", "err", err, "\n\n\n");
      return [];
    }
  }
}
