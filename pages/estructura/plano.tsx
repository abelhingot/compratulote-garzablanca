'use client'
import CFooter from '../components/estructura/footer'
import CTop from '../components/estructura/top'
import CAdorno from '../components/estructura/adorno'
import { Card, Modal, Row } from 'react-bootstrap'
import CPlano from '../components/estructura/plano'
import { Fragment, useState } from 'react'
import React, { useEffect, useRef } from 'react';
export default function EstructuraInicio() {
    const [lgShow, setLgShow] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        lote: '',
        manzana: '',
        areaLote: '',
        referencia: '',
        precio: '',
        estado: '',
        coordenadas: '',
        color: ''
      
    });
    const [areas, setAreas] = useState([]);
    const [loadedImage, setLoadedImage] = useState(null);
    const canvasRef = useRef(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const drawAllAreas = (ctx) => {
        areas.forEach(area => {
            const coords = area.coordenadas.split(',').map(Number);
            ctx.beginPath();
            for (let i = 0; i < coords.length; i += 2) {
                const x = coords[i];
                const y = coords[i + 1];
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.fillStyle = area.color;
            ctx.fill();
        });
    };

    const drawHighlight = (ctx) => {
        if (selectedArea) {
            const coords = selectedArea.coordenadas.split(',').map(Number);
            ctx.beginPath();
            for (let i = 0; i < coords.length; i += 2) {
                const x = coords[i];
                const y = coords[i + 1];
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.fillStyle = selectedArea.color;
            ctx.fill();
        }
    };
    const isCursorInArea = (cursorX, cursorY, area) => {
        const coords = area.coordenadas.split(',').map(Number);
        let isInside = false;
        for (let i = 0, j = coords.length - 2; i < coords.length; i += 2) {
            const xi = coords[i], yi = coords[i + 1];
            const xj = coords[j], yj = coords[j + 1];
            const intersect = ((yi > cursorY) !== (yj > cursorY)) && (cursorX < (xj - xi) * (cursorY - yi) / (yj - yi) + xi);
            if (intersect) isInside = !isInside;
            j = i;
        }
        return isInside;
    };
    useEffect(() => {
        if (loadedImage) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(loadedImage, 0, 0);
            drawAllAreas(ctx);
            drawHighlight(ctx);
        }
    }, [selectedArea, loadedImage]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.onload = () => {
            setImageSize({ width: image.naturalWidth, height: image.naturalHeight });
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            ctx.drawImage(image, 0, 0);
            drawAllAreas(ctx);
            setLoadedImage(image);
        };
        image.src = '/images/icons/PLANOGARZABLANCA.png';

        const handleClick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
            areas.forEach(area => {
                if (isCursorInArea(x, y, area)) {
                    handleEditClick(area.id);
                }
            });
        };

        canvas.addEventListener('click', handleClick);
        return () => {
            canvas.removeEventListener('click', handleClick);
        };
    }, [areas]);

    useEffect(() => {
        fetch('http://localhost:3001/pgconfiplanobg')
            .then(response => response.json())
            .then(data => setAreas(data))
            .catch(error => console.error('Tenemos un error', error));
    }, []);
    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);
        fetch(`http://localhost:3001/pgconfiplanobg/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    lote: data.lote,
                    manzana: data.manzana,
                    areaLote: data.areaLote,
                    referencia: data.referencia,
                    precio: data.precio,
                    estado: data.estado,
                    coordenadas: data.coordenadas,
                    color: data.color
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });

        /*
        <img src="/images/icons/PLANOGARZABLANCA.png" useMap="#image-map" />
        */
    };

    return (
        <>
            <Row className='bg-white m-0'>
                <CTop selMenu="plano" pagenav="./../" />
                <div className="x_content" >
                    <CAdorno />
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-12 border border-3 rounded-3">
                            
                                <div className="imageContainer">
                                    <canvas ref={canvasRef} width={imageSize.width} height={imageSize.height} className="image"></canvas>
                                </div>
                            </div>
                            <br />
                            <div className="container">
                                <div className="row py-3">
                                    <div className='col-md-2'></div>
                                    <div className='col-md-1'></div>
                                    <div className='row col-md-9'>
                                        <div className="col-md-3 text-center py-2">
                                            <span className=''>
                                                <span className="rounded-circle p-2 bg-danger border border-secondary">
                                                    <span className="p-2 " />
                                                </span>
                                                <span className="p-2">LOTES VENDIDOS</span>
                                            </span>
                                        </div>
                                        <div className="col-md-3 text-center py-2">
                                            <span className=''>
                                                <span className="rounded-circle p-2 border border-secondary">
                                                    <span className="p-2 " />
                                                </span>
                                                <span className="p-2">LOTES DISPONIBLES</span>
                                            </span>
                                        </div>
                                        <div className="col-md-3 text-center py-2">
                                            <span className=''>
                                                <span className="rounded-circle p-2 bg-success border border-secondary">
                                                    <span className="p-2 " />
                                                </span>
                                                <span className="p-2">LOTES SEPARADOS</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CPlano />
                        </div>
                    </div>
                </div>
                <CFooter rutatmp='./../../' />

                <Fragment>
                    <Modal size="xl" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                        <Modal.Header closeButton className='bgProyect'>
                            <h3 className='fw-bold'> Estado del lote: <span className='text-light'>{formData.estado}</span></h3>
                        </Modal.Header>
                        <Modal.Body style={{ height: '80vh', borderLeft: '2px solid #3292F7', borderRight: '2px solid #3292F7', borderBottom: '2px solid #3292F7', borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px' }}>

                            <div className="row fw-bold text-center ">
                                <div className="col">
                                    Manzana:
                                </div>
                                <div className="col">
                                    Lote:
                                </div>
                                <div className="col">
                                    Área del Lote:
                                </div>
                                <div className="col">
                                    Valor:
                                </div>
                            </div>
                            <div className="row text-center text-success">
                                <div className="col">
                                    {formData.manzana}
                                </div>
                                <div className="col">
                                    {formData.lote}
                                </div>
                                <div className="col">
                                    {formData.areaLote}
                                </div>
                                <div className="col">
                                    S/. {formData.precio}
                                </div>
                            </div>
                            <hr className="my-4 bg-red border-3" />
                            <div className="row ">
                                <div className="col-md-6 text-left">
                                    <div className="row text-left">
                                        <div className="col-md-6 fw-bold">Precio Base:</div>
                                        <div className="col-md-6">10800</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6 fw-bold">Descuento:</div>
                                        <div className="col-md-6 ">450 %</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6 fw-bold">Precio Descuento:</div>
                                        <div className="col-md-6">s/ 180</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6 fw-bold">Inicial:</div>
                                        <div className="col-md-6">s/ 1000</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6 fw-bold">Saldo Restante:</div>
                                        <div className="col-md-6">s/ 19,600.00</div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 bg-red border-3" />
                            <div className="row">
                                <div className="col-md-12 fw-bold pb-3">Financiamiento:</div>
                                <div className="col-md-12 ">
                                    <table className="table table-borderless text-center table-bordered">
                                        <thead className="table-secondary">
                                            <tr>
                                                <th>N° Cuotas</th>
                                                <th>Cuota Mensual</th>
                                                <th>Interés Anual</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            <tr className="border-0 border-secondary">
                                                <td>12</td>
                                                <td>s/ 1600</td>
                                                <td>$12 %</td>
                                            </tr>
                                            <tr className="border-0 border-secondary">
                                                <td>18</td>
                                                <td>s/ 1642</td>
                                                <td>14720 %</td>
                                            </tr>
                                            <tr className="border-0 border-secondary">
                                                <td>24</td>
                                                <td>s/ 7651</td>
                                                <td>16%</td>
                                            </tr>
                                            <tr className="border-0 border-bottom border-secondary ">
                                                <td>36</td>
                                                <td>s/1500</td>
                                                <td>18 %</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </Fragment>
            </Row>
        </>
    )
}

