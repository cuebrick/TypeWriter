import React from 'react';
import LevelItem from './LevelItem';
import LevelData from '../json/level-data';
import PlayManager from './PlayManager';

class LevelList extends React.Component{
	constructor(props){
		super(props);
		this.handleItemClick = this.handleItemClick.bind(this);
		this.state = {
			isShow: true,
			levelId: 0
		}

	}

	/*componentDidMount() {
		console.log('componentDidMount', this);
		this.props.onRef(this)
	}*/

	handleItemClick(id){
		// this.props.levelId = id;
		// console.log('handleItemClick:>>>>', id);
		// PlayManager.selectLevel(id);
		this.props.selectLevel(id);
		// this.hide();
		// this.child.run();
	}

	show(){
		this.setState({isShow: true});
	}

	hide(){
		this.setState({isShow: false});
	}

	/*hide = () => {
		this.setState({isShow: false});
	};*/


	render(){
		// console.log('LevelList.render() : ', this.props.level);
		return(
			<div className={"level-list-area " + (this.state.isShow ? 'show' : 'hide')}>
				<h3>단계 목록</h3>
				<div id="levelList" className="level-list">
					{
						LevelData.map( (obj) => {
							return (
								<LevelItem
									key={obj.id}
									dataId={obj.id}
									title={obj.title}
									handleClick={this.handleItemClick}
								/>
							);
						})
					}
				</div>
			</div>
		)
	}
}


export default LevelList;