import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePractitioner, selectPractitionerById } from 'reducers/practitioner';
import { BiEdit,BiTrash } from 'react-icons/bi'
import {Button} from "react-bootstrap"

export default function PractitionerRow(props) {
  const {practitionerId, onEdit, index} = props;
  const practitioner = useSelector(state=> selectPractitionerById(state, practitionerId))
  const dispatch = useDispatch();
  const onDelete = () =>{
    dispatch(deletePractitioner(practitionerId));
  }
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{practitioner.fullname}</td>
      <td>{practitioner.contact}</td>
      <td>{practitioner.email}</td>
      <td>
        <Button onClick={onEdit}><BiEdit/></Button>
        <Button variant='danger' onClick={onDelete}><BiTrash/></Button>
      </td>
    </tr>
  );
}
