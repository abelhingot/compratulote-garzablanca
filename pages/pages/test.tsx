// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';
import React from 'react';
// import widget as custom components
import Link from 'next/link';

// import sub components

// import data files


const Test = () => {
    return (
        <>
            <div className="row bg-white">
                <div className="col-md-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <ul className="nav nav-pills nav-justified bg-danger">
                                <li className="nav-item">
                                    <a className="nav-link text-light fs-5" aria-current="page" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                            className="bi bi-envelope" viewBox="0 0 16 16">
                                            <path
                                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                        </svg> info@compratulote.com</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" aria-disabled="true">
                                        <span className="rounded-circle bg-white pb-1 text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                fill="currentColor" className="bi bi-facebook" viewBox="0 0 15 16">
                                                <path
                                                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                            </svg>
                                        </span>
                                        &nbsp;
                                        <span className="rounded-circle bg-dark pb-2 px-1 text-center">

                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                fill="currentColor" className="bi bi-instagram text-light" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                            </svg>
                                        </span>
                                        &nbsp;
                                        <span className="rounded-circle bg-dark pb-2 px-1 text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                fill="currentColor" className="bi bi-whatsapp text-light" viewBox="0 0 16 16">
                                                <path
                                                    d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                            </svg></span>
                                    </a>
                                </li>
                            </ul>

                            <ul className="nav justify-content-center bg-white">
                                <li className="nav-item">
                                    <img src="Imagenes/Img01.pg" alt="Logo" />
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active btn btn-danger mx-2 rounded-5" aria-current="page"
                                        href="/Index.html">Información</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-black" href="/Ubicacion.html"><strong>Ubicación</strong></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-black" href="/Plano.html"><strong>Plano</strong></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-black" href="/TimeLine.html"
                                        aria-disabled="true"><strong>TimeLine</strong></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-black" href="/Empresa.html" aria-disabled="true"><strong>La
                                        Empresa</strong></a>
                                </li>
                                <li className="nav-item">
                                    <img src="Imagenes/Img2.png" alt="Logo" />
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div className="x_content">
                        <div className="container-fluid p-0 contenedor-imagen">
                            <img src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" className="fondo" alt="Imagen de fondo" />
                            <div className="position-absolute w-100 texto-superpuesto">
                                <h1 className="text-white fw-bold">Lorem Ipsum dolor sit amet</h1>
                                <p className="text-white">Lorem ipsum dolor sit amet, consectetuer adipis-cing elit, sed diam
                                    nonummy nib</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                                className="bi bi-play-circle-fill icono-reproducir" viewBox="0 0 16 16">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                            </svg>
                        </div>
                    </div>

                    <div className="x_content">
                        <div className="container">
                            <div className="button-bar">
                                <div className="row mb-3 text-center fw-bold ">
                                    <div className="col-md-4 col-sm-4 bg-red text-light h4 py-5 rounded-start-5 ">Información de
                                        Oferta
                                    </div>
                                    <div className="col-md-4 col-sm-4 bg-danger text-light h4 py-5">Información de Oferta</div>
                                    <div className="col-md-4 col-sm-4 bg-red text-light h4 py-5 rounded-end-5 ">Información de
                                        Sala
                                        de Venta</div>
                                </div>
                            </div>
                        </div>
                        <div className="container">

                            <div className="row g-5 py-4 p-2">
                                <div className="col-md-7 col-lg-8">
                                    <p className="txt-jf">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                        nonummy nibh euis-mod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                                        wisi enim ad
                                        minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                                        aliquip
                                        ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
                                        velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
                                        eros et accum- san et iusto odio dignissim qui blandit praesent luptatum zzril
                                        delenit augue
                                        duis dolore te feugait nulla facilisi. <br />

                                        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh
                                        eu-ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                                        minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                                        aliquip
                                        ex ea commodo consequat.</p>

                                    <div className="container mt-4 gx-5 ">
                                        <div className="row ">

                                            <div className="col-lg-2 col-md-2 col-sm-2 mb-4">
                                                <div className="album-item text-center">
                                                    <button type="button"
                                                        className="btn border border-danger border-2 p-3 rounded-4 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                                                            fill="currentColor" className="bi bi-droplet" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd"
                                                                d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
                                                            <path fill-rule="evenodd"
                                                                d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" />
                                                        </svg>
                                                    </button><br />
                                                    <label className="text-danger fw-bold">Agua</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 mb-4">
                                                <div className="album-item text-center">
                                                    <button type="button"
                                                        className="btn border border-danger border-2 p-3 rounded-4 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                                                            fill="currentColor" className="bi bi-sun text-secondary-emphasis"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                                        </svg></button><br />
                                                    <label className="text-danger fw-bold">Luz</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 mb-4">
                                                <div className="album-item text-center">
                                                    <button type="button"
                                                        className="btn border border-danger border-2 p-3 rounded-4 ">
                                                        <img src="Imagenes/Recurso1.png" />
                                                    </button><br />
                                                    <label className="text-danger fw-bold">Desague</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 mb-4">
                                                <div className="album-item text-center">
                                                    <button type="button"
                                                        className="btn border border-danger border-2 p-3 rounded-4 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                                                            fill="currentColor" className="bi bi-sun text-secondary-emphasis"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                                        </svg></button><br />
                                                    <label className="text-danger fw-bold">Club</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 mb-4">
                                                <div className="album-item text-center">
                                                    <button type="button"
                                                        className="btn border border-danger border-2 p-3 rounded-4 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                                                            fill="currentColor" className="bi bi-sun text-secondary-emphasis"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                                        </svg></button><br />
                                                    <label className="text-danger fw-bold">Cerco Perimétrico</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-2 col-md-2 col-sm-2 mb-4">
                                                <div className="album-item text-center">
                                                    <button type="button"
                                                        className="btn border border-danger border-2 p-3 rounded-4 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                                                            fill="currentColor" className="bi bi-droplet" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd"
                                                                d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
                                                            <path fill-rule="evenodd"
                                                                d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" />
                                                        </svg>
                                                    </button><br />
                                                    <label className="text-danger fw-bold">Agua</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 mb-4">
                                                <div className="album-item text-center">
                                                    <button type="button"
                                                        className="btn border border-danger border-2 p-3 rounded-4 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                                                            fill="currentColor" className="bi bi-sun text-secondary-emphasis"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                                        </svg></button><br />
                                                    <label className="text-danger fw-bold">Luz</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 mb-4">
                                                <div className="album-item text-center">
                                                    <button type="button"
                                                        className="btn border border-danger border-2 p-3 rounded-4 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                                                            fill="currentColor" className="bi bi-sun text-secondary-emphasis"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                                        </svg></button><br />
                                                    <label className="text-danger fw-bold">Desague</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 mb-4">
                                                <div className="album-item text-center">
                                                    <button type="button"
                                                        className="btn border border-danger border-2 p-3 rounded-4 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                                                            fill="currentColor" className="bi bi-sun text-secondary-emphasis"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                                        </svg></button><br />
                                                    <label className="text-danger fw-bold">Club</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 mb-4">
                                                <div className="album-item text-center">
                                                    <button type="button"
                                                        className="btn border border-danger border-2 p-3 rounded-4 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                                                            fill="currentColor" className="bi bi-sun text-secondary-emphasis"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                                        </svg></button><br />
                                                    <label className="text-danger fw-bold">Cerco Perimétrico</label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 col-lg-4 ">
                                    <div className="no-left-top-shadow rounded-3">
                                        <div className="bg-red border rounded-top-4 p-3">
                                            <h4 className="text-light fw-bold text-center">Quiero que
                                                me contacten</h4>
                                        </div>
                                        <form className="needs-validation border mb-5 p-4 rounded-bottom-1">
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <label className="form-label">Nombres:</label>
                                                    <div className="input-group has-validation">
                                                        <input type="text" className="form-control rounded-0" id="nombres"
                                                            placeholder="Ingresa tu nombre" required />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Apellidos:</label>
                                                    <div className="input-group has-validation">
                                                        <input type="text" className="form-control rounded-0" id="apellidos"
                                                            placeholder="Ingresa tus apellidos" required />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">DNI:</label>
                                                    <div className="input-group has-validation">
                                                        <input type="text" className="form-control rounded-0" id="dni"
                                                            placeholder="N° DE DNI" required />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">CELULAR:</label>
                                                    <div className="input-group has-validation">
                                                        <input type="text" className="form-control rounded-0" id="celular"
                                                            placeholder="N° de Celular" required />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">CORREO:</label>
                                                    <div className="input-group has-validation">
                                                        <input type="text" className="form-control rounded-0" id="celular"
                                                            placeholder="Correo Electrónico" required />
                                                    </div>
                                                </div>
                                                <hr style={{ color:'white'}}/>
                                            </div>

                                            <button className="w-100 btn btn-dark btn-lg fw-bold rounded-0"
                                                type="submit">ENVIAR</button>
                                            <br />
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="row p-2">
                                <div className="col-md-7 col-lg-7">
                                    <div id="carouselExampleSlidesOnly" className="carousel slide border border-danger border-2 p-2 h-100" data-bs-ride="carousel">
                                        <div className="carousel-inner object-fit-cover">
                                            <div className="carousel-item active">
                                                <img src="Imagenes/Img3.png" className="w-100" alt="..." />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="Imagenes/Img2.png" className="w-100" alt="..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 col-lg-5">
                                    <div className="border border-danger border-2 p-2 position-relative h-100">
                                        <video src="Imagenes/video1.m4" className="w-100" autoplay id="play"></video>
                                        <span id="pauseButton" className="position-absolute top-50 start-50 translate-middle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-play-circle-fill text-light" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <br /> <br />
                        </div>
                    </div>
                    <footer className="bg-dark text-light text-center py-3">
                        <div className="container">
                            <p>Copyright &copy; 2023 Los Arrecifes de Mórrope | Desarrollado por Compratulote.pe</p>
                        </div>
                    </footer>
                </div>
            </div>

        </>
    )
}

export default Test
