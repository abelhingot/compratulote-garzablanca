"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import CProyectovista from './vista2';
import CPaginate from '../../components/tools/paginacion';
import CAnuncios from '../../components/slider/anuncios';
export default  function ProyectosResultados(props:any){
    const [data, setData] = useState([]);
    const [currentpage,setCurrentpage]=useState(1);
    const totalregistroxpage=6;
    const router = useRouter();
    let textosearch = router.query.proyecto || props.textosearch || '';
    let selDepartamento = router.query.departamento || "";
    
    let datatmp:any[]=[];
    useEffect(() => {
        fetch("./json/proyectos.json")
            .then(res => res.json())
            .then((data) =>{               
                setData(data.data);                
            })
    }, [])

    if(textosearch!='' || selDepartamento!=''){
        datatmp = data.filter((firstItem:any)=>{                      
            let titulo:string= firstItem.titulo.toLowerCase()||'';
            if(textosearch && selDepartamento){
                return titulo.includes(textosearch.toLowerCase()) && firstItem.departamento == selDepartamento
            }else if(textosearch!=''){
                return titulo.includes(textosearch.toLowerCase())
            }else {
                return firstItem.departamento == selDepartamento
            }
                                     
        });
        console.log('data',data);
        console.log('datatmp',datatmp);
    }else{
        datatmp=data;
    }

    const totalPages=Math.ceil(datatmp.length/totalregistroxpage);
    const indexpages = Array.from({ length: totalPages }, (_, index) => ({ id: `${index + 1}`, activo: index==currentpage-1?`si`:`no`}));
    const indexdesde=currentpage*totalregistroxpage;
    const indexhasta= (currentpage)*totalregistroxpage;
    const items =datatmp.slice(0,indexhasta);
    return (
        <>
        <div className='container'>
            <div className="row">
                <div className="col-md-9 col-sm-8 col-xs-12">
                    <div className="row listadoproyectos2">
                        {
                            items.map((itemp:any,key:any)=>{
                                return(
                                    <div className="col-md-12 col-sm-12 col-12" key={'divp'+key}>
                                        <CProyectovista {...itemp} />                    
                                    </div>                
                                )
                            })
                        }
                        {           
                            <div className={ currentpage<totalPages?'paginacion text-center':'ocultarpaginacion'}>
                               <CPaginate {...indexpages}/>           
                            </div>
                        }
                    </div>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-12">
                    <CAnuncios />
                    <CAnuncios />
                    <CAnuncios />
                </div>
            </div>
        </div>        
        </>
    )
}