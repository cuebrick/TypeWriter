import React from 'react';

class Keycap extends React.Component{
	render(){
		let shiftingClassName = (this.props.isShifting) ? ' shifted' : '';
		console.log(shiftingClassName);
		return(
			<div data-key={this.props.keyCode} className={this.props.keyType}>
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