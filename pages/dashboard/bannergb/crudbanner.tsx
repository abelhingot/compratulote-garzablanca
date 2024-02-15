import Link from 'next/link';
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const GBbanner = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        subtitulo: '',
        categoria: '',
        imagen: '',
        href: ''
    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    const filteredMenus = datos.filter((fila) =>
        (fila.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || fila.subtitulo.toLowerCase().includes(searchTerm.toLowerCase()) || fila.categoria.toLowerCase().includes(searchTerm.toLowerCase())));

    useEffect(() => {
        fetch('/db.json')
            .then(response => response.json())
            .then(json => {
                const data: [] = json.pgslidergb;
                setDatos(data);}
                )
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);
        let datat=datos.filter((fila)=>{
            console.log(fila)
            return fila.id==id;
        })
        setFormData({
            id: datat[0].id,
            titulo: datat[0].titulo,
            subtitulo: datat[0].subtitulo,
            categoria: datat[0].categoria,
            imagen: datat[0].imagen,
            href: datat[0].href
        });
        /*console.log(id);
        console.log(datat);

        fetch(`http://localhost:3001/pgslidergb/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    titulo: data.titulo,
                    subtitulo: data.subtitulo,
                    categoria: data.categoria,
                    imagen: data.imagen,
                    href: data.href
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });*/
    };

    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3001/pgslidergb/${editItemId}`, {
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
            fetch('http://localhost:3001/pgslidergb', {
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
                fetch(`http://localhost:3001/pgslidergb/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch('http://localhost:3001/pgslidergb')
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
            titulo: '',
            subtitulo: '',
            categoria: '',
            imagen: '',
            href: ''
        });
    }
    return (
        <>
            <Row className="mb-8 m-1">
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <div className="mb-4 mb-lg-0">
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
                                            <th scope="col">N°</th>
                                            <th scope="col">Id</th>
                                            <th scope="col">Titulo</th>
                                            <th scope="col">Subtitulo</th>
                                            <th scope="col">Categoria</th>
                                            <th scope="col">Imagen</th>
                                            <th scope="col">Ruta</th>
                                            <th scope='col'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMenus.map((fila, index) => (
                                            <tr key={fila.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{fila.id}</td>
                                                <td>{fila.titulo}</td>
                                                <td>{fila.subtitulo}</td>
                                                <td>{fila.categoria}</td>
                                                <td>{fila.imagen}</td>
                                                <td>{fila.href}</td>
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
                            <h4 ><strong>MANTENIMIENTO:</strong> Página Slider</h4>
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
                                            <select className="form-select"
                                                id="floatingSelect" aria-label="Floating label select example"
                                                value={formData.categoria} onChange={(e) => handleInputChange('categoria', e.target.value)}>
                                                <option value="" disabled>Selecciona un categoria</option>

                                                {datos.filter((value, index, self) => index === self.findIndex((v) => v.categoria === value.categoria))
                                                    .map((fila, index) => (
                                                        <option key={index} value={fila.categoria}>{fila.categoria}</option>
                                                    ))}
                                            </select>

                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <div className="col-md-12 col-12">
                                            <input type="text" className="form-control" placeholder="Titulo" value={formData.titulo} onChange={(e) => handleInputChange('titulo', e.target.value)} />
                                        </div>
                                    </Row>
                                    <Row className="mb-3">
                                        <div className="col-md-12 col-12">
                                            <input className="form-control" type="text" placeholder="Subtitulo" value={formData.subtitulo} onChange={(e) => handleInputChange('subtitulo', e.target.value)} />
                                        </div>
                                    </Row>
                                    <Row className="mb-3">
                                        <div className="col-md-12 col-12">
                                            <input className="form-control" type="text" placeholder="Imagen" value={formData.imagen} onChange={(e) => handleInputChange('imagen', e.target.value)} />
                                        </div>
                                    </Row>
                                    <Row className="mb-3">
                                        <div className="col-md-12 col-12">
                                            <input className="form-control" type="text" placeholder="Link" value={formData.href} onChange={(e) => handleInputChange('href', e.target.value)} />
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

        </>
    )
}

export default GBbanner