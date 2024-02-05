import { useEffect, useState } from "react";
import {Image} from "react-bootstrap"
export default function CNavbar({ pagenav = "" }) {
    const [datos, setDatos] = useState([]);
    const [selMenu, setSelMenu] = useState('');
    
    
    useEffect(() => {
        const path = window.location.pathname === '/' ? 'informacion' : window.location.pathname.split('/').pop();
        fetch('https://sheet.best/api/sheets/7ae0c5f0-997f-4c88-935e-f4a58678ff5e/tabs/navbar')
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
                setDatos(rows);
                actualizarSelMenu(rows, location.pathname);
              }
        })
          .catch(error => console.error('Error al obtener datos:', error));
      }, []);
      useEffect(() => {
        actualizarSelMenu(datos, location.pathname);
    }, [ datos]);

    function actualizarSelMenu(data, pathname) {
        const path = pathname === '/' ? 'informacion' : pathname.split('/').pop();
        let itemActivo = data.find(fila => fila.href === `/${path}` || fila.texto.toLowerCase() === path);
        if (!itemActivo && path === 'informacion') {
            itemActivo = data.find(fila => parseInt(fila.id) === 2);
        }
        setSelMenu(itemActivo ? itemActivo.texto : "Informacion");
    }
      

    return (
        <>
            <ul className="nav flex-column flex-sm-row justify-content-center bg-white p-2 overflow-auto sticky-top" >
                <div className="d-flex flex-nowrap align-items-center justify-content-center justify-content-lg-start">
                    {datos.map((fila, index) => (
                        <li key={index} className="nav-item fw-bold">
                            {fila.texto === 'Logo' ? (
                                <Image src={'./imagenes/'+fila.href} alt="Logo" style={{ zoom: '0.5' }} />
                            ) : (
                                <a className={`nav-link custom-sombra fs-4 ${fila.texto && fila.texto.toLowerCase() === selMenu.toLowerCase() ? 'text-light active bgProyect mx-2 rounded-5' : 'text-dark'}`} href={fila.href ? `../${fila.href}` : undefined}>
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