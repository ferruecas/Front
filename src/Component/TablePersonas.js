import { Container, Row, Col, Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilSquare, faPlus } from '@fortawesome/free-solid-svg-icons';

const TablePersonas = ({
    userList,
    setEditMode,
    setSelectedItem,
    setShow,
    setShowDelete}) => {
    debugger
    return (
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

                {
                    userList?.map((data, index) => (
                        <tr key={index}>
                            <td class="align-middle">{index}</td>
                            <td class="align-middle">{data.nombres}</td>
                            <td class="align-middle">{data.run}</td>
                            <td>
                                <Button className="m-1" onClick={() => { setEditMode(true); setSelectedItem(data); setShow(true); }} variant="warning">
                                    <FontAwesomeIcon icon={faPencilSquare} /> Editar
                                </Button>

                                <Button className="m-1" onClick={() => { setEditMode(false); setSelectedItem(data); setShowDelete(true); }} variant="danger">
                                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))
                }


            </tbody>
        </Table>)
};

export { TablePersonas }