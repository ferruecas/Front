import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Col, Row, Container } from 'react-bootstrap';
import { getCiudad, getRegion, getSex } from './Micro/Micros';

function Modales({ show, setShow, selectedItem, onClic, }) {

  const [listSex, setListSex] = useState([]);
  const [listRegion, setListRegion] = useState([]);
  const [listComuna, setListComuna] = useState([]);
  const [listCiudad, setListCiudad] = useState([]);

  const init = {
    run: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    sexoCodigo: '',
    fechaNacimiento: '',
    regionCodigo: 1,
    ciudadCodigo: 1,
    comunaCodigo: 1,
    direccion: '',
    telefono: 30000,
    observaciones: ''
  };

  const [formData, setFormData] = useState(init);


  const handleClose = () => setShow(false);

  useEffect(() => {
    getSexo();
    getCiudades();
    getCoumna();
    getRegiones();
  }, []);

  const getSexo = () => {
    getSex()
      .then((res1) => {
        setListSex(res1);
      });
  };
  const getCiudades = () => {
    getCiudad()
      .then((res1) => {
        
        setListCiudad(res1);
      });
  };
  const getCoumna= () => {
    getSex()
      .then((res1) => {
        
        setListComuna(res1);
      });
  };
  const getRegiones= () => {
    getRegion()
      .then((res1) => {
        
        setListRegion(res1);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(formData);
    console.log(formData)
  };

  useEffect(() => {
    if (selectedItem) {

      setFormData(selectedItem)
    } else {
      setFormData(init)
    }

  }, [selectedItem]);



  return (

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedItem ? "Editar" : "Crear"}</Modal.Title>
      </Modal.Header>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="run">
                <Form.Label>RUN</Form.Label>
                <Form.Control type="text" name="run" placeholder="Run" value={formData?.run} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="nombres">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" name="nombres" placeholder="Nombres" value={formData?.nombres} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="apellidoPaterno">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control type="text" name="apellidoPaterno" placeholder="Primer apellido" value={formData?.apellidoPaterno} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="apellidoMaterno">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control type="text" name="apellidoMaterno" placeholder="Segundo apellido" value={formData?.apellidoMaterno} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="example@example.com" value={formData?.email} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="sexoCodigo">
                <Form.Label>Sexo</Form.Label>
                <Form.Control as="select" name="sexoCodigo" value={formData?.sexoCodigo} onChange={handleChange}>
                  {listSex?.map((x) => (
                    <option value={x.codigo}>
                      {x.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="regionCodigo">
                <Form.Label>Región</Form.Label>
                <Form.Control as="select" name="regionCodigo" value={formData?.regionCodigo} onChange={handleChange}>
                {listRegion?.map((x) => (
                    <option value={x.codigo}>
                      {x.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="ciudadCodigo">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control as="select" name="sexoCodigo" value={formData?.sexoCodigo} onChange={handleChange}>
                {listCiudad?.map((x) => (
                    <option value={x.codigo}>
                      {x.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="comunaCodigo">
                <Form.Label>Comuna</Form.Label>
                <Form.Control as="select" name="comunaCodigo" value={formData?.comunaCodigo} onChange={handleChange}>
                {listComuna?.map((x) => (
                    <option value={x.codigo}>
                      {x.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="fechaNacimiento">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type="date" name="fechaNacimiento" value={formData?.fechaNacimiento} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="direccion">
                <Form.Label>Direccíon</Form.Label>
                <Form.Control type="direccion" name="direccion" placeholder="Direccíon" value={formData?.direccion} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="telefono">
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="telefono" name="telefono" placeholder="3052281647" value={formData?.telefono} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="observaciones">
                <Form.Label>Observaciones</Form.Label>
                <Form.Control as="textarea" rows={3} name="observaciones" value={formData?.observaciones} onChange={handleChange} />
              </Form.Group>

            </Form>
          </Col>
        </Row>
      </Container>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => onClic(formData)}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>

  );
}

export default Modales;