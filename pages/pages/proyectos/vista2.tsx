import {Image} from "react-bootstrap"
export default function CProyectovista1(itemp:any) {
    return(
        <div key={'divp'+itemp.id}>           
            <div className="card" key={'cardp'+itemp.id}>
                <div className="row">
                 <div  className="col-md-5">
                <Image key={'imgp'+itemp.id} src={itemp.image} className="card-img-top" alt={'Foto '+itemp.titulo}/>
                        <div className="lotesdesde">Lotes desde <strong>{itemp.lotesdesdem2}</strong></div>    
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">
                                <i className={`fe fe-star${itemp.destacado?'-fill':''} startlistado`}></i>  
                            {itemp.titulo}</h5>
                        <div className="card-text txtdescripcion">
                            {itemp.descripcion||`---`}
                        </div>
                        <div className="card-text ubicacion row">
                            <div className="col-1">
                                <i className="fe fe-map-pin icon" />
                            </div>
                            <div className="col-11">
                                <strong>{itemp.direccion}</strong><br/>
                                <small className="text-body-secondary">{itemp.departamento}</small>
                            </div>
                        </div>
                        <div className="row card-footer">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-md-3 iconproy"><Image src="/images/icons/1.png" className='img-fluid' alt=""/></div>
                                        <div className="col-md-3 iconproy"><Image src="/images/icons/2.png" className='img-fluid' alt=""/></div>
                                        <div className="col-md-3 iconproy"><Image src="/images/icons/3.png" className='img-fluid' alt=""/></div>
                                        <div className="col-md-3 iconproy"><Image src="/images/icons/4.png" className='img-fluid' alt=""/></div>
                                    </div>
                                </div>
                            <div className="col-6 text-end">
                                <a href={itemp.href} className="btn "> Ver Proyecto </a>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div> 
    );

}