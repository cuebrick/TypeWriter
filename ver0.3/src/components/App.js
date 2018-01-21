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
		this.goNextLevel = this.goNextLevel.bind(this);
		this.refreshLevelList = this.refreshLevelList.bind(this);

		this.state = {
			level : undefined,
			levelListData : {},
			mode : App.LIST_MODE
		};
	}

	selectedLevel(id){
		let data = this.getLevelDataById(id);

		let level = new Level(data);
		this.setState({
			level: level,
			mode: App.TYPING_MODE
		});

		let user = User.getInstance();
		user.setLevel(level);
		user.getProfile().toggleTypingMode(true);
	};
	
	getLevelDataById(id){
		return LevelData.find(function(item){
			return (item.id === id);
		});
	}

	goLevelList(){
		this.setState({
			level: null,
			mode: App.LIST_MODE
		});
		this.refs.badge.hide();
		User.getInstance().getProfile().toggleTypingMode(false);
		this.refreshLevelList();
	}

	goNextLevel(){
		console.log('next!!');
		let id = this.state.level.id;
		let data = this.getLevelDataById(id);
		let index = LevelData.indexOf(data);
		let nextId = LevelData[index + 1].id;
		this.selectedLevel(nextId);
	}

	refreshLevelList(){
		let levelListData = User.getInstance().getCurrentUserInfo().level;
		this.setState({levelListData: levelListData});
	}

	componentDidMount(){
		let user = User.getInstance();
		user.setBadge(this.refs.badge);
		user.getProfile().setRefreshLevelListCallback(this.refreshLevelList);
		this.refreshLevelList();
	}

	render(){
		return(
			<div className="wrapper">
				<Header/>
				<Badge ref={"badge"}/>
				{
					this.state.mode === App.LIST_MODE &&
					<LevelList levelListData={this.state.levelListData} selectLevel={this.selectedLevel}/>
				}
				{
					this.state.mode === App.TYPING_MODE &&
					<SentenceArea level={this.state.level} goLevelList={this.goLevelList} goNextLevel={this.goNextLevel}/>
				}
			</div>
		)
	}
}

export default App;