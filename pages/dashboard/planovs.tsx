import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal, Accordion } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const plano = () => {
    const [seccionActiva, setSeccionActiva] = useState('home');
    const ocultarMantenimiento = (seccion) => {
        setSeccionActiva(seccion);
    };

    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        id: '',
        coordenadas: '',
        color: '',
        lote: '',
        manzana: '',
        areaLote: '',
        referencia: '',
        precio: '',
        estado: ''
    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    const filteredMenus = datos.filter((fila) =>
        (fila.id.toLowerCase().includes(searchTerm.toLowerCase())));

    useEffect(() => {
        fetch('http://localhost:3001/pgconfiplanovs')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);
    const handleRegistrarClick = () => {
        setLgShow(true)
        setFormData({
            id: '',
            coordenadas: '',
            color: '',
            lote: '',
            manzana: '',
            areaLote: '',
            referencia: '',
            precio: '',
            estado: ''
        });

    }
    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch(`http://localhost:3001/pgconfiplanovs/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    coordenadas: data.coordenadas,
                    color: data.color,
                    lote: data.lote,
                    manzana: data.manzana,
                    areaLote: data.areaLote,
                    referencia: data.referencia,
                    precio: data.precio,
                    estado: data.estado
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };

    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3001/pgconfiplanovs/${editItemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Datos actualizados:', data);
                })
                .catch((error) => {
                    console.error('Error al actualizar datos:', error);
                });

            setEditItemId(null);
        } else {
            fetch('http://localhost:3001/pgconfiplanovs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Datos guardados:', data);

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
                fetch(`http://localhost:3001/pgconfiplanovs/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch('http://localhost:3001/pgconfiplanovs')
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
            coordenadas: '',
            color: '',
            lote: '',
            manzana: '',
            areaLote: '',
            referencia: '',
            precio: '',
            estado: ''
        });

    }
    return (
        <>
            <DefaultDashboardLayout>
                <Row className="align-items-center">
                    <Col xl={12} lg={12} md={12} xs={12}>
                        <div className="bg-white rounded-bottom smooth-shadow-sm ">
                            <div className="d-flex align-items-center justify-content-between pt-3 pb-2 px-4">
                                <div className="d-flex align-items-center">

                                    <div className="lh-1">
                                        <h3 className="mb-2 text-secondary">VILLA SIPAN: PÁGINA PLANO</h3>
                                        <p>En el siguiente formulario podrás visualizar tus cambios del slider como también editar sus datos.</p>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                            <ul className="nav nav-lt-tab px-4" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${seccionActiva === 'home' ? 'active' : ''}`}
                                        href="#"
                                        onClick={() => ocultarMantenimiento('home')}
                                    >
                                        ÁREA DEL PLANO
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        Otros
                                    </Link>
                                </li>

                            </ul>

                        </div>
                    </Col>
                </Row>

                <Row className="mb-8 m-1">

                    <br />
                    <Row className="mb-8 m-1">
                        <Col xl={12} lg={12} md={12} xs={12}>
                            <Card>
                                <Card.Body>
                                    <div className="mb-4 mb-lg-0">
                                        <div className='row text-end'>
                                            <div className='col-md-6 col-lg-6 col-xs-6'>
                                                &nbsp;
                                            </div>
                                            <div className='col-md-4 col-lg-4 col-xs-4 '>
                                                <input type='search' placeholder='Nueva busqueda' className='form-control' onChange={(event) => setSearchTerm(event.target.value)}></input>
                                            </div>
                                            <div className='col'>
                                                <Button onClick={() => handleRegistrarClick()}>REGISTRAR</Button>
                                            </div>
                                        </div>
                                        <br />
                                        <Table hover responsive className="scroll text-nowrap">
                                            <thead >
                                                <tr className='table-secondary'>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Id</th>
                                                    <th scope='col'>Lote</th>
                                                    <th scope='col'>Manzana</th>
                                                    <th scope='col'>Area Lote</th>
                                                    <th scope='col'>Referencia</th>
                                                    <th scope='col'>Precio</th>
                                                    <th scope="col">Coordenadas</th>
                                                    <th scope="col">Color</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope='col'>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredMenus.map((fila, index) => (
                                                    <tr key={fila.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{fila.id}</td>
                                                        <td>{fila.lote}</td>
                                                        <td>{fila.manzana}</td>
                                                        <td>{fila.areaLote}</td>
                                                        <td>{fila.referencia}</td>
                                                        <td>S/. {fila.precio}</td>
                                                        <td>{fila.coordenadas}</td>
                                                        <td>{fila.color}</td>
                                                        <td>{fila.estado}</td>
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
                                    <h4 ><strong>MANTENIMIENTO:</strong> Página Menu</h4>
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

                                                <div className="col-md-6 col-6">
                                                    <input className="form-control" type="text" placeholder="Estado" value={formData.estado} onChange={(e) => handleInputChange('estado', e.target.value)} />
                                                </div>
                                            </Row>
                                            <Row className="mb-3">
                                                <div className="col-sm-4 col-lg-4">
                                                    <input type="text" className="form-control" placeholder="Lote" value={formData.lote} onChange={(e) => handleInputChange('lote', e.target.value)} />
                                                </div>

                                                <div className="col-md-4 col-4">
                                                    <input type="text" className="form-control" placeholder="Manzana" value={formData.manzana} onChange={(e) => handleInputChange('manzana', e.target.value)} />
                                                </div>

                                                <div className="col-md-4 col-4">
                                                    <input type="text" className="form-control" placeholder="Área Lote" value={formData.areaLote} onChange={(e) => handleInputChange('areaLote', e.target.value)} />
                                                </div>
                                            </Row>
                                            <Row className="mb-3">
                                                <div className="col-md-12 col-12">
                                                    <select className="form-select" value={formData.color} onChange={(e) => handleInputChange('color', e.target.value)}>
                                                        <option value="">Seleccionar la categoria del estado</option>
                                                        <option value="rgba(50, 145, 247, 0.486)">Vendido</option>
                                                        <option value="rgba(255, 255, 255, 0)">Disponible</option>
                                                        <option value="rgba(255, 255, 255, 0)">Separado</option>
                                                    </select>
                                                </div>
                                            </Row>

                                            <Row className="mb-3">
                                                <div className="col-md-12 col-12">
                                                    <input className="form-control" type="text" placeholder="Referencia" value={formData.referencia} onChange={(e) => handleInputChange('referencia', e.target.value)} />
                                                </div>
                                            </Row>
                                            <Row className="mb-3">
                                                <div className="col-md-6 col-6">
                                                    <input className="form-control" type="text" placeholder="Precio" value={formData.precio} onChange={(e) => handleInputChange('precio', e.target.value)} />
                                                </div>

                                                <div className="col-md-6 col-6">
                                                    <input className="form-control" type="text" placeholder="Coordenadas" value={formData.coordenadas} onChange={(e) => handleInputChange('coordenadas', e.target.value)} />
                                                </div>
                                            </Row>
                                            <Row className="mb-3 text-end">
                                                <Col md={12} xs={12}>
                                                    <Button className="btn btn-primary" type="submit" onClick={() => handleSaveClick()}>GUARDAR</Button>
                                                    &nbsp;
                                                    <Button className="btn btn-primary" type="reset" onClick={() => handleClearClick()}>LIMPIAR</Button>
                                                </Col>
                                            </Row>

                                        </Form>
                                    </div>

                                </Col>
                            </Modal.Body>

                        </Modal>
                    </Fragment>

                </Row>
            </DefaultDashboardLayout>
        </>
    )
}

export default plano