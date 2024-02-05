import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const Test = () => {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    fetch('https://sheet.best/api/sheets/7ae0c5f0-997f-4c88-935e-f4a58678ff5e')
      .then(response => response.json())
      .then(data => {
        if (data.length > 1) {
          const headers = Object.values(data[0]);
          const rows = data.slice(1).map(row => {
            let obj = {};
            Object.entries(row).forEach(([key, value]) => {
              const columnName = headers[key];
              if (columnName) {
                obj[columnName] = value;
              }
            });
            return obj;
          });
          setDatos(rows);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);



  return (
    <>
      <div className="App">
        <Table hover responsive className="scroll text-nowrap">
          <thead >
            <tr className='table-secondary'>
              <th scope="col">Id</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">APELLIDOS</th>
              <th scope="col">DNI</th>
              <th scope="col">CELULAR</th>
              <th scope="col">CORREO</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, index) => (
              <tr key={index}>
                <td>{fila.id}</td>
                <td>{fila.nombre}</td>
                <td>{fila.apellidos}</td>
                <td>{fila.dni}</td>
                <td>{fila.celular}</td>
                <td>{fila.correo}</td>
              </tr>
            ))}
          </tbody>

        </Table>
      </div>
    </>
  );

}
export default Test

