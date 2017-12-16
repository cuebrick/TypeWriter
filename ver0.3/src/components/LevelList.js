import React from 'react';

class LevelList extends React.Component{
	render(){
		return(
			<div className="level-list-area">
				<h3>단계 목록</h3>
				<div id="levelList" className="level-list">
					<div className="level-item">
						<div className="level-title">수련생 첫날</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LevelList;