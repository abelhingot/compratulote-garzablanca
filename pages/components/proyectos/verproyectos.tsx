"use client"
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import COMProductoBuscar from '../proyectos/buscador'
import CBreadcrumb from '../informacion/pagebardump'
import COMPProyectosResultados from '../proyectos/proyectosresultado'
export default function VerProyectos() {
    const searchParams = useSearchParams()
    //const [data, setData] = useState([]);
    const [departamento,setDepartamento]=useState({label:searchParams.get('departamento')||'Departamento / Región',value:searchParams.get('departamento')||''});
    const [ListDepartamentos, setListDepartamentos]= useState([]);
    const [textosearch,setTextosearch]=useState(searchParams.get('proyecto')||'');
       

    return(
        <>
        <COMProductoBuscar setDepartamento={setDepartamento} setListDeparamentos={ListDepartamentos} setTextosearch={setTextosearch} />
        <CBreadcrumb page="proyectos"/>
        <COMPProyectosResultados departamento={departamento} textosearch={textosearch}/>
        </>
    )
}  