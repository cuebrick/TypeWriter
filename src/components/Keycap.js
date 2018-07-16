import React from 'react';

class Keycap extends React.Component{
	render(){
		let nextCodeClassName = (this.props.nextCode === this.props.keyCode || this.props.isShiftKey) ? 'next-code' : '';
		let keyTypeClassName = (this.props.keyType) ? ' ' + this.props.keyType : '';
		let shiftingClassName = (this.props.isShifting) ? ' shifted' : '';

		return(
			<div data-key={this.props.keyCode} className={nextCodeClassName + keyTypeClassName}>
				<div className={"en" + shiftingClassName}>
					<div className="shift">{this.props.ens}</div>
					<div className="normal">{this.props.enn}</div>
				</div>
				<div className={"kr" + shiftingClassName}>
					<div className="shift">{this.props.krs}</div>
					<div className="normal">{this.props.krn}</div>
				</div>
			</div>
		)
	}
}

export default Keycap;