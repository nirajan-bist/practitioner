import request from "supertest";

import app from "../src/app";
import * as authService from "../src/services/auth";

let token = "";
describe("Practitioner tests", () => {
  beforeAll(async () => {
    const response = await request(app).post("/login").send({
      email: "test@gmail.com",
      password: "test",
    });
    token = response.body.tokens.accessToken;
  });

  it("returns 401 when no authorization header is not set", async () => {
    const response = await request(app).get("/practitioner");
    expect(response.status).toBe(401);
  });

  it("returns 401 when Bearer token is null or empty", async () => {
    const response = await request(app).get("/practitioner").set("Authorization", "Bearer");
    expect(response.status).toBe(401);
  });
  it("returns 401 when Bearer token is invalid", async () => {
    const response = await request(app).get("/practitioner").set("Authorization", "Bearer RanDOm.ToKen.ConteNt");
    expect(response.status).toBe(401);
  });
  it("returns 401 when Authorization header has other tags than Bearer", async () => {
    const response = await request(app).get("/practitioner").set("Authorization", `RandomTag  Nothingelse`);
    expect(response.status).toBe(401);
  });
  it("returns 200 OK when user fetches list of practitioners", async () => {
    const response = await request(app).get("/practitioner").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
