import uuid from 'uuid'
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
	Col,
	Carousel,
	Image
} from 'react-bootstrap'
import rollercoaster from "../images/rollercoaster.jpg"

export default class Attractions extends Component {
	constructor(props) {
		super(props);

    this.state = {
			attractionData: null,
		}
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		axios.get('/rollercoasters').then((response) => {
			//console.log("Roller Coasters here boi: ", response.data);

			this.setState({attractionData: response.data})
		}).catch((error) => {
			console.log("Attraction Data Failed To Load.");
		});
	}

	render() {
		const attractions = this.state.attractionData;
		return (
			<div>
				<div>
        {
          attractions ? attractions.map((val, idx) => {
            return (
              <div key={uuid()}>
              <Grid>
								<Row>
									<Col xs={12} md={6} className="attraction-panel">
                  <div>Attraction:</div>
                  <div>Name: {val.name}</div>
                  <div>Height Requirement: {val.heightMin}</div>
                  <div>Top Speed: {val.topSpeed}</div>
                  <div>Track Length: {val.trackLength}</div>
									</Col>
									<Col xs={12} md={6}>
									<img height={300} src={rollercoaster} />
									</Col>
								</Row>
							</Grid>
              <br /><br /><br /><br /><br /><br />
              </div>
            )
          }) : ''
        }
				</div>
			</div>
		)
	}
}
