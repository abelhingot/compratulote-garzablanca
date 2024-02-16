import Link from 'next/link';
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Infoubicacion = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        id: '',
        boton1: '',
        ruta1: '',
        boton2: '',
        ruta2: '',
        iframe: '',
        titulo: ''
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
        fetch('/db.json')
            .then(response => response.json())
            .then(json => {
                const data: any[] = json.pgubicaciongb;
                setDatos(data);
            })
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
            boton1: datat[0].boton1,
            ruta1: datat[0].ruta1,
            boton2: datat[0].boton2,
            ruta2: datat[0].ruta2,
            iframe: datat[0].iframe,
            titulo: datat[0].titulo
        });
    };

    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3002/pgubicaciongb/${editItemId}`, {
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
            fetch('http://localhost:3002/pgubicaciongb', {
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
                fetch(`http://localhost:3002/pgubicaciongb/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch('http://localhost:3002/pgubicaciongb')
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

    const handleCleanClick = () => {
        setFormData({
            id: "",
            boton1: "",
            ruta1: "",
            boton2: "",
            ruta2: "",
            iframe: "",
            titulo: ""
        });
    }

    return (
        <>
            <Row className="mb-5 m-1 py-2">
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Card>

                        <Card.Body>
                            {datos.map((fila, index) => (
                                <div className='row' key={index}>
                                    <div className="col-md-7 col-lg-8">
                                        <h2 className="fw-bold cProyect">{fila.titulo}</h2>
                                        <div className="container mt-4">
                                            <div className="row">
                                                <div className="d-grid gap-2 d-md-block pb-3">
                                                    <a href={fila.ruta1} target='_blank'> <button className="btn bgProyect text-light fw-bold" type="button">{fila.boton1}</button></a>&nbsp;
                                                    <a href={fila.ruta2} target='_blank'><button className="btn btn-secondary fw-bold" type="button">{fila.boton2}</button></a>
                                                </div>
                                                <iframe src={fila.iframe} width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-lg-4 border border-1 py-2">
                                        <Card.Title className='text-end'>
                                            <button type="button" className='bg-white fa-lg text-primary border-0 rounded-3' onClick={() => handleEditClick(fila.id)} >  <i className="fe fe-edit fa-md"></i>   </button>{' '}|
                                            <button type="button" className='bg-white fa-lg text-danger border-0 rounded-3' onClick={() => handleDeleteClick(fila.id)}><i className="fe fe-trash fa-md"></i></button>{' '}
                                            <hr />
                                        </Card.Title>

                                        <div className='col-md-12 col-12 border border-1 p-2 rounded rounded-2 mb-1' style={{ backgroundColor: '#F8F9FA' }}>
                                            {fila.id}
                                        </div>
                                        <div className='col-md-12 col-12 border border-1 p-2 rounded rounded-2 mb-1' style={{ backgroundColor: '#F8F9FA' }}>
                                            {fila.titulo}
                                        </div>
                                        <div className='col-md-12 col-12 border border-1 p-2 rounded rounded-2 mb-1' style={{ backgroundColor: '#F8F9FA' }}>
                                            {fila.boton1}
                                        </div>
                                        <div className='col-md-12 col-12 border border-1 p-2 rounded rounded-2 mb-1' style={{ backgroundColor: '#F8F9FA' }}>
                                            {fila.ruta1}
                                        </div>
                                        <div className='col-md-12 col-12 border border-1 p-2 rounded rounded-2 mb-1' style={{ backgroundColor: '#F8F9FA' }}>
                                            {fila.boton2}
                                        </div>
                                        <div className='col-md-12 col-12 border border-1 p-2 rounded rounded-2 mb-1' style={{ backgroundColor: '#F8F9FA' }}>
                                            {fila.ruta2}
                                        </div>
                                        <div className='col-md-12 col-12 border border-1 p-2 rounded rounded-2 mb-1' style={{ backgroundColor: '#F8F9FA' }}>
                                            {fila.iframe}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                            <input className="form-control" type="text" placeholder="Titulo" value={formData.titulo} onChange={(e) => handleInputChange('titulo', e.target.value)} />
                                        </div>
                                    </Row>
                                    <Row className="mb-3">
                                        <div className="col-md-12 col-12">
                                            <input type="text" className="form-control" placeholder="Boton 1" value={formData.boton1} onChange={(e) => handleInputChange('boton1', e.target.value)} />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <div className="col-md-12 col-12">
                                            <input type="text" className="form-control" placeholder="Enlace 1" value={formData.ruta1} onChange={(e) => handleInputChange('ruta1', e.target.value)} />
                                        </div>
                                    </Row>
                                    <Row className="mb-3">
                                        <div className="col-md-12 col-12">
                                            <input className="form-control" type="text" placeholder="Boton 2" value={formData.boton2} onChange={(e) => handleInputChange('boton2', e.target.value)} />
                                        </div>
                                    </Row>
                                    <Row className="mb-3">
                                        <div className="col-md-12 col-12">
                                            <input className="form-control" type="text" placeholder="Boton 2" value={formData.ruta2} onChange={(e) => handleInputChange('ruta2', e.target.value)} />
                                        </div>
                                    </Row>
                                    <Row className="mb-3">
                                        <div className="col-md-12 col-12">
                                            <input className="form-control" type="text" placeholder="Mapa" value={formData.iframe} onChange={(e) => handleInputChange('iframe', e.target.value)} />
                                        </div>
                                    </Row>
                                    <Row className="mb-3 text-end">

                                        <Col md={12} xs={12}>
                                            <Button className="btn btn-primary" type="submit" onClick={() => handleSaveClick()}>GUARDAR</Button>
                                            &nbsp;
                                            <Button className="btn btn-primary" type="reset" 
                                            onClick={()=>handleCleanClick()}>LIMPIAR</Button>
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

export default Infoubicacion