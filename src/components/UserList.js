import React from 'react';

class UserList extends React.Component{

	handleItemClick(userId){
		this.props.selectUser(userId);
	}

	handleDeleteUser(userId){
		this.props.deleteUser(userId);
	}

	render(){
		let userList = Object.keys(this.props.users).map((key) => {
			return this.props.users[key];
		});

		return(
			<ul className="user-list">
				{
					userList.map((data) => {
						let isCurrentUser = (this.props.currentUserId === data.id);
						if(isCurrentUser){
							return(
								<li key={data.id} className="current-user">
									<img src={"./images/checked.svg"} className="checked" width="15" />
									<div className="user-inner">
										<div className="user-image">
											<img src={"./images/icon/profile-icon-"+ data.icon +".svg"}/>
										</div>
										<div className="user-grade">{data.grade}</div>
										<div className="user-name">{data.name}</div>
									</div>
								</li>
							)
						} else {
							return(
								<li key={data.id}>
									<img src={"./images/delete.svg"} className="delete" width="15" onClick={() => this.handleDeleteUser(data.id)} />
									<div className="user-inner" onClick={() => this.handleItemClick(data.id)}>
										<div className="user-image">
											<img src={"./images/icon/profile-icon-"+ data.icon +".svg"}/>
										</div>
										<div className="user-grade">{data.grade}</div>
										<div className="user-name">{data.name}</div>
									</div>
								</li>
							)
						}

					})
				}
			</ul>
		)
	}
}

export default UserList;