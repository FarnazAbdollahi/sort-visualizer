import React from "react";

export default ({type, width, onChange, placeholder, value, elementId}) => (
    <input type={type} style={{width: width}}
           onChange={onChange}
           value={value}
           id={elementId}
           placeholder={placeholder}>
    </input>
);