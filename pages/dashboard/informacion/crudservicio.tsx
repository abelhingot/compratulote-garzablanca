import Link from 'next/link';
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CrudServicio = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        id: '',
        categoria: '',
        titulo: '',
        texto: '',
        imagen: '',
        estado: ''

    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    const filteredMenus = datos.filter((fila) =>
        (fila.texto.toLowerCase().includes(searchTerm.toLowerCase()) || fila.titulo.toLowerCase().includes(searchTerm.toLowerCase())));

        useEffect(() => {
            const verificador = window.location.pathname.split('/');
            const rptAPI = verificador[verificador.length - 1];
            fetch('../../api/db.json')
                .then(response => response.json())
                .then(json => {
                    const data: any[] = json.serviciosES;
                    const filtrado = data.filter(fila => fila.categoria === rptAPI);
                    setDatos(filtrado);
                    
                })
                .catch(error => console.error('Tenemos un error', error));
        }, []);



    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch(`http://localhost:3001/serviciosES/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    categoria: data.categoria,
                    titulo: data.titulo,
                    texto: data.texto,
                    imagen: data.imagen,
                    estado: data.estado

                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };

    const handleSaveClick = () => {
        // Verifica si ya existe un elemento con el mismo ID en el caso de que sea un registro nuevo.
        if (!editItemId && datos.some(item => item.id === formData.id)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ya existe un registro con este ID. Por favor, utiliza un ID diferente.',
            });
            return; // Detiene la ejecución de la función aquí si se encuentra un ID duplicado.
        }

        const url = editItemId ? `http://localhost:3001/serviciosES/${editItemId}` : 'http://localhost:3001/serviciosES';
        const method = editItemId ? 'PUT' : 'POST';
    
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Datos guardados o actualizados:', data);
            if(editItemId) {
                // Es una actualización, reemplaza el elemento actualizado en el estado
                setDatos(datos.map(item => item.id === editItemId ? data : item));
            } else {
                // Es un nuevo elemento, añádelo al estado
                setDatos(prevDatos => [...prevDatos, data]);
            }
            setLgShow(false); // Cierra el modal
            setEditItemId(null); // Resetea el ID de edición
            // handleCleanClick(); // Limpia el formulario
        });
    };
    

    const handleDeleteClick = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: "¿Seguro de querer eliminar?",
            text: "Si elimina, no se puede deshacer los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3001/serviciosES/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                    // Primero, filtra el elemento eliminado
                    const datosActualizados = datos.filter((fila) => fila.id !== id);
                    // Luego, si necesitas filtrar por categoría, lo haces en los datos actualizados
                    const datosFiltradosPorCategoria = datosActualizados.filter((fila) => fila.categoria === "informacion");
                    setDatos(datosFiltradosPorCategoria);
                })
                .catch((error) => {
                    console.error('Error al eliminar datos:', error);
                });
    
                swalWithBootstrapButtons.fire({
                    title: "Operación Exitosa!",
                    text: "Su archivo ha sido eliminado.",
                    icon: "success"
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Operación cancelada",
                    text: "Archivo aún conservado",
                    icon: "error"
                });
            }
        });
    };
    

    const handleCleanClick=()=>{
        const shouldDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");
        if(shouldDelete){
            setFormData({
                id: formData.id,
                categoria: formData.categoria,
                titulo: "",
                texto: "",
                imagen: "",
                estado: ""

            });
        }else {
            // Muestra un mensaje de operación cancelada si el usuario selecciona "Cancelar"
            Swal.fire({
                icon: 'error',
                title: 'Operación cancelada',
                text: 'No se ha eliminado ningún registro.',
            });
        }    
    }
    
    const handleOpenRegistrarModal = () => {
        setEditItemId(null); // Asegúrate de limpiar el ID de edición si lo estás usando
        setFormData({
            // Inicializa el formulario para un nuevo registro
            id: '',
            categoria: 'informacion', // Establece 'informacion' como valor por defecto para la categoría
            titulo: '',
            texto: '',
            imagen: '',
            estado: '' // Puedes establecer un valor por defecto para el estado si lo necesitas
        });
        setLgShow(true); // Hace visible el modal
    };
    
    
    
    return (
        <>

            <br />
            <Row className="mb-8 m-1">
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <div className="mb-4 mb-lg-0">
                                <br />
                                <div className='row text-end'>
                                    <div className='col-md-6 col-lg-6 col-xs-6'>
                                        &nbsp;
                                    </div>
                                    <div className='col-md-4 col-lg-4 col-xs-4 '>
                                        <input type='search' placeholder='Nueva busqueda' className='form-control' onChange={(event) => setSearchTerm(event.target.value)}></input>
                                    </div>
                                    <div className='col'>
                                        {/* <Button onClick={() => setLgShow(true)}>REGISTRAR</Button>{' '} */}
                                        {/*  Y en tu botón, utiliza esta nueva función para el evento onClick */}
                                        <Button onClick={handleOpenRegistrarModal}>REGISTRAR</Button>{' '}
                                    </div>
                                </div>  
                                <br />
                                <Table hover responsive className="scroll text-nowrap">
                                    <thead >
                                        <tr className='table-secondary'>
                                            <th scope="col">Id</th>
                                            <th scope="col">Categoria</th>
                                            <th scope="col">Titulo</th>
                                            <th scope="col">Texto</th>
                                            <th scope="col">Imagen</th>
                                            <th scope='col'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMenus.map((fila, index) => (
                                            <tr key={fila.id}>
                                                <td>{fila.id}</td>
                                                <td>{fila.categoria}</td>
                                                <td>{fila.titulo}</td>
                                                <td><textarea className='form-control no-scroll' value={fila.texto} style={{ width: '350px', border: 'none', overflowY: 'hidden', backgroundColor: 'white' }} disabled /></td>
                                                <td><Image src={fila.imagen} className='img-thumbnail' alt=""/></td>
                                                <td>
                                                    <Button onClick={() => handleEditClick(fila.id)} >  <i className="fe fe-edit fa-lg text-light"></i>   </Button>{' '}
                                                    <Button onClick={() => handleDeleteClick(fila.id)} className='btn-danger'><i className="fe fe-trash fa-lg"></i></Button>{' '}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Fragment>
                <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg" >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <h4 ><strong>MANTENIMIENTO:</strong> Página Menu</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col xl={12} lg={12} md={12} xs={12} className='p-2'>
                            <div>
                                <Form>
                                    <Row className="mb-3">
                                        <div className="col-md-6 col-sm-6 col-6">
                                            <input type="text" className="form-control" placeholder="Id" value={formData.id} onChange={(e) => handleInputChange('id', e.target.value)} />
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className='form-check form-switch '>
                                                <label className="form-check-label" style={{ alignItems: 'center' }}>Mostrar el contenido</label>
                                                <input className="form-check-input" style={{ marginRight: '5px', alignItems: 'center', fontSize: '16px' }} type="checkbox" role="switch"
                                                    checked={Boolean(formData.estado)} onChange={(e) => handleInputChange('estado', e.target.checked)} />
                                            </div>
                                        </div>
                                    </Row>

                                    <Row className='mb-3'>
                                        <div className="col-md-6 col-sm-6 col-6">
                                            <input type="text" className="form-control" placeholder="Titulo" value={formData.titulo} onChange={(e) => handleInputChange('titulo', e.target.value)} />
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <input type="text" className="form-control" placeholder="Categoria" disabled value={formData.categoria} onChange={(e) => handleInputChange('titulo', e.target.value)} />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <div className='col-md-12 col-12 text-center'>
                                            <input type="text" className="form-control" placeholder="Texto" value={formData.texto} onChange={(e) => handleInputChange('texto', e.target.value)} />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <div className="col-md-12 col-12">
                                            <input className="form-control" type="text" placeholder="Imagen: /ruta/imagen.png" value={formData.imagen} onChange={(e) => handleInputChange('imagen', e.target.value)} />
                                        </div>
                                    </Row>

                                    <Row className="mb-3 text-end">

                                        <Col md={12} xs={12}>
                                            <Button className="btn btn-primary" onClick={(e) => handleSaveClick()}>GUARDAR</Button>

                                            &nbsp;
                                            <Button className="btn btn-primary" type="reset" onClick={()=>handleCleanClick()}>LIMPIAR</Button>
                                        </Col>
                                    </Row>

                                </Form>
                            </div>

                        </Col>
                    </Modal.Body>

                </Modal>
            </Fragment>

        </>
    )
}

export default CrudServicio