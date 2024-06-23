import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, Col } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const { device } = useContext(Context);

    return (
        <Row xs={1} sm={2} md={4} className="g-1">
            {device.devices.map(dev => (
                <Col key={dev.id} className="mb-0" style={{ padding: '10px' }}>
                    <DeviceItem device={dev} />
                </Col>
            ))}
        </Row>
    );
});

export default DeviceList;