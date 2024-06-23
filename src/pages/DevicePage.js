import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Container, Image, ProgressBar, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from "../http/deviceAPI";
import { Context } from '../index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/cards.css';  // Импорт анимаций


const DevicePage = () => {
  const [device, setDevice] = useState({ info: [], brand: {} });
  const { id } = useParams();
  const { basket } = useContext(Context);

  useEffect(() => {
    fetchOneDevice(id)
      .then(data => {
        if (data) {
          setDevice(data);
        }
      })
      .catch(error => {
        console.error('Error fetching device:', error);
      });
  }, [id]);

  const handleAddToBasket = () => {
    basket.addItem({
      id: device.id,
      name: `${device.brand && device.brand.name ? device.brand.name : ''} ${device.name}`,
      price: device.price,
      img: device.img 
    });
    toast.success(`${device.brand && device.brand.name ? device.brand.name : ''} ${device.name} добавлен в корзину!`);
  };

    return (
      <Container className="mt-3">
        <Row>
          <Col md={12}>
            <h2
              style={{
                fontFamily: 'Montserrat',
                fontSize: "32px"
              }}
              className="mb-3 fade-in">{device.brand && device.brand.name ? `${device.brand.name} ${device.name}` : device.name}</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="fade-in">
            <Image
              width={500}
              height={500}
              src={process.env.REACT_APP_API_URL + device.img}
              style={{ objectFit: 'contain' }}
            />
          </Col>
  
          <Col md={6}>
            <Card className="p-4 fade-in" style={{ borderRadius: '25px', height: "200px" }}>
              <Row className="mb-3">
                <Col md={6} className="d-flex align-items-center">
                  <p style={{
                    fontFamily: "Montserrat",
                    fontSize: "20px",
                    marginRight: '10px',
                    marginBottom: 0
                  }}>
                    Рейтинг устройства
                  </p>
                  <ProgressBar
                    now={device.rating * 20}
                    label={`${device.rating}/5`}
                    style={{
                      width: '70%',
                      height: '25px',
                      fontFamily: "Montserrat",
                      borderRadius: '15px',
                      fontWeight: "bold",
                      fontSize: '16px'
                    }}
                  />
                </Col>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                  <h3 style={{ color: 'green', marginBottom: '10px', fontFamily: 'Montserrat' }}>
                    Цена: {device.price ? device.price.toLocaleString() : 'N/A'} &#8381;
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="success"
                    style={{ width: '200px', 
                      borderRadius: '15px',
                      fontFamily: 'Montserrat',
                      height: "50px" }}
                    onClick={handleAddToBasket}
                  >
                    Добавить в корзину
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3 fade-in">
          <Col>
            <h1
              style={{
                fontFamily: 'Montserrat',
                fontSize: "32px"
              }}>
              Характеристики
            </h1>
            <ul className="list-group">
              {device.info.map((info, index) => (
                <li
                  key={info.id}
                  className={`list-group-item ${index % 2 === 0 ? 'even' : 'odd'}`}
                  style={{ maxWidth: '100%' }}
                >
                  <strong>{info.title}:</strong> {info.description}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <ToastContainer autoClose={3000} />
      </Container>
    );
};

export default DevicePage;
