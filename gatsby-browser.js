/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
const { Mock } = require("./mock");

exports.onClientEntry = () => {
  const mock = new Mock();

  mock.generateLocalSet();
};
