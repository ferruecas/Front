import React, { useState,useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalQuestion({show, setShow, selectedItem,onClicDelete}) {

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¿Está seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Desea Eliminar el usuario : {selectedItem?.nombres + ' ' + selectedItem?.apellidoPaterno}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onClicDelete}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
 
  );
}

export default ModalQuestion;