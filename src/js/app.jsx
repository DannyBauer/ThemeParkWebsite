import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {
	Button,
	Nav,
	Navbar,
	NavItem,
	NavDropdown,
	MenuItem,
	Grid,
	Row,
	Col
} from 'react-bootstrap'

import Weather from './Weather.jsx'
import Twitter from './Twitter.jsx'
import Attractions from './Attractions.jsx'
import rocketlogo from '../images/rocket-logo.png'

const Navigation = (props) => {
	const { attractionsHandler, ticketsHandler, homeHandler, activePage } = props;
	return (
		<Navbar fixedTop fluid className="navbar">
				<Nav pullLeft>
				<NavItem onClick={ (e) => { homeHandler(e); } }>
				<span className={activePage == 'home' ? "navbar-item-active" : "navbar-item"}>
					Home
				</span>
				</NavItem>
					<NavItem onClick={ (e) => { attractionsHandler(e); } }>
					<span className={activePage == 'attractions' ? "navbar-item-active" : "navbar-item"}>
						Attractions
					</span>
					</NavItem>
					<NavItem onClick={ (e) => { ticketsHandler(e); } }>
					<span className={activePage == 'tickets' ? "navbar-item-active" : "navbar-item"}>
						Tickets
					</span>
					</NavItem>
				</Nav>
		</Navbar>
	)
};


class App extends Component {
	constructor(props) {
		super(props);
		this.componentDidMount = this.componentDidMount.bind(this);

		this.state = {
			activePage: 'home',
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.attractionsHandler = this.attractionsHandler.bind(this);
		this.ticketsHandler = this.ticketsHandler.bind(this);
		this.homeHandler = this.homeHandler.bind(this);
	}

	componentDidMount() {}

	attractionsHandler(event) {
		event.preventDefault();
		this.setState({activePage: 'attractions'});
	}

	ticketsHandler(event) {
		event.preventDefault();
		this.setState({activePage: 'tickets'});
	}

	homeHandler(event) {
		event.preventDefault();
		this.setState({activePage: 'home'});
	}

	render() {

		const activePage = this.state.activePage;
		return (
			<div>
			<Navigation
				attractionsHandler={this.attractionsHandler}
				ticketsHandler={this.ticketsHandler}
				homeHandler={this.homeHandler}
				activePage={activePage}
			/>
				<div className="moveBody">
				{
					activePage == 'attractions' ? <Attractions /> : ''
				}
				{
					activePage == 'tickets' ? <span className="ticket-panel"> Hello get your tickets here </span> : ''
				}

				{
					activePage == 'home' ?
							<Grid>
								<Row>
									<Col xs={12} md={4}>
										<Twitter />
									</Col>
									<Col xs={12} md={4}>
									</Col>
									<Col xs={12} md={4}>
									<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47835.19115207163!2d-82.7184735681806!3d41.467433606243496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883a443634b28c5f%3A0x6d5cd5dbbd29ea06!2sCedar+Point%2C+Sandusky%2C+OH+44870!5e0!3m2!1sen!2sus!4v1523986811404" width="250" height="250" frameBorder="0" style={{border: '0'}} allowFullScreen></iframe>
									</Col>
								</Row>
							</Grid>
					: ''
				}
				</div>
			</div>
		);
	}
}

ReactDOM.render((
		<App />
), document.getElementById("application"));
