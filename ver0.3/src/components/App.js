import React from 'react';
import Header from './Header';
import LevelList from './LevelList';
import Badge from './Badge';
import SentenceArea from './SentenceArea';
import PlayManager from './PlayManager';
import Level from './Level';

import LevelData from '../json/level-data';

class App extends React.Component{
	// playManager;

	// static LIST_MODE = 'listMode';
	// static TYPING_MODE = 'typingMode';

	comps;
	selectLevel;
	level;
	child;

	constructor(props){
		super(props);

		this.selectedLevel = this.selectedLevel.bind(this);
		this.goLevelList = this.goLevelList.bind(this);

		this.state = {
			level : undefined,
			mode : 'LIST_MODE'
		};

		// this.playManager = new PlayManager();
		/*this.comps = {
			header: <Header/>,
			levelList: <LevelList selectLevel={this.selectedLevel}/>,
			badge: <Badge/>,
			sentenceArea: <SentenceArea level={this.state.level}/>
			// playManager: new PlayManager()
		};*/
	}

	selectedLevel(id){
		// console.log('App.selectedLevel() : ', id);

		let data = LevelData.find(function(item){
			return (item.id === id);
		});

		this.setState({
			level: new Level(data),
			mode: 'TYPING_MODE'
		});
	};

	goLevelList(){
		this.setState({
			level: null,
			mode: 'LIST_MODE'
		});
	}

	render(){
		let levelList = (this.state.mode === 'LIST_MODE') ? <LevelList selectLevel={this.selectedLevel}/> : null;
		let sentenceArea = (this.state.mode === 'TYPING_MODE') ? <SentenceArea level={this.state.level} goLevelList={this.goLevelList}/> : null;

		return(
			<div className="wrapper">
				<Header/>
				<Badge/>
				{levelList}
				{sentenceArea}
			</div>
		)
	}
}

export default App;