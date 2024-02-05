"use client"
import CFooter from './components/estructura/footer'
import CFormulario from './components/estructura/formulario'
import CTop from './components/estructura/top'
import CAdorno from './components/estructura/adorno'
import { Card, Row } from 'react-bootstrap'
import CUbicacion from './components/estructura/ubicacion'
import { useEffect, useState } from 'react'
export default function EstructuraInicio() {
  const [datos, setDatos] = useState([]);
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
          const datosFiltrados = rows.filter(fila => fila.categoria === "infoup");
          setDatos(datosFiltrados);

        }
      })
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <>
      <Row className='bg-white m-0'>
        <Card className='p-0'>
          <CTop />
          <div className="x_content" >
            <CAdorno />
            <div className="container">
              <div className="row g-5">
                {datos.map((fila, index) => (
                  <div className="col-md-7 col-lg-8" key={index}>
                    <h2 className="fw-bold cProyect">{fila.titulo}</h2>
                    <div className="container mt-4">
                      
                      <div className="row">
                        <div className="d-grid gap-2 d-md-block pb-3">
                          <a href="#"> 
                          <button className="btn btnProyect text-light fw-bold" type="button">{fila.subtitulo}</button></a>&nbsp;
                          <a href="#">
                            <button className="btn btn-secondary fw-bold" type="button">{fila.imagen}</button></a>
                        </div>
                        <iframe src={fila.mensaje} width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      </div>

                    </div>
                  </div>
                ))}
                <CFormulario />
                <hr className="my-4 cProyect border-3" />
                <CUbicacion />

              </div>
            </div>
          </div>
          <CFooter rutatmp='./../../' />
        </Card>
      </Row>
    </>
  )
}
