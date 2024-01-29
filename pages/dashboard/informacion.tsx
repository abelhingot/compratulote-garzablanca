import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
<<<<<<< HEAD
=======
import { FormSelect, DropFiles } from "widgets";
>>>>>>> 314253c1b9d2658f547dd600c8f9e63171b22956
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Key } from 'react-feather';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Servicioeditable from './informacion/servicioeditable';
import CrudServicio from './informacion/crudservicio';
const Servicios1 = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [seccionActiva, setSeccionActiva] = useState('home');

    const ocultarMantenimiento = (seccion) => {
        setSeccionActiva(seccion);
    };

    return (
        <>
            <DefaultDashboardLayout>
                <Row className="align-items-center">
                    <Col xl={12} lg={12} md={12} xs={12}>

                        <div className="bg-white rounded-bottom smooth-shadow-sm ">
                            <div className="d-flex align-items-center justify-content-between pt-4 pb-2 px-4">
                                <div className="d-flex align-items-center">
                                    <div className="lh-1">
                                        <h3 className="mb-2 text-secondary">PAGINA INFORMACION</h3>
                                        <p>En el siguiente formulario podrás visualizar tus cambios de la página información, así como también podrás editar sus datos.</p>
                                    </div>
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
                                        SERVICIOS
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
                    {seccionActiva === 'home' && <Servicioeditable />}
                    {seccionActiva === 'paginas' && <CrudServicio />}
                </Row>


            </DefaultDashboardLayout>
        </>
    )
}

export default Servicios1