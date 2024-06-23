import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
    const { device } = useContext(Context);
    console.log('Types in TypeBar:', device.types);

    const handleTypeClick = (type) => {
        if (device.selectedType.id === type.id) {
            device.setSelectedType({}); // Deselect the type
        } else {
            device.setSelectedType(type);
        }
    };

    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    active={type.id === device.selectedType.id}
                    onClick={() => handleTypeClick(type)}
                    key={type.id}>
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
