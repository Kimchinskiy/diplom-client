import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
import { toast } from 'react-toastify';


const DeviceItem = ({ device, isSelected, toggleSelection }) => {
    const navigate = useNavigate();

    const handleAddToBasket = (e) => {
        e.stopPropagation();
        toast.success(`${device.brand?.name || ''} ${device.name} добавлен в корзину!`);
    };

    const handleCardClick = () => {
        navigate(DEVICE_ROUTE + '/' + device.id);
    };

    return (
        <Col md={3} className="mb-1">
            <Card
                className={`card justify-content-between ${isSelected ? 'selected-card' : ''}`}
                style={{
                    width: '235px',
                    cursor: 'pointer',
                    display: "flex",
                    height: "400px",
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                onClick={handleCardClick}
            >
                {device.brand && (
                    <Card.Text style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                        {device.brand.name}
                    </Card.Text>
                )}
                <Card.Img
                    variant="top"
                    src={process.env.REACT_APP_API_URL + device.img}
                    style={{
                        objectFit: 'contain',
                        width: '150px',
                        height: '225px',
                        marginBottom: '15px',
                    }}
                />
                <Card.Body style={{ textAlign: 'center' }}>
                    <Card.Title>{device.name}</Card.Title>
                    <Card.Text>{device.price}₽</Card.Text>
                    <Button
                        className="full-width-btn"
                        onClick={handleAddToBasket}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            transition: 'background-color 0.2s',
                        }}
                    >
                        В корзину
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DeviceItem;
