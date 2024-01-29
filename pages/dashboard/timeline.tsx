import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import Textoeditable from './timeline/textoeditable';
import Crudtexto from './timeline/crudtexto';
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Detalleinfo = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [seccionActiva, setSeccionActiva] = useState('home');

    const ocultarMantenimiento = (seccion) => {
        setSeccionActiva(seccion);
    };

    useEffect(() => {
        fetch('http://localhost:3001/slider2')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);


    return (
        <>
            <DefaultDashboardLayout>
                <Row className="align-items-center">
                    <Col xl={12} lg={12} md={12} xs={12}>

                        <div className="bg-white rounded-bottom smooth-shadow-sm ">
                            <div className="d-flex align-items-center justify-content-between pt-4 pb-2 px-4">
                                <div className="d-flex align-items-center">

                                    <div className="lh-1">
                                        <h3 className="mb-2 text-secondary">PÁGINA TIMELINE</h3>
                                        <p>En el siguiente formulario podrás visualizar tus cambios del slider como también editar sus datos.</p>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                            {/* nav */}

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
                                        ACCORDION
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
                <br />
                <Row className="mb-8 m-1">
                    {seccionActiva === 'home' && <Crudtexto />}
                    {seccionActiva === 'paginas' && <Textoeditable />}
                </Row>


            </DefaultDashboardLayout>
        </>
    )
}

export default Detalleinfo