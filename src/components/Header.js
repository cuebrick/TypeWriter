import React from 'react';
import Profile from './Profile';
import { Link } from 'react-router-dom';

class Header extends React.Component{
	render(){
		return(
			<header className="minimize">
				<h1><Link to="/">Typing Play</Link></h1>
				<h2>Typing exercise for beginner</h2>
				<Profile/>
			</header>
		)
	}
}

export default Header;