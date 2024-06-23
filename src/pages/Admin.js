// client/src/pages/Admin.js

import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';
import CreateBrand from '../components/modals/CreateBrand';
import DeleteDevice from '../components/modals/DeleteDevice';
import ChangeDevice from '../components/modals/ChangeDevice';

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [changeVisible, setChangeVisible] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [deviceCount, setDeviceCount] = useState(0);
  const [brandCount, setBrandCount] = useState(0);
  const [typeCount, setTypeCount] = useState(0);


  return (
    <Container className='d-flex flex-column'>
      <Row>
        <Col sm={3}>
          <Button
            variant="outline-dark"
            className="mt-4 p-2"
            style={{ width: '300px' }}
            onClick={() => setTypeVisible(true)}
          >
            Добавить тип
          </Button>
          <Button
            variant="outline-dark"
            className="mt-4 p-2"
            style={{ width: '300px' }}
            onClick={() => setBrandVisible(true)}
          >
            Добавить бренд
          </Button>
          <Button
            variant="outline-dark"
            className="mt-4 p-2"
            style={{ width: '300px' }}
            onClick={() => setDeviceVisible(true)}
          >
            Добавить устройство
          </Button>
          <Button
            variant="outline-dark"
            className="mt-4 p-2"
            style={{ width: '300px' }}
            onClick={() => setDeleteVisible(true)}
          >
            Удалить устройство
          </Button>
          <Button
            variant="outline-dark"
            className="mt-4 p-2"
            style={{ width: '300px' }}
            onClick={() => setChangeVisible(true)}
          >
            Изменить устройство
          </Button>
        </Col>
        <Col sm={9}>
          <Card className="mt-4 p-3">
            <Card.Body>
              <Card.Title>Статистика</Card.Title>
              <Card.Text>
                Пользователей: 5<br />
                Устройств: 13 <br />
                Брендов: 9<br />
                Категорий товаров: 8<br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <DeleteDevice show={deleteVisible} onHide={() => setDeleteVisible(false)} />
      <ChangeDevice show={changeVisible} onHide={() => setChangeVisible(false)} />
    </Container>
  );
};

export default Admin;
