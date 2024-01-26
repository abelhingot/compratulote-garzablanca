import { useState } from "react";

export default function CFormulario() {
   const [formData, setFormData] = useState({
      id: '',
      nombre: '',
      apellidos: '',
      dni:'',
      celular: '',
      correo: ''
   });
   const handleInputChange = (field, value) => {
      setFormData((prevData) => ({
         ...prevData,
         [field]: value,
      }));
   };
   const handleSaveClick = () => {
      fetch('http://localhost:3001/pgcontactame', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
      })
         .then((response) => response.json())
         .then((data) => {
            console.log('Datos guardados:', data);
            
         })
         .catch((error) => {
            console.error('Error al guardar datos:', error);
         });
   };
   return (
      <>
         <div className="col-md-5 col-lg-4 ">
            <div className="no-left-top-shadow rounded-3">
               <div className="bgProyect2 border p-3" style={{ borderStartStartRadius: '13px', borderTopRightRadius: '13px' }}>
                  <h3 className="text-light fw-bold text-center">Quiero que
                     me contacten</h3>
               </div>
               <form className="needs-validation border mb-5 p-4 rounded-bottom-1">
                  <div className="row g-3">
                     <div className="col-12">
                     <input type="text" className="form-control rounded-0" id="id" required value={formData.id} onChange={(e) => handleInputChange('id', e.target.value)} hidden/>
                        <label className="form-label">Nombres:</label>
                        <div className="input-group has-validation">
                           <input type="text" className="form-control rounded-0" id="nombres"
                              placeholder="Ingresa tu nombre" required value={formData.nombre} onChange={(e) => handleInputChange('nombre', e.target.value)} />
                        </div>
                     </div>
                     <div className="col-12">
                        <label className="form-label">Apellidos:</label>
                        <div className="input-group has-validation">
                           <input type="text" className="form-control rounded-0" id="apellidos"
                              placeholder="Ingresa tus apellidos" required value={formData.apellidos} onChange={(e) => handleInputChange('apellidos', e.target.value)} />
                        </div>
                     </div>
                     <div className="col-12">
                        <label className="form-label">DNI:</label>
                        <div className="input-group has-validation">
                           <input type="text" className="form-control rounded-0" id="dni"
                              placeholder="N° DE DNI" required value={formData.dni} onChange={(e) => handleInputChange('dni', e.target.value)} />
                        </div>
                     </div>
                     <div className="col-12">
                        <label className="form-label">CELULAR:</label>
                        <div className="input-group has-validation">
                           <input type="text" className="form-control rounded-0" id="celular"
                              placeholder="N° de Celular" required value={formData.celular} onChange={(e) => handleInputChange('celular', e.target.value)} />
                        </div>
                     </div>
                     <div className="col-12">
                        <label className="form-label">CORREO:</label>
                        <div className="input-group has-validation">
                           <input type="text" className="form-control rounded-0" id="correo"
                              placeholder="Correo Electrónico" required value={formData.correo} onChange={(e) => handleInputChange('correo', e.target.value)} />
                        </div>
                     </div>
                  </div>
                  <hr className="my-4 border-0" />
                  <button className="w-100 btn btn-dark btn-lg fw-bold rounded-0"
                     type="submit" onClick={() => handleSaveClick()}>ENVIAR</button>
                  <br />
               </form>
            </div>
         </div>
      </>
   )
}