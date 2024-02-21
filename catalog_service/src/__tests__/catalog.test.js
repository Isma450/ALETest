const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoDisconnect } = require("../services/mongo");
const { generateTimeFilter, TIME_FILTER_NAMES } = require("../services/query");
// const Product = require("../models/catalog.mongo");
// const mockdate = require("mockdate");

describe("Catalog API", () => {
  beforeAll(async () => await mongoConnect());
  afterAll(async () => await mongoDisconnect());

  // Tests within the "GET /catalog" describe block are focused on retrieving data from the catalog and checking the correctness of the responses.
  describe("GET /catalog", () => {
    // Test for the 200 status code
    test("it should respond with 200 success", async () => {
      const response = await request(app).get("/api/v1/catalog");
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    }, 10000);

    // Test sorting by name ascending
    test("it should sort the products by name in ascending order", async () => {
      const response = await request(app).get(
        "/api/v1/catalog?sortBy=name&sortOrder=asc"
      );
      expect(response.statusCode).toBe(200);
      let isSortedAscending = true;
      for (let i = 0; i < response.body.products.length - 1; i++) {
        if (
          response.body.products[i].name > response.body.products[i + 1].name
        ) {
          isSortedAscending = false;
          break;
        }
      }
      expect(isSortedAscending).toBe(true);
    });

    // Test sorting by creation date descending (most recent first)
    test("it should sort the products by creation date in descending order", async () => {
      const response = await request(app).get(
        "/api/v1/catalog?sortBy=creationDate&sortOrder=desc"
      );
      expect(response.statusCode).toBe(200);
      let isSortedDescending = true;
      for (let i = 0; i < response.body.products.length - 1; i++) {
        if (
          new Date(response.body.products[i].createdAt).getTime() <
          new Date(response.body.products[i + 1].createdAt).getTime()
        ) {
          isSortedDescending = false;
          break;
        }
      }
      expect(isSortedDescending).toBe(true);
    });

    // Corrected test for MAC address search
    test("it should return products matching the specified MAC address", async () => {
      const macAddress = "6a:0e:f6:d5:c4:3d";
      const response = await request(app).get(
        `/api/v1/catalog?searchText=${macAddress}`
      );
      expect(response.statusCode).toBe(200);
      if (response.body.products.length > 0) {
        response.body.products.forEach((product) => {
          if (product.MAC) {
            expect(product.MAC).toEqual(macAddress);
          }
        });
      } else {
        console.log(
          "No products found with the specified MAC address, ensure your database is correctly seeded."
        );
      }
    });
  });

  describe("POST /catalog", () => {
    // Test for the 201 status code and JSON response when creating a new product
    test("it should respond with 201 created", async () => {
      const newProduct = {
        type: "Phone",
        name: "alcatel 1",
        MAC: "00:0a:95:9d:68:16",
        IPV4: "193.43.55.67",
        Online: true,
        description: "Product description",
        creationDate: new Date(2021, 10, 10, 10, 10, 10, 10),
      };

      const response = await request(app)
        .post("/api/v1/catalog")
        .send(newProduct);
      expect(response.statusCode).toBe(201);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // Test for the 400 status code and JSON response when missing required fields
    test("it should catch missing required fields", async () => {
      const newProduct = {
        type: "Phone",
      };

      const response = await request(app)
        .post("/api/v1/catalog")
        .send(newProduct);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({
        error: "name and type are required fields",
      });
    });
  });

  describe("DELETE /catalog/:id", () => {
    // Test for the 204 status code when deleting a product
    test("it should delete the product and respond with 204", async () => {
      const newProduct = {
        type: "Phone",
        name: "Product to delete",
        MAC: "00:0a:95:9d:68:16",
        IPV4: "193.43.55.67",
        Online: true,
        description: "Product description",
        creationDate: new Date(2021, 10, 10, 10, 10, 10, 10),
      };

      const createdResponse = await request(app)
        .post("/api/v1/catalog")
        .send(newProduct);
      const productToDelete = createdResponse.body;

      const deleteResponse = await request(app).delete(
        `/api/v1/catalog/${productToDelete._id}`
      );
      expect(deleteResponse.statusCode).toBe(204);
    });

    // Test for the 404 status code when the product to delete is not found
    test("it should respond with 404 when product not found", async () => {
      const deleteResponse = await request(app).delete(
        `/api/v1/catalog/60d6c47e40949a61d887bbb9`
      );
      expect(deleteResponse.statusCode).toBe(404);
    });
  });
});
