// client/src/pages/Shop.js

import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';

const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes().then((data) => {
            console.log('Fetched types:', data);
            device.setTypes(data);
        });
        fetchBrands().then((data) => {
            console.log('Fetched brands:', data);
            device.setBrands(data);
        });
        fetchDevices(null, null, 1, 2).then((data) => {
            console.log('Fetched devices:', data);
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device]); 

    useEffect(() => {
        if (device.selectedType && device.selectedBrand) {
            fetchDevices(
                device.selectedType.id,
                device.selectedBrand.id,
                device.page,
                8
            ).then((data) => {
                console.log('Fetched devices with filters:', data);
                device.setDevices(data.rows);
                device.setTotalCount(data.count);
            });
        } else if (device.selectedType) {
            fetchDevices(
                device.selectedType.id,
                null,
                device.page,
                3
            ).then((data) => {
                console.log('Fetched devices for selected type:', data);
                device.setDevices(data.rows);
                device.setTotalCount(data.count);
            });
        }
    }, [device.selectedType, device.selectedBrand, device.page]); // Обновление при изменении выбранного типа, бренда или страницы

    const containerStyle = {
        fontFamily: 'Montserrat, sans-serif',
    };

    return (
        <Container style={containerStyle}>
            <Row className='mt-2'>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
