import React from 'react';

const resultField = props => (
	<div className="Result">
		{/* History */}
		<span>{props.output}</span>
	</div>
);

export default resultField;