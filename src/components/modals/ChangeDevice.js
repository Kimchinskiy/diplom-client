import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Dropdown, Form, Row, Col } from 'react-bootstrap';
import { Context } from '../../index';
import { updateDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import DeviceList from '../DeviceList'; // добавлен импорт

const ChangeDevice = observer(({ show, onHide, selectedDevice, devicesList }) => {
  const { device } = useContext(Context);
  const [changeType, setChangeType] = useState('device');
  const [name, setName] = useState(selectedDevice?.name || '');
  const [price, setPrice] = useState(selectedDevice?.price || 0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState(selectedDevice?.info || []);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, [device]);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const updateDeviceHandler = () => {
    if (changeType === 'device') {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', `${price}`);
      formData.append('img', file);
      formData.append('brandId', device.selectedBrand?.id || '');
      formData.append('typeId', device.selectedType?.id || '');
      formData.append('info', JSON.stringify(info));
      updateDevice(selectedDevice?.id || '', formData).then((data) => onHide());
    } else if (changeType === 'brand') {
      // Логика для изменения бренда
    } else if (changeType === 'type') {
      // Логика для изменения типа
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Изменить устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <DeviceList devices={devicesList} onSelect={(selected) => console.log(selected)} />
        <Form>
          <Dropdown className="mt-3">
            <Dropdown.Toggle>{changeType === 'device' ? device.selectedType.name || 'Выберите тип' : changeType === 'brand' ? device.selectedBrand.name || 'Выберите бренд' : 'Выберите тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => {
                    device.setSelectedType(type);
                    setChangeType('device');
                  }}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-3">
            <Dropdown.Toggle>{changeType === 'device' ? device.selectedBrand.name || 'Выберите бренд' : changeType === 'brand' ? device.selectedBrand.name || 'Выберите бренд' : 'Выберите бренд'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => {
                    device.setSelectedBrand(brand);
                    setChangeType('brand');
                  }}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            className="mt-3"
            placeholder="Введите название устройства"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите цену устройства"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant={'outline-dark'} onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={'outline-danger'}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={updateDeviceHandler}>
          Изменить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeDevice;
