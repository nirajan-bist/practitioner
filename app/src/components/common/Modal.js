import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App(props) {
  const {isOpen, onChange, hideTriggerButton, buttonTitle} = props;
  const [innerIsOpen, setInnerOpen] = React.useState(isOpen || false);
  const handleModalState = (state)=>{
    if(onChange){
      onChange(state);
      return;
    }
    if(isOpen === undefined) setInnerOpen(state);
  }

  return (
    <>
      {!hideTriggerButton &&
       <Button variant="primary" onClick={() => handleModalState(true)}>
        {buttonTitle}
      </Button>
      }

      <CenteredModal
        show={isOpen? isOpen: innerIsOpen}
        onHide={() => handleModalState(false)}
      >
        {props.children}
      </CenteredModal>
    </>
  );
}

export default App;