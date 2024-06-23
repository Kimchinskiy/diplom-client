import React, { useContext, useState } from 'react';
import { Container, Form, Card, Button, Row, Spinner } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { registration, login } from '../http/userAPI';
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showRegisterLink, setShowRegisterLink] = useState(!isLogin);

    const toggleForm = () => {
        setShowRegisterLink(!showRegisterLink);
    };

    const validateForm = () => {
        return email.length > 0 && password.length > 0 && (isLogin || (firstName.length > 0 && lastName.length > 0 && phoneNumber.length > 0));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        setLoading(true);
        setError('');

        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password, firstName, lastName, phoneNumber);
            }

            console.log('Token data:', data); // Логирование для отладки

            // Обработка токена здесь
            user.setUser(data.user);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            console.error('API error:', e); // Логирование для отладки
            setError(e.response?.data?.message || 'Ошибка при выполнении запроса');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center container">
            <Card className="card" style={{
                marginTop:"150px", width:"500px"
            }}>
                <Form className='d-flex flex-column p-4' onSubmit={handleSubmit}>
                    <h1 className="form-title">
                        {isLogin ? 'Авторизация' : "Регистрация"}
                    </h1>
                    <Form.Control
                        className="form-control"
                        placeholder='Введите email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="form-control"
                        type="password"
                        placeholder='Введите пароль'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {!isLogin && (
                        <>
                            <Form.Control
                                className="form-control"
                                placeholder='Введите имя'
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <Form.Control
                                className="form-control"
                                placeholder='Введите фамилию'
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <Form.Control
                                className="form-control-last"
                                placeholder='Введите номер телефона'
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                        </>
                    )}
                    {error && <div className="error-message">{error}</div>}
                    <Button
                        className="submit-button"
                        variant="outline-success"
                        type="submit"
                        disabled={loading || !validateForm()}
                    >
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        {loading && (
                            <Spinner
                                className="spinner"
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                    </Button>
                    <Row className="link-row">
                        {isLogin ?
                            <div className={`link-animation ${showRegisterLink ? 'hidden' : ''}`}>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} style={{ textDecoration: "none" }} onClick={toggleForm}>Зарегистрироваться!</NavLink>
                            </div>
                            :
                            <div className={`link-animation ${showRegisterLink ? '' : 'hidden'}`}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE} style={{ textDecoration: "none" }} onClick={toggleForm}>Войти!</NavLink>
                            </div>
                        }
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
