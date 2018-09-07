import React from 'react';

const button = ({ width=1, sym, clicked}) => (
	<span 
		className="Button" 
		style={{ width: `${(50 * parseInt(width, 10) - 1)}px`}} 
		onClick={clicked.bind(this, sym)}
		>{sym.toString()}</span>
);

export default button;