import request from "supertest";

import app from "../src/app";
import * as practitionerModal from "../src/modals/practitioner";

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

  describe("Fetching Practitioners", () => {
    it("returns 200 OK when user fetches list of practitioners", async () => {
      const response = await request(app).get("/practitioner").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("returns 200 OK when user fetches list of practitioners", async () => {
      const response = await request(app).get("/practitioner/1").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe("Creating a Practitioner", () => {
    it("returns 200 OK when practitioner is created successfully", async () => {
      const response = await request(app).post("/practitioner").set("Authorization", `Bearer ${token}`).send({
        email: "test_practitioner@gmail.com",
        fullname: "Neon Bist",
        contact: "9868548658",
        workingDays: "MON-FRI",
        endTime: "01:22",
      });
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.email).toBe("test_practitioner@gmail.com");
    });

    test.each`
      field         | result
      ${"fullname"} | ${'"Full Name" is required'}
      ${"email"}    | ${'"Email" is required'}
      ${"contact"}  | ${'"Contact" is required'}
    `("returns 400 when $field is null", async ({ field, result }) => {
      let practitioner = {
        email: "test_practitioner@gmail.com",
        fullname: "Neon Bist",
        contact: "9868548658",
        workingDays: "MON-FRI",
        endTime: "01:22",
      };
      delete practitioner[field];
      const response = await request(app)
        .post("/practitioner")
        .set("Authorization", `Bearer ${token}`)
        .send(practitioner);
      expect(response.body.error.code).toBe(400);
      expect(response.body.error.message).toBe(result);
    });
  });

  describe("Updating a Practitioner", () => {
    it("returns 200 OK when practitioner is updated successfully", async () => {
      const response = await request(app).put("/practitioner/1").set("Authorization", `Bearer ${token}`).send({
        email: "abc@gmail.com",
        fullname: "Neon Bist",
        contact: "888888",
        workingDays: "MON",
        endTime: "08:22",
      });
      expect(response.status).toBe(200);
    });

    it("returns 400 when field not allowed is submitted to update", async () => {
      const response = await request(app).put("/practitioner/1").set("Authorization", `Bearer ${token}`).send({
        email: "abc@gmail.com",
        contact: "9777",
        ranDOMfielD: "Fake data",
      });
      expect(response.status).toBe(400);
    });
  });

  describe("Deleting a Practitioner", () => {
    it("returns 200 OK when practitioner is deleted successfully", async () => {
      jest.spyOn(practitionerModal, "deleteById").mockImplementation(() => Promise.resolve([{ id: 2 }]));
      const response = await request(app).delete("/practitioner/2").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it("returns 400 OK when deleting practitioner failed", async () => {
      jest.spyOn(practitionerModal, "deleteById").mockImplementation(() => Promise.reject([{}]));
      const response = await request(app).delete("/practitioner/2").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(400);
    });
  });
});
