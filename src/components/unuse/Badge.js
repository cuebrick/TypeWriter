import React from 'react';

class Badge extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isShow: false,
			star: 0
		}
	}
	show(level){
		this.setState({
			isShow: true,
			level: level
		});
	}
	hide(){
		this.setState({isShow: false})
	}

	render(){
		let isShowClassName = (this.state.isShow) ? ' show' : '';

		return(
			<div className={"badge" + isShowClassName}>
				<div className="badge-title">{this.state.level && this.state.level.title}</div>
				<div className="stars">
					{
						this.state.level &&
						[...Array(3)].map((v, i) => {
							if(i < Number(this.state.level.result.star)){
								return <span key={"key"+i} className="star" />
							} else {
								return <span key={"key"+i} className="star incomplete" />
							}
						})
					}
				</div>
				<div className="description"></div>
			</div>
		)
	}
}

export default Badge;