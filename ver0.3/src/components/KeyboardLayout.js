import React from 'react';
import Keycap from './Keycap';

class KeyboardLayout extends React.Component{

	constructor(props){
		super(props);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.state = {
			isShifting: false
		}
	}

	componentDidMount(){
		this.addKeyboardEvent();
	}

	componentWillUnmount(){
		this.removeKeyboardEvent();
	}

	addKeyboardEvent(){
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('keyup', this.handleKeyUp);
	}

	removeKeyboardEvent(){
		window.removeEventListener('keydown', this.handleKeyDown);
		window.removeEventListener('keyup', this.handleKeyUp);
	}

	handleKeyDown(e){
		// console.log('KeyboardLayout.keydown: ', e.keyCode);
		if(e.keyCode === 16){
			this.shifting();
		}
	}

	handleKeyUp(e){
		if(e.keyCode === 16){
			this.unshifting();
		}
	}

	shifting(){
		this.setState({isShifting: true});
	}

	unshifting(){
		this.setState({isShifting: false});
	}

	render(){
		console.log('KeyboardLayout.render(): ', this.props.nextCode);
		return(
			<div className="keyboard">
				<div className="row">
					<Keycap keyCode={192} ens={"~"} enn={"`"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={49} ens={"!"} enn={"1"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={50} ens={"@"} enn={"2"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={51} ens={"#"} enn={"3"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={52} ens={"$"} enn={"4"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={53} ens={"%"} enn={"5"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={54} ens={"^"} enn={"6"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={55} ens={"&"} enn={"7"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={56} ens={"*"} enn={"8"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={57} ens={"("} enn={"9"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={48} ens={")"} enn={"0"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={189} ens={"_"} enn={"-"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={187} ens={"+"} enn={"="} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={8} enn={"back"} keyType={"type4"} nextCode={this.props.nextCode}/>
				</div>
				<div className="row">
					<Keycap keyCode={8} enn={"tab"} keyType={"type2 disable"}/>
					<Keycap keyCode={81} enn={"Q"} krs={"ㅃ"} krn={"ㅂ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={87} enn={"W"} krs={"ㅉ"} krn={"ㅈ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={69} enn={"E"} krs={"ㄸ"} krn={"ㄷ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={82} enn={"R"} krs={"ㄲ"} krn={"ㄱ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} enn={"T"} krn={"ㅅ"} krs={"ㅆ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={89} enn={"Y"} krn={"ㅛ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={85} enn={"U"} krn={"ㅕ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={73} enn={"I"} krn={"ㅑ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={79} enn={"O"} krn={"ㅐ"} krs={"ㅒ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={80} enn={"P"} krn={"ㅔ"} krs={"ㅖ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={219} enn={"["} ens={""} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={221} enn={"]"} ens={""} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={220} enn={"\\"} ens={"|"} krn={"\\"} keyType={"type2"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
				</div>
				<div className="row">
					<Keycap keyCode={20} enn={"caps"} keyType={"type3 disable"}/>
					<Keycap keyCode={65} enn={"A"} krn={"ㅁ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={83} enn={"S"} krn={"ㄴ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={68} enn={"D"} krn={"ㅇ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={70} enn={"F"} krn={"ㄹ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={71} enn={"G"} krn={"ㅎ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={72} enn={"H"} krn={"ㅗ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={74} enn={"J"} krn={"ㅓ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={75} enn={"K"} krn={"ㅏ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={76} enn={"L"} krn={"ㅣ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={186} enn={";"} ens={":"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={222} enn={"'"} ens={"\""} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={13} enn={"enter"} keyType={"type5"} nextCode={this.props.nextCode}/>
				</div>
				<div className="row">
					<Keycap keyCode={16} enn={"shift"} keyType={"type5"} nextCode={this.props.nextCode}/>
					<Keycap keyCode={90} enn={"Z"} krn={"ㅋ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={88} enn={"X"} krn={"ㅌ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={67} enn={"C"} krn={"ㅊ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={86} enn={"V"} krn={"ㅍ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={66} enn={"B"} krn={"ㅠ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={78} enn={"N"} krn={"ㅜ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={77} enn={"M"} krn={"ㅡ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={188} enn={","} ens={"<"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={190} enn={"."} ens={">"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={191} enn={"/"} ens={"?"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={16} enn={"shift"} keyType={"type6"} nextCode={this.props.nextCode}/>
				</div>
				<div className="row">
					<Keycap keyCode={17} enn={"ctrl"} keyType={"type1 disable"}/>
					<Keycap keyCode={91} enn={"win"} keyType={"type1 disable"}/>
					<Keycap keyCode={18} enn={"alt"} keyType={"type1 disable"}/>
					<Keycap keyCode={32} enn={"space"} keyType={"type7"} nextCode={this.props.nextCode}/>
					<Keycap keyCode={21} enn={"alt"} keyType={"type1 disable"}/>
					<Keycap keyCode={91} enn={"win"} keyType={"type1 disable"}/>
					<Keycap keyCode={93} enn={"c"} keyType={"type1 disable"}/>
					<Keycap keyCode={25} enn={"ctrl"} keyType={"type1 disable"}/>
				</div>
			</div>
		)
	}
}

export default KeyboardLayout;