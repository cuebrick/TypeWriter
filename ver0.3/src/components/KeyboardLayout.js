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

		return(
			<div className="keyboard">
				<div className="row">
					<Keycap keyCode={192} ens={"~"} enn={"`"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={49} ens={"!"} enn={"1"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={50} ens={"@"} enn={"2"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={51} ens={"#"} enn={"3"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={52} ens={"$"} enn={"4"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={53} ens={"%"} enn={"5"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={54} ens={"^"} enn={"6"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={55} ens={"&"} enn={"7"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={56} ens={"*"} enn={"8"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={57} ens={"("} enn={"9"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={48} ens={")"} enn={"0"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={189} ens={"_"} enn={"-"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={187} ens={"+"} enn={"="} isShifting={this.state.isShifting}/>
					<Keycap keyCode={8} enn={"back"} keyType={"type4"}/>
				</div>
				<div className="row">
					<Keycap keyCode={8} enn={"tab"} keyType={"type2 disable"}/>
					<Keycap keyCode={81} enn={"Q"} krs={"ㅃ"} krn={"ㅂ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={87} enn={"W"} krs={"ㅉ"} krn={"ㅈ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={69} enn={"E"} krs={"ㄸ"} krn={"ㄷ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={82} enn={"R"} krs={"ㄲ"} krn={"ㄱ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} enn={"T"} krn={"ㅅ"} krs={"ㅆ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} enn={"Y"} krn={"ㅛ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} enn={"U"} krn={"ㅕ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} enn={"I"} krn={"ㅑ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} enn={"O"} krn={"ㅐ"} krs={"ㅒ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} enn={"P"} krn={"ㅔ"} krs={"ㅖ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} enn={"["} ens={""} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} enn={"]"} ens={""} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} enn={"\\"} ens={"|"} krn={"\\"} keyType={"type2"} isShifting={this.state.isShifting}/>
				</div>
				<div className="row">
					<Keycap keyCode={20} enn={"caps"} keyType={"type3 disable"}/>
					<Keycap keyCode={65} enn={"A"} krn={"ㅁ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={83} enn={"S"} krn={"ㄴ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={68} enn={"D"} krn={"ㅇ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={70} enn={"F"} krn={"ㄹ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={71} enn={"G"} krn={"ㅎ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={72} enn={"H"} krn={"ㅗ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={74} enn={"J"} krn={"ㅓ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={75} enn={"K"} krn={"ㅏ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={76} enn={"L"} krn={"ㅣ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={186} enn={";"} ens={":"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={222} enn={"'"} ens={"\""} isShifting={this.state.isShifting}/>
					<Keycap keyCode={13} enn={"enter"} keyType={"type5"}/>
				</div>
				<div className="row">
					<Keycap keyCode={16} enn={"shift"} keyType={"type5"}/>
					<Keycap keyCode={90} enn={"Z"} krn={"ㅋ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={88} enn={"X"} krn={"ㅌ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={67} enn={"C"} krn={"ㅊ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={86} enn={"V"} krn={"ㅍ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={66} enn={"B"} krn={"ㅠ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={78} enn={"N"} krn={"ㅜ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={77} enn={"M"} krn={"ㅡ"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={188} enn={","} ens={"<"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={190} enn={"."} ens={">"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={191} enn={"/"} ens={"?"} isShifting={this.state.isShifting}/>
					<Keycap keyCode={16} enn={"shift"} keyType={"type6"}/>
				</div>
				<div className="row">
					<Keycap keyCode={17} enn={"ctrl"} keyType={"type1 disable"}/>
					<Keycap keyCode={91} enn={"win"} keyType={"type1 disable"}/>
					<Keycap keyCode={18} enn={"alt"} keyType={"type1 disable"}/>
					<Keycap keyCode={32} enn={"space"} keyType={"type7"}/>
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