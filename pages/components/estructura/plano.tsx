import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

export default function CPlano() {
    const [datos, setDatos] = useState([]);
    const [selectedManzana, setSelectedManzana] = useState("");
    const [filteredLotes, setFilteredLotes] = useState([]);
    const [selectedLote, setSelectedLote] = useState("");
    const [financiamiento, setFinanciamiento] = useState("");
    const [mostrarResultados, setMostrarResultados] = useState(false);
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
        coordenadas:'',
        color:''

    });
    const [cantidadInicial, setCantidadInicial] = useState(0);
    const [cantidadInicialIntereses, setCantidadInicialIntereses] = useState(0);
    const [cuotasintereses, setCuotasIntereses] = useState(0);
    const [pagoMensual, setPagoMensual] = useState(0);
    const [ultimaCuota, setUltimaCuota] = useState(0);
    const [numeroCuotas, setNumeroCuotas] = useState(0);

    useEffect(() => {
        fetch("/db.json")
            .then(response => response.json())
            .then(json => {
                const data: any[] = json.pgconfiplanobg;
                setDatos(data);
            })
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);
    const manzanasUnicas = useMemo(() => Array.from(new Set(datos.map(item => item.manzana))), [datos]);

    const handleManzanaChange = (event) => {
        const manzana = event.target.value;
        setSelectedManzana(manzana);
        const lotesFiltrados = datos.filter(item => item.manzana === manzana);
        setFilteredLotes(lotesFiltrados);
    };
    const handleLoteChange = (event) => {
        setSelectedLote(event.target.value);
    };
    const buscarInfo = () => {
        const infoEncontrada = datos.find(item => item.manzana === selectedManzana && item.id === selectedLote);
        const descuento = 0.05;
        const precioConDescuento = infoEncontrada.precio - (infoEncontrada.precio * descuento);
        const precioOriginal = infoEncontrada.precio.toLocaleString("es-PE", { style: "decimal", maximumFractionDigits: 2 });
        const precioconFormato = precioConDescuento.toLocaleString("es-PE", { style: "decimal", maximumFractionDigits: 2 });
        if (infoEncontrada) {
            setFormData({
                id: infoEncontrada.id,
                lote: infoEncontrada.lote,
                manzana: infoEncontrada.manzana,
                areaLote: infoEncontrada.areaLote,
                referencia: infoEncontrada.referencia,
                precio: infoEncontrada.precio,
                precioFormato: precioOriginal,
                precioFinal: precioconFormato,
                estado: infoEncontrada.estado,
                coordenadas:infoEncontrada.coordenadas,
                color:infoEncontrada.color
            });
            setMostrarResultados(true);
        }
    };
    const calcularCeroIntereses = () => {
        if (cantidadInicial < 10000) {
            Swal.fire({
                title: "Verificar el monto inicial",
                text: "El monto mínimo inicial debe ser mayor a S/. 10,000",
                icon: "warning",
                confirmButtonColor: "#3292F7",
                confirmButtonText: "Aceptar"
            });
        } else {
            if (pagoMensual < 1000) {
                Swal.fire({
                    title: "Verificar el pago mensual",
                    text: "El pago mensual debe ser mayor a S/. 1,000",
                    icon: "warning",
                    confirmButtonColor: "#3292F7",
                    confirmButtonText: "Aceptar"
                });
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
                text: "El monto mínimo inicial debe ser mayor a S/. 6,000",
                icon: "warning",
                confirmButtonColor: "#3292F7",
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
    return (
        <>
            <div className="bg-dark-subtle rounded-5 text-center p-3">
                <div className="row">
                    <div className="col h3 text-white fw-bold">Encuentra tu Lote</div>
                    <div className="col">
                        <select className="form-select" aria-label="Manzana select" id="manzanaInput" value={selectedManzana} onChange={handleManzanaChange}>
                            <option value="">Selecciona una Manzana</option>
                            {Array.from(new Set(datos.map(item => item.manzana))).map((manzana, index) => (
                                <option key={index} value={manzana}>{manzana}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select" aria-label="Lote select" id="loteInput" value={selectedLote} onChange={handleLoteChange}>
                            <option value="">Selecciona un lote</option>
                            {filteredLotes.map((item, index) => (
                                <option key={index} value={item.id}>{item.lote}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col">
                        <button type="button" className="btn btn-secondary btn-lg" onClick={() => buscarInfo()}>Buscar</button>
                    </div>
                </div>
            </div>
            <div className=" container">
                <div className=" py-3 px-5">
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
                                    <div className="col bg-yellow rounded p-1 fw-bold border border-secondary" style={{ color: 'black',  fontSize: '19px' }}>
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
                                            <div className="col-md-6 pt-1">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="financimiento" value="conIntereses" onChange={(e) => setFinanciamiento(e.target.value)} />
                                                    <label className="form-check-label" >
                                                        Financiamiento con intereses
                                                    </label>
                                                </div>
                                            </div>
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
                                                <input type="number" className="form-control" placeholder="Mínimo: S/. 10,000" onChange={(e) => setCantidadInicial(parseFloat(e.target.value))} />
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
                                        <button type="button" className="btn btn-info text-light btn-lg" onClick={() => calcularCeroIntereses()} >Calcular</button>
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <table className="table table-borderless text-center table-bordered">
                                        <thead className="table-info border-info">
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
                                                <td>S/. {ultimaCuota.toFixed(2)}</td>
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
                                                    <option value="36">36</option>
                                                    <option value="48">48</option>
                                                    <option value="60">60</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <button type="button" className="btn btn-info text-light btn-lg" onClick={() => calcularConIntereses()}>Calcular</button>
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <table className="table table-borderless text-center table-bordered">
                                        <thead className="table-info border-info">
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
                </div>
            </div>
        </>
    )
}


