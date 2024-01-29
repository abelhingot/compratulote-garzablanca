import { useEffect, useState } from "react";

export default function CNavbar({ pagenav = "" }) {
    const [datos, setDatos] = useState([]);
    const [selMenu, setSelMenu] = useState('');
    useEffect(() => {
        const urlParts = window.location.pathname.split('/');
        const categoriaFromUrl = urlParts[urlParts.length - 1];

        fetch('http://localhost:3001/pgmenuvs')
            .then(response => response.json())
            .then(data => {
                setDatos(data);
                setSelMenu(categoriaFromUrl);
            })
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    return (
        <>
            <ul className="nav flex-column flex-sm-row justify-content-center bg-white p-2 overflow-auto" style={{borderTop:'4px solid #2e7e46'}}>
                <div className="d-flex flex-nowrap align-items-center justify-content-center justify-content-lg-start">
                    {datos.map((fila, index) => (
                        <li key={index} className="nav-item fw-bold">
                            {fila.texto === 'Logo' ? (
                                <img src={fila.href} alt="Logo" style={{ zoom: '0.4'}} className="mx-2 " />
                            ) : (
                                <a className={`nav-link custom-sombra2 fs-4 ${selMenu.toLowerCase() === fila.texto.toLowerCase() ? 'text-light active bgProyect2 mx-2 rounded-5' : 'text-dark'}`} href={fila.href ? `../villasipan${fila.href}` : undefined}>
                                    {fila.texto}
                                </a>
                            )}
                        </li>
                    ))}
                </div>
            </ul>
        </>
    )
}