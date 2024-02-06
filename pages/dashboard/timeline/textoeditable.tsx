import Link from 'next/link';
import { Col, Row, Form, Card, Button, Image, Table, Modal, Accordion } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import toolbar from '../../../config/toolbar'
import 'quill/dist/quill.snow.css'

const Textoeditable = () => {
    const [datos, setDatos] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [insertText, setInsertText] = useState('');
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar,
        },
    });

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleLinkClick = (id, content, insertText) => {
        setTitle(insertText);
        setInsertText(content);
        setSelectedId(id);
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(content);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let apiUrl = 'http://localhost:3001/pgtimeline';
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
                fetch('http://localhost:3001/pgtimeline')
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
        fetch('http://localhost:3001/pgtimeline')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Tenemos un error', error));
    }, []);

    const procesarContenidoQuill = (contenidoQuill) => {
        return contenidoQuill;
    };
    const handleDeleteClick = (id) => {
        fetch(`http://localhost:3001/pgtimeline/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    fetch('http://localhost:3001/pgtimeline')
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

    const handleCleanClick =()=>{
        setTitle("");
        setInsertText("");
        setSelectedId("");
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(content);
        }
    }
    return (
        <>
            <Row className="mb-8 m-1">
                <Col xl={12} lg={12} md={12} xs={12}>
                    {datos.map((fila, index) => (
                        <Card className='mb-3' key={index}>
                            <Card.Body>
                                <div className='row'>
                                    <Row className="mb-1 align-items-center justify-content-end">
                                        <div className="col-auto">
                                            <button type="button" className='bg-white fa-lg text-primary border-0 rounded-3' onClick={() => handleLinkClick(fila.id, fila.content, fila.title)} ><i className='fe fe-edit fa-md'></i></button>
                                        </div>|
                                        <div className="col-auto">
                                            <button type="button" className='bg-white fa-lg text-danger border-0 rounded-3' onClick={() => confirmDelete(fila.id)}>
                                                <i className="fe fe-trash fa-md"></i>
                                            </button>
                                        </div>
                                    </Row>
                                    <hr />
                                    <Accordion>
                                        <Accordion.Item eventKey="0" style={{ border: 'none', marginBottom: '10px' }} >
                                            <Accordion.Header style={{ border: '1px solid lightgray', borderRadius: '7px', paddingTop: '3px', paddingBottom: '3px', width: '50%' }}>
                                                <strong> {fila.title}</strong>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className='row'>
                                                    {fila.content && (
                                                         <div dangerouslySetInnerHTML={{ __html: fila.content }} className='image-row'/>
                                                    )}
                                                </div>

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </Card.Body>
                        </Card>))}
                </Col>
            </Row>

            <Row className='mb-8 m-1'>
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <div className='row'>
                                <div className="container">
                                    <form >
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
                                            <div className="col-md-12 col-12 text-end">
                                                <Button className='btn btn-primary m-1' type='submit' onClick={()=>handleSubmit}>Guardar</Button>
                                                <Button className='btn btn-primary m-1' type='reset' onClick={()=>handleCleanClick()}>Limpiar</Button>
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

export default Textoeditable