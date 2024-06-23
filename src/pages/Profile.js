import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { check } from '../http/userAPI'; // Удален импорт uploadAvatar
import { Card, Container, ListGroup, Button, Row, Col, Image } from 'react-bootstrap';
import { SHOP_ROUTE } from '../utils/consts';
import photoStatic from '../assets/profile.png'; // Импортируем статическое изображение

const Profile = () => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await check();
                setProfileData(response.user);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        user.setUser({});
        user.setIsAuth(false);
        user.setRole('user');
        localStorage.removeItem('token');
        navigate(SHOP_ROUTE);
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!profileData) {
        return <div>Ошибка загрузки профиля</div>;
    }

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card style={{ width: '1000px', maxHeight: '500px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                    <Row>
                        <Col md={5} className="text-center">
                            <Image
                                src={profileData.avatar ? `/uploads/avatars/${profileData.avatar}` : photoStatic}
                                roundedCircle
                                className="profile-image mb-4"
                                style={{ width: '350px', height: '350px', objectFit: 'contain', }}
                            />
                        </Col>
                        <Col md={7}>
                            <Card.Title className="text-center mb-4">Профиль</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item><h1>{profileData.firstName || 'N/A'} {profileData.lastName || 'N/A'}</h1></ListGroup.Item>
                                <ListGroup.Item><strong>Номер телефона:</strong> {profileData.phoneNumber || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item><strong>Email:</strong> {profileData.email || 'N/A'}</ListGroup.Item>
                            </ListGroup>
                            <Button variant="danger" onClick={handleLogout} className="mt-3">Выйти</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
