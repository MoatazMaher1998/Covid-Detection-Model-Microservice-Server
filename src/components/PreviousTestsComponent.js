import React, { Component } from 'react';
import {Jumbotron,Button,Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
var myStorage = window.localStorage;

class PreviousTests extends Component {

    constructor(props) {
        super(props);
    
      }

      componentDidMount(){
        document.title = "Previous Tests"
      }
      getData(){
        axios.post(process.env.REACT_APP_Domain  + "/getData", myStorage.getItem("email"))
        .then((response) => {console.log(response); return( <div>response</div> )});
      }
      render() {
        
        return (
            <div className="getStarted full-page">
                <Jumbotron>
            <Table striped bordered className="table">
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Date</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                            <td>10-10-2020</td>
                            <td>90% Chance of being Positive</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>10-10-2020</td>
                        <td>100% Chance of being Negative</td>
                    </tr>
                </tbody>
            </Table>
            </Jumbotron>
            </div>

        )
      }
    }

export default PreviousTests;