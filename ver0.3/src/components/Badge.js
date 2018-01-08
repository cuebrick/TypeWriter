import React from 'react';

class Badge extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isShow: false
		}
	}
	show(level){
		console.log('Badge.show(): ', level);
		this.setState({isShow: true})
	}
	hide(){
		this.setState({isShow: false})
	}

	render(){
		let isShowClassName = (this.state.isShow) ? ' show' : '';
		return(
			<div className={"badge" + isShowClassName}>
				<div className="badge-title">견습 마법사 등급</div>
				<div className="stars">
					<span className="star"></span><span className="star"></span><span className="star incomplete"></span>
				</div>
				<div className="description"></div>
			</div>
		)
	}
}

export default Badge;