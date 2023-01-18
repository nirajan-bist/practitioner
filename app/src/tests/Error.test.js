import ErrorPage from "ErrorPage";
import { render, screen } from "@testing-library/react";
import Router, { RouterProvider, createMemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteError: jest.fn(),
}));

it("Error Page displays message if error has message", () => {
  console.warn = jest.fn();
  jest
    .spyOn(Router, "useRouteError")
    .mockReturnValue({ message: "This is a message" });
  const customRouter = createMemoryRouter(
    [
      {
        path: "/",
        element: <ErrorPage />,
        errorElement: <></>,
      },
    ],
    {
      initialEntries: ["/"],
    }
  );

  render(<RouterProvider router={customRouter} />);

  expect(screen.getByText("This is a message")).toBeInTheDocument();
});

it("Error Page displays statusText if error has statusText", async () => {
  console.warn = jest.fn();
  jest
    .spyOn(Router, "useRouteError")
    .mockReturnValue({ statusText: "Not Found" });
  const customRouter = createMemoryRouter(
    [
      {
        path: "/",
        element: <></>,
        errorElement: <ErrorPage />,
      },
    ],
    {
      initialEntries: ["/error"],
    }
  );

  render(<RouterProvider router={customRouter} />);

  expect(screen.getByText("Not Found")).toBeInTheDocument();
});

it("Error Page displays statusText if error has both statusText and message", async () => {
  console.warn = jest.fn();
  jest
    .spyOn(Router, "useRouteError")
    .mockReturnValue({ statusText: "Not Found", message: "This is a message" });
  const customRouter = createMemoryRouter(
    [
      {
        path: "/",
        element: <></>,
        errorElement: <ErrorPage />,
      },
    ],
    {
      initialEntries: ["/error"],
    }
  );

  render(<RouterProvider router={customRouter} />);

  expect(screen.getByText("Not Found")).toBeInTheDocument();
});
