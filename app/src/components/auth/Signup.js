import Button from "react-bootstrap/Button";
import BsForm from "react-bootstrap/Form";

import { useDispatch } from "react-redux";
import useDocumentTitle from "hooks/useDocumentTitle";

import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";

import { signUp } from "reducers/auth";

const { Group, Label, Control, Text } = BsForm;

const initialValues = {
  fullname: "",
  email: "",
  password: "",
};

export default function Signup() {
  useDocumentTitle("Signup");

  const dispatch = useDispatch()
  const handleSubmit = async (values) => {
    dispatch(signUp(values))
  };

  const FormikComponent = (props) => {
    return (
      <Form>
        <div className="logo m-auto mb-3" />
        <h1 className="h3 mb-3 font-weight-normal text-center">Sign Up</h1>

        <Field name="fullname">
          {({ field }) => (
            <Group className="mt-4">
              <Label htmlFor="fullname" className="required">
                Full Name
              </Label>
              <Control
                {...field}
                type="text"
                id="fullname"
                className="form-control"
                placeholder="Full Name"
                required
                autoFocus
              />
            </Group>
          )}
        </Field>

        <Field name="email">
          {({ field }) => (
            <Group className="my-3">
              <Label htmlFor="inputEmail" className="required">
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
            <Group className="my-3">
              <Label htmlFor="inputPassword" className="required">
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
          Sign Up
        </Button>

        <Text>
          Already have an account? <Link to="/login">Login</Link>
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
