import React from 'react';
// import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem';
import { FaHouse } from 'react-icons/fa6';

const AgentMenu = () => {

    
    return (
        <>
            <MenuItem
                icon={FaHouse}
                label='Add Property'
                address='add-property'
            />
            <MenuItem icon={MdHomeWork} label='My Properties' address='my-properties' />
            <MenuItem
                icon={MdOutlineManageHistory}
                label='Requested Properties'
                address='requested-properties'
            />
            <MenuItem
                icon={MdOutlineManageHistory}
                label='My Sold Properties'
                address='sold-properties'
            />
          
        </>
    );
};

export default AgentMenu;