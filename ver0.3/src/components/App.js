import React from 'react';
import Header from './Header';
import LevelList from './LevelList';
import Badge from './Badge';
import SentenceArea from './SentenceArea';
import PlayManager from './PlayManager';
import Level from './Level';
import User from './User';
import LevelData from '../json/level-data';

class App extends React.Component{


	static get LIST_MODE(){
		return 'listMode';
	}
	static get TYPING_MODE(){
		return 'typingMode';
	}

	constructor(props){
		super(props);

		this.selectedLevel = this.selectedLevel.bind(this);
		this.goLevelList = this.goLevelList.bind(this);

		this.state = {
			level : undefined,
			mode : App.LIST_MODE
		};
	}

	selectedLevel(id){
		let data = LevelData.find(function(item){
			return (item.id === id);
		});

		let level = new Level(data);
		this.setState({
			level: level,
			mode: App.TYPING_MODE
		});

		let user = User.getInstance();
		user.setLevel(level);
		user.getProfile().toggleTypingMode(true);
	};

	goLevelList(){
		this.setState({
			level: null,
			mode: App.LIST_MODE
		});
		this.refs.badge.hide();
		User.getInstance().getProfile().toggleTypingMode(false);
	}

	componentDidMount(){
		User.getInstance().setBadge(this.refs.badge);
	}

	render(){

		let levelList = null;
		if(this.state.mode === App.LIST_MODE){
			let levelData = User.getInstance().getCurrentUserInfo().level;
			levelList = <LevelList levelData={levelData} selectLevel={this.selectedLevel}/>;
		}
		let sentenceArea = (this.state.mode === App.TYPING_MODE) ? <SentenceArea level={this.state.level} goLevelList={this.goLevelList}/> : null;

		return(
			<div className="wrapper">
				<Header/>
				<Badge ref={"badge"}/>
				{levelList}
				{sentenceArea}
			</div>
		)
	}
}

export default App;