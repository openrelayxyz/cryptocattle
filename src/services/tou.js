import { openRelayApiUrl } from "../constants";

export default class TouService {
  static prompt() {
    if (
      typeof window !== "undefined" &&
      window.ethereum &&
      window.ethereum.selectedAddress
    ) {
      const { elementutilities } = window;
      const term = new elementutilities.Terms.default(
        openRelayApiUrl,
        window.ethereum
      );

      return term.signAndUpload(window.ethereum.selectedAddress);
    }
  }

  static check() {
    if (
      typeof window !== "undefined" &&
      window.ethereum &&
      window.ethereum.selectedAddress
    ) {
      const { elementutilities } = window;
      const term = new elementutilities.Terms.default(
        openRelayApiUrl,
        window.ethereum
      );

      return term.authorized(window.ethereum.selectedAddress);
    }
  }

  static getTerms() {
    if (
      typeof window !== "undefined" &&
      window.ethereum &&
      window.ethereum.selectedAddress
    ) {
      const { elementutilities } = window;
      const term = new elementutilities.Terms.default(
        openRelayApiUrl,
        window.ethereum
      );

      return term.getTerms();
    }
  }
}
