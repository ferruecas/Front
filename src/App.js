import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { Toast } from "primereact/toast";

///componenets
import Modales from '../src/Modal';
import ModalQuestion from '../src/ModalQuestion'
import { showMessage } from "./Component/SwalComponent";
function App() {
  useEffect(() => {
    ConsultarUsuarios();
  }, []);


  const toast = useRef(null);
  const [userList, setUserList] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);

  const ConsultarUsuarios = async () => {
    try {
      const response = await fetch("https://localhost:7048/api/Persona", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Pagina no respone");
      }

      const jsonData = await response.json();
      const userListData = jsonData;

      setUserList(userListData);
    } catch (error) {
      alert("Error Obteniendo data:" + error);
    }
  };
  const onClicDelete = async () => {
    try {
      const response = await fetch("https://localhost:7048/api/Persona", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Pagina no responde");
      }

      console.log();
      const jsonData = await response.json();
      // const userListData = jsonData;
      console.log(jsonData);

      setShowDelete(true);

      setUserList(jsonData);
    } catch (error) {
      alert("Error Obteniendo data:" + error);
    }
  };
  
  const ValidarFormulario = () => {
    let menssage = undefined;

    return { menssage };
  };

  const onClic = async (data) => {

    const { menssage } = ValidarFormulario();

    if (menssage) {
      toast.current.show({
        severity: "warn",
        summary: "",
        detail: menssage,
        life: 3000,
      });
    } else {
      saveForm(data);
    }

  };

  const saveForm = (data) => {
    if (data?.id != null && data?.id != "" && data?.id != 0) {

      try {
        fetch('https://localhost:7048/api/Persona/' + data.id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        }).then((res) => res.json())
          .then((res1) => {

            console.log(res1)
            if (res1.response.code != 0) {
              showMessage(
                "¡Atención!",
                res1.response.menssage,
                "warning"
              );
            }
            else {
              showMessage(
                "Modificacion Exitosas",
                "",
                "success"
              );
              setShow(false)
              ConsultarUsuarios();
            }
          });
      } catch (error) {
        showMessage(
          "¡Atención!",
          error,
          "warning"
        );
      }
    }
    else {
      try {
        fetch("https://localhost:7048/api/Persona", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        }).then((res) => res.json())
          .then((res1) => {

            console.log(res1)
            if (res1.response.code != 0) {
              showMessage(
                "¡Atención!",
                res1.response.menssage,
                "warning"
              );
            }
            else {
              showMessage(
                "Creaccion Exitosas",
                "",
                "success"
              );
              setShow(false)
              ConsultarUsuarios();
            }



          });
      } catch (error) {
        showMessage(
          "¡Atención!",
          error,
          "warning"
        );
      }
    }
  };


  return (
    <>
 <Toast ref={toast} />
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={8}></Col>
        </Row>
        <Row className="justify-content-center">


          <Col md={8}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>R.U.T.</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((data, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{data.nombres}</td>
                    <td>{data.run}</td>
                    <td>
                      <Button onClick={() => { setSelectedItem(data); setShow(true); }} variant="warning">
                        <FontAwesomeIcon icon={faPencilSquare} /> Editar
                      </Button>

                      <Button onClick={() => { setSelectedItem(data); setShowDelete(true); }} variant="danger">
                        <FontAwesomeIcon icon={faTrash} /> Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={2}>
            <Button onClick={() => { setSelectedItem(undefined); setShow(true); }} variant="success" className="mb-3">
              <FontAwesomeIcon icon={faPlus} />Nuevo
            </Button>
          </Col>
        </Row>
      </Container>
      <Modales show={show} setShow={setShow} selectedItem={selectedItem} onClic={onClic} />
      <ModalQuestion show={showDelete} setShow={setShowDelete} onClicDelete={onClicDelete} selectedItem={selectedItem} />
    </>

  );
}

export default App;