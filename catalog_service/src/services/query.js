/**
 * This service provides utility functions for building MongoDB queries for product retrieval.
 * It includes pagination, sorting, and time-based filtering functionalities.
 */

const DEFAULT_PAGE_LIMIT = 10;
const DEFAULT_PAGE_Number = 1;

const TIME_FILTER_NAMES = Object.freeze({
  YESTERDAY: "YESTERDAY",
  LAST_HOUR: "LAST_HOUR",
  LAST_WEEK: "LAST_WEEK",
});

// Builds a pagination object based on query parameters from the request.
function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_Number;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return { skip, limit };
}

// Creates a sorting object for MongoDB queries based on provided fields and order.
function generateSortObject(sortBy = "creationDate", sortOrder = "desc") {
  const order = sortOrder === "asc" ? 1 : -1;

  return { [sortBy]: order };
}

// Generates a MongoDB query filter object to filter records based on a predefined time filter name.
function generateTimeFilter({ timeFilterName }) {
  const dateNow = new Date();

  switch (timeFilterName) {
    case TIME_FILTER_NAMES.YESTERDAY:
      const startYesterday = new Date(dateNow.setDate(dateNow.getDate() - 1));
      startYesterday.setHours(0, 0, 0, 0);
      const endYesterday = new Date(startYesterday);
      endYesterday.setDate(startYesterday.getDate() + 1);
      return { $gte: startYesterday, $lt: endYesterday };
    case TIME_FILTER_NAMES.LAST_HOUR:
      const lastHour = new Date(dateNow.setHours(dateNow.getHours() - 1));
      return { $gte: lastHour };
    case TIME_FILTER_NAMES.LAST_WEEK:
      const lastWeek = new Date(dateNow.setDate(dateNow.getDate() - 7));
      lastWeek.setHours(0, 0, 0, 0);
      return { $gte: lastWeek };
    default:
      return {}; // No filter applied.
  }
}

module.exports = {
  getPagination,
  generateSortObject,
  generateTimeFilter,
  TIME_FILTER_NAMES,
};
