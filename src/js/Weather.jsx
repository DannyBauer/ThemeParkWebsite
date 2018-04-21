import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'

export default class Weather extends Component {
	constructor(props) {
		super(props);

		this.state = {
			weatherData: null,
		}
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	componentDidMount() {
		axios.get('/weather/Maumee,us').then((response) => {
			console.log("Weather Data: ", response);

			this.setState({weatherData: response.data})
		}).catch((error) => {
			console.log("Weather Data Failed To Load.");
		});
	}

	render() {
		const weatherData = this.state.weatherData;
		return (
			<div className="weather-panel">
				<div>
				{
					weatherData ? (
						<div>
						<div>
						Current Temp: {((9/5) * (weatherData.main.temp - 273) + 32).toFixed(0)}
						</div>
						<div>City: {weatherData.name}</div>
						</div>
					)
					: ''
				}
				</div>
			</div>
		)
	}
}
