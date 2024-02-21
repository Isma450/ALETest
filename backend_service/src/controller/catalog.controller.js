const axios = require("axios");

// The URL for the catalog service, to which this service will make HTTP requests.
const catalogServiceUrl = "http://localhost:4000/api/v1/catalog";

/**

This function fetches catalog items from the catalog service.
It receives the incoming HTTP request, forwards the request to the catalog service,
and sends back the response to the client.
@param {Object} req - The request object from Express.
@param {Object} res - The response object from Express.
*/
function getCatalogItems(req, res) {
  // The request to the catalog service includes any query parameters received.
  axios
    .get(catalogServiceUrl, {
      params: req.query,
    })
    .then((response) => {
      // If the request is successful, send the data received from the catalog service to the client.
      res.send(response.data);
    })
    .catch((error) => {
      // If there is an error in the request, log it and send a 500 response to the client.
      console.error(error);
      res
        .status(500)
        .send("Une erreur s'est produite lors de la récupération du catalogue");
    });
}
module.exports = { getCatalogItems };
