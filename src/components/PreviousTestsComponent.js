import React, { Component } from 'react';
import {Jumbotron,Button,Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
var myStorage = window.localStorage;

class PreviousTests extends Component {

    
    constructor(props) {
        super(props);
        const listItems = {}
      }

      componentDidMount(){
        document.title = "Previous Tests"
        var Passer = {
            email : myStorage.getItem("email")}
            
            axios.post(process.env.REACT_APP_Domain  + "/getData", Passer)
            .then((response) => {console.table(response.data);
               this.listItems = response.data.map((result,index) => {
                return(
                         <tr>
                            <th scope="row">{index+1}</th>
                                <td>{result.resultDate}</td>
                                <td>{result.resultValue}</td>
                        </tr>
               )});
               console.log(this.listItems);
               this.forceUpdate();
            }
            ); 
        
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
                    {this.listItems}
                </tbody>
                
            </Table>
            </Jumbotron>
            </div>

        )
      }
    }

export default PreviousTests;