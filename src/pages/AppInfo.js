import React from 'react';
import { Link } from 'react-router-dom';
import PackageInfo from '../../package';

class AppInfo extends React.Component{
	render(){
		return(
			<div className="container">
				<h3>Typing Play 에 대한 정보</h3>

				<div className="app-info-item">원종선(Won, Jong-sun)의 개인 프로젝트로 만들어 졌습니다.</div>

				<div className="app-info-item">
					<h4>Contact</h4>
					<p className="author">
						문의 또는 개선 사항이 있으면 아래의 방법으로 연락해 주세요.<br/>
						e-mail : cuebrick@gmail.com
					</p>
				</div>
				<div className="app-info-item">
					<h4>Program Version</h4>
					<p>Typing Play {PackageInfo.version} last updated on April 24th, 2018</p>
				</div>
				<div className="app-info-item">
					<h4>Open Source Licenses</h4>
					<ul className="open-source-list">
						<li>
							<h5>ReactJS</h5>
							<a href="https://reactjs.org/">https://reactjs.org/</a>
						</li>
						<li>
							<h5>Hangul.js</h5>
							<a href="https://www.npmjs.com/package/hangul-js">https://www.npmjs.com/package/hangul-js</a>
						</li>
						<li>
							<h5>jQuery</h5>
							<a href="https://www.jquery.com">https://www.jquery.com</a>
						</li>
						<li>
							<h5>activate-power-mode</h5>
							<a href="https://www.npmjs.com/package/activate-power-mode" target="_blank">https://www.npmjs.com/package/activate-power-mode</a>
						</li>
					</ul>
				</div>
				<div className="button-ui">
					<Link to="/levels"><button>단계 목록으로 이동</button></Link>
					<Link to="/about"><button>Typing Play 일반 정보</button></Link>
					<Link to="/settings" className="settings-btn">
						<button>
							<img src="/images/settings.svg" width="15" height="15"/>
							설정
						</button>
					</Link>
				</div>
			</div>
		)
	}
}

export default AppInfo;