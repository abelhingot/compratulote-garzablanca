"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
export default function CListadoPublicidad(props: any) {
   const router = useRouter();
   const [data, setData] = useState([]);

   useEffect(() => {
      fetch("./json/publicidad.json")
         .then(res => res.json())
         .then((data) => {
            let cate: any = [...new Set(data["publicidad"].sort((firstItem: any, secondItem: any) => (
               new Date(firstItem.fecha_publicacion) < new Date(secondItem.fecha_publicacion)) ? 1 : (
                  new Date(firstItem.fecha_publicacion) > new Date(secondItem.fecha_publicacion)) ? -1 : 0))];
            setData(cate);
         })
   }, [])

   const MesesName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

   //  (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0
   return (
      <div className='listpublicidad' key={'reskey'}>
         <div className="list-group " id="list-tab" role="tablist">
            {
               data.map((item: any, key: any) => {
                  return (<div className='' key={'noti_' + item.id}>
                     <a href={item.url}><img className='img-fluid imgpublicidad' src={item.imagen} /></a>
                  </div>

                  )
               })
            }
         </div>
      </div>
   )
}