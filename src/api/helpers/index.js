module.exports = {
  getSearchQueries(searchFields) {
    const queries = {};
    searchFields.forEach((searchField) => {
      const { fieldName, searchValue } = searchField;
      if (searchValue)
        queries[fieldName] = { $regex: searchValue, $options: 'i' };
    });

    return queries;
  },
};
