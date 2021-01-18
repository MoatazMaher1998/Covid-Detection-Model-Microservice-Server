import React, { Component } from 'react';
import {Jumbotron,Button,Table} from 'reactstrap';
import {Link} from 'react-router-dom';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    
      }

      componentDidMount(){
        document.title = "Dashboard"
      }

      render() {
    
        return (

          <div className="getStarted flex full-page">
                <Jumbotron className="largeFont col-md-4 borderRight">
                    <div className="container" >
                        <div className="row row-header">
                            <div className=" center col-12">
                                <h1>Previous Tests</h1>
                                <p>Click on the button below to view your last tests</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/previousTests"><Button color="primary">View Your History</Button></Link>
                </Jumbotron>
                <Jumbotron className="largeFont col-md-4 borderRight">
                    <div className="container" >
                        <div className="row row-header">
                            <div className="center col-12 col-sm-6">
                                <h1>Make a new Test</h1>
                                <p>Click here to make a new test</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/getStarted"><Button color="primary">Make A Test</Button></Link>
                </Jumbotron>
                <Jumbotron className="largeFont col-md-4">
                    <div className=" container" >
                        <div className="row row-header">
                            <div className="center col-12 col-sm-6">
                                <h1>Account Settings</h1>
                                <p>Click Here to View and Edit your Account Settings</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/account"><Button color="primary">Account Settings</Button></Link>
                </Jumbotron>
            </div>

          
        );
      }
}

export default Dashboard;