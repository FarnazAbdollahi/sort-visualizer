import React from "react";

export default ({height, backgroundColor}) => (
    <div className={'array-bar'}
         style={{height: `${height}vmin`, backgroundColor: backgroundColor}}>
        {height}
    </div>
);