import React, { Component } from 'react';
import {Jumbotron,FormGroup,Form,Input,Label,Col,Row,Button} from 'reactstrap';


class ContactUs extends Component {

    constructor(props){
        super(props);
        this.state = {
            input: {},
            errors: {},
            name: '',
            email:'',
            gender:'',
            birthday: ''
        }
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    componentDidMount(){
        document.title = "Account Settings"
      }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
          input
        });
      }

      handleEditProfile(event){

    }
    handleChangePassword(event){

    }
    render(){
        return (
            <div className="full-page">
                <Jumbotron className=" center full-page getStarted borderBottom">
                    <div className="container" >
                        <div className="row row-header">
                            <div className="col-12 col-sm-4">
                                <h1>Edit Your Profile</h1>
                            </div>
                            <div className="col-12 col-sm-6">
                            <Form onSubmit={this.handleEditProfile} id="EditProfileForm">
                            <FormGroup>
                                <Input type="text" id="fullname" name="fullname" placeholder="Full Name" value={this.state.input.name} onChange={this.handleChange}></Input>
                                <div className="text-danger">{this.state.errors.fullname}</div>
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" id="email" name="email" placeholder="E-mail Address" value={this.state.input.email} onChange={this.handleChange}></Input>
                                <div className="text-danger">{this.state.errors.email}</div>
                            </FormGroup>
                            <FormGroup>
                                <Input type="date" id="dateOfBirth" name="dateOfBirth" placeholder="Age" value={this.state.input.dateOfBirth} onChange={this.handleChange}></Input>
                                <div className="text-danger">{this.state.errors.dateOfBirth}</div>
                            </FormGroup>
                            <Row form>
                            <Col md={4}>
                                <Label for="gender">Gender</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup check>
                                    <Input type="radio" name="gender" value="male" onChange={this.handleChange}/>{' '}
                                    Male
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup check>
                                    <Input type="radio" name="gender" value="female" onChange={this.handleChange}/>{' '}
                                    Female
                                </FormGroup>
                            </Col>
                            </Row>
                            <div className="text-danger">{this.state.errors.gender}</div>
                            <Button type="submit" value="submit" color="primary">Save</Button>
                        </Form>
                        </div>
                        </div>
                        <div className="row row-header">
                            <div className="col-12 col-sm-4">
                                <h1>Change Password</h1>
                            </div>
                        <div className="col-12 col-sm-6">
                            <br/>
                        <Form onSubmit={this.handleChangePassword}>
                            <FormGroup>
                                <Input type="password" id="oldpassword" name="oldpassword" placeholder="Old Password" value={this.state.input.password} onChange={this.handleChange}></Input>
                                <div className="text-danger">{this.state.errors.password}</div>
                            </FormGroup>
                        <FormGroup>
                                <Input type="password" id="newpassword" name="newpassword" placeholder="New Password" value={this.state.input.password} onChange={this.handleChange}></Input>
                                <div className="text-danger">{this.state.errors.password}</div>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={this.state.input.confirmPassword} onChange={this.handleChange}></Input>
                                <div className="text-danger">{this.state.errors.confirmPassword}</div>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Save</Button>
                        </Form>
                        </div>
                            </div>
                        </div>
                </Jumbotron>
            </div>
        );
    }
}

export default ContactUs;