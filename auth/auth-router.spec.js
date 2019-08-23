const request = require("supertest");

const server = require("./auth-router");
const db = require("../database/dbConfig");

describe("Server", () => {
  describe("POST /register", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("Returns status code 201", async () => {
      let resposne = await request(server)
        .post("/register")
        .send({
          username: "Yusuf",
          password: "Nafey"
        });
      expect(response.status).toBe(201);
    });

    it("Returns status code 422", async () => {
      let response = await request(server)
        .post("/register")
        .send({
          username: "Yusuf"
        });
      expect(response.status).toBe(422);
    });
  });

  describe("POST /login", () => {
    it("Returns JSON", async () => {
      let response = await request(server).post("/login");
      expect(response.type).toMatch(/json/);
    });

    it("Returns status code 500", async () => {
      let response = await request(server)
        .post("/login")
        .send();
      expect(response.status).toBe(500);
    });
  });
});
