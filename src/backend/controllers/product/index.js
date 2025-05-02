
// Combine all product controllers
const baseController = require('./base.controller');
const searchController = require('./search.controller');
const featuredController = require('./featured.controller');

module.exports = {
  ...baseController,
  ...searchController,
  ...featuredController
};
