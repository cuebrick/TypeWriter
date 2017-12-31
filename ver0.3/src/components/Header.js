import React from 'react';
import Profile from './Profile';

class Header extends React.Component{
	render(){
		return(
			<header className="minimize">
				<h1>Typing Play</h1>
				<h2>Typing exercise for beginner</h2>
				<Profile/>
			</header>
		)
	}
}

export default Header;