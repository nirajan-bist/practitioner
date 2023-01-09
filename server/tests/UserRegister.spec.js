import request from "supertest";

import app from "../src/app";
import * as authService from "../src/services/auth";

it("returns 200 OK when server is running ", (done) => {
  request(app).get("/api").expect(200, done);
});

it("returns 404 Not Found error when going to unimplemented route", (done) => {
  request(app).get("/unimlemented-route").expect(404, done);
});

describe("Login test", () => {
  test.each`
    field         | result
    ${"email"}    | ${'"Email" is required'}
    ${"password"} | ${'"Password" is required'}
  `("returns 400 when $field is null", async ({ field, result }) => {
    let user = {
      email: "test@gmail.com",
      password: "test",
    };
    delete user[field];
    const response = await request(app).post("/login").send(user);
    expect(response.body.error.code).toBe(400);
    expect(response.body.error.message).toBe(result);
  });

  it("returns 400 when no such email does exist", async () => {
    const response = await request(app).post("/login").send({
      email: "unregisterd@gmail.com",
      password: "psswd",
    });
    expect(response.status).toBe(400);
  });

  it("returns 400 when email and password mismatch", async () => {
    const response = await request(app).post("/login").send({
      email: "test@gmail.com",
      password: "fake",
    });
    expect(response.status).toBe(400);
  });

  it("returns 200 OK when user successfully logs in", async () => {
    const response = await request(app).post("/login").send({
      email: "test@gmail.com",
      password: "test",
    });
    expect(response.status).toBe(200);
  });
});

describe("Sign up test", () => {
  test.each`
    field         | result
    ${"fullname"} | ${'"Full Name" is required'}
    ${"email"}    | ${'"Email" is required'}
    ${"password"} | ${'"Password" is required'}
  `("returns 400 when $field is null", async ({ field, result }) => {
    let user = {
      fullname: "Testable",
      email: "test@gmail.com",
      password: "test",
    };
    delete user[field];
    const response = await request(app).post("/signup").send(user);
    expect(response.body.error.code).toBe(400);
    expect(response.body.error.message).toBe(result);
  });

  it("returns 200 OK when user successfully signs up", async () => {
    let user = {
      fullname: "Testable",
      email: "test@gmail.com",
      password: "test",
    };
    const mockCreateNewUser = jest.spyOn(authService, "signUp").mockImplementation(() => Promise.resolve());

    const response = await request(app).post("/signup").send(user);
    expect(response.status).toBe(200);
    expect(mockCreateNewUser).toBeCalled();
  });

  it("returns 400 when user signs up with already existing email", async () => {
    let user = {
      fullname: "Testable",
      email: "test@gmail.com",
      password: "test",
    };

    const response = await request(app).post("/signup").send(user);
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe("User with this email exists already!");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

describe("Refresh Token", () => {
  let token = "";
  beforeAll(async () => {
    const response = await request(app).post("/login").send({
      email: "test@gmail.com",
      password: "test",
    });
    token = response.body.tokens.refreshToken;
  });

  it("returns 400 when refreshToken field is null", async () => {
    const response = await request(app).post("/refresh");
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('"refreshToken" is required');
  });

  it("returns 401 when refreshToken expired or is invalid", async () => {
    const response = await request(app).post("/refresh").send({ refreshToken: "invalid.refresh.token" });
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe("Invalid Refresh Token");
  });

  it("returns 200 OK when gets new token successfully", async () => {
    const response = await request(app).post("/refresh").send({ refreshToken: token });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
