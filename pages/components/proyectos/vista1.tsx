export default function CProyectovista1(itemp:any) {
    return(
        <div key={'divp'+itemp.id}>           
            <div className="card" key={'cardp'+itemp.id}>
                <img key={'imgp'+itemp.id} src={itemp.image} className="card-img-top" alt={'Foto '+itemp.titulo}/>
                <div className="card-body">
                    <span className="h4 card-title">{itemp.titulo}</span>
                    <div className="card-text txtdescripcion my-1">
                        {itemp.descripcion||`---`}
                    </div>
                    <div className="card-text ubicacion row mt-2">
                        <div className="col-2">
                            <i className="fe fe-map-pin fa-2x" />
                        </div>
                        <div className="col-10">
                            <strong>{itemp.direccion}</strong><br/>
                            <small className="text-body-secondary">{itemp.departamento}</small>
                        </div>
                    </div>
                    <div className="row card-footer">
                        <div className="col-6">
                            <a href={itemp.href} className="btn "> Ver Proyecto </a>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-md-3 iconproy"><img src="/images/icons/1.png" className='img-fluid'/></div>
                                <div className="col-md-3 iconproy"><img src="/images/icons/2.png" className='img-fluid'/></div>
                                <div className="col-md-3 iconproy"><img src="/images/icons/3.png" className='img-fluid'/></div>
                                <div className="col-md-3 iconproy"><img src="/images/icons/4.png" className='img-fluid'/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );

}