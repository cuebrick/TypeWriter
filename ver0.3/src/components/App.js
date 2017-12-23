import React from 'react';
import Header from './Header';
import LevelList from './LevelList';
import Badge from './Badge';
import SentenceArea from './SentenceArea';
import PlayManager from './PlayManager';

import LevelData from '../json/level-data';

class App extends React.Component{
	// playManager;
	comps;
	selectLevel;
	level;
	child;

	constructor(props){
		super(props);

		this.state = {
			level : '-------'
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

	// level(text){
	// 	return text;
	// }

	selectedLevel(id){
		console.log('App.selectedLevel() : >>>', id);

		let level = LevelData.find(function(item){
			return (item.id === id);
		});

		// console.log(Object.isExtensible(this.level));
		this.setState({level: level})
	}

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