import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Auth from "components/auth";
import { Provider } from "react-redux";
import store from "store";

it("Render children if the user is not logged in", () => {
  render(
    <Provider store={store}>
      <Auth>Children </Auth>
    </Provider>
  );
  expect(screen.getByText("Children")).toBeInTheDocument();
});

it("Render children and match the snapshot", async () => {

 const {asFragment}= render(
    <Provider store={store}>
      <Auth >Children </Auth>
    </Provider>
  );
  expect( screen.getByText("Children")).toBeInTheDocument();
  expect(await asFragment()).toMatchSnapshot();
});
