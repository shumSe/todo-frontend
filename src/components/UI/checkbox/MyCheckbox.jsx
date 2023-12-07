import React from 'react';
import classes from './MyCheckbox.module.css';

const MyCheckbox = ({ label, value, onChange, name }) => {
    return (
      <label>
        <input className={ classes.myCheckbox } type="checkbox" checked={value} onChange={onChange}/>
        {label}
      </label>
    );
  };

export default MyCheckbox;