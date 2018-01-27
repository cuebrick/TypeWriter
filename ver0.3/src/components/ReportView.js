import React from 'react';

class ReportView extends React.Component{
	render(){
		console.log("Level: " , this.props.level);
		return(
			<div className="report-view">
				<div className="report-view-inner">
					<h4>{this.props.level.title}</h4>
					<div className="stars">
						{
							[...Array(3)].map((v, i) => {
								if(i < Number(this.props.level.result.star)){
									return <span key={"key"+i} className="star" />
								} else {
									return <span key={"key"+i} className="star incomplete" />
								}
							})
						}
					</div>
					<div className="description">
						{
							JSON.stringify(this.props.level.result)
						}
					</div>
				</div>
			</div>
		)
	}
}

export default ReportView;