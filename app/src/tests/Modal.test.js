import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "components/common/Modal";

it("Modal must have Click me button to trigger modal", async () => {
  render(<Modal buttonTitle="Click me" />);
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Click me");
  await fireEvent.click(button);
  await waitFor(() => {
    expect(screen.getAllByRole("button", { name: "Close" })).toHaveLength(2);
  });
});

it("Open modal must have Close button to trigger modal", async () => {
  render(<Modal />);
  const button = screen.getByRole("button");
  await fireEvent.click(button);
  let buttons;
  await waitFor(() => {
    buttons = screen.getAllByRole("button", { name: "Close" });
    expect(buttons).toHaveLength(2);
  });
  await fireEvent.click(buttons[0]);
  await waitFor(() => {
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});

it("OnChange function is called with modal state if onchange props is passed", async () => {
  const onChange = jest.fn();
  render(<Modal isOpen={true} buttonTitle="Click me" onChange={onChange}/>);
  const button = screen.getByText("Click me");
  
  await fireEvent.click(button);
  expect(onChange).toHaveBeenCalledWith(true);
});

it("Modal shouldn't render trigger button if hideTriggerButton is set", async () => {
  const container = render(<Modal buttonTitle="Click me" hideTriggerButton />);
  expect(container.queryByText("Click me")).not.toBeInTheDocument();
});
