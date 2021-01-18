import React, { Component } from 'react';
import {Jumbotron,Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class Home extends Component {

    componentDidMount(){
        document.title = "Check Me Up"
      }

    render(){
        return (
            <div className="getStarted">
                <Jumbotron className="center  getStarted largeFont borderBottom">
                    <div className="container" >
                        <div className="row row-header">
                            <div className=" center col-12 col-sm-6">
                                <h1>Get Your Results Now!</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla odio, sodales in lorem eget.</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/getstarted"><Button color="primary">Get Started</Button></Link>
                </Jumbotron>
                <Jumbotron className="center contactUs largeFont borderBottom">
                    <div className="container" >
                        <div className="row row-header">
                            <div className="center col-12 col-sm-6">
                                <h1>Contact Us</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla odio, sodales in lorem eget.</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/contactus"><Button color="primary">Learn More</Button></Link>
                </Jumbotron>
                <Jumbotron className="center  aboutUs largeFont borderBottom">
                    <div className=" container" >
                        <div className="row row-header">
                            <div className="center col-12 col-sm-6">
                                <h1>About Us</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla odio, sodales in lorem eget.</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/aboutus"><Button color="primary">Learn More</Button></Link>
                </Jumbotron>
            </div>
        );
    }
}

export default Home;