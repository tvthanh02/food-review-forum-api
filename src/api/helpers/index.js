const { MODE_SEARCH } = require('../../constants');

module.exports = {
  getSearchQueries(searchFields) {
    const queries = {};
    searchFields.forEach((searchField) => {
      const {
        fieldName,
        searchValue,
        mode = MODE_SEARCH.CONTAIN,
      } = searchField;
      if (searchValue)
        switch (mode) {
          case MODE_SEARCH.EXACT:
            queries[fieldName] = searchValue;
            break;
          case MODE_SEARCH.CONTAIN:
            queries[fieldName] = { $regex: searchValue, $options: 'i' };
            break;
          default:
            break;
        }
    });

    return queries;
  },

  createResponse(
    status,
    message = null,
    data = null,
    errors = null,
    meta = null
  ) {
    return { status, message, data, meta, errors };
  },
};
