import React from "react";
import Button from "react-bootstrap/Button";
import BsForm from "react-bootstrap/Form";
import useDocumentTitle from "hooks/useDocumentTitle";
import { Link} from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "reducers/auth";
import { saveTokens } from "services/token";
import { logIn } from "services/auth";
import { submitWrapper } from "utils/form";
import "./login.css";

const { Group, Label, Control, Text } = BsForm;

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  useDocumentTitle("Login");

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    submitWrapper(async () => {
      const { user, tokens } = await logIn(values);
      saveTokens(tokens);
      dispatch(setLoggedInUser(user));
    });
  };

  const FormikComponent = (props) => {
    return (
      <Form className="form-signin">
        <div className="logo m-auto mb-3" />
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Please sign in
        </h1>

        <Field name="email">
          {({ field }) => (
            <Group className="mt-3">
              <Label htmlFor="inputEmail" visuallyHidden>
                Email address
              </Label>
              <Control
                {...field}
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                required
              />
            </Group>
          )}
        </Field>
        <Field name="password">
          {({ field }) => (
            <Group className="mb-3">
              <Label htmlFor="inputPassword" visuallyHidden>
                Password
              </Label>
              <Control
                {...field}
                type="password"
                id="inputPassword"
                placeholder="Password"
                required
              />
            </Group>
          )}
        </Field>
        <Button type="submit" variant="primary" size="lg" className="w-100">
          Log in
        </Button>

        <Text>
          Don't have an account? <Link to="/signup">Create new</Link>
        </Text>
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2021-2022</p>
      </Form>
    );
  };

  return (
    <div id="login-form" className="">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {FormikComponent}
      </Formik>
    </div>
  );
}
