import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TablePersonas } from './TablePersonas';
import { deletePersona, getPersona, postPersona, putPersona } from '../Micro/Micros';
import { showMessage } from './SwalComponent';
import React, { useEffect, useRef, useState } from 'react';
import { Toast } from "primereact/toast";
import Modales from '../Modal';
import ModalQuestion from '../ModalQuestion';

const FormPersonas = () => {
    useEffect(() => {
        debugger
        ConsultarUsuarios();
    }, []);


    const toast = useRef(null);
    const [userList, setUserList] = useState([]);


    const [selectedItem, setSelectedItem] = useState(undefined);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [editMode, setEditMode] = useState(undefined);



    const ConsultarUsuarios = async () => {
        try {

            getPersona()
                .then((res1) => {

                    debugger
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
                    if (res1.response.success) {
                        showMessage(
                            "Eliminación Exitosa",
                            "",
                            "success"
                        );
                        setShowDelete(false)
                        ConsultarUsuarios();

                    }
                    else {
                        showMessage(
                            "¡Atención!",
                            res1.response.menssage,
                            "warning"
                        );
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

        if (data?.id === null || data?.id === "" || data?.id === 0 || data?.id === undefined) {
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
                putPersona(selectedItem.id, newData)
                    .then((res1) => {
                        if (res1.response.success) {
                            showMessage(
                                "Modificacion Exitosas",
                                "",
                                "success"
                            );
                            setShow(false)
                            ConsultarUsuarios();
                            setSelectedItem(undefined);

                        }
                        else {
                            showMessage(
                                "¡Atención!",
                                res1.response.menssage,
                                "warning"
                            );
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
                postPersona(data)
                    .then((res1) => {

                        if (res1.response.success) {
                            showMessage(
                                "Creaccion Exitosas",
                                "",
                                "success"
                            );
                            setShow(false)
                            ConsultarUsuarios();
                            setSelectedItem(undefined);
                        }
                        else {
                            showMessage(
                                "¡Atención!",
                                res1.response.menssage,
                                "warning"
                            );
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
        <React.Fragment>
            <Container fluid>
                <Toast ref={toast} />
                <Row className="justify-content-center">
                    <Col md={8}></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <div className="d-flex justify-content-center align-items-center">

                            <h1>Lista de personas</h1>
                        </div>

                        <header>

                            <Button onClick={() => { setEditMode(false); setSelectedItem(undefined); setShow(true); }} variant="success" className="mb-3">
                                <FontAwesomeIcon icon={faPlus} />Nuevo
                            </Button>

                        </header>
                        {userList.length > 0 ?
                            <>
                                <TablePersonas
                                    userList={userList}
                                    setEditMode={setEditMode}
                                    setSelectedItem={setSelectedItem}
                                    setShow={setShow}
                                    setShowDelete={setShowDelete} />
                            </>
                            :
                            <>
                                <div>
                                    No hay datos
                                </div>
                            </>
                        }
                    </Col>

                </Row>
            </Container>
            <Modales editMode={editMode} show={show} setShow={setShow} setSelectedItem={setSelectedItem} selectedItem={selectedItem} onClic={onClic} />
            <ModalQuestion show={showDelete} setShow={setShowDelete} onClicDelete={onClicDelete} selectedItem={selectedItem} />
        </React.Fragment>
    )

};

export { FormPersonas }