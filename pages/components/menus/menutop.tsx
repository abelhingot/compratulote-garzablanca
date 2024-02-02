"use client"
import React, { useState, useEffect } from 'react'
export default function CMenusTop(props:any) { 
   const menu: String = props.menu || 'inicio'; 
   const keystring: string = props.keystring || menu;
   const [menus, setMenus] = useState([]);
   useEffect(() => {
      fetch("./json/menus.json")
         .then(res => res.json())
         .then((data) => {
            setMenus(data.data)
         })
   }, [])


   return ( 
        <>
         <div className="container-fluid  menuprincipal">
            <div className="row">
               <div className="col">
               <nav className="navbar navbar-expand-lg justify-content-center menuprincipalcentro">
                  <div>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse contentmenu" id="navbarSupportedContent">
                     <ul className="nav me-auto mb-2 mb-lg-0 justify-content-center">
                           {
                              menus.map((item: any) => {
                                 return (<li className={menu.toLowerCase()==item.texto.toLowerCase()?"nav-item active":"nav-item"} key={keystring + '_' + item.id}>
                                    {item.showicontop && <i className={item.icon}></i>}
                                    <a className={menu.toLowerCase()==item.texto.toLowerCase()?"nav-link active":"nav-link"} aria-current="page"  href={item.href} >
                                       {item.texto}
                                    </a>
                                 </li>)
                              })
                           }
                     </ul>
                  </div>
                  </div>
               </nav>
               </div>
            </div>
         </div>
        </>)
}