import React, { Fragment, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row, Table, Image } from 'react-bootstrap';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const GBinfo = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow,setLgShow] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    const [formData, setFormData] = useState({
        id: '',
        texto: '',
        categoria: '',
        imagen: '',
        href: '',
    });
    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
        setCategoriaSeleccionada(value);
    };
    useEffect(() => {
        fetch('../../api/db.json')
            .then(response => response.json())
            .then(json => {
                const data: any[]=json.pgbannervs;
                setDatos(data);
            })
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    const filteredData = datos ? datos.filter((item) => item.categoria === categoriaSeleccionada):[];
    const handleModalClick=()=>{
        setLgShow(true);
    }
    return (
        <>
            <Row className='mb-4'>
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title as="h4">SELECCIONA UNA CATEGORIA</Card.Title>
                            <div className='col-md-6 col-6 mb-4'>
                                <select className="form-select" id="floatingSelect" aria-label="Floating label select example"
                                    value={formData.categoria} onChange={(e) => handleInputChange('categoria', e.target.value)}>
                                    <option value="" disabled>Seleccionar una página</option>
                                    {datos && datos.filter((value, index, self) => index === self.findIndex((v) => v.categoria === value.categoria))
                                        .map((fila, index) => (
                                            <option key={index} value={fila.categoria}>{fila.categoria}</option>
                                        ))}
                                </select>
                            </div>

                            <div className={`carousel-container ${filteredData.length > 0 ? 'active' : 'inactive'}`}>
                                {filteredData.map((item, index) => (
                                    <div className="container-fluid contenedor-imagen p-0" key={index}>
                                        <div className="position-relative">
                                            <Image src={item.imagen} className="fondo" alt={item.categoria} />
                                            <div className="position-absolute w-100 texto-superpuesto">
                                                <div className="transicion-container bg-custom-colordk">
                                                    <h2 className={'text-white transicion-container titulo-Intro'}>{item.titulo}</h2>
                                                    <p className={'text-white text-transicion'}>{item.subtitulo}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                                            className="bi bi-play-circle-fill icono-reproducir" data-bs-toggle="modal" data-bs-target="#exampleModal" viewBox="0 0 16 16" onClick={() => handleModalClick()}>
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                        </svg>
                                    </div>))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );

};

export default GBinfo