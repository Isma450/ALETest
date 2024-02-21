// this file contains the functions to build the query for the database
// to get the products with pagination

const DEFAULT_PAGE_LIMIT = 10;
const DEFAULT_PAGE_Number = 1;

const TIME_FILTER_NAMES = Object.freeze({
  YESTERDAY: "YESTERDAY",
  LAST_HOUR: "LAST_HOUR",
  LAST_WEEK: "LAST_WEEK",
});

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_Number;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

/**
 * Generates a Mongoose sort object based on the input parameters.
 * @param {string} sortBy - The field name to sort by.
 * @param {string} sortOrder - The order direction ('asc' or 'desc').
 * @returns {Object} - A sort object for Mongoose queries.
 */
function generateSortObject(sortBy = "creationDate", sortOrder = "desc") {
  const order = sortOrder === "asc" ? 1 : -1;

  return {
    [sortBy]: order,
  };
}

/**
 * @param {Object} params
 * @param {string} params.timeFilterName
 */
function generateTimeFilter({ timeFilterName }) {
  if (timeFilterName === TIME_FILTER_NAMES.YESTERDAY) {
    const dateNow = new Date();
    const startYesterday = new Date();
    startYesterday.setDate(dateNow.getDate() - 1);
    startYesterday.setHours(0, 0, 0, 0);

    const endYesterday = new Date(startYesterday);
    endYesterday.setDate(startYesterday.getDate() + 1);

    return { $gte: startYesterday, $lt: endYesterday };
  }

  if (timeFilterName === TIME_FILTER_NAMES.LAST_HOUR) {
    const lastHour = new Date();
    lastHour.setHours(lastHour.getHours() - 1);
    return { $gte: lastHour };
  }

  if (timeFilterName === TIME_FILTER_NAMES.LAST_WEEK) {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    lastWeek.setHours(0, 0, 0, 0);
    return { $gte: lastWeek };
  }
  return {};
}

module.exports = {
  getPagination,
  generateSortObject,
  generateTimeFilter,
  TIME_FILTER_NAMES,
};
