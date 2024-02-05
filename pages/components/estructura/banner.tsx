import { Fragment, useEffect, useState } from "react";
import { Button, Modal, Row, Image } from "react-bootstrap";

export default function CBanner() {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    useEffect(() => {
        const path = window.location.pathname === '/' ? 'informacion' : window.location.pathname.split('/').pop();
        fetch('https://sheet.best/api/sheets/7ae0c5f0-997f-4c88-935e-f4a58678ff5e/tabs/banner')
            .then(response => response.json())
            .then(data => {
                if (data.length > 1) {
                    const headers = Object.keys(data[0]).map(key => data[0][key]);
                    const rows = data.slice(1).map(row => {
                      let obj = {};
                      Object.keys(row).forEach((key, index) => {
                        obj[headers[index]] = row[key];
                      });
                      return obj;
                    
                    });
                    const filtrar = rows.filter(fila=> fila.categoria===path);
                    setDatos(filtrar);
                 
                }
            })
            .catch(error => console.error('Tenemos un error:', error));
    }, []);
 
    
    return (
        <>
            {datos.map((fila, index) => (
                <div className="container-fluid contenedor-imagen p-0" key={index}>
                    <div className="position-relative">
                        <Image src={'./imagenes/'+fila.imagen} className="fondo img-fluid" alt={fila.categoria} />
                        <div className="position-absolute w-100 texto-superpuesto">
                            <div className="transicion-container bg-custom-colordk p-3">
                                <h2 className="text-white mb-3 titulo-Intro">{fila.titulo}</h2>
                                <p className="text-white mb-0 text-transicion">{fila.subtitulo}</p>
                            </div>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                        className="bi bi-play-circle-fill icono-reproducir" data-bs-toggle="modal" data-bs-target="#exampleModal" viewBox="0 0 16 16" onClick={() => setLgShow(true)}>
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                    </svg>
                    <Fragment>
                        <Modal size="xl" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg" style={{ backgroundColor: 'black' }}>
                            <Modal.Header closeButton style={{ backgroundColor: 'lightgray' }}>  </Modal.Header>
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