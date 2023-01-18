import { submitWrapper } from "utils/form";
import { interpolate } from "utils/string";
import { logOut } from "utils/user";
import * as errors from "utils/error";
import * as services from "services/token";
import "./mocks/window"

describe("Error handler tests", () => {
  it("console logs the error", () => {
    console.log = jest.fn();
    errors.handleError({ response: { data: "response-data" } });
    expect(console.log).toHaveBeenCalledWith("response-data");
  });
});

describe("interpolate function test", () => {
  it("returns interpolated string using the parmas", () => {
    const result = interpolate(":param: is awesome.", {
      param: "Unit testing",
    });
    expect(result).toBe("Unit testing is awesome.");
  });

  it("returns the original string if no params match", () => {
    const result = interpolate(":param: is awesome.", {
      value: "Unit testing",
    });
    expect(result).toBe(":param: is awesome.");
  });

  it("returns the original string if no params provided", () => {
    const result = interpolate(":param: is awesome.");
    expect(result).toBe(":param: is awesome.");
  });
});

describe("Form utils", () => {
  it("test form", async () => {
    const submitFn = jest.fn();
    submitWrapper(submitFn);
    expect(submitFn).toBeCalled();
  });

  it("test form", async () => {
    const submitFn = jest.fn();
    const onError = jest.fn();

    submitFn.mockRejectedValue("Rejected");
    await submitWrapper(submitFn, onError);

    expect(onError).toBeCalled();
    expect(onError).toBeCalledWith("Rejected");
  });

  it("test form", async () => {
    const submitFn = jest.fn();
    jest.spyOn(errors, "handleError");

    submitFn.mockRejectedValue("Rejected");
    await submitWrapper(submitFn);

    expect(errors.handleError).toHaveBeenCalledWith("Rejected");
  });
});

describe("Logout utils", () => {
  beforeAll(()=>jest.resetAllMocks())
  /**
   * @jest-environment jsdom
   */
  it("Removes tokens when user logs out", async () => {
    jest.spyOn(services, "removeTokens");
    logOut();
    expect(services.removeTokens).toBeCalled();
  });
});
