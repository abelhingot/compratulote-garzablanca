export default function CBreadcrumb(props:any) {
    return(
        <>
            <div className='row bg-blanco'>
                <div className="col-md-12">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-12 col-md-12'>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item "><a href="./" className='tituloComponentes'>Inicio</a></li>
                                        <li className="breadcrumb-item active tituloComponentes" aria-current="page"><strong>{props.page}</strong></li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}