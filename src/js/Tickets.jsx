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
    Col
} from 'react-bootstrap'

export default class Tickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.initialzeCart();
    }

    initialzeCart() {
        if (!localStorage.childTicketCount &&
            !localStorage.adultTicketCount &&
            !localStorage.seniorTicketCount) {
                localStorage.childTicketCount  = 0;
                localStorage.adultTicketCount  = 0;
                localStorage.seniorTicketCount = 0;
                localStorage.totalTicketPrice  = 0;
            }
        if (localStorage.childTicketCount) {
        document.getElementById('childTicketCount').innerHTML = " " + localStorage.childTicketCount;
        } else {
        document.getElementById('childTicketCount').innerHTML = " 0";
        }
        if (localStorage.adultTicketCount) {
        document.getElementById('adultTicketCount').innerHTML = " " + localStorage.adultTicketCount;
        } else {
        document.getElementById('adultTicketCount').innerHTML = " 0";
        }
        if (localStorage.seniorTicketCount) {
        document.getElementById('seniorTicketCount').innerHTML = " " + localStorage.seniorTicketCount;
        } else {
        document.getElementById('seniorTicketCount').innerHTML = " 0";
        }
        if (localStorage.totalTicketPrice) {
        document.getElementById('totalTicketPrice').innerHTML = " $" + localStorage.totalTicketPrice;
        } else {
        document.getElementById('totalTicketPrice').innerHTML = " $0";
        }
    }

    purchaseChildTicket(event) {
        event.preventDefault();
        localStorage.childTicketCount = Number(localStorage.childTicketCount) + 1;
        document.getElementById('childTicketCount').innerHTML = " " + localStorage.childTicketCount;
        localStorage.totalTicketPrice = Number(localStorage.totalTicketPrice) + 15;
        document.getElementById('totalTicketPrice').innerHTML = " $" + localStorage.totalTicketPrice;
        document.getElementById('purchase-complete').innerHTML = "";
    }

    removeChildTicket(event) {
        event.preventDefault();
        if (localStorage.childTicketCount && localStorage.childTicketCount != 0) {
            localStorage.childTicketCount = Number(localStorage.childTicketCount) - 1;
            document.getElementById('childTicketCount').innerHTML = " " + localStorage.childTicketCount;
            if (localStorage.totalTicketPrice && localStorage.totalTicketPrice != 0) {
                localStorage.totalTicketPrice = Number(localStorage.totalTicketPrice) - 15;
                document.getElementById('totalTicketPrice').innerHTML = " $" + localStorage.totalTicketPrice;
            }
        }
    }

    purchaseAdultTicket(event) {
        event.preventDefault();
        localStorage.adultTicketCount = Number(localStorage.adultTicketCount) + 1;
        document.getElementById('adultTicketCount').innerHTML = " " + localStorage.adultTicketCount;
        localStorage.totalTicketPrice = Number(localStorage.totalTicketPrice) + 20;
        document.getElementById('totalTicketPrice').innerHTML = " $" + localStorage.totalTicketPrice;
        document.getElementById('purchase-complete').innerHTML = "";
    }

    removeAdultTicket(event) {
        event.preventDefault();
        if (localStorage.adultTicketCount && localStorage.adultTicketCount != 0) {
            localStorage.adultTicketCount = Number(localStorage.adultTicketCount) - 1;
            document.getElementById('adultTicketCount').innerHTML = " " + localStorage.adultTicketCount;
            if (localStorage.totalTicketPrice && localStorage.totalTicketPrice != 0) {
                localStorage.totalTicketPrice = Number(localStorage.totalTicketPrice) - 20;
                document.getElementById('totalTicketPrice').innerHTML = " $" + localStorage.totalTicketPrice;
            }
        }
    }

    purchaseSeniorTicket(event) {
        event.preventDefault();
        localStorage.seniorTicketCount = Number(localStorage.seniorTicketCount) + 1;
        document.getElementById('seniorTicketCount').innerHTML = " " + localStorage.seniorTicketCount;
        localStorage.totalTicketPrice = Number(localStorage.totalTicketPrice) + 10;
        document.getElementById('totalTicketPrice').innerHTML = " $" + localStorage.totalTicketPrice;
        document.getElementById('purchase-complete').innerHTML = "";
    }

    removeSeniorTicket(event) {
        event.preventDefault();
        if (localStorage.seniorTicketCount && localStorage.seniorTicketCount != 0) {
            localStorage.seniorTicketCount = Number(localStorage.seniorTicketCount) - 1;
            document.getElementById('seniorTicketCount').innerHTML = " " + localStorage.seniorTicketCount;
            if (localStorage.totalTicketPrice && localStorage.totalTicketPrice != 0) {
                localStorage.totalTicketPrice = Number(localStorage.totalTicketPrice) - 10;
                document.getElementById('totalTicketPrice').innerHTML = " $" + localStorage.totalTicketPrice;
            }
        }
    }

    completePurchase(event) {
      event.preventDefault();
      localStorage.childTicketCount  = 0;
      localStorage.adultTicketCount  = 0;
      localStorage.seniorTicketCount = 0;
      if (localStorage.totalTicketPrice != 0) {
              document.getElementById('purchase-complete').innerHTML = "      Purchase Complete!";
        }
      localStorage.totalTicketPrice  = 0;
      document.getElementById('childTicketCount').innerHTML = " 0";
      document.getElementById('adultTicketCount').innerHTML = " 0";
      document.getElementById('seniorTicketCount').innerHTML = " 0";
      document.getElementById('totalTicketPrice').innerHTML = " $0";
    }

    render() {
        return (
            <div>
                <Grid className="ticket-panel">
                    <Row>
                        Purchase a childrens ticket (ages 0-18) $15:
                        <button onClick={ (e) => { this.purchaseChildTicket(e); } } className="btn btn-success"> + </button>
                        <button onClick={ (e) => { this.removeChildTicket(e); } } className="btn btn-danger"> - </button>

                    </Row>
                    <Row>
                        Purchase an adults ticket (ages 18-54) $20:
                        <button onClick={ (e) => { this.purchaseAdultTicket(e); } } className="btn btn-success"> + </button>
                        <button onClick={ (e) => { this.removeAdultTicket(e); } } className="btn btn-danger"> - </button>

                    </Row>
                    <Row>
                        Purchase a seniors ticket (ages 55+) $10:
                        <button onClick={ (e) => { this.purchaseSeniorTicket(e); } } className="btn btn-success"> + </button>
                        <button onClick={ (e) => { this.removeSeniorTicket(e); } } className="btn btn-danger"> - </button>
                    </Row>
                    <Row>
                    <br /> <br />
                    Cart:
                    <Grid>
                    <Row>
                    Childrens Tickets:
                    <span id="childTicketCount"></span>
                    </Row>
                    <Row>
                    Adult Tickets:
                    <span id="adultTicketCount"></span>
                    </Row>
                    <Row>
                    Senior Tickets:
                    <span id="seniorTicketCount"></span>
                    </Row>
                    <Row>
                    Total:
                    <span id="totalTicketPrice"> </span>
                    </Row>
                    <Row>
                    <br />
                    <button className="btn btn-primary purchase-button"  onClick={ (e) => { this.completePurchase(e); } }> Purchase Tickets </button>
                    <span id="purchase-complete" className="hello-world twitter"> </span>
                    </Row>
                    </Grid>
                    </Row>
                </Grid>
            </div>
        )
    }
}
