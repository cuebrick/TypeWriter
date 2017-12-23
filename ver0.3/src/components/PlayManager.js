import React from 'react';
import Header from './Header';
import LevelList from './LevelList';
import Badge from './Badge';
import SentenceArea from './SentenceArea';

class PlayManager extends React.Component{

	// static _this;

	// App level rendering components
	comps;
	// child;

	constructor(props){
		super(props);

		this.comps = {
			header: <Header/>,
			levelList: <LevelList onRef={(ref) => (this.child = ref)} selectLevel={this.selectedLevel}/>,
			badge: <Badge/>,
			sentenceArea: <SentenceArea/>
		};

		// PlayManager._this = this;
	}

	selectedLevel(id){
		console.log(this.child);
		console.log('selectedLevel : >>>', id, this.child);
	}
}

export default PlayManager;