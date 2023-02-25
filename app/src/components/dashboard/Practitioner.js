import React from "react";
import useDocumentTitle from "hooks/useDocumentTitle";
import Modal from "../common/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPractitioners,
  selectPractitionerIds,
} from "reducers/practitioner";
import { useEffect } from "react";
import PractitionerRow from "./PractitionerRow";
import PractionerForm from "./PractitionerForm";
import "./practitioner.scss";
import { useRef } from "react";

export default function Practitioner() {
  useDocumentTitle("Practitioner");

  const dispatch = useDispatch();
  const practitioners = useSelector(selectPractitionerIds);
  const [mode, setMode] = React.useState("");
  const [editData, setEditData] = React.useState(null);
  const form = useRef();

  const handleEdit = (practitionerId) => {
    setMode("edit");
    setEditData(practitionerId);
  };

  const onModalChange = (state, mode) => {
    if (!state) {
      setMode("");
      return;
    }
    setMode(mode);
  };

  useEffect(() => {
    dispatch(fetchPractitioners());
  }, []);

  return (
    <div className="practitioner-page">
      <Modal
        buttonTitle="Add New Practitioner"
        isOpen={mode === "add"}
        onChange={(state) => onModalChange(state, "add")}
        onSubmit = {()=>form.current?.submitForm()}
      >
        <PractionerForm closeModal={onModalChange} ref={form}/>
      </Modal>

      <Modal
        hideTriggerButton
        isOpen={mode === "edit"}
        onChange={(state) => onModalChange(state, "edit")}
        onSubmit = {()=>form.current?.submitForm()}
      >
        <PractionerForm
          practitionerId={editData}
          mode={mode}
          closeModal={onModalChange}
          ref={form}
        />
      </Modal>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fullname</th>
            <th scope="col">Contact</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {practitioners &&
            practitioners.map((practitionerId, index) => {
              return (
                <PractitionerRow
                  key={practitionerId}
                  practitionerId={practitionerId}
                  index={index}
                  onEdit={() => handleEdit(practitionerId)}
                />
              );
            })}
        </tbody>
      </table>
      {!practitioners.length && "No practitioners yet!"}
    </div>
  );
}
