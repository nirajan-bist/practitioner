import request from "supertest";
import app from "../src/app";
import * as authService from "../src/services/auth";
import { logFormat } from "../src/utils/logger";

it("returns level, timestamp, context and message", () => {
  const result = logFormat({
    level: "info",
    message: "This is a test",
    metadata: {
      timestamp: "2022-1-1TZ01:00:11",
      context: "testing",
    },
  });

  expect(result).toBe("info 2022-1-1TZ01:00:11 testing:: This is a test");
});

it("returns level and message when metadata is undefined", () => {
  const result = logFormat({
    level: "info",
    message: "This is a test",
  });

  expect(result).toBe("info undefined :: This is a test");
});

it("returns 500 Server error when random error occured", async () => {
  let user = {
    fullname: "Testable",
    email: "test@gmail.com",
    password: "test",
  };
  const mockCreateNewUser = jest
    .spyOn(authService, "signUp")
    .mockImplementation(() => Promise.reject(new Error("Random error")));

  const response = await request(app).post("/signup").send(user);
  expect(response.status).toBe(500);
  expect(mockCreateNewUser).toBeCalled();
});
