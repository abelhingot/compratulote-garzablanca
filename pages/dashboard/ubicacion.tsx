import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { Col, Row, Form, Card, Button, Image, Table, Modal, Accordion } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Crudubicacion from './ubicacion/crudubicacion';
import Infoubicacion from './ubicacion/infoubicacion';


const Ubicacion = () => {
    const [seccionActiva, setSeccionActiva] = useState('home');

    const ocultarMantenimiento = (seccion) => {
        setSeccionActiva(seccion);
    };

    const [formData, setFormData] = useState({
        id: '',
        texto: '',
        categoria: '',
        imagen: '',
        href: '',
    });

    return (
        <>
            <DefaultDashboardLayout>
                <Row className="align-items-center">
                    <Col xl={12} lg={12} md={12} xs={12}>
                        <div className="bg-white rounded-bottom smooth-shadow-sm ">
                            <div className="d-flex align-items-center justify-content-between pt-4 pb-2 px-4">
                                <div className="d-flex align-items-center">

                                    <div className="lh-1">
                                        <h3 className="mb-2 text-secondary">PAGINA UBICACION</h3>
                                        <p>En el siguiente formulario podrás visualizar la página ubicacion como también editar sus datos.</p>
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
                                        DESCRIPCION
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${seccionActiva === 'paginas' ? 'active' : ''}`}
                                        href="#"
                                        onClick={() => ocultarMantenimiento('paginas')}
                                    >
                                        ARCHIVOS
                                    </Link>
                                </li>

                                {/* <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        Otros
                                    </Link>
                                </li> */}

                            </ul>

                        </div>
                    </Col>
                </Row>

                <Row className="mb-8 m-1">
                    {seccionActiva === 'home' && <Infoubicacion />}
                    {seccionActiva === 'paginas' && <Crudubicacion />}
                </Row>
            </DefaultDashboardLayout>
        </>
    )
}

export default Ubicacion