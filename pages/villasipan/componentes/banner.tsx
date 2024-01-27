import { Fragment, useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";

export default function CBanner() {
    const [showText, setShowText] = useState(true);
    const [datos, setDatos] = useState([]);
    const [setBanner, setBanners] = useState('');
    const [lgShow, setLgShow] = useState(false);
    useEffect(() => {
        const identificador = window.location.pathname.split('/');
        const categoriaApi = identificador[identificador.length - 1];

        fetch('http://localhost:3001/pgbannervs')
            .then(response => response.json())
            .then(data => {
                const imagenesFiltradas = data.filter(fila => fila.categoria === categoriaApi);
                setDatos(imagenesFiltradas);
                setBanners(categoriaApi);
            })
            .catch(error => console.error('Error al obtener datos:', error));

        const interval = setInterval(() => {
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {datos.map((fila, index) => (
                <div className="container-fluid contenedor-imagen p-0" key={index}>
                    <div className="position-relative">
                        <img src={fila.imagen} className="fondo" alt={fila.categoria} />
                        <div className="position-absolute w-100 texto-superpuesto">
                            <div className="transicion-container bg-custom-colordk">
                                <h2 className={'text-white transicion-container titulo-Intro'}>{fila.titulo}</h2>
                                <p className={'text-white text-transicion'}>{fila.subtitulo}</p>
                            </div>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                        className="bi bi-play-circle-fill icono-reproducir" data-bs-toggle="modal" data-bs-target="#exampleModal" viewBox="0 0 16 16" onClick={() => setLgShow(true)}>
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                    </svg>
                    <Fragment>
                        <Modal size="xl" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg" style={{ backgroundColor: 'black' }}>
                            <Modal.Header closeButton style={{ backgroundColor: 'lightgray' }}>

                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: 'lightgray', height: '80vh' }}>

                                <iframe className="w-100 h-100" src={fila.href} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                            </Modal.Body>
                        </Modal>
                    </Fragment>
                </div>
            ))}
        </>
    )
}