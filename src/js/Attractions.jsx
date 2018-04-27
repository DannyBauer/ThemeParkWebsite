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
import rollercoaster2 from "../images/rollercoaster2.jpg"
import Slider from 'react-slick'


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
		var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
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
                  <div style={{fontSize: 40}}>{val.name}</div>
                  <div><img height={50} src={"/images/height-requirement.png"} /> {val.heightMin}</div>
									<br />
                  <div><img height={50} src={"/images/speed.png"} /> {val.topSpeed}</div>
									<br />
                  <div><img height={50} src={"/images/length.png"} /> {val.trackLength}</div>
									<br />
									</Col>
									<Col xs={12} md={1}>
									</Col>
									<Col xs={12} md={5}>
									<div>
									<Slider {...settings} className="attraction-slideshow">
									{val.images.map((value, index) =>  {
										return (
											<div>
							          <img height={310} src={'/images/' + value} />
							        </div>
											);
										})
									}
						      </Slider>
									</div>
									</Col>
								</Row>
								<br />
								<br />
								<Row>
								<Col xs={12} md={3}>
								</Col>
								<Col xs={12} md={6}>
								<iframe width="560" height="315" src={val.video} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
								</Col>
								<Col xs={12} md={1}>
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
