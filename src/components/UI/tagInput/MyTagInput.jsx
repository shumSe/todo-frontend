import React, { useState } from 'react';
import classes from './MyTagInput.module.css';
import { Icon } from '@iconify/react';

const MyTagInput = ({getTagName}) => {
    const [tagName, setTagName] = useState('')

    const setName = (event) => {
        setTagName(event.target.value)
    }

    const sendTagName = () => {
        getTagName(tagName)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          sendTagName()
        }
    }

    return (
        <div className={classes.taginput__container}>
            <input className={classes.myTagInput} placeholder="Max 25 symblos" maxLength={25} onChange={setName} onKeyDown={handleKeyDown}/>
            <Icon icon="gg:add" color="#0d0" width="20" height="20" className={classes.icon} onClick={sendTagName}></Icon>
        </div>
    );
};

export default MyTagInput;