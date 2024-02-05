import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers, } from '@jsonforms/material-renderers';
import { Card, Col, Row } from 'react-bootstrap';
import servicios from '../../../public/json/servicios.json'
const schema = {
  type: "object",
  properties: {
    servicios: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "integer"
          },
          categoria: {
            type: "string"
          },
          titulo: {
            type: "string"
          },
          estado: {
            type: "boolean",
            description: "Mostrar/Ocultar."
          },
          imagen: {
            type: "string"
          }
        }
      }
    }
  }
};

const uischema = {

  type: "VerticalLayout",
  elements: [
    {
      "type": "Control",
      "scope": "#/properties/servicios"
    }
  ]

};



const CrudServicio = () => {
  const [data, setData] = useState(servicios);

  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({ servicios: [] });
  };

  const downloadJson = (data, filename) => {
    const fileData = JSON.stringify(data, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
    <Row className="m-1">
        <Col xl={12} lg={12} md={12} xs={12} >
        <Card style={{background:'white'}} className='p-2'>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data }) => setData(data)}
            />
            <div className='text-end py-3'>
              <button onClick={clearData} className='btn btn-primary m-1'>Limpiar</button>
              <button onClick={() => downloadJson(data, "servicios.json")} className='btn btn-primary m-1'>Descargar</button>
            </div>
          </Card>
      </Col>
      </Row>
      </>
  
  );
};

export default CrudServicio;