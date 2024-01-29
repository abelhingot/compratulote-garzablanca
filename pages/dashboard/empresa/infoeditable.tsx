import Link from 'next/link';
import { Col, Row, Form, Card, Button, Image, Table, Modal, Accordion } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import toolbar from '../../../config/toolbar'
import 'quill/dist/quill.snow.css'

const Infoeditable = () => {
    const [datos, setDatos] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [banners, setBanners] = useState('');
    const [insertText, setInsertText] = useState('');
    const [recurso1, setRecurso1] = useState();
    const [recurso2, setRecurso2] = useState();
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar,
        },
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'id':
                setSelectedId(value);
                break;
            case 'recurso1':
                setRecurso1(value);
                break;
            case 'recurso2':
                setRecurso2(value);
                break;
            default:
                setTitle(value);
                break;
        }
    };

    const handleLinkClick = (id, content, recurso1, recurso2, title) => {
        setRecurso1(recurso1);
        setRecurso2(recurso2);
        setInsertText(content);
        setTitle(title);
        setSelectedId(id);
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(content);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let apiUrl = 'http://localhost:3001/pginformacion';
            let method = 'POST';
            if (selectedId) {
                apiUrl += `/${selectedId}`;
                method = 'PUT';
            }

            const response = await fetch(apiUrl, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    content: quill.root.innerHTML,
                }),
            });

            if (response.ok) {
                console.log(`Información ${selectedId ? 'actualizada' : 'guardada'} con éxito.`);
                fetch('http://localhost:3001/pginformacion')
                    .then(response => response.json())
                    .then(data => setDatos(data))
                    .catch(error => console.error('Error al obtener datos:', error));
            } else {
                console.error(`Error al ${selectedId ? 'actualizar' : 'guardar'} la información.`);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    useEffect(() => {
        const verificador = window.location.pathname.split('/');
        const rptAPI = verificador[verificador.length - 1];

        fetch('http://localhost:3001/pginformacion')
            .then(response => response.json())
            .then(data => {
                const filtrado = data.filter(fila => fila.categoria === rptAPI);
                setDatos(filtrado);
                setBanners(rptAPI);
            })
            .catch(error => console.error('Tenemos un error', error));
    }, []);

    const procesarContenidoQuill = (contenidoQuill) => {
        return contenidoQuill;
    };
    const handleDeleteClick = (id) => {
        fetch(`http://localhost:3001/pginformacion/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    fetch('http://localhost:3001/pginformacion')
                        .then(response => response.json())
                        .then(data => setDatos(data))
                        .catch(error => console.error('Error al obtener datos:', error));
                } else {
                    console.error('Error al eliminar el registro.');
                }
            })
            .catch(error => {
                console.error('Error de red:', error);
            });
    };

    const confirmDelete = (id) => {
        const shouldDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");

        if (shouldDelete) {
            handleDeleteClick(id);
        }
    };

    return (
        <>
            <Row className="m-1 mt-5">
                <Col xl={12} lg={12} md={12} xs={12}>
                    {datos.map((fila, index) => (
                        <Card className='mb-3' key={index}>
                            <Card.Body>
                                <div className='row'>
                                    <Row className="mb-1 align-items-center justify-content-end">
                                        <div className="col-auto">
                                            <button type="button" className='bg-white fa-lg text-primary border-0 rounded-3' onClick={() => handleLinkClick(fila.id, fila.content, fila.recurso1, fila.recurso2, fila.title)} ><i className='fe fe-edit fa-md'></i></button>
                                        </div>|
                                        <div className="col-auto">
                                            <button type="button" className='bg-white fa-lg text-danger border-0 rounded-3' onClick={() => confirmDelete(fila.id)}>
                                                <i className="fe fe-trash fa-md"></i>
                                            </button>
                                        </div>
                                    </Row>
                                    <hr />
                                    <div className='row'>
                                        <div className='col-md-12 col-12'>
                                             {fila.content && (
                                                <div dangerouslySetInnerHTML={{ __html: fila.content }} />
                                            )}
                                        </div>
                                        <div className='col-md-12 col-12'>
                                            <div className='row'>
                                                <div className="container">
                                                    <form >
                                                        <Row className="mb-1">
                                                            <div className="col-md-6 col-6">
                                                                <Image src={fila.recurso1} className='img-thumbnail rounded-4' alt='Text' />
                                                            </div>

                                                            <div className="col-md-6 col-6">
                                                                <Image src={fila.recurso2} className='img-thumbnail rounded-4' alt='Text2' />
                                                            </div>
                                                        </Row>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>))}
                </Col>
            </Row>

            <Row className='mb-8 m-1 mt-3'>
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <div className='row'>
                                <div className="container">
                                    <form onSubmit={handleSubmit}>
                                        <Row className="mb-1">
                                            <div className="col-md-12 col-12">
                                                <label htmlFor='title'>Identificador Único:</label>
                                                <input type='text' className='p-2 border-0 rounded-2' id='id' value={selectedId} onChange={handleChange}></input>
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input type='text' placeholder='Escriba un título' className='p-2 bg-secondary text-light accordion-button rounded-2' id='value' value={title} onChange={handleChange}></input>
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
                                            <div className="col-md-6 col-6 ">
                                                <label htmlFor='recurso1'>Imagen o Video:</label>
                                                <input
                                                    type='text'
                                                    placeholder='para la 1 columna'
                                                    className='form-control'
                                                    id='recurso1' value={recurso1}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                          
                                            <div className="col-md-6 col-6">
                                                <label htmlFor='recurso2'>Imagen o Video:</label><br />
                                                <input
                                                    type='text'
                                                    placeholder='para la 2 columna'
                                                    className='form-control'
                                                    id='recurso2' value={recurso2}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                        </Row>
                                      
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12 text-end">
                                                <button className='btn btn-primary'>Guardar</button>
                                            </div>
                                        </Row>
                                    </form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )

}

export default Infoeditable