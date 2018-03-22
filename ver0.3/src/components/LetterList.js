import React from 'react';
import ReactDOM from 'react-dom';
import LetterItem from './LetterItem';
import Keymap from '../json/keymap';
import Level from './Level';
import Hangul from '../lib/hangul';

class LetterList extends React.Component{

	constructor(props){
		super(props);

		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	addKeyboardEvent(){
		window.addEventListener('keydown', this.handleKeyDown);
	}

	removeKeyboardEvent(){
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown(e){
		let code = e.keyCode;

		this.recordKey(e);

		switch (code){
			// 아무것도 하지 않는 케이스 + 기본 키 입력도 막아야 하는 케이스
			case 9: // tab
			case 18: // alt - left
			case 21: // alt - right
				e.preventDefault();
				break;

			case 16: // shift
			case 17: // ctrl
			case 93: // context menu
			case 25: // ctrl - right
			case 91: // win key
			case 20: // caps
			case 112: // F1
			case 113: // F2
			case 114: // F3
			case 115: // F4
			case 116: // F5
			case 117: // F6
			case 118: // F7
			case 119: // F8
			case 120: // F9
			case 121: // F10
			case 122: // F11
			case 123: // F12
			case 37: // left
			case 38: // up
			case 39: // right
			case 40: // down
				break;

			case 8: // backspace
				e.preventDefault();
				if(this.props.level.buffer.length){
					this.props.level.buffer.pop();
				}else{
					this.setPrevIndex();
				}
				this.updateDisplay(this.props.level.buffer);
				this.dispatchNextCode();
				break;

			// 한글, 영문 입력 a~z, A~Z, ㄱ~ㅎ, ㅏ~ㅣ
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 75:
			case 76:
			case 77:
			case 78:
			case 79:
			case 80:
			case 81:
			case 82:
			case 83:
			case 84:
			case 85:
			case 86:
			case 87:
			case 88:
			case 89:
			case 90:
				this.inputLetter(e);
				break;

			// 엔터키의 경우 개행이 있는 문장에서는 개행하고, 없는 문장에서는 레벨을 끝내려는 유저의 의도로 판단함
			// 개행문장의 경우 개행이 아직 아닌데 엔터키를 누르면 개행전까지의 타이핑을 전부 오타처리하고 개행부터 다시 판단.
			case 13: // enter
				e.preventDefault();
				this.inputLetter(e);
				this.enterKeyLoop();
				break;

			// 숫자, 기호 입력 케이스(숫자, 기호 입력은 입력 즉시 다음 칸으로 움직이고 한글 도깨비불 현상이 없음)
			case 32: // space bar
			case 48: // 0
			case 49: // 1
			case 50: // 2
			case 51: // 3
			case 52: // 4
			case 53: // 5
			case 54: // 6
			case 55: // 7
			case 56: // 8
			case 57: // 9
			case 186: // ;
			case 187: // =
			case 188: // ,
			case 189: // -
			case 190: // .
			case 191: // slash
			case 192: // `
			case 219: // [
			case 220: // backslash
			case 221: // ]
			case 222: // '
				e.preventDefault();
				this.inputLetter(e);
				break;

			default:
		}
	}

	inputLetter(e){
		let level = this.props.level;
		let code = e.keyCode;

		let lang = level.language;
		let shiftKey = (e.shiftKey) ? 's' : 'n';
		let char = Keymap['code' + code][lang + shiftKey];

		if(level.form === Level.CHARACTER_FORM){
			this.updateDisplay([char]);
			this.setNextIndex();
			this.clearBuffer();
		}else{
			this.addBuffer(char);
			let letter = Hangul.a(level.buffer);
			if(letter.length > 1){
				let letters = Hangul.d(letter, true);
				this.updateDisplay(letters.shift());
				this.setNextIndex();
				level.buffer = letters[0];
			}
			this.updateDisplay(level.buffer);

			// 스페이스바 또는 기호 입력(입력하고 즉시 다음 칸으로 이동)일 경우
			if(!Hangul.isConsonant(char) && !Hangul.isVowel(char)){
				this.setNextIndex();
				this.clearBuffer();
			}
		}
		this.dispatchNextCode();
	}

	dispatchNextCode(){
		let currentItem = this.getCurrentItem();
		if(!currentItem)
			return;

		let code; // return value
		let level = this.props.level;
		let nextItem = this.getNextItem();
		let text = currentItem.getData().text;

		text += (nextItem) ? nextItem.getData().text : '';

		if(level.form === Level.CHARACTER_FORM){
			code = getCode(currentItem.getData().text);
		}else{
			let len = this.props.level.buffer.length;
			let char = Hangul.d(text)[len];
			code = getCode(char);
		}

		function getCode(character) {
			let lang = level.language;
			for(let key in Keymap){
				if(Keymap[key][lang+'n'] === character.toLowerCase()){
					return Keymap[key].code;
				}
			}
			return '';
		}

		this.props.nextCode(code);
	}

	recordKey(e){
		let level = this.props.level;
		if(!level.intervalId){
			level.intervalId = setInterval(function () {
				level.timeCount++;
			}, 10);
		}

		level.timeRecord.push({
			timestamp: level.timeCount,
			keyCode: e.keyCode,
			shiftKey: e.shiftKey
		});
	}

	clearBuffer(){
		this.props.level.buffer = [];
	}
	addBuffer(char){
		this.props.level.buffer.push(char);
	}

	enterKeyLoop(){
		if(this.props.level.text.length === this.props.level.index){
			return;
		}

		// let item = this.getCurrentItem();
		let item = this.getPrevItem();
		if(!item)
			return;

		if(item.props.char === '↩'){
			this.clearBuffer();
		}else{
			this.setNextIndex();
			this.enterKeyLoop();
		}
	}

	setPrevIndex(){
		let item = this.getCurrentItem();
		if(item)
			item.setActive(false);

		this.props.level.index--;
		item = this.getCurrentItem();
		if(item){
			this.scroll(item);
			item.setActive(true);
		}
	}
	setNextIndex(){
		// current LetterItem
		let item = this.getCurrentItem();
		if(item)
			item.setActive(false);

		// next LetterItem
		this.props.level.index++;
		item = this.getCurrentItem();
		if(item){
			this.scroll(item);
			item.setActive(true);
		} else {
			this.finish();
		}
	}
	finish(){
		let data = Object.keys(this.refs).map((key) => {
			return this.refs[key].getData();
		});

		this.clearBuffer();
		this.stopCount();

		this.props.typingFinished(data);// to parent
	}
	stopCount(){
		let level = this.props.level;
		if(level.intervalId){
			clearInterval(level.intervalId);
		}
	}
	scroll(itemComponent){
		let itemNode = ReactDOM.findDOMNode(itemComponent);
		let listNode = ReactDOM.findDOMNode(this);
		let itemRect = itemNode.getBoundingClientRect();
		let st = Math.round(itemRect.y + listNode.scrollTop - itemRect.height) - 10;
		$(listNode).stop().animate({scrollTop: st}, 250);
	}

	updateDisplay(charArray){
		let item = this.getCurrentItem();
		if(item){
			item.input(Hangul.a(charArray));

			let selection = window.getSelection();
			let range = document.createRange();
			range.selectNodeContents(ReactDOM.findDOMNode(item));
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}

	getPrevItem(){
		return this.refs['letterItem'+ (this.props.level.index-1)];
	}

	getCurrentItem(){
		return this.refs['letterItem'+this.props.level.index];
	}

	getNextItem(){
		return this.refs['letterItem'+ (this.props.level.index+1)];
	}


	/****************************************************
	 * React Lifecycle Method
	 ****************************************************/
	componentDidMount(){
		this.addKeyboardEvent();
		this.getCurrentItem().setActive(true);// 첫 글자 아이템에 active 처리
		this.dispatchNextCode();
	}

	componentWillUnmount(){
		this.removeKeyboardEvent();
	}

	render(){
		let letters = [];
		let level = this.props.level;
		if(level){
			letters = level.text.split('');
		}

		let letterItems = letters.map((letter, i) => {
			return(
				<LetterItem ref={'letterItem'+i} char={letter} key={i}/>
			)
		});

		return(
			<div id="letterList" className="letter-list font-LexiSaebomR">
				{letterItems}
			</div>
		)
	}
}

export default LetterList;