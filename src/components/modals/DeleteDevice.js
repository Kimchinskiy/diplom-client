import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Modal, Button, Form, ListGroup, Row, Col, Dropdown } from 'react-bootstrap';
import { Context } from '../../index';
import { fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI';

const DeleteDevice = observer(({ show, onHide, onDeleteDevice }) => {
  const { device } = useContext(Context);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleDeviceSelect = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  const handleDelete = async () => {
    if (selectedDevice) {
      await onDeleteDevice(selectedDevice);
      await device.setDevices(await fetchDevices()); // Повторная загрузка устройств после удаления
      setSelectedDevice(null); // Очистка выбранного устройства
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Dropdown className='mt-3'>
                <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {device.types.map((type) => (
                    <Dropdown.Item
                      onClick={() => device.setSelectedType(type)}
                      key={type.id}
                    >
                      {type.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown className='mt-3'>
                <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {device.brands.map((brand) => (
                    <Dropdown.Item
                      onClick={() => device.setSelectedBrand(brand)}
                      key={brand.id}
                    >
                      {brand.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <ListGroup>
            {device.devices.map((device) => (
              <ListGroup.Item
                key={device.id}
                action
                onClick={() => handleDeviceSelect(device.id)}
                active={selectedDevice === device.id}
              >
                {device.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Закрыть
        </Button>
        <Button variant='danger' onClick={handleDelete}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteDevice;

