import React from 'react';
import Keycap from './Keycap';

class KeyboardLayout extends React.Component{

	componentDidMount(){
		this.addKeyboardEvent();
	}

	componentWillUnmount(){
		this.removeKeyboardEvent();
	}

	addKeyboardEvent(){
		window.addEventListener('keydown', this.handleKeyDown);
	}

	removeKeyboardEvent(){
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown(e){
		// console.log('KeyboardLayout.keydown: ', e.keyCode);
	}

	render(){
		return(
			<div className="keyboard">
				<div className="row">
					<Keycap keyCode={192} ens={"~"} enn={"`"}/>
					<Keycap keyCode={49} ens={"!"} enn={"1"}/>
					<Keycap keyCode={50} ens={"@"} enn={"2"}/>
					<Keycap keyCode={51} ens={"#"} enn={"3"}/>
					<Keycap keyCode={52} ens={"$"} enn={"4"}/>
					<Keycap keyCode={53} ens={"%"} enn={"5"}/>
					<Keycap keyCode={54} ens={"^"} enn={"6"}/>
					<Keycap keyCode={55} ens={"&"} enn={"7"}/>
					<Keycap keyCode={56} ens={"*"} enn={"8"}/>
					<Keycap keyCode={57} ens={"("} enn={"9"}/>
					<Keycap keyCode={48} ens={")"} enn={"0"}/>
					<Keycap keyCode={189} ens={"_"} enn={"-"}/>
					<Keycap keyCode={187} ens={"+"} enn={"="}/>
					<Keycap keyCode={8} enn={"back"} keyType={"type4"}/>
				</div>
				<div className="row">
					<Keycap keyCode={8} enn={"tab"} keyType={"type2 disable"}/>
					<Keycap keyCode={81} enn={"Q"} krs={"ㅃ"} krn={"ㅂ"}/>
					<Keycap keyCode={87} enn={"W"} krs={"ㅉ"} krn={"ㅈ"}/>
					<Keycap keyCode={69} enn={"E"} krs={"ㄸ"} krn={"ㄷ"}/>
					<Keycap keyCode={82} enn={"R"} krs={"ㄲ"} krn={"ㄱ"}/>
					<Keycap keyCode={84} enn={"T"} krn={"ㅅ"} krs={"ㅆ"}/>
					<Keycap keyCode={84} enn={"Y"} krn={"ㅛ"}/>
					<Keycap keyCode={84} enn={"U"} krn={"ㅕ"}/>
					<Keycap keyCode={84} enn={"I"} krn={"ㅑ"}/>
					<Keycap keyCode={84} enn={"O"} krn={"ㅐ"} krs={"ㅒ"}/>
					<Keycap keyCode={84} enn={"P"} krn={"ㅔ"} krs={"ㅖ"}/>
					<Keycap keyCode={84} enn={"["} ens={""}/>
					<Keycap keyCode={84} enn={"]"} ens={""}/>
					<Keycap keyCode={84} enn={"\\"} ens={"|"} krn={"\\"} keyType={"type2"}/>
				</div>
				<div className="row">
					<Keycap keyCode={20} enn={"caps"} keyType={"type3 disable"}/>
					<Keycap keyCode={65} enn={"A"} krn={"ㅁ"}/>
					<Keycap keyCode={83} enn={"S"} krn={"ㄴ"}/>
					<Keycap keyCode={68} enn={"D"} krn={"ㅇ"}/>
					<Keycap keyCode={70} enn={"F"} krn={"ㄹ"}/>
					<Keycap keyCode={71} enn={"G"} krn={"ㅎ"}/>
					<Keycap keyCode={72} enn={"H"} krn={"ㅗ"}/>
					<Keycap keyCode={74} enn={"J"} krn={"ㅓ"}/>
					<Keycap keyCode={75} enn={"K"} krn={"ㅏ"}/>
					<Keycap keyCode={76} enn={"L"} krn={"ㅣ"}/>
					<Keycap keyCode={186} enn={";"} ens={":"}/>
					<Keycap keyCode={222} enn={"'"} ens={"\""}/>
					<Keycap keyCode={13} enn={"enter"} keyType={"type5"}/>
				</div>
				<div className="row">
					<Keycap keyCode={16} enn={"shift"} keyType={"type5"}/>
					<Keycap keyCode={90} enn={"Z"} krn={"ㅋ"}/>
					<Keycap keyCode={88} enn={"X"} krn={"ㅌ"}/>
					<Keycap keyCode={67} enn={"C"} krn={"ㅊ"}/>
					<Keycap keyCode={86} enn={"V"} krn={"ㅍ"}/>
					<Keycap keyCode={66} enn={"B"} krn={"ㅠ"}/>
					<Keycap keyCode={78} enn={"N"} krn={"ㅜ"}/>
					<Keycap keyCode={77} enn={"M"} krn={"ㅡ"}/>
					<Keycap keyCode={188} enn={","} ens={"<"}/>
					<Keycap keyCode={190} enn={"."} ens={">"}/>
					<Keycap keyCode={191} enn={"/"} ens={"?"}/>
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