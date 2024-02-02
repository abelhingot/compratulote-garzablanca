"use client"
import React, { useState, useEffect } from 'react'
export default function CCategoriasnoticias(props: any) {
   const [categoria, setCategorias] = useState([]);
   const menutmp = props.menu || 'noticias';
   useEffect(() => {
      fetch("./json/noticias.json")
         .then(res => res.json())
         .then((data) => {
            let cate: any = [...new Set(data["noticias"].map((p: { categoria: any; }) => p.categoria))];
            setCategorias(cate);         
         })
   }, [])
   return(
      <div className='listcategorias'>
      <div className="list-group tituloComponentes" id="list-tab" role="tablist">
         <a className="list-group-item categoriatitulo " id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">
            <i className="fe fe-award"></i>Categorias</a>
      {
         categoria.map((cate:any,key:any)=>{
            return(                
               <a key={'cate_'+key} className="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">
                  <i className="fe fe-check-square fw-bold"></i> 
                  {cate}</a>            
             )
         })
      } </div>
      
      </div>
   )
}