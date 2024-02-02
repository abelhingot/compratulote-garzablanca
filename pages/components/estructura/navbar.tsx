import { useEffect, useState } from "react";
import {Image} from "react-bootstrap"
export default function CNavbar({ pagenav = "" }) {
    const [datos, setDatos] = useState([]);
    const [selMenu, setSelMenu] = useState('');
    
    useEffect(() => {
        const urlParts = window.location.pathname.split('/');
        const categoriaFromUrl = urlParts[urlParts.length - 1];

        fetch('./api/db.json')
          .then(response => response.json())
          .then(json => {
            const data = json.pgmenuvs;
            setDatos(data);
            setSelMenu("informacion");
            if (categoriaFromUrl && categoriaFromUrl.toLowerCase() !== "informacion") {
                setSelMenu(categoriaFromUrl);
              }
          })
          .catch(error => console.error('Error al obtener datos:', error));
      }, []);

    return (
        <>
            <ul className="nav flex-column flex-sm-row justify-content-center bg-white p-2 overflow-auto sticky-top" >
                <div className="d-flex flex-nowrap align-items-center justify-content-center justify-content-lg-start">
                    {datos.map((fila, index) => (
                        <li key={index} className="nav-item fw-bold">
                            {fila.texto === 'Logo' ? (
                                <Image src={fila.href} alt="Logo" style={{ zoom: '0.6' }} />
                            ) : (
                                <a className={`nav-link custom-sombra fs-4 ${selMenu.toLowerCase() === fila.texto.toLowerCase() ? 'text-light active bgProyect mx-2 rounded-5' : 'text-dark'}`} href={fila.href ? `../${fila.href}` : undefined}>
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