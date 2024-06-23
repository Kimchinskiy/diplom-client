import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    const handleBrandClick = (brand) => {
        if (!device.selectedBrand || brand.id !== device.selectedBrand?.id) {
            device.setSelectedBrand(brand);
        } else {
            device.setSelectedBrand(null);
        }
    };

    return (
        <ListGroup horizontal>
            {device.brands.map(brand => (
                <ListGroup.Item
                    key={brand.id}
                    action
                    active={device.selectedBrand && brand.id === device.selectedBrand.id}
                    onClick={() => handleBrandClick(brand)}
                    style={{ cursor: 'pointer' }}
                >
                    {brand.name}
                </ListGroup.Item>
            ))}
            
        </ListGroup>
    );
});

export default BrandBar;
