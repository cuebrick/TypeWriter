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
		// 영문 키캡의 경우 기호들과는 다르게 쉬프트 된 문자(대문자) 가 표시되어 있음.
		// Keycap 에 주어진 props 들은 실제 프로그래밍적으로 의미가 있는 것은 아니고 화면 표시용으로만 사용.
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
					<Keycap keyCode={81} ens={"Q"} krs={"ㅃ"} krn={"ㅂ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={87} ens={"W"} krs={"ㅉ"} krn={"ㅈ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={69} ens={"E"} krs={"ㄸ"} krn={"ㄷ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={82} ens={"R"} krs={"ㄲ"} krn={"ㄱ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={84} ens={"T"} krn={"ㅅ"} krs={"ㅆ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={89} ens={"Y"} krn={"ㅛ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={85} ens={"U"} krn={"ㅕ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={73} ens={"I"} krn={"ㅑ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={79} ens={"O"} krn={"ㅐ"} krs={"ㅒ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={80} ens={"P"} krn={"ㅔ"} krs={"ㅖ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={219} enn={"["} ens={""} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={221} enn={"]"} ens={""} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={220} enn={"\\"} ens={"|"} krn={"\\"} keyType={"type2"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
				</div>
				<div className="row">
					<Keycap keyCode={20} enn={"caps"} keyType={"type3 disable"}/>
					<Keycap keyCode={65} ens={"A"} krn={"ㅁ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={83} ens={"S"} krn={"ㄴ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={68} ens={"D"} krn={"ㅇ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={70} ens={"F"} krn={"ㄹ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={71} ens={"G"} krn={"ㅎ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={72} ens={"H"} krn={"ㅗ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={74} ens={"J"} krn={"ㅓ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={75} ens={"K"} krn={"ㅏ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={76} ens={"L"} krn={"ㅣ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={186} enn={";"} ens={":"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={222} enn={"'"} ens={"\""} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={13} enn={"enter"} keyType={"type5"} nextCode={this.props.nextCode}/>
				</div>
				<div className="row">
					<Keycap keyCode={16} enn={"shift"} keyType={"type5"} nextCode={this.props.nextCode}/>
					<Keycap keyCode={90} ens={"Z"} krn={"ㅋ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={88} ens={"X"} krn={"ㅌ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={67} ens={"C"} krn={"ㅊ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={86} ens={"V"} krn={"ㅍ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={66} ens={"B"} krn={"ㅠ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={78} ens={"N"} krn={"ㅜ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
					<Keycap keyCode={77} ens={"M"} krn={"ㅡ"} nextCode={this.props.nextCode} isShifting={this.state.isShifting}/>
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
				<div className="hands">
					<div className="hand-left"><img src="/images/hand-left.svg" /></div>
					<div className="hand-right"><img src="/images/hand-right.svg" /></div>
				</div>
			</div>
		)
	}
}

export default KeyboardLayout;