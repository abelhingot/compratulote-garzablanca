import Link from 'next/link';
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal, Accordion } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import toolbar from './toolbar'
import 'quill/dist/quill.snow.css'

const Crudtexto = () => {
    const [datos, setDatos] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [banners, setBanners] = useState('');
    const [insertText, setInsertText] = useState('');
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar,
        },
    });

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleLinkClick = (id, content) => {
        setInsertText(content);
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
            <Row className="mb-8 m-1">
                <Col xl={6} lg={6} md={6} xs={12}>
                    {datos.map((fila, index) => (
                        <Card className='mb-3'>
                            <Card.Body>
                                <div className='row'>
                                    <Row className="mb-1 align-items-center justify-content-end">
                                        <div className="col-auto">
                                            <button type="button" className='bg-white fa-lg text-primary border-0 rounded-3' onClick={() => handleLinkClick(fila.id, fila.content)} ><i className='fe fe-edit fa-md'></i></button>
                                        </div>|
                                        <div className="col-auto">
                                            <button type="button" className='bg-white fa-lg text-danger border-0 rounded-3' onClick={() => confirmDelete(fila.id)}>
                                                <i className="fe fe-trash fa-md"></i>
                                            </button>
                                        </div>
                                    </Row>
                                    <hr />
                                    <p> {fila.content && (
                                        <div dangerouslySetInnerHTML={{ __html: fila.content }} />
                                    )}</p>
                                </div>
                            </Card.Body>
                        </Card>))}
                </Col>

                <Col xl={6} lg={6} md={6} xs={12}>
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
                                                <div className='editor'>
                                                    <div ref={quillRef}></div>
                                                </div>
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

export default Crudtexto