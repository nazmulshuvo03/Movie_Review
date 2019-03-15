import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import NewReview from './components/reviews/NewReview';
import ReviewDetails from './components/reviews/ReviewDetails';

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
						<Route path="/review/:id" component={ReviewDetails} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
