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
import Tickets from './Tickets.jsx'
import rocketlogo from '../images/rocket-logo.png'

const Navigation = (props) => {
	const { attractionsHandler, ticketsHandler, homeHandler, activePage } = props;
	return (
		<Navbar fixedTop fluid className="navbar">
				<Nav pullLeft>
				<NavItem style={{marginTop: 7}} onClick={ (e) => { homeHandler(e); } }>
				<span className={activePage == 'home' ? "navbar-item-active" : "navbar-item"}>
					Home
				</span>
				</NavItem>
					<NavItem style={{marginTop: 7}} onClick={ (e) => { attractionsHandler(e); } }>
					<span className={activePage == 'attractions' ? "navbar-item-active" : "navbar-item"}>
						Attractions
					</span>
					</NavItem>
					<NavItem style={{marginTop: 7}} onClick={ (e) => { ticketsHandler(e); } }>
					<span className={activePage == 'tickets' ? "navbar-item-active" : "navbar-item"}>
						Tickets
					</span>
					</NavItem>
					<NavItem>
						<Weather />
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
					activePage == 'attractions' ? <div className="body-spacing"><Attractions /></div> : ''
				}
				{
					activePage == 'tickets' ? <div className="body-spacing"><Tickets /></div> : ''
				}

				{
					activePage == 'home' ?
						<div className="body-spacing">
							<Grid>
								<Row>
									<Col xs={12} md={2}>
									</Col>
									<Col xs={12} md={8}>
									<span className="hello-world">Hello World!</span>
									</Col>
									<Col xs={12} md={2}>
									</Col>
								</Row>
								<br />
								<br />
								<Row>
									<Col xs={12} md={7}>
									<Twitter />
									</Col>
									<Col xs={12} md={5}>
									<iframe width="400px" height="400px" src="//www.google.com/maps/embed/v1/directions?origin=Toledo,OH&destination=Cedar+Point&key=AIzaSyDyuPkQFj3habP_L8fTy_JECcFzS-qgEj0">
								  </iframe>
									</Col>
								</Row>
							</Grid>
						</div>
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
