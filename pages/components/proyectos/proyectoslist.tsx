"use client"
import React, { useState, useEffect } from 'react'
import CProyectovista1 from './vista1';
export default  function CProyectosList({tipo=''}){
    const [data, setData] = useState([]);
    const [currentpage,setCurrentpage]=useState(1);
    const totalregistroxpage=6;
    useEffect(() => {
        fetch("./json/proyectos.json")
            .then(res => res.json())
            .then((data) => {
                let datatmp: any;
                if(tipo=='Destacados'){
                    datatmp = [...new Set(data["data"].filter((item:any)=>{
                        return item.destacado==true
                    }).sort((firstItem:any, secondItem:any)=>(firstItem.numerovistas<secondItem.numerovistas)?1:-1))];
                }else if(tipo=='Los mas vistos'){
                    datatmp = [...new Set(data["data"].sort((firstItem:any, secondItem:any)=>(firstItem.numerovistas<secondItem.numerovistas)?1:-1||0))];
                }else
                    datatmp = [...new Set(data["data"].sort((firstItem:any, secondItem:any)=>(
                            new Date(firstItem.fecha_registro) < new Date(secondItem.fecha_registro))?1:-1 || 0))];
                setData(datatmp);         
            })
    }, [])
    const totalPages=Math.ceil(data.length/totalregistroxpage);
    //const indexpages = Array.from({ length: totalPages }, (_, index) => ({ id: `${index + 1}`, activo: index==currentpage-1?`si`:`no`}));
    //const indexdesde=currentpage*totalregistroxpage;
    const indexhasta= (currentpage)*totalregistroxpage;
    const items =data.slice(0,indexhasta);
    return (
        <>
        <div className="row listadoproyectos ">
        {
            items.map((itemp:any,key:any)=>{
                return(
                    <div className="col-md-4 col-sm-6 col-12 " key={'divp'+key}>
                        <CProyectovista1 {...itemp} />    
                        <br />                
                    </div>                
                )
            })
        }
        {           
            <div className={ currentpage<totalPages?'paginacion text-center':'ocultarpaginacion'}>            
                <div className='btn btnvermas' onClick={()=>setCurrentpage(currentpage+1)}>Ver más Proyectos</div>            
            </div>
        }
        </div>
        </>
    )
}