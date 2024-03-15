import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { Toast } from "primereact/toast";
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


///componenets
import Modales from '../src/Modal';
import ModalQuestion from '../src/ModalQuestion'
import { showMessage } from "./Component/SwalComponent";
import { deletePersona, getPersona } from "./Micro/Micros";
function App() {
  useEffect(() => {
    ConsultarUsuarios();
  }, []);


  const toast = useRef(null);
  const [userList, setUserList] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [editMode, setEditMode] = useState(undefined);



  const ConsultarUsuarios = async () => {
    try {
      getPersona()
      .then((res1) => {
        
        setUserList(res1);
      });  
    } catch (error) {
      alert("Error Obteniendo data:" + error);
    }
  };
  const onClicDelete = async () => {
    try {
      deletePersona(selectedItem.id)  
      .then((res1) => {
          if (res1.response.code != 0) {
              showMessage(
                  "¡Atención!",
                  res1.response.menssage,
                  "warning"
              );
          }
          else {
              showMessage(
                  "Eliminación Exitosa",
                  "",
                  "success"
              );
              setShowDelete(false)
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
  
  };

  function validarRUNT(rut) {
    rut = rut.replace(/\./g, '').replace(/\-/g, '');

    var rutLimpio = rut.slice(0, -1);
    var dv = rut.slice(-1).toUpperCase();
    var suma = 0;
    var multiplo = 2;

    for (var i = rutLimpio.length - 1; i >= 0; i--) {
      suma += rutLimpio.charAt(i) * multiplo;

      if (multiplo < 7) {
        multiplo++;
      } else {
        multiplo = 2;
      }
    }

    var dvEsperado = 11 - (suma % 11);
    dvEsperado = (dvEsperado == 10) ? 'K' : (dvEsperado == 11) ? '0' : dvEsperado.toString();

    if (dv != dvEsperado) {
      return false;
    }

    return true;
  }

  const ValidarFormulario = (data) => {
    let menssage = undefined;
    
    if (data?.id == null || data?.id == "" || data?.id == 0 || data?.id == undefined) {
      if (data?.run === "" && !menssage) {
        menssage = "El runt es obligatorio.";
      }
      
      if (!validarRUNT(data?.run)) {

        menssage = "El runt no es valido.";
      }
    }
    if (data?.nombres === "" && !menssage) {
      menssage = "El nombre es obligatorio.";
    }
    if (data?.apellidoPaterno === "" && !menssage) {
      menssage = "El apellidoPaterno es obligatorio.";
    }
    if (data?.apellidoMaterno === "" && !menssage) {
      menssage = "El apellidoMaterno es obligatorio.";
    }
    if (data?.email === "" && !menssage) {
      menssage = "El email es obligatorio.";
    }

    if (data?.fechaNacimiento === "" && !menssage) {
      menssage = "El fechaNacimiento es obligatorio.";
    }
    if (data?.regionCodigo === 0 && !menssage) {
      menssage = "El regionCodigo es obligatorio.";
    }
    if (data?.ciudadCodigo === 0 && !menssage) {
      menssage = "El ciudadCodigo es obligatorio.";
    }

    if (data?.comunaCodigo === 0 && !menssage) {
      menssage = "El comunaCodigo es obligatorio.";
    }

    if (data?.direccion === "" && !menssage) {
      menssage = "El direccion es obligatorio.";
    }
    if (data?.telefono === "" && !menssage) {
      menssage = "El telefono es obligatorio.";
    }

    if (data?.observaciones === "" && !menssage) {
      menssage = "El observaciones es obligatorio.";
    }

    if (
      !/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(
        data?.email
      ) &&
      !menssage
    ) {
      menssage =
        "El correo no es valido, ingrese uno e intente nuevamente.";
    }

    return { menssage };
  };

  const onClic = async (data) => {

    const { menssage } = ValidarFormulario(data);

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
      const obj = {};

      

      const { nombres, apellidoPaterno, apellidoMaterno, email, sexoCodigo, fechaNacimiento, regionCodigo, ciudadCodigo, comunaCodigo, direccion, telefono, observaciones } = data;

      const newData = {
        nombres,
        apellidoPaterno,
        apellidoMaterno,
        email,
        sexoCodigo: parseInt(sexoCodigo),
        fechaNacimiento,
        regionCodigo: parseInt(regionCodigo),
        ciudadCodigo: parseInt(ciudadCodigo),
        comunaCodigo: parseInt(comunaCodigo),
        direccion,
        telefono,
        observaciones
      };

      try {
        fetch('https://localhost:7048/api/Persona/' + data.id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData)
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
                      <Button onClick={() => { setEditMode(true); setSelectedItem(data); setShow(true); }} variant="warning">
                        <FontAwesomeIcon icon={faPencilSquare} /> Editar
                      </Button>

                      <Button onClick={() => { setEditMode(false); setSelectedItem(data); setShowDelete(true); }} variant="danger">
                        <FontAwesomeIcon icon={faTrash} /> Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={2}>
            <Button onClick={() => { setEditMode(false);setSelectedItem(undefined); setShow(true); }} variant="success" className="mb-3">
              <FontAwesomeIcon icon={faPlus} />Nuevo
            </Button>
          </Col>
        </Row>
      </Container>
      <Modales editMode={editMode} show={show} setShow={setShow} selectedItem={selectedItem} onClic={onClic} />
      <ModalQuestion show={showDelete} setShow={setShowDelete} onClicDelete={onClicDelete} selectedItem={selectedItem} />
    </>

  );
}

export default App;