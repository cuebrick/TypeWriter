import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from '../pages/Main';
import Levels from '../pages/Levels';
import Typing from '../pages/Typing';
import NotFound from "../pages/NotFound";
import IEFix from '../lib/ie-fix';
import Settings from "../pages/Settings";

class App extends React.Component{
	constructor(props){
		super(props);
		new IEFix().addArrayFind();
	}
	render(){
		return(
			<Router>
				<div className="wrapper">
					<Header/>
					<Switch>
						<Route exact path="/" component={Main}/>
						<Route path="/levels" component={Levels}/>
						<Route path="/typing/:id" component={Typing}/>
						<Route path="/settings" component={Settings}/>
						<Route component={NotFound}/>
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App;