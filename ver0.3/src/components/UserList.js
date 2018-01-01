import React from 'react';

class UserList extends React.Component{

	render(){
		return(
			<ul className="user-list">
				<li>
					<div className="user-image">
						<img src={"/images/icon/profile-icon-0.svg"}/>
					</div>
					<div className="user-grade">수련생 추가</div>
					<div className="user-name">익명의 홍길동</div>
				</li>
				<li>
					<div className="user-image">
						<img src={"/images/icon/profile-icon-2.svg"}/>
					</div>
					<div className="user-grade">수련생</div>
					<div className="user-name">익명의 아르마딜로</div>
				</li>
				<li>
					<div className="user-image">
						<img src={"/images/icon/profile-icon-3.svg"}/>
					</div>
					<div className="user-grade">수련생</div>
					<div className="user-name">익명의 히포</div>
				</li>
				<li>
					<div className="user-image">
						<img src={"/images/icon/profile-icon-4.svg"}/>
					</div>
					<div className="user-grade">수련생</div>
					<div className="user-name">익명의 기니피그</div>
				</li>
				<li>
					<div className="user-image">
						<img src={"/images/icon/profile-icon-5.svg"}/>
					</div>
					<div className="user-grade">수련생</div>
					<div className="user-name">익명의 라쿤</div>
				</li>
				<li>
					<div className="user-image">
						<img src={"/images/icon/profile-icon-6.svg"}/>
					</div>
					<div className="user-grade">수련생</div>
					<div className="user-name">익명의 아르마딜로</div>
				</li>
				<li>
					<div className="user-image">
						<img src={"/images/icon/profile-icon-7.svg"}/>
					</div>
					<div className="user-grade">수련생</div>
					<div className="user-name">익명의 마그테리돈</div>
				</li>
				<li>
					<div className="user-image">
						<img src={"/images/icon/profile-icon-8.svg"}/>
					</div>
					<div className="user-grade">수련생</div>
					<div className="user-name">익명의 펠리컨</div>
				</li>
				<li>
					<div className="user-image">
						<img src={"/images/icon/profile-icon-9.svg"}/>
					</div>
					<div className="user-grade">수련생</div>
					<div className="user-name">익명의 홍길동</div>
				</li>
			</ul>
		)
	}
}

export default UserList;