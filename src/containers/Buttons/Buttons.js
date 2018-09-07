import React, { Component } from 'react';

import Button from './Button/Button';

const numArr = [7,8,9,4,5,6,1,2,3];
const ctlsArr = ['/', '*', '-', '+', '='];

class Buttons extends Component {

	shouldComponentUpdate = () => {
		return false;
	}
	// componentWillUpdate = () => {
	// 	console.log('[Buttons] Component Rerendered');
	// }

	render(){
		return (
			<div className="Buttons">
				<div className="Numbers">
					<Button clicked={this.props.btnClicked} sym="C" />
					<Button clicked={this.props.btnClicked} sym="+/-" />
					<Button clicked={this.props.btnClicked} sym="%" />
					{numArr.map(num => <Button clicked={this.props.btnClicked} key={num} sym={num} />)}
					<Button clicked={this.props.btnClicked} sym="0" width={2} />
					<Button clicked={this.props.btnClicked} sym="." />
				</div>
				<div className="Controls">
					{ctlsArr.map(ctrl => <Button clicked={this.props.btnClicked} key={ctrl} sym={ctrl} />)}
				</div>
			</div>
		);
	}
}

export default Buttons;