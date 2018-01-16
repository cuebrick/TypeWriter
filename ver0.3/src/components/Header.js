import React from 'react';
import Profile from './Profile';
import User from "./User";

class Header extends React.Component{
	componentDidMount(){
		User.getInstance().setProfile(this.refs.profile);
	}

	render(){
		return(
			<header className="minimize">
				<h1>Typing Play</h1>
				<h2>Typing exercise for beginner</h2>
				<Profile ref={"profile"}/>
			</header>
		)
	}
}

export default Header;