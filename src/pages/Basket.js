import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Image, InputGroup, FormControl } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import trash from '../assets/trash.png';
import YooMoneyForm from './YooMoneyForm';
import { Link } from 'react-router-dom';
import '../assets/css/basket.css';

const Basket = observer(() => {
  const { basket } = useContext(Context);
  const [isAgreed, setIsAgreed] = useState(false);

  //Обработчики событий

  const handleAddToBasket = (item) => {
    basket.addItem(item);
  };

  const handleQuantityChange = (itemId, quantity) => {
    const newQuantity = Math.max(0, parseInt(quantity, 10));
    basket.setItemQuantity(itemId, newQuantity);  
  };

  const handleKeyPress = (itemId, e) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    basket.setItemQuantity(itemId, newQuantity);
  };

  const handleDecreaseQuantity = (itemId) => {
    basket.decreaseQuantity(itemId);
  };

  const handleRemoveItem = (itemId) => {
    basket.removeItem(itemId);
  };

  const countUniqueItems = () => {
    return new Set(basket.items.map(item => item.id)).size;
  };

  const calculateTotalOrderPrice = () => {
    return basket.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const totalPrice = calculateTotalOrderPrice();
  const uniqueItemCount = countUniqueItems();

  return (
    //H1
    <Container style={{ position: 'relative', background: 'white' }}> 
      <h1 style={{ marginTop: '20px', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '32px' }}>
        Корзина
        <span style={{ fontSize: '24px', verticalAlign: 'super' }}>{uniqueItemCount}</span>
      </h1>

      {basket.items.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '250px', fontSize: '50px', fontFamily: 'Montserrat', fontWeight: '500' }}>
          Корзина пуста &#128542;
        </div>
      ) : (
        <Row style={{ marginTop: '25px' }}>
          <Col md={8}>
            {basket.items.map(item => (
              <Card
              key={item.id}
              className="basket-item-card"
          >
              <Row className="h-100">
                  <Col md={4} className="d-flex align-items-center justify-content-center">
                      <Image
                          width={225}
                          height={225}
                          src={process.env.REACT_APP_API_URL + item.img}
                          alt={item.name}
                          className="basket-item-image"
                      />
                  </Col>
                  <Col md={8} className="d-flex flex-column justify-content-between">
                      <Card.Body>
                          <Card.Title className="basket-item-title">{item.name}</Card.Title>
                          <Card.Text className="basket-item-price">Цена за штуку: {item.price} ₽</Card.Text>
                          <Card.Text className="basket-item-quantity">Количество: {item.quantity}</Card.Text>
                      </Card.Body>
                      <div className="d-flex justify-content-end align-items-center mb-3">
                          <InputGroup className="quantity-control">
                              <Button
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      handleDecreaseQuantity(item.id);
                                  }}
                                  className="quantity-button"
                              >
                                  -
                              </Button>
                              <FormControl
                                  aria-label="Количество"
                                  aria-describedby="basic-addon1"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                  onBlur={(e) => handleKeyPress(item.id, e)}
                                  onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === 'Escape') {
                                          e.target.blur();
                                      }
                                  }}
                                  className="quantity-input"
                              />
                              <Button
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddToBasket(item);
                                  }}
                                  className="quantity-button"
                              >
                                  +
                              </Button>
                          </InputGroup>
                          <Button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveItem(item.id);
                              }}
                              className="remove-button"
                          >
                              <Image
                                  src={trash}
                                  alt="Delete"
                                  className="remove-icon"
                              />
                          </Button>
                      </div>
                  </Col>
              </Row>
          </Card>
            ))}
          </Col>
          <Col md={4}>
            <Card
              className="mb-3"
              style={{
                width: '100%',
                height: '250px',
                borderRadius: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                background: 'white',
              }}
            >
              <Card.Body className="d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title style={{
                    color: 'black',
                    marginTop: '15px',
                    marginLeft: '15px',
                    fontSize: '24px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold'
                  }}>Итого
                  </Card.Title>
                  <Card.Text style={{
                    marginRight: '15px',
                    marginTop: '1px',
                    color: 'black',
                    fontSize: '24px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold'
                  }}>{calculateTotalOrderPrice()} ₽
                  </Card.Text>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                    style={{ marginRight: '10px' }}
                  />
                  <label htmlFor="agree" style={{ color: 'black', fontFamily: 'Montserrat, sans-serif' }}>
                    Я согласен с <Link to="/rules">правилами пользования торговой площадкой</Link> и <Link to="/return">возврата</Link>
                  </label>
                </div>

                <YooMoneyForm totalPrice={totalPrice} isAgreed={isAgreed} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
});

export default Basket;
