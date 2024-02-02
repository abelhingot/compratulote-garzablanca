// Importa React, useState y useEffect
import React, { useState, useEffect } from 'react';
import {Image} from "react-bootstrap"
// Define tu componente CVernoticias
export default function CVernoticias(props: any) {
  // Estado para almacenar las noticias
  const [noticias, setNoticias] = useState<any[]>([]);

  // Efecto para cargar las noticias al montar el componente
  useEffect(() => {
    // Utiliza fetch para obtener los datos del archivo JSON
    fetch("/json/noticias.json")
      .then(res => res.json())
      .then((data) => {
        // Actualiza el estado con las noticias
        setNoticias(data["noticias"]);
      })
      .catch((error) => {
        console.error('Error fetching noticias:', error);
      });
  }, []);

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const MesesName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
    const date = new Date(dateString);
    return MesesName[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  };

  // Si las noticias aún no se han cargado, muestra un mensaje de carga
  if (noticias.length === 0) {
    return <div>Cargando...</div>;
  }

  // Busca la noticia con el ID proporcionado
  const noticia = noticias.find(inoticia => inoticia.id == props.idnoticia);

  // Si no se encuentra la noticia, muestra un mensaje
  if (!noticia) {
    return <div>No se encontró la noticia solicitada</div>;
  }

  // Si se encuentra la noticia, muestra los detalles
  return (
    <>
      <div className="row" key={noticia.id + "1"}>
        <div className="col tituloComponentes">
          <strong>{noticia.titulo}</strong>
        </div>
        <div className='col-md-12 col-sm-12 text-start '>
          <span className='user'>{noticia.usuario}</span>
          <span className='date border-rounted'>{formatDate(noticia.fecha_publicacion)}</span> |
          <span className='ncomment'>{noticia.numero_comentarios + ' comentarios '}</span>
        </div>
      </div>
      <div>
        <div className="row bg-blanco rounded">
          <div className="col-md-12 ">
            <Image className="img-fluid noticiasimagen" src={noticia.imagen} alt={noticia.titulo} />
          </div>
          <div className="col-md-12 noticiadescipcion" dangerouslySetInnerHTML={{ __html: noticia.descripcion }}></div>
        </div>
      </div>
    </>
  );
}
