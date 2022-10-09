import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./login.css";

const { Group, Label, Control } = Form;

export default function Login() {
  return (
    <div id="login-form" className="">
      <Form className="form-signin">
        <div className="logo m-auto mb-3" />
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Please sign in
        </h1>
        <Group>
          <Label htmlFor="inputEmail" visuallyHidden>
            Email address
          </Label>
          <Control
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autofocus
          />
        </Group>

        <Group className="mb-3">
          <Label htmlFor="inputPassword" visuallyHidden>
            Password
          </Label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
          />
        </Group>
        <Button type="submit" variant="primary" size="lg" className="w-100">
          Sign in
        </Button>
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2021-2022</p>
      </Form>
    </div>
  );
}
