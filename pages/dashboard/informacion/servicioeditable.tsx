import Link from 'next/link';
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal, Accordion } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import toolbar from '../timeline/toolbar'
import 'quill/dist/quill.snow.css'
import { AspectRatio } from 'react-bootstrap-icons';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Servicioeditable = () => {
    const [datos, setDatos] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [title, setTitle] = useState('');
    const [banners, setBanners] = useState('');
    const [content, setContent] = useState('');
    const [insertText, setInsertText] = useState('');
    const [recurso1, setRecurso1] = useState();
    const [recurso2, setRecurso2] = useState();
    const [categoria, setCategoria] = useState();
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar,
        },
    });
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const sliderRef = React.useRef(null);
    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };
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
            case 'categoria':
                setRecurso2(value);
                break;
            default:
                setTitle(value);
                break;
        }
    };


    const handleLinkClick = (id, content, recurso1, recurso2, categoria, title) => {
        setRecurso1(recurso1);
        setRecurso2(recurso2);
        setInsertText(content);
        setCategoria(categoria);
        setTitle(title);
        setSelectedId(id);
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(content);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/pginformacionvs/${selectedId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedId,
                    content: quill.root.innerHTML,
                    recurso1: recurso1,
                    recurso2: recurso2,
                    categoria: categoria,
                    title: title
                }),
            });

            if (response.ok) {
                const verificador = window.location.pathname.split('/');
                const rptAPI = verificador[verificador.length - 1];
                fetch('http://localhost:3001/pginformacionvs')
                    .then(response => response.json())
                    .then(data => {
                        const filtrado = data.filter(fila => fila.categoria === rptAPI);
                        setDatos(filtrado);
                        setBanners(rptAPI);
                    })
                    .catch(error => console.error('Tenemos un error', error));
            } else {
                console.error('Error al actualizar la información.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    useEffect(() => {
        const verificador = window.location.pathname.split('/');
        const rptAPI = verificador[verificador.length - 1];
        fetch('http://localhost:3001/pginformacionvs')
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
        fetch(`http://localhost:3001/pginformacionvs/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    fetch('http://localhost:3001/pginformacionvs')
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
            <Row className="m-1">
                <Col xl={12} lg={12} md={12} xs={12}>
                    {datos.map((item, index) => (
                        <Card className='mb-3' key={index}>
                            <Card.Body>
                                <div className='row'>
                                    <Row className="mb-1 align-items-center justify-content-end">
                                        <div className="col-auto">
                                            <button type="button" className='bg-white fa-lg text-primary border-0 rounded-3' onClick={() => handleLinkClick(item.id, item.content, item.recurso1, item.recurso2, item.categoria, item.title)} ><i className='fe fe-edit fa-md'></i></button>
                                        </div>|
                                        <div className="col-auto">
                                            <button type="button" className='bg-white fa-lg text-danger border-0 rounded-3' onClick={() => confirmDelete(item.id)}>
                                                <i className="fe fe-trash fa-md"></i>
                                            </button>
                                        </div>
                                    </Row>
                                    <hr />
                                    <div className='row'>
                                        <div className='col-md-12 col-12'>
                                            {item.content && (
                                                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                            )}
                                        </div>
                                        <div className='col-md-12 col-12'>
                                            <div className='row'>
                                                {datos.map((item, index) => (<Row className='m-0 p-5' key={index}>
                                                    <div className="col-md-7 col-lg-7 mb-1">
                                                        <div className='carousel slide p-2 h-100 w-100 borderProyect'>
                                                            <Slider ref={sliderRef} {...settings}>
                                                                {item.recurso1 && item.recurso1.split(',').map((path, i) => (
                                                                    <div key={i}>
                                                                        <img src={path.trim()} alt={item.texto} className="w-100 h-100" />
                                                                    </div>
                                                                ))}
                                                            </Slider>
                                                            <div>
                                                                <button className="carousel-control-prev" onClick={prevSlide}>
                                                                    <span className="carousel-control-prev-icon bgProyect" aria-hidden="true"></span>
                                                                    <span className="visually-hidden">Previous</span>
                                                                </button>
                                                                <button className="carousel-control-next" onClick={nextSlide}>
                                                                    <span className="carousel-control-next-icon bgProyect" aria-hidden="true"></span>
                                                                    <span className="visually-hidden">Next</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 col-lg-5 mb-1">
                                                        <div className="p-2 position-relative h-100 borderProyect" style={{ height: '100%', width: '100%'}}>
                                                            <iframe src={item.recurso2} className="w-100 h-100" style={{ border: 'none', borderRadius: 'inherit' }} allowFullScreen></iframe>
                                                        </div>
                                                    </div>
                                                </Row>))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>))}
                </Col>
            </Row>
            <Row className="m-1 mt-1">
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <div className='row'>
                                <div className="container">
                                    <form onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <div className="col-md-4 col-4">
                                                <label htmlFor='title'>Identificador Único:</label>
                                                <input type='text' className='form-control' id='id' value={selectedId} onChange={handleChange}></input>
                                            </div>

                                            <div className="col-md-4 col-4">
                                                <label htmlFor='title'>Titulo:</label>
                                                <input type='text' className='form-control' id='title' value={title} onChange={handleChange}></input>
                                            </div>

                                            <div className="col-md-4 col-4">
                                                <label htmlFor='title'>Categoria:</label>
                                                <input type='text' className='form-control' id='categoria' disabled value={categoria} onChange={handleChange}></input>
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

export default Servicioeditable