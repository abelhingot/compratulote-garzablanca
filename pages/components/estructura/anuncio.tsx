import { useEffect, useState } from "react";
import { Row, Image } from "react-bootstrap";
export default function CAnuncio() {
  const [datos, setDatos] = useState([]);
  const [banners, setBanners] = useState('');
  useEffect(() => {
    const verificador = window.location.pathname.split('/');
    const rptAPI = verificador[verificador.length - 1];
    fetch('/db.json')
      .then(response => response.json())
      .then(json => {
        const data = json.pginformacion;
        setDatos(data);
        const filtrado = data.filter(fila => fila.categoria.toLowerCase() === rptAPI);
        setDatos(filtrado);
      })
      .catch(error => console.error('Tenemos un error', error));
  }, []);
  return (
    <>
      {datos.map((fila, index) => (
        <div key={index}>
          {fila.categoria === 'empresa' ? (
            <>
              <p className="txt-jf" dangerouslySetInnerHTML={{ __html: fila.content }} /> <Row className="mb-1">
                <div className="col-md-6 col-6">
                  <Image src={fila.recurso1} className='img-thumbnail rounded-4' alt='' />
                </div>

                <div className="col-md-6 col-6">
                  <Image src={fila.recurso2} className='img-thumbnail rounded-4' alt='' />
                </div>
              </Row>
            </>
          ) : (
            <Row className="mb-1">
              <p className="txt-jf" dangerouslySetInnerHTML={{ __html: fila.content }} />

            </Row>
          )}

        </div>
      ))}
    </>
  )
}