import React from 'react';

class ReportView extends React.Component{
	render(){
		let stars = [...Array(3)].map((v, i) => {
			if(i < Number(this.props.level.result.star)){
				return <span key={"key"+i} className="star" />
			} else {
				return <span key={"key"+i} className="star incomplete" />
			}
		});

		let result = this.props.level.result;
		return(
			<div className="report-view">
				<div className="report-view-inner">
					<h3>{this.props.level.title}</h3>
					<div className="stars">
						{stars}
					</div>
					<div className="description">
						{
							<dl>
								<dt>전체 글자 수</dt>
								<dd>{result.missLetterCount + '/' + result.totalLetterLen}</dd>
								<dt>전체 타이핑 수</dt>
								<dd>{result.missCount + '/' + result.totalCharLen}</dd>
								<dt>시간</dt>
								<dd>{result.elapseTime + '초'}</dd>
								<dt>분당 타수</dt>
								<dd>{result.speedPerMin + '타'}</dd>
								<dt>정확도</dt>
								<dd>{result.accuracy + '%'}</dd>
							</dl>
						}
					</div>
					<div className="report-view-msg">
						esc 키를 누르면 목록으로, enter 키를 누르면 다음 단계로 넘어갑니다.
					</div>
				</div>
			</div>
		)
	}
}

export default ReportView;