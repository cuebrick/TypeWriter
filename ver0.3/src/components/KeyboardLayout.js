import React from 'react';

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
					<div data-key="192">
						<div className="en">
							<div className="shift">~</div>
							<div className="normal">`</div>
						</div>
					</div>
					<div data-key="49">
						<div className="en">
							<div className="shift">!</div>
							<div className="normal">1</div>
						</div>
					</div>
					<div data-key="50">
						<div className="en">
							<div className="shift">@</div>
							<div className="normal">2</div>
						</div>
					</div>
					<div data-key="51">
						<div className="en">
							<div className="shift">#</div>
							<div className="normal">3</div>
						</div>
					</div>
					<div data-key="52">
						<div className="en">
							<div className="shift">$</div>
							<div className="normal">4</div>
						</div>
					</div>
					<div data-key="53">
						<div className="en">
							<div className="shift">%</div>
							<div className="normal">5</div>
						</div>
					</div>
					<div data-key="54">
						<div className="en">
							<div className="shift">^</div>
							<div className="normal">6</div>
						</div>
					</div>
					<div data-key="55">
						<div className="en">
							<div className="shift">&amp;</div>
							<div className="normal">7</div>
						</div>
					</div>
					<div data-key="56">
						<div className="en">
							<div className="shift">*</div>
							<div className="normal">8</div>
						</div>
					</div>
					<div data-key="57">
						<div className="en">
							<div className="shift">(</div>
							<div className="normal">9</div>
						</div>
					</div>
					<div data-key="48">
						<div className="en">
							<div className="shift">)</div>
							<div className="normal">0</div>
						</div>
					</div>
					<div data-key="189">
						<div className="en">
							<div className="shift">_</div>
							<div className="normal">-</div>
						</div>
					</div>
					<div data-key="187">
						<div className="en">
							<div className="shift">+</div>
							<div className="normal">=</div>
						</div>
					</div>
					<div data-key="8" className="type4">back</div>
				</div>
				<div className="row">
					<div className="type2 disable">tab</div>
					<div data-key="81">
						<div className="en">
							<div className="normal">Q</div>
						</div>
						<div className="kr">
							<div className="shift">ㅃ</div>
							<div className="normal">ㅂ</div>
						</div>
					</div>
					<div data-key="87">
						<div className="en">
							<div className="normal">W</div>
						</div>
						<div className="kr">
							<div className="shift">ㅉ</div>
							<div className="normal">ㅈ</div>
						</div>
					</div>
					<div data-key="69">
						<div className="en">
							<div className="normal">E</div>
						</div>
						<div className="kr">
							<div className="shift">ㄸ</div>
							<div className="normal">ㄷ</div>
						</div>
					</div>
					<div data-key="82">
						<div className="en">
							<div className="normal">R</div>
						</div>
						<div className="kr">
							<div className="shift">ㄲ</div>
							<div className="normal">ㄱ</div>
						</div>
					</div>
					<div data-key="84">
						<div className="en">
							<div className="normal">T</div>
						</div>
						<div className="kr">
							<div className="shift">ㅆ</div>
							<div className="normal">ㅅ</div>
						</div>
					</div>
					<div data-key="89">
						<div className="en">
							<div className="normal">Y</div>
						</div>
						<div className="kr">
							<div className="normal">ㅛ</div>
						</div>
					</div>
					<div data-key="85">
						<div className="en">
							<div className="normal">U</div>
						</div>
						<div className="kr">
							<div className="normal">ㅕ</div>
						</div>
					</div>
					<div data-key="73">
						<div className="en">
							<div className="normal">I</div>
						</div>
						<div className="kr">
							<div className="normal">ㅑ</div>
						</div>
					</div>
					<div data-key="79">
						<div className="en">
							<div className="normal">O</div>
						</div>
						<div className="kr">
							<div className="shift">ㅒ</div>
							<div className="normal">ㅐ</div>
						</div>
					</div>
					<div data-key="80">
						<div className="en">
							<div className="normal">P</div>
						</div>
						<div className="kr">
							<div className="shift">ㅖ</div>
							<div className="normal">ㅔ</div>
						</div>
					</div>
					<div data-key="219">
						<div className="en">
							<div className="shift">&#123;</div>
								<div className="normal">[</div>
								</div>
								</div>
								<div data-key="221">
								<div className="en">
								<div className="shift">&#125;</div>
							<div className="normal">]</div>
						</div>
					</div>
					<div data-key="220" className="type2">
						<div className="en">
							<div className="shift">|</div>
							<div className="normal">&#92;</div>
						</div>
						<div className="kr">
							<div className="normal">&#8361;</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div data-key="20" className="type3 disable">caps</div>
					<div data-key="65">
						<div className="en">
							<div className="normal">A</div>
						</div>
						<div className="kr">
							<div className="normal">ㅁ</div>
						</div>
					</div>
					<div data-key="83">
						<div className="en">
							<div className="normal">S</div>
						</div>
						<div className="kr">
							<div className="normal">ㄴ</div>
						</div>
					</div>
					<div data-key="68">
						<div className="en">
							<div className="normal">D</div>
						</div>
						<div className="kr">
							<div className="normal">ㅇ</div>
						</div>
					</div>
					<div data-key="70">
						<div className="en">
							<div className="normal">F</div>
						</div>
						<div className="kr">
							<div className="normal">ㄹ</div>
						</div>
					</div>
					<div data-key="71">
						<div className="en">
							<div className="normal">G</div>
						</div>
						<div className="kr">
							<div className="normal">ㅎ</div>
						</div>
					</div>
					<div data-key="72">
						<div className="en">
							<div className="normal">H</div>
						</div>
						<div className="kr">
							<div className="normal">ㅗ</div>
						</div>
					</div>
					<div data-key="74">
						<div className="en">
							<div className="normal">J</div>
						</div>
						<div className="kr">
							<div className="normal">ㅓ</div>
						</div>
					</div>
					<div data-key="75">
						<div className="en">
							<div className="normal">K</div>
						</div>
						<div className="kr">
							<div className="normal">ㅏ</div>
						</div>
					</div>
					<div data-key="76">
						<div className="en">
							<div className="normal">L</div>
						</div>
						<div className="kr">
							<div className="normal">ㅣ</div>
						</div>
					</div>
					<div data-key="186">
						<div className="en">
							<div className="shift">:</div>
							<div className="normal">;</div>
						</div>
					</div>
					<div data-key="222">
						<div className="en">
							<div className="shift">"</div>
							<div className="normal">'</div>
						</div>
					</div>
					<div data-key="13" className="type5">enter</div>
				</div>
				<div className="row">
					<div data-key="16" className="type5">shift</div>
					<div data-key="90">
						<div className="en">
							<div className="normal">Z</div>
						</div>
						<div className="kr">
							<div className="normal">ㅋ</div>
						</div>
					</div>
					<div data-key="88">
						<div className="en">
							<div className="normal">X</div>
						</div>
						<div className="kr">
							<div className="normal">ㅌ</div>
						</div>
					</div>
					<div data-key="67">
						<div className="en">
							<div className="normal">C</div>
						</div>
						<div className="kr">
							<div className="normal">ㅊ</div>
						</div>
					</div>
					<div data-key="86">
						<div className="en">
							<div className="normal">V</div>
						</div>
						<div className="kr">
							<div className="normal">ㅍ</div>
						</div>
					</div>
					<div data-key="66">
						<div className="en">
							<div className="normal">B</div>
						</div>
						<div className="kr">
							<div className="normal">ㅠ</div>
						</div>
					</div>
					<div data-key="78">
						<div className="en">
							<div className="normal">N</div>
						</div>
						<div className="kr">
							<div className="normal">ㅜ</div>
						</div>
					</div>
					<div data-key="77">
						<div className="en">
							<div className="normal">M</div>
						</div>
						<div className="kr">
							<div className="normal">ㅡ</div>
						</div>
					</div>
					<div data-key="188">
						<div className="en">
							<div className="shift">&lt;</div>
							<div className="normal">,</div>
						</div>
					</div>
					<div data-key="190">
						<div className="en">
							<div className="shift">&gt;</div>
							<div className="normal">.</div>
						</div>
					</div>
					<div data-key="191">
						<div className="en">
							<div className="shift">?</div>
							<div className="normal">/</div>
						</div>
					</div>
					<div data-key="16" className="type6">shift</div>
				</div>
				<div className="row">
					<div data-key="17" className="type1 disable">ctrl</div>
					<div data-key="91" className="type1 disable">win</div>
					<div data-key="18" className="type1 disable">alt</div>
					<div data-key="32" className="type7">space</div>
					<div data-key="21" className="type1 disable">alt</div>
					<div className="type1 disable">win</div>
					<div data-key="93" className="type1 disable">c</div>
					<div data-key="25" className="type1 disable">ctrl</div>
				</div>
			</div>
		)
	}
}

export default KeyboardLayout;