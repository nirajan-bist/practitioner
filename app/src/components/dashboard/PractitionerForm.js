import Button from "react-bootstrap/Button";
import BsForm from "react-bootstrap/Form";
import { Formik, Field, Form } from "formik";
import {
  addPractitioner,
  fetchPractitioners,
  selectPractitionerById,
  updatePractitioner,
} from "reducers/practitioner";
import { useDispatch, useSelector } from "react-redux";

const { Group, Label, Control } = BsForm;

const initialValues = {
  fullname: "",
  email: "",
  contact: "",
  dob: null,  
};

export default function PractionerForm(props) {
  const dispatch = useDispatch();
  const { practitionerId, mode, closeModal } = props;
  const practitioner = useSelector((state) =>
    selectPractitionerById(state, practitionerId)
  );

  const handleSubmit = async (values) => {
    if (mode === "edit") {
      dispatch(updatePractitioner(values));
      closeModal();
      return;
    }
    dispatch(addPractitioner(values));
    dispatch(fetchPractitioners);
    closeModal();
  };

  const FormikComponent = (props) => {
    return (
      <Form>
        <div className="logo m-auto mb-3" />
        <h1 className="h3 mb-3 font-weight-normal text-center">Details</h1>

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
        <Field name="dob">
          {({ field }) => (
            <Group className="my-3">
              <Label htmlFor="inputDateOfBirth" className="required">
                Date of Birth
              </Label>
              <Control
                {...field}
                type="Date"
                id="inputDateOfBirth"
                placeholder="Date of Birth"
                required
              />
            </Group>
          )}
        </Field>
        <Field name="contact">
          {({ field }) => (
            <Group className="my-3">
              <Label htmlFor="inputContact" className="required">
                Contact
              </Label>
              <Control
                {...field}
                type="text"
                id="inputContact"
                placeholder="Contact"
                required
              />
            </Group>
          )}
        </Field>
        <Field name="workingDays">
          {({ field }) => (
            <Group className="my-3">
              <Label htmlFor="inputWorkingDays" className="required">
                Working Days
              </Label>
              <Control
                {...field}
                type="text"
                id="inputWorkingDays"
                placeholder="Type index of weekdays (For Sun -> 1, Sat -> 7) separated by commas"
                required
              />
            </Group>
          )}
        </Field>
        <Field name="startTime">
          {({ field }) => (
            <Group className="my-3">
              <Label htmlFor="inputStartTime" className="required">
                Start Time
              </Label>
              <Control
                {...field}
                type="time"
                id="inputStartTime"
                placeholder="Start Time"
                required
              />
            </Group>
          )}
        </Field>
        <Field name="endTime">
          {({ field }) => (
            <Group className="my-3">
              <Label htmlFor="inputEndTime" className="required">
                End time
              </Label>
              <Control
                {...field}
                type="time"
                id="inputEndTime"
                placeholder="End Time"
                required
              />
            </Group>
          )}
        </Field>
        <Button type="submit" variant="primary" size="lg" className="w-100">
          Submit
        </Button>
      </Form>
    );
  };

  return (
    <div className="new-practitioner-form">
      <Formik
        initialValues={mode === "edit" ? practitioner : initialValues}
        onSubmit={handleSubmit}
      >
        {FormikComponent}
      </Formik>
    </div>
  );
}
