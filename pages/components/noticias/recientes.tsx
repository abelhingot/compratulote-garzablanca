"use client"
import React, { useState, useEffect } from 'react'
import {Image} from "react-bootstrap"
export default function CRecientesnoticias(props: any) {
   const [categoria, setCategorias] = useState([]);
   const menutmp = props.menu || 'noticias';
   useEffect(() => {
      fetch("./json/noticias.json")
         .then(res => res.json())
         .then((data) => {
            let cate: any = [...new Set(data["noticias"].sort((firstItem:any, secondItem:any)=>(
                new Date(firstItem.fecha_publicacion) < new Date(secondItem.fecha_publicacion))?1:(
                new Date(firstItem.fecha_publicacion) > new Date(secondItem.fecha_publicacion))?-1:0))];
            setCategorias(cate);         
         })
   }, [])
   const MesesName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

 //  (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0
   return(
    <div className='listnoticiasrecientes' key={'reskey'}>
    <div className="list-group tituloComponentes" id="list-tab" role="tablist">
        <a className="list-group-item categoriatitulo " id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">
         <i className="fe fe-award"></i>Noticas Recientes </a>
        {
             categoria.map((cate:any,key:any)=>{
                let datetmp= new Date(cate.fecha_publicacion);   
                return(<div className='card' key={'noti_'+cate.id}>
                 <Image className='img-fluid' src={cate.imagen} alt=""/>
                 <h3 className='tituloComponentes'>{cate.titulo} <br/>                   
                 </h3>
                 <div className='row userdata'> 
                    <div className='col-md-12 col-sm-12 text-start '><span className='user'>{cate.usuario}</span> 
                        <span className='date border-rounted'>{MesesName[datetmp.getMonth()]+' '+datetmp.getDay()+', '+datetmp.getFullYear()}</span> | 
                        <span  className='ncomment'>{cate.numero_comentarios + ' comentarios '}</span>
                    </div>
                 </div>
                 <a href='./noticias' className='btn btn-danger btnleermas'>Leer mas &gt;&gt;</a>
                </div>              
                
                )
            })
        } 
    </div>      
    </div>
   )
}