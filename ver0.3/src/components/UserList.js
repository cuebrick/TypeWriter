import React from 'react';

class UserList extends React.Component{

	render(){
		let userList = Object.keys(this.props.users).map((key) => {
			return this.props.users[key];
		});

		// console.log('UserList: >>>', userList);

		return(
			<ul className="user-list">
				{
					userList.map((data) => {
						let isCurrentUser = (this.props.currentUserId === data.id);
						return(
							<li key={data.id}>
								{
									isCurrentUser &&
									<img src={"/images/checked.svg"} className="checked" width="15" />
								}
								<div className="user-image">
									<img src={"/images/icon/profile-icon-"+ data.icon +".svg"}/>
								</div>
								<div className="user-grade">{data.grade}</div>
								<div className="user-name">{data.name}</div>
							</li>
						)
					})
				}
				{/*<li>
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
				</li>*/}
			</ul>
		)
	}
}

export default UserList;