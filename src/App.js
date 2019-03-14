import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dahboard';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import NewReview from './components/reviews/NewReview';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route path="/signup" component={SignUp} />
						<Route path="/signin" component={SignIn} />
						<Route path="/new" component={NewReview} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
