import Link from 'next/link';
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const VScrudubicacion = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [ubicacion, setUbicacion] = useState('');
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        id: '',
        categoria: '',
        titulo: '',
        texto: '',
        estado: '',
        imagen: ''
    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    const filteredMenus = datos.filter((fila) =>
        (fila.titulo.toLowerCase().includes(searchTerm.toLowerCase())));

    useEffect(() => {
        const url = 'ubicacion';
        fetch('http://localhost:3001/pgserviciosvs')
            .then(response => response.json())
            .then(data => {
                const filtrado = data.filter(fila => fila.categoria === url);
                setDatos(filtrado);
                setUbicacion(url);
            })
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);



    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch(`http://localhost:3001/pgserviciosvs/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    categoria: data.categoria,
                    titulo: data.titulo,
                    texto: data.texto,
                    estado: data.estado,
                    imagen: data.imagen
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };
    const handleEnviarIdClick = (id) => {
        setEditItemId(id);
        fetch(`http://localhost:3001/pgserviciosvs/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setFormData({
                id: data.id,
                categoria: data.categoria,
                titulo: data.titulo,
                texto: data.texto,
                estado: data.estado,
                imagen: data.imagen
            });
        })
        .catch((error) => {
            console.error('Error al obtener datos para editar:', error);
        });
    }
    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3001/pgserviciosvs/${editItemId}`, {
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
            fetch('http://localhost:3001/pgserviciosvs', {
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
                fetch(`http://localhost:3001/pgserviciosvs/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch('http://localhost:3001/pgserviciosvs')
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

    return (
        <>
            <Row className="mb-5 m-1 py-2">
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <div className="row mb-4">
                                <div className="col-md-7 col-lg-8">
                                    <div className="container px-4 text-center">
                                        <div className="row gx-5">
                                            <div className="accordion" id="accordionExample">
                                                <div id="collapseOne" className="accordion-collapse collapse show"
                                                    data-bs-parent="#accordionExample">

                                                    <div className="row">
                                                        <div className="col-md-6 pe-0">
                                                            <h1 className="fw-bold cProyect2">{formData.titulo}</h1>
                                                        </div>
                                                        <div className="col-md-6 ps-1">
                                                            <p>{formData.texto}</p>
                                                        </div>
                                                        <div className="col-md-12 object-fit-cover border borderProyect2 border-3 p-1">
                                                            <video autoPlay src="./../../recursosestructura/imagenes/video1.mp4" className="w-100" ></video>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 col-lg-4 p-4"><br />
                                    <div className="no-left-top-shadow rounded-3 ">
                                        <div className="accordion " id="accordionExample">
                                            <div className="accordion-item border border-top-1 border-bottom-0 p-1"><br />
                                                {datos.map((fila, index) => (
                                                    <h4 className="accordion-header">
                                                        <button
                                                            className="accordion-button-no-icon collapsed rounded-5 bg-body border-0 focus-ring focus-ring-light px-4"
                                                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                            aria-expanded="true" aria-controls="collapseOne" onClick={() => handleEnviarIdClick(fila.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                                fill="currentColor" className="bi bi-folder-fill crema"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                                                            </svg>
                                                            <span className="px-3 text" >{fila.estado}</span>
                                                        </button>
                                                    </h4>))}
                                                <br />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-8 m-1">
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <div className="mb-4 mb-lg-0">

                                <br />
                                <div className='row text-end'>
                                    <div className='col-md-6 col-lg-6 col-xs-6'>
                                        &nbsp;
                                    </div>
                                    <div className='col-md-4 col-lg-4 col-xs-4 '>
                                        <input type='search' placeholder='Nueva busqueda' className='form-control' onChange={(event) => setSearchTerm(event.target.value)}></input>
                                    </div>
                                    <div className='col'>
                                        <Button onClick={() => setLgShow(true)}>REGISTRAR</Button>{' '}
                                    </div>
                                </div>
                                <br />
                                <Table hover responsive className="scroll text-nowrap">
                                    <thead >
                                        <tr className='table-secondary'>
                                            <th scope="col">Id</th>
                                            <th scope="col">Categoria</th>
                                            <th scope="col">Titulo</th>
                                            <th scope="col">Descripcion</th>
                                            <th scope='col'>Titulo</th>
                                            <th scope='col'>Imagen</th>
                                            <th scope='col'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMenus.map((fila, index) => (
                                            <tr key={fila.id}>
                                                <td>{fila.id}</td>
                                                <td>{fila.categoria}</td>
                                                <td>{fila.titulo}</td>
                                                <td>{fila.texto}</td>
                                                <td>{fila.estado}</td>
                                                <td>{fila.imagen}</td>
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
                            <h4 ><strong>MANTENIMIENTO:</strong>UBICACION</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col xl={12} lg={12} md={12} xs={12} className='p-2'>
                            <div>
                                {/* border */}
                                <Form>
                                    <Row className="mb-3">
                                        <div className="col-sm-6 col-lg-6">
                                            <input type="text" className="form-control" placeholder="Id" value={formData.id} onChange={(e) => handleInputChange('id', e.target.value)} />
                                        </div>

                                        <div className="col-md-6 col-6">
                                            <input type="text" className="form-control" placeholder="Categoria" value={formData.categoria} onChange={(e) => handleInputChange('categoria', e.target.value)} />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">

                                        <div className="col-md-12 col-12">
                                            <input type="text" className="form-control" placeholder="estado" value={formData.estado} onChange={(e) => handleInputChange('estado', e.target.value)} />
                                        </div>
                                    </Row>
                                    <Row className="mb-3">
                                        <div className="col-md-4 col-4">
                                            <input className="form-control" type="text" placeholder="titulo" value={formData.titulo} onChange={(e) => handleInputChange('titulo', e.target.value)} />
                                        </div>

                                        <div className="col-md-4 col-4">
                                            <input className="form-control" type="text" placeholder="imagen" value={formData.imagen} onChange={(e) => handleInputChange('imagen', e.target.value)} />
                                        </div>

                                        <div className="col-md-4 col-4">
                                            <input className="form-control" type="text" placeholder="texto" value={formData.texto} onChange={(e) => handleInputChange('texto', e.target.value)} />
                                        </div>
                                    </Row>
                                    <Row className="mb-3 text-end">

                                        <Col md={12} xs={12}>
                                            <Button className="btn btn-primary" type="submit" onClick={() => handleSaveClick()}>GUARDAR</Button>
                                            &nbsp;
                                            <Button className="btn btn-primary" type="reset" >LIMPIAR</Button>
                                        </Col>
                                    </Row>

                                </Form>
                            </div>

                        </Col>
                    </Modal.Body>

                </Modal>
            </Fragment>
        </>
    )
}

export default VScrudubicacion