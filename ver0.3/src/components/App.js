import React from 'react';
import Header from './Header';
import LevelList from './LevelList';
import Badge from './Badge';
import SentenceArea from './SentenceArea';
import PlayManager from './PlayManager';
import Level from './Level';
import PropTypes from 'prop-types';

import LevelData from '../json/level-data';

class App extends React.Component{
	// playManager;
	comps;
	selectLevel;
	level;
	child;

	constructor(props){
		super(props);

		this.selectedLevel = this.selectedLevel.bind(this);

		this.state = {
			level : undefined
		};

		// this.playManager = new PlayManager();
		this.comps = {
			header: <Header/>,
			levelList: <LevelList selectLevel={this.selectedLevel}/>,
			badge: <Badge/>,
			sentenceArea: <SentenceArea level={this.state.level}/>
			// playManager: new PlayManager()
		};
	}

	componentDidUpdate(){
		console.log('App.componentDidUpdate() : ', this.state.level);
	}

	selectedLevel(id){
		console.log('App.selectedLevel() : >>>', id);

		let data = LevelData.find(function(item){
			return (item.id === id);
		});

		this.setState({level:new Level(data)});
		// console.log('level.id: ', this.level.id);
	};

	render(){
		return(
			<div className="wrapper">
				{this.comps.header}
				{this.comps.levelList}
				{this.comps.badge}
				{this.comps.sentenceArea}
			</div>
		);
	}

	/*render(){
		return(
			<div className="wrapper">
				<Header/>
				<Badge/>
				<LevelList onRef={(ref) => {this.child = ref}} selectLevel={this.selectedLevel}/>
				<SentenceArea selectLevelId={"s5"}/>
			</div>
		)
	}*/


}

export default App;