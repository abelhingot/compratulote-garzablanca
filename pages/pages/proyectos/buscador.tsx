"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Select from 'react-select'
//import './buscador.css'
export default  function CProductoBuscar(props:any){
    
    const router = useRouter();
    const searchParams = useSearchParams()
    //const [data, setData] = useState([]);
    const [departamento,setDepartamento]=useState({label:searchParams.get('departamento')||'Departamento / Región',value:searchParams.get('departamento')||''});
    const [ListDepartamentos, setListDepartamentos]= useState([]);
    const [textosearch,setTextosearch]=useState(searchParams.get('proyecto')||'');
    useEffect(() => {
        fetch("../../json/proyectos.json")
        .then(res => res.json())
        .then((data) => {
            let datatmp=data.data;
            //let ListDepartamentostmp:any=[...new Set(datatmp.map((p: {departamento: any; })=>p.departamento))];
            //setListDepartamentos(ListDepartamentostmp);
            //let cate: any = [...new Set(data["data"].sort((firstItem:any, secondItem:any)=>(
            //   new Date(firstItem.fecha_publicacion) < new Date(secondItem.fecha_publicacion))?1:(
            //   new Date(firstItem.fecha_publicacion) > new Date(secondItem.fecha_publicacion))?-1:0))];                
            //setData(datatmp);  
                           
            })
    }, [])
    const onSeleccionarDepartamento=(event:any)=>{
        setDepartamento({label:event.label,value:event.value});
        if(props.setDepartamento) props.setDepartamento(departamento);
    }
    const onSeleccionarTextoSearch=(event:any)=>{
        setTextosearch(event.target.value);
        if(props.setTextosearch) props.setTextosearch(event.target.value);
    } 
    const buscarproyecto=()=>{       
        router.push(
            `/proyectos/?proyecto=${textosearch}&departamento=${departamento.value}`,
            );
    }
    return(
        <div className='bg-blanco' key={'buscador1'}>
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-sm-12 tituloComponentes">                 
                ENCUENTRA  <strong>TU PROYECTO IDEAL</strong>   
                </div>
            </div> 
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <input className='form-control inputsearch' id="search" defaultValue={textosearch} placeholder='Nombre del proyecto' onBlur={onSeleccionarTextoSearch}  />
                
                </div>
                <div className="col-md-4 col-sm-12">
                <Select  className='selectcomplete mb-3'
                 id={'selecdepa'}
                 defaultValue={departamento}
                 options={ListDepartamentos.map(item => ({label:item, value:item}))}
                 onChange={onSeleccionarDepartamento}
                />
                </div>
                <div className="col-md-2 col-sm-12">
                 <a className="btn btn-lg btn-color1" onClick={buscarproyecto} >
                    Buscar <i className="bi bi-search "></i>
                  </a>
                </div>
            </div>
        </div>
        </div>
    )
}