import uuid from 'uuid'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'



export default class Twitter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tweetData: null,
		}
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		axios.get('/tweets').then((response) => {
			//console.log("Twitter Data here: ", response.data);
			this.setState({tweetData: response.data})
		}).catch((error) => {
			console.log("Tweet Data Failed To Load.");
		});
	}

	render() {

    const tweetData = this.state.tweetData;
    var statuses;
    if (tweetData) {
      statuses = tweetData.statuses;
    }
    //console.log(statuses);

		return (
			<div className="tweet-panel">
				<h3>Tweets about</h3>
				<div className="hello-world twitter"> Hello World! </div>
        {
          statuses ? statuses.map((val, idx) => {
            return (
              <div key={uuid()}>
                <div className="tweet username">@{val.user.screen_name}</div>
                <div className="tweet">{val.text}</div>
								<br />
              </div>
            )
          }) : ''
        }
        <p></p>
			</div>
		)
	}
}
