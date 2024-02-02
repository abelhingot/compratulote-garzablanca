"use client"
import React, { useState } from 'react'
export default  function CPaginate(props:any){
    const indexpages:any=props.indexpages||[1]
    const [currentpage,setCurrentpage]=useState(0);
    return (
        <div className='paginacion'>
            {
               indexpages.map((item:any,index:any)=>{
                return (
                <div key={'page_'+index+1} className='itempag'>
                 <a  onClick={()=>setCurrentpage(index)} >   {index+1}</a>
                </div>)
               })
            }
        </div>
     )
}