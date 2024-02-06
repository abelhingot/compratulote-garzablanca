import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useQuill } from 'react-quilljs';
import toolbar from '../../config/toolbar'
import 'quill/dist/quill.snow.css'
import Textarea from 'react-textarea-autosize'

const Contactame = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        apellidos: '',
        dni: '',
        celular: '',
        correo: ''
    });
    const [subject, setSubject] = useState('');

    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar,
        },
    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const filteredMenus = datos.filter((fila) =>
        (fila.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || fila.apellidos.toLowerCase().includes(searchTerm.toLowerCase())|| fila.dni.toLowerCase().includes(searchTerm.toLowerCase())));


    useEffect(() => {
        fetch('http://localhost:3001/pgcontactame')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch(`http://localhost:3001/pgcontactame/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    nombre: data.nombre,
                    apellidos: data.apellidos,
                    dni: data.dni,
                    celular: data.celular,
                    correo: data.correo
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };
    function stripHtml(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    const handleSaveClick = () => {
        const correo: string = (document.getElementById("Correo") as HTMLInputElement).value;
        const subject: string = (document.getElementById("Subject") as HTMLInputElement).value;
        const quillContent: string = stripHtml(quill.root.innerHTML);
        window.location.href = `mailto:${correo}?subject=${subject}&body=${quillContent}`;

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
                fetch(`http://localhost:3001/pgcontactame/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch('http://localhost:3001/pgcontactame')
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
    const handleClearClick = () => {
        setFormData({
            id: '',
            nombre: '',
            apellidos: '',
            dni: '',
            celular: '',
            correo: ''
        });
    }
    return (
        <>
            <DefaultDashboardLayout>
                <br />
                <Row className="mb-8 m-1">
                    <Col xl={12} lg={12} md={12} xs={12}>
                        <Card>
                            <Card.Body>
                                <div className="mb-4 mb-lg-0">
                                    <h4 className="mb-1 text-secondary">FORMULARIO CONTACTAME</h4>
                                    <br />
                                    <div className='row text-end'>
                                        <div className='col-md-8 col-lg-8 col-xs-8'>
                                            &nbsp;
                                        </div>
                                        <div className='col-md-4 col-lg-4 col-xs-4 '>
                                            <input type='search' placeholder='Nueva busqueda' className='form-control' onChange={(event) => setSearchTerm(event.target.value)}></input>
                                        </div>

                                    </div>
                                    <br />
                                    <Table hover responsive className="scroll text-nowrap">
                                        <thead >
                                            <tr className='table-secondary'>
                                                <th scope="col">Id</th>
                                                <th scope="col">NOMBRE</th>
                                                <th scope="col">APELLIDOS</th>
                                                <th scope="col">DNI</th>
                                                <th scope="col">CELULAR</th>
                                                <th scope="col">CORREO</th>
                                                <th scope='col'>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredMenus.map((fila, index) => (
                                                <tr key={fila.id}>
                                                    <td>{fila.id}</td>
                                                    <td>{fila.nombre}</td>
                                                    <td>{fila.apellidos}</td>
                                                    <td>{fila.dni}</td>
                                                    <td>{fila.celular}</td>
                                                    <td>{fila.correo}</td>
                                                    <td>
                                                        <Button onClick={() => handleEditClick(fila.id)} >  <i className="fe fe-mail fa-lg text-light"></i>   </Button>{' '}
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
                                <h4 ><strong>ENVIO DE CORREOS:</strong> CONTÁCTAME</h4>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col xl={12} lg={12} md={12} xs={12} className='p-2'>
                                <div>
                                    <Form>
                                        <Row className="mb-3">
                                            <div className="row">
                                                <div className='col-md-1 col-1 fw-bold'>Para:</div>
                                                <div className='col-md-11 col-11'>
                                                    <input type="text" className="form-control" placeholder="Correo" value={formData.correo} onChange={(e) => handleInputChange('correo', e.target.value)} id='Correo' />
                                                </div>
                                            </div>
                                        </Row>

                                        <Row className="mb-3">
                                            <div className="row">
                                                <div className='col-md-1 col-1 fw-bold'>Asunto:</div>
                                                <div className='col-md-11 col-11'>
                                                    <input type="text" className="form-control" placeholder="Asunto" id='Subject' />
                                                </div>
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <div className='editor'>
                                                    <div ref={quillRef}></div>
                                                </div>
                                            </div>
                                        </Row>

                                        <Row className="mb-3">
                                            <div className="col-sm-12 col-lg-12 text-center fw-bold">
                                                DATOS PROPORCIONADOS
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-sm-4 col-lg-4">
                                                <input type="text" className="form-control" placeholder="Id" value={formData.id} onChange={(e) => handleInputChange('id', e.target.value)} />
                                            </div>
                                            <div className="col-md-4 col-4">
                                                <input type="text" className="form-control" placeholder="DNI" value={formData.dni} onChange={(e) => handleInputChange('dni', e.target.value)} />
                                            </div>

                                            <div className="col-md-4 col-4">
                                                <input className="form-control" type="text" placeholder="Celular" value={formData.celular} onChange={(e) => handleInputChange('celular', e.target.value)} />
                                            </div>
                                        </Row>

                                        <Row className='mb-3'>
                                            <div className="col-md-6 col-6">
                                                <input className="form-control" type="text" placeholder="Nombre" value={formData.nombre} onChange={(e) => handleInputChange('nombre', e.target.value)} />
                                            </div>
                                            <div className='col-md-6 col-6'>
                                                <input className="form-control" type="text" placeholder="Apellidos" value={formData.apellidos} onChange={(e) => handleInputChange('apellidos', e.target.value)} />
                                            </div>
                                        </Row>

                                        <Row className="mb-3 text-end">
                                            <Col md={12} xs={12}>
                                                <Button className="btn btn-primary" type="submit" onClick={handleSaveClick}>GUARDAR</Button>
                                                &nbsp;
                                                <Button className="btn btn-primary" type="reset" onClick={handleClearClick}>LIMPIAR</Button>
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

export default Contactame