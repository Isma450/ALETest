const axios = require("axios");

// Catalog service URL
const catalogServiceUrl = "http://localhost:4000/api/v1/catalog";

// Function to get the protected data from the catalog service API
function getCatalogItems(req, res) {
  axios
    .get(catalogServiceUrl, {
      params: req.query,
    })
    .then((response) => {
      // Faites quelque chose avec la réponse de l'API
      res.send(response.data);
    })
    .catch((error) => {
      // Gérez l'erreur
      console.error(error);
      res
        .status(500)
        .send("Une erreur s'est produite lors de la récupération du catalogue");
    });
}

module.exports = {
  getCatalogItems,
};
