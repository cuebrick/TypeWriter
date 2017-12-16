import React from 'react';
import Header from './Header';
import LevelList from './LevelList';
import Badge from './Badge';
import SentenceArea from './SentenceArea';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: ''
		}
	}

	render(){
		return(
			<div className="wrapper">
				<Header/>
				<LevelList/>
				<Badge/>
				<SentenceArea/>
			</div>

		);
	}
}

export default App;