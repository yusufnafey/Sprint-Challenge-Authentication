const request = require("supertest");

const server = require("./auth-router");
const db = require("../database/dbConfig");

describe("Server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("", () => {
    it("", () => {});
    it("", () => {});
  });

  describe("", () => {
    it("", () => {});
    it("", () => {});
  });
});
