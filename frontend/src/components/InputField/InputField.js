import React from 'react';
import './InputField.css';

const InputField = ({name, type, value, onChange, placeholder, ...props}) => (
    <input type={type} className='InputField-field' value={value} onChange={onChange} id={name} 
        name={name} placeholder={placeholder} autoComplete='off' autoCorrect='off' autoCapitalize='none' {...props} required />
);

export default InputField;