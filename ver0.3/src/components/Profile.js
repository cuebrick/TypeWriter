import React from 'react';

class Profile extends React.Component{
	render(){
		return(
			<div className="profile">
				<div className="profile-image">
					<img src={"/images/icon/profile-icon-1.svg"}/>
				</div>
				<div className="user-info">
					<div className="user-level">수련생</div>
					<div className="user-name">세계의끝</div>
				</div>
			</div>
		)
	}
}

export default Profile;