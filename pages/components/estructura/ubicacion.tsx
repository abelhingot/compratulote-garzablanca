import { useEffect, useState } from "react"

export default function CUbicacion() {
    const [datos, setDatos] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        categoria: '',
        titulo: '',
        subtitulo: '',
        mensaje: '',
        imagen: ''
    });
    useEffect(() => {
        fetch('https://sheet.best/api/sheets/7ae0c5f0-997f-4c88-935e-f4a58678ff5e/tabs/ubicacion')
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
                    const datosFiltrados = rows.filter(fila => fila.categoria === "infodown");
                    setDatos(datosFiltrados);

                }
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleEnviarIdClick = (id) => {
        const datosporId = datos.find(fila => parseInt(fila.id) === parseInt(id));
    if (datosporId) {
        setFormData({
            id: datosporId.id,
            categoria: datosporId.categoria,
            titulo: datosporId.titulo,
            subtitulo: datosporId.subtitulo,
            mensaje: datosporId.mensaje,
            imagen: datosporId.imagen
        });
    }
    }
    return (
        <>
            <div className="row mb-4">
                <div className="col-md-7 col-lg-8">
                    <div className="container px-4 text-center">
                        <div className="row gx-5">
                            <div className="accordion" >
                                <div id="collapseOne" className="accordion-collapse collapse show"
                                    data-bs-parent="#accordionExample">
                                    <div className="row">
                                        <div className="col-md-6 pe-0">
                                            <h1 className="fw-bold cProyect">{formData.subtitulo}</h1>
                                        </div>
                                        <div className="col-md-6 ps-1">
                                            <p>{formData.mensaje}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 border borderProyect border-3 p-1">
                                            <div className="embed-responsive ratio ratio-16x9">
                                                <iframe src={formData.imagen} className="w-100 h-100" style={{ border: 'none', borderRadius: 'inherit' }} allowFullScreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-lg-4 p-4"><br />
                    <div className="no-left-top-shadow rounded-3 ">
                        <div className="accordion ">
                            <div className="accordion-item border border-top-1 border-bottom-0 p-1"><br />
                                {datos.map((fila, index) => (
                                    <h4 className="accordion-header" key={index}>
                                        <button
                                            className="accordion-button-no-icon collapsed rounded-5 bg-body border-0 focus-ring focus-ring-light px-4"
                                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                            aria-expanded="true" aria-controls="collapseOne" onClick={() => handleEnviarIdClick(fila.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                fill="currentColor" className="bi bi-folder-fill crema"
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                                            </svg>
                                            <span className="px-3 text" >{fila.titulo}</span>
                                        </button>
                                    </h4>))}
                                <br />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}