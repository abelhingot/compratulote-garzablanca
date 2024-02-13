import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import CNavbar from '../components/estructura/navbar';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selMenu, setSelMenu] = useState('informacion');
    const [formData, setFormData] = useState({
        id: '',
        href: '',
        categoria: '',
        texto: ''
    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
  //  const filteredMenus = datos.filter((fila) =>
       // (fila.texto.toLowerCase().includes(searchTerm.toLowerCase()) || fila.href.toLowerCase().includes(searchTerm.toLowerCase())));

    useEffect(() => {
        fetch('/db.json')
            .then(response => response.json())
            .then(json => {
                const data: any[] = json.pgmenugb;
                setDatos(data);
            })
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);



    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);
    
        fetch(`http://localhost:3001/pgmenugb/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    href: data.href,
                    categoria: data.categoria,
                    texto: data.texto
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };

    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3001/pgmenugb/${editItemId}`, { // Corrección aquí
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Datos actualizados:', data);
                    // Aquí deberías también actualizar tu estado local o refrescar los datos mostrados si es necesario
                })
                .catch((error) => {
                    console.error('Error al actualizar datos:', error);
                });
            setEditItemId(null);
        } else {
            fetch('http://localhost:3001/pgmenugb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Datos guardados:', data);
                    // Similarmente, actualiza el estado local o refresca los datos aquí si es necesario
                })
                .catch((error) => {
                    console.error('Error al guardar datos:', error);
                });
        }
    };

    const handleDeleteClick = (id) => {
        setIdToDelete(id);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Seguro de querer eliminar?",
            text: "Si elimina, no se puede deshacer los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Operación Existosa!",
                    text: "Su archivo ha sido eliminado.",
                    icon: "success"
                });
                fetch(`http://localhost:3001/pgmenugb/${id}`, {
                    method: 'DELETE',//{}
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch(`http://localhost:3001/pgmenugb`)
                            .then((response) => response.json())
                            .then((menusData) => {
                                setDatos(menusData);
                            })
                            .catch((error) => {
                                console.error('Error al actualizar menus:', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error al guardar datos:', error);
                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Operación cancelada",
                    text: "Archivo aún conservado",
                    icon: "error"
                });
            }
        });

    };

    const handleClearText = () => {
        setFormData({
            id: '',
            href: '',
            categoria: '',
            texto: ''
        });
    }
    return (
        <>
            <DefaultDashboardLayout>
                <br />
                <Row className="mb-5 m-1">
                    <Col xl={12} lg={12} md={12} xs={12}>
                        <Card>
                            <Card.Header className='fw-bold'>VISTA PREVIA DEL NAVBAR</Card.Header>
                            <Card.Body>
                                <ul className="nav flex-column flex-sm-row justify-content-center bg-white p-2 overflow-auto">
                                    <div className="d-flex flex-nowrap align-items-center justify-content-center justify-content-lg-start">
                                        {datos.map((fila, index) => (
                                            <li key={index} className="nav-item fw-bold">
                                                {fila.texto === 'Logo' ? (
                                                    <Image src={fila.href} alt="Logo" style={{ zoom: '0.5' }} />
                                                ) : (
                                                    <a className={`nav-link custom-sombra fs-4 ${selMenu.toLowerCase() === fila.texto.toLowerCase() ? 'text-light active bgProyect mx-2 rounded-5' : 'text-dark'}`} href="#">
                                                        {fila.texto}
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </div>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
                <Row className="mb-8 m-1">
                    <Col xl={12} lg={12} md={12} xs={12}>
                        <Card>
                            <Card.Header className='fw-bold'>
                               CONTROL DE LA INFORMACION
                            </Card.Header>
                            <Card.Body>
                                <div className="mb-4 mb-lg-0">
                                    <Table hover responsive className="scroll text-nowrap">
                                        <thead >
                                            <tr className='table-light' >
                                                <th scope="col">Id</th>
                                                <th scope="col">Ruta</th>
                                                <th scope="col">Texto</th>
                                                <th scope='col'>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datos.map((fila, index) => (
                                                <tr key={fila.id}>
                                                    <td>{fila.id}</td>
                                                    <td>{fila.href}</td>
                                                    <td>{fila.texto}</td>
                                                    <td>
                                                        <Button onClick={() => handleEditClick(fila.id)} >  <i className="fe fe-edit fa-lg text-light"></i>   </Button>{' '}
                                                        <Button onClick={() => handleDeleteClick(fila.id)} className='btn-danger'><i className="fe fe-trash fa-lg"></i></Button>{' '}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                <Fragment>
                    <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg" >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                <h4 ><strong>MANTENIMIENTO: </strong> NavBar</h4>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col xl={12} lg={12} md={12} xs={12} className='p-2'>
                                <div>
                                    <Form>
                                        <Row className="mb-3">
                                            <div className="col-sm-6 col-lg-6">
                                                <input type="text" className="form-control" placeholder="Id" value={formData.id} onChange={(e) => handleInputChange('id', e.target.value)} />
                                            </div>
                                            {formData.texto === 'Logo' ? (
                                                <div className="col-md-6 col-6">
                                                    <input type="text" className="form-control" placeholder="Texto" value={formData.texto} onChange={(e) => handleInputChange('texto', e.target.value)} disabled />
                                                </div>
                                            ) : (
                                                <div className="col-md-6 col-6">
                                                    <input type="text" className="form-control" placeholder="Texto" value={formData.texto} onChange={(e) => handleInputChange('texto', e.target.value)} />
                                                </div>
                                            )}
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input type="text" className="form-control" placeholder="Ruta" value={formData.href} onChange={(e) => handleInputChange('href', e.target.value)} />
                                            </div>
                                        </Row>

                                        <Row className="mb-3 text-end">
                                            <Col md={12} xs={12}>
                                                <Button className="btn btn-primary" type="submit" onClick={() => handleSaveClick()}>GUARDAR</Button>
                                                &nbsp;
                                                <Button className="btn btn-primary" type="reset" onClick={() => handleClearText()}>LIMPIAR</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>

                            </Col>
                        </Modal.Body>

                    </Modal>
                </Fragment>
            </DefaultDashboardLayout>
        </>
    )
}

export default Navbar