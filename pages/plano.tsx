'use client'
import CFooter from './components/estructura/footer'
import CTop from './components/estructura/top'
import CAdorno from './components/estructura/adorno'
import { Card, Modal, Row } from 'react-bootstrap'
import CPlano from './components/estructura/plano'
import { Fragment, useState } from 'react'
import React, { useEffect, useRef, useCallback } from 'react';
import Swal from 'sweetalert2'
export default function EstructuraInicio() {
    const [lgShow, setLgShow] = useState(false);
    const [datos, setDatos] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        lote: '',
        manzana: '',
        areaLote: '',
        referencia: '',
        precio: '',
        precioFormato: '',
        precioFinal: '',
        estado: '',
        coordenadas: '',
        color: ''

    });
    const [areas, setAreas] = useState([]);
    const [loadedImage, setLoadedImage] = useState(null);
    const canvasRef = useRef(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [financiamiento, setFinanciamiento] = useState("");
    const [cantidadInicial, setCantidadInicial] = useState(0);
    const [cantidadInicialIntereses, setCantidadInicialIntereses] = useState(0);
    const [cuotasintereses, setCuotasIntereses] = useState(0);
    const [pagoMensual, setPagoMensual] = useState(0);
    const [ultimaCuota, setUltimaCuota] = useState(0);
    const [numeroCuotas, setNumeroCuotas] = useState(0);

    const drawAllAreas = useCallback((ctx) => {
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
    }, [areas]);

    const drawHighlight = useCallback((ctx) => {
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
    }, [selectedArea]);

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
    }, [selectedArea, loadedImage, drawAllAreas, drawHighlight]);

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
        image.src = '/images/icons/PLANOVILLASIPAN.png';

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
    }, [areas, drawAllAreas]);

    useEffect(() => {
        fetch('./api/db.json')
            .then(response => response.json())
            .then(json => {
                const data: any[] = json.pgconfiplanovs;
                setAreas(data);
            })
            .catch(error => console.error('Tenemos un error', error));
    }, []);
    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch('./api/db.json')
            .then((response) => response.json())
            .then((json) => {
                const data: any[] = json.pgconfiplanovs;

                const obj = data.find(x => x.id == id);
                const descuento = 0.05;
                const precioConDescuento = obj.precio - (obj.precio * descuento);
                const precioOriginal = obj.precio.toLocaleString("es-PE", { style: "decimal", maximumFractionDigits: 2 });
                const precioconFormato = precioConDescuento.toLocaleString("es-PE", { style: "decimal", maximumFractionDigits: 2 });
                if (obj) {
                    setFormData({
                        id: obj.id,
                        lote: obj.lote,
                        manzana: obj.manzana,
                        areaLote: obj.areaLote,
                        referencia: obj.referencia,
                        precio: obj.precio,
                        precioFormato: precioOriginal,
                        precioFinal: precioconFormato,
                        estado: obj.estado,
                        coordenadas: obj.coordenadas,
                        color: obj.color
                    });
                    actualizarCantidadInicial(obj.precio); // Actualiza la cantidad inicial basado en el precio del lote
                    setMostrarResultados(true);
                }
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });

        /*
        <img src="/images/icons/PLANOGARZABLANCA.png" useMap="#image-map" />
        */
    };

    const calcularCeroIntereses = () => {
        const minimoInicial = parseFloat(formData.precio) * 0.1; // 10% del valor del lote
    if (cantidadInicial < minimoInicial) {
        Swal.fire({
            title: "Verificar el monto inicial",
            text: `El monto inicial debe ser al menos el 10% del valor del lote, inicial: S/. ${minimoInicial.toFixed(2)}`,
            icon: "warning",
            confirmButtonColor: "#fdcd68",
            confirmButtonText: "Aceptar",
        });
        return; // Detiene la ejecución si la condición no se cumple
        // const minimoInicial = parseFloat(formData.precio) * 0.1; // 10% del valor del lote
        // if (cantidadInicial < minimoInicial) {
        // Swal.fire({
        //     title: "Verificar el monto inicial",
        //     text: `El monto mínimo inicial debe ser mayor o igual a S/. ${minimoInicial.toFixed(2)}`,
        //     icon: "warning",
        //     confirmButtonColor: "#fdcd68",
        //     confirmButtonText: "Aceptar"
        // });
        } else {
            if (pagoMensual < 1000) {
                Swal.fire({
                    title: "Verificar el pago mensual",
                    text: "El pago mensual debe ser mayor de S/. 1000.",
                    icon: "warning",
                    confirmButtonColor: "#fdcd68",
                    confirmButtonText: "Aceptar",
                });
                return; // Detiene la ejecución si la condición no se cumple
            
            } else {
                let numCuotas = 0;
                if (cantidadInicial >= 10000 && cantidadInicial < 15000) {
                    numCuotas = 24;
                } else if (cantidadInicial >= 15000 && cantidadInicial < 20000) {
                    numCuotas = 30;
                } else if (cantidadInicial >= 20000) {
                    numCuotas = 36;
                }
                setNumeroCuotas(numCuotas);
                const precioNumerico = parseFloat(formData.precio);
                if (!isNaN(precioNumerico) && !isNaN(pagoMensual) && !isNaN(numCuotas)) {
                    const saldo = precioNumerico - cantidadInicial;
                    const totalPagado = pagoMensual * (numCuotas - 1);
                    const ultimaCuotaCalculada = saldo - totalPagado;
                    setUltimaCuota(ultimaCuotaCalculada);
                } else {


                }
            }
        }

    };

    const calcularConIntereses = () => {
        if (cantidadInicialIntereses < 6000) {
            Swal.fire({
                title: "Verificar el monto inicial",
                text: "El monto mínimo inicial debe ser mayor a 6 000",
                icon: "warning",
                confirmButtonColor: "#fdcd68",
                confirmButtonText: "Aceptar"
            });
        } else {
            const interes = 0.015;
            const precioTotal = parseFloat(formData.precio);
            const calcularResta = precioTotal - cantidadInicialIntereses;
            const calcularPagoMensual = calcularResta * ((interes * (1 + interes) ** cuotasintereses) / ((1 + interes) ** cuotasintereses - 1));
            setPagoMensual(calcularPagoMensual);
        }
    }

// // Actualiza cantidadInicial cuando el precio del lote cambia
// useEffect(() => {
//     if (formData.precio) {
//         const valorInicial = parseFloat(formData.precio) * 0.1;
//         setCantidadInicial(valorInicial);
//     }
// }, [formData.precio]);
// Manejador para cambio en el input
const handleCantidadInicialChange = (e) => {
    setCantidadInicial(e.target.value ? parseFloat(e.target.value) : 0);
};
//Se puede borrar
const actualizarCantidadInicial = (precioLote) => {
    const valorInicial = parseFloat(precioLote) * 0.1; // 10% del valor del lote
    setCantidadInicial(valorInicial);
};



    return (
        <>
            <Row className='bg-white m-0'>
                <CTop />
                <div className="x_content" >
                    <CAdorno />
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-12 ">

                                <div className="imageContainer text-center">
                                    <canvas ref={canvasRef} width={imageSize.width} height={imageSize.height} className="image border border-3 rounded-3"></canvas>
                                </div>
                            </div>
                            <br />
                            <div className="container">
                                <div className="row py-3">
                                    <div className='col-md-2'></div>
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
                                                <span className="rounded-circle p-2 border border-secondary #fff">
                                                    <span className="p-2 " />
                                                </span>
                                                <span className="p-2">LOTES DISPONIBLES</span>
                                            </span>
                                        </div>
                                        <div className="col-md-3 text-center py-2">
                                            <span className=''>
                                                <span className="rounded-circle p-2 border border-secondary bg-secondary">
                                                    <span className="p-2 " />
                                                </span>
                                                <span className="p-2">LOTES RESERVADOS</span>
                                            </span>
                                        </div>
                                        <div className="col-md-3 text-center py-2">
                                            <span className=''>
                                                <span className="rounded-circle p-2 border border-secondary bg-warning">
                                                    <span className="p-2 " />
                                                </span>
                                                <span className="p-2">LOTES FINANCIADOS</span>
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
                            <h3 className='text-light'> Estado del lote: <span className='text-light'>{formData.estado}</span></h3>
                        </Modal.Header>
                        <Modal.Body className='modalPlano'>

                            <div id="info-Plano">
                                {mostrarResultados && (
                                    <span> <div className="row fw-bold text-center ">
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
                                            Costo del Lote:
                                        </div>
                                    </div>
                                        <div className="row text-center">
                                            <div className="col p-1">
                                                {formData.manzana}
                                            </div>
                                            <div className="col p-1">
                                                {formData.lote}
                                            </div>
                                            <div className="col p-1">
                                                {formData.areaLote}
                                            </div>
                                            {/* <div className="col bg-dark-subtle rounded p-1 fw-bold border border-secondary"> */}
                                            <div  className="col rounded p-1 fw-bold border border-secondary" style={{ backgroundColor: '#ffcc6c', color: 'black' }}>
                                              S/. {formData.precioFormato}
                                            </div>

                                            <hr className="my-0 border-3 mt-2" />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 text-left">
                                                <div className="row text-left p-5">
                                                    <div className="col-md-12 fw-bold text-center mb-2">NUESTROS FINANCIAMIENTOS</div>
                                                    <div className="col-md-6 pt-1">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="financimiento" value="sinIntereses" onChange={(e) => setFinanciamiento(e.target.value)} />
                                                            <label className="form-check-label" >
                                                                Financiamiento sin intereses
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-6 pt-1">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="financimiento" value="conIntereses" onChange={(e) => setFinanciamiento(e.target.value)} />
                                                            <label className="form-check-label" >
                                                                Financiamiento con intereses
                                                            </label>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className="col-md-6 border border-top-0 ">
                                                <div className="row text-left p-5">
                                                    <div className="col-md-12 fw-bold text-center mb-2">PAGO AL CONTADO</div>
                                                    <div className="col-md-6 fw-bold">Descuento:</div>
                                                    <div className="col-md-6">&nbsp; &nbsp; &nbsp; 5 %</div>
                                                    <div className="col-md-6 fw-bold">Precio Final:</div>
                                                    <div className="col-md-6">S/. {formData.precioFinal}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                )}
                                {financiamiento === "sinIntereses" &&
                                    <div className="row">
                                        <div className="col-md-12 fw-bold">Ingrese antes los siguientes datos para calcular:</div>
                                        <div className="row p-4">
                                            <div className="col-md-4 g-1">
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <label className="col-form-label">Inicial</label>
                                                    </div>
                                                    <div className="col-auto">
                                                        {/* <input type="number" className="form-control" placeholder="Mínimo: S/. 10,000" onChange={(e) => setCantidadInicial(parseFloat(e.target.value))} /> */}
                                                        {/* <input 
                type="number" 
                className="form-control" 
                placeholder={`Mínimo: S/. ${(parseFloat(formData.precio) * 0.1).toFixed(2)}`}
                onChange={(e) => setCantidadInicial(parseFloat(e.target.value))} // Permite editar el valor
                value={cantidadInicial.toFixed(2)} // Muestra el valor actualizado del estado
            /> */}
                                                        <input  type="number" className="form-control" placeholder="Ingrese cantidad inicial" onChange={handleCantidadInicialChange} value={cantidadInicial}/>


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 g-1">
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <label className="col-form-label">Pago mensual</label>
                                                    </div>
                                                    <div className="col-auto">
                                                        <input type="number" className="form-control" placeholder="Mínimo: S/. 1,000" onChange={(e) => setPagoMensual(parseFloat(e.target.value))} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <button type="button" className="btn btnProyect text-light btn-lg" onClick={() => calcularCeroIntereses()} >Calcular</button>
                                            </div>
                                        </div>
                                        <div className="col-md-12 ">
                                            <table className="table table-borderless text-center table-bordered">
                                                <thead className="table-secondary border border-secondary">
                                                    <tr>
                                                        <th className="text-dark fw-bold">N° Cuotas</th>
                                                        <th className="text-dark fw-bold">Intereses</th>
                                                        <th className="text-dark fw-bold">última cuota</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="">
                                                    <tr className="border-1 border-secondary-subtle">
                                                        <td>{numeroCuotas} meses</td>
                                                        <td>0 %</td>
                                                        <td>S/. {ultimaCuota.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                                {financiamiento === "conIntereses" &&
                                    <div className="row">
                                        <div className="col-md-12 fw-bold">Ingrese antes los siguientes datos para calcular:</div>
                                        <div className="row p-4">
                                            <div className="col-md-4 g-1">
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <label className="col-form-label">Inicial</label>
                                                    </div>
                                                    <div className="col-auto">
                                                        <input type="number" className="form-control" placeholder="Mínimo: S/. 6,000" onChange={(e) => setCantidadInicialIntereses(parseFloat(e.target.value))} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 g-1">
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <label className="col-form-label">Cuotas</label>
                                                    </div>
                                                    <div className="col-auto">
                                                        <select className="form-select" onChange={(e) => setCuotasIntereses(parseFloat(e.target.value))}>
                                                            <option value="">Seleccionar las cuotas</option>
                                                            <option value="24">24</option>
                                                            {/* <option value="36">36</option>
                                                            <option value="48">48</option>
                                                            <option value="60">60</option> */}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <button type="button" className="btn btnProyect text-light btn-lg" onClick={() => calcularConIntereses()}>Calcular</button>
                                            </div>
                                        </div>
                                        <div className="col-md-12 ">
                                            <table className="table table-borderless text-center table-bordered">
                                                <thead className="table-secondary border border-secondary">
                                                    <tr>
                                                        <th className="text-dark fw-bold">Interés Mensual</th>
                                                        <th className="text-dark fw-bold">Pago Mensual</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="">
                                                    <tr className="border-1 border-secondary-subtle">
                                                        <td>1.5 %</td>
                                                        <td>s/ {pagoMensual.toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                                {financiamiento === "" &&
                                    <div className="py-5"> &nbsp;
                                    </div>
                                }
                            </div>

                        </Modal.Body>
                    </Modal>
                </Fragment>
            </Row>
        </>
    )
}

