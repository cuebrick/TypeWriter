import React from 'react';

class Keycap extends React.Component{
	render(){
		return(
			<div data-key={this.props.keyCode} className={this.props.keyType}>
				<div className="en">
					<div className="shift">{this.props.ens}</div>
					<div className="normal">{this.props.enn}</div>
				</div>
				<div className="kr">
					<div className="shift">{this.props.krs}</div>
					<div className="normal">{this.props.krn}</div>
				</div>
			</div>
		)
	}
}

export default Keycap;