const request = require("supertest");
const app = require("../app");

describe("Authentication API", () => {
  // Tests within the "POST /api/v1/users/login" describe block are focused on the login functionality.
  describe("POST /api/v1/users/login", () => {
    // Test for the 200 status code when the email and password are correct
    test("it should respond with 400 if email or password is missing", async () => {
      const response = await request(app).post("/api/v1/users/login").send({});
      expect(response.statusCode).toBe(400);
    });

    // Test for the 401 status code when the email or password is incorrect
    test("it should respond with 401 if email or password is incorrect", async () => {
      const response = await request(app).post("/api/v1/users/login").send({
        email: "wrong@example.com",
        password: "wrongpassword",
      });
      expect(response.statusCode).toBe(401);
    });
  });

  describe("GET /api/v1/users/catalog-items", () => {
    // please put a valid token here in the token variable : if not the test will fail
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA4NTAwNzQzLCJleHAiOjE3MDg1MDQzNDN9.fuI6fwnSbG4z2orYDEQh5PAIFPpPUE_vvG0LOugqChI";
    // Test for the 401 status code when the token is missing
    test("it should respond with 401 if token is missing", async () => {
      const response = await request(app).get("/api/v1/users/catalog-items");
      expect(response.statusCode).toBe(401);
    });
    // Test for the 401 status code when the token invalid (expired)
    test("it should respond with 403 if token is invalid", async () => {
      const response = await request(app)
        .get("/api/v1/users/catalog-items")
        .set("Authorization", "Bearer invalidtoken");
      expect(response.statusCode).toBe(403);
    });
    // Test for the 200 status code when the token is valid
    test("it should respond with 200 if token is valid", async () => {
      const response = await request(app)
        .get("/api/v1/users/catalog-items")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    }, 10000);
  });
});
