import { render, screen, waitFor } from "@testing-library/react";
import App from "components/App";
import { routes } from "components/Router";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import store from "store";

it("App test", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByRole("navigation")).toBeDefined();
});

it("Router test", async () => {
  const customRouter = createMemoryRouter(routes, {
    initialEntries: ["/login"],
  });

  render(
    <Provider store={store}>
      <RouterProvider router={customRouter} />
    </Provider>

  );

  await waitFor(() => screen.getByRole("button"));
  expect(screen.getByRole("button").textContent).toBe("Log in");
});

it("Signup test", async () => {
  const customRouter = createMemoryRouter(routes, {
    initialEntries: ["/signup"],
  });

  render(
    <Provider store={store}>
      <RouterProvider router={customRouter} />
    </Provider>

  );

  await waitFor(() => screen.getByRole("button"));
  expect(screen.getByRole("button").textContent).toBe("Log in");
});
