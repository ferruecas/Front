import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Col, Row, Container } from 'react-bootstrap';
import { getCiudad, getComuna, getRegion, getSex } from './Micro/Micros';
import moment from "moment";

function Modales({ editMode,show, setShow, selectedItem, onClic, }) {

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
    regionCodigo: 0,
    ciudadCodigo: 0,
    comunaCodigo: 0,
    direccion: '',
    telefono: 0,
    observaciones: ''
  };

  const [formData, setFormData] = useState(init);


  const handleClose = () => setShow(false);

  useEffect(() => {
    getSexo();
    getCiudades();
    getCoumnas();
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
  const getCoumnas= () => {
    getComuna()
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
    debugger
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

      setFormData({...selectedItem,
        fechaNacimiento:moment(selectedItem.fechaNacimiento).format('YYYY-MM-DD')})
    } else {
      setFormData(init)
    }

  }, [selectedItem]);



  return (
    <Modal show={show} onHide={handleClose} className="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>{selectedItem ? "Editar" : "Crear"}</Modal.Title>
      </Modal.Header>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="run">
                <Form.Label>RUN</Form.Label>
                <Form.Control disabled={editMode} maxLength="10" type="text" name="run" placeholder="Run" value={formData?.run} onChange={handleChange} />
              </Form.Group>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="nombres">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control maxLength="30" type="text" name="nombres" placeholder="Nombres" value={formData?.nombres} onChange={handleChange}
                      onKeyPress={(event) => {
                        if (!/[a-zA-ZÑñÁáÉéÍíÓóÚú ]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="apellidoPaterno">
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control
                      onKeyPress={(event) => {
                        if (!/[a-zA-ZÑñÁáÉéÍíÓóÚú ]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      type="text" maxLength="20" name="apellidoPaterno" placeholder="Primer apellido" value={formData?.apellidoPaterno} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="apellidoMaterno">
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control maxLength="20" type="text" name="apellidoMaterno" placeholder="Segundo apellido" value={formData?.apellidoMaterno} onChange={handleChange}
                      onKeyPress={(event) => {
                        if (!/[a-zA-ZÑñÁáÉéÍíÓóÚú ]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control maxLength="30" type="email" name="email" placeholder="example@example.com" value={formData?.email} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="sexoCodigo">
                <Form.Label>Sexo</Form.Label>
                <Form.Control as="select" name="sexoCodigo" value={formData?.sexoCodigo} onChange={handleChange}>
                  <option value="0">Seleccione</option>
                  {listSex?.map((x) => (
                    <option value={x.codigo}>
                      {x.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="fechaNacimiento">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type="date" name="fechaNacimiento" value={formData?.fechaNacimiento} onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]} />
              </Form.Group>
              <Form.Group controlId="regionCodigo">
                <Form.Label>Región</Form.Label>
                <Form.Control as="select" name="regionCodigo" value={formData?.regionCodigo} onChange={handleChange}>
                  <option value="0">Seleccione</option>
                  {listRegion?.map((x) => (
                    <option value={x.codigo}>
                      {x.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="ciudadCodigo">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control as="select" name="ciudadCodigo" value={formData?.ciudadCodigo} onChange={handleChange}>
                  <option value="0">Seleccione</option>
                  {listCiudad?.filter(item => item.regionCodigo == formData?.regionCodigo).map((x) => (
                    <option value={x.codigo}>
                      {x.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comunaCodigo">
                <Form.Label>Comuna</Form.Label>
                <Form.Control as="select" name="comunaCodigo" value={formData?.comunaCodigo} onChange={handleChange}>
                  <option value="0">Seleccione</option>
                  {listComuna?.filter(item => item.ciudadCodigo == formData?.ciudadCodigo && item.regionCodigo == formData?.regionCodigo).map((x) => (
                    <option value={x.codigo}>
                      {x.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="direccion">
                <Form.Label>Direccíon</Form.Label>
                <Form.Control maxLength="50" type="direccion" name="direccion" placeholder="Direccíon" value={formData?.direccion} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="telefono">
                <Form.Label>Telefono</Form.Label>
                <Form.Control maxLength="7" type="telefono" name="telefono" placeholder="3052281647" value={formData?.telefono} onChange={handleChange}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }} />
              </Form.Group>
              <Form.Group controlId="observaciones">
                <Form.Label maxLength="50">Observaciones</Form.Label>
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