import React, { Component } from 'react';
import { Navbar,Nav, NavbarToggler, Collapse, NavItem, NavbarBrand ,Button,Modal,ModalHeader,ModalBody, FormGroup,Form,Input,Label,Col,Row} from 'reactstrap';
import {Link,NavLink,BrowserRouter as Router,Redirect } from 'react-router-dom';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import '../header.css';

var myStorage = window.localStorage;

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isRegistrationModalOpen: false,
            input: {},
            errors: {},
            auth: false,
            name: '',
            picture: '',
            email:'',
            gender:'',
            birthday: '',
            loginErrorMessage:'',
            RegistrationerrorMessage:''
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleRegistrationModal = this.toggleRegistrationModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.logout = this.logout.bind(this);
    }
    
    responseGoogle = (googleResponse) => {
        
        if(googleResponse.accessToken)
        {
            let birthdate;
            let genders;
            var birthdayUrl="https://people.googleapis.com/v1/people/" + googleResponse.googleId + "?personFields=genders,birthdays";
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const AuthStr = 'Bearer '.concat(googleResponse.accessToken); 
            axios.get(birthdayUrl, { headers: { Authorization: AuthStr ,"X-Requested-With": "XMLHttpRequest"} })
            .then(response => {
                birthdate=response.data.birthdays[1].date;
                genders=response.data.genders[0].value;
                this.setState({
                    auth: true,
                    name: googleResponse.profileObj.name,
                    picture: googleResponse.profileObj.imageUrl,
                    email:googleResponse.profileObj.email,
                    birthday:birthdate,
                    gender: genders });
                myStorage.setItem("loggedIn", true);
                myStorage.setItem("email",googleResponse.profileObj.email);
                this.forceUpdate()
            })
            .catch((error) => {
                console.log('error ' + error);
            });
      }
    }

    responseFacebook = response => {
        if(response.status !== 'unknown')
        {
        this.setState({
            auth: true,
            name: response.name,
            picture: response.picture.data.url,
            email:response.email,
            birthday: response.birthday,
            gender: response.gender
        });
     //   axios.post(process.env.REACT_APP_Domain + "/newuser", response);
        myStorage.setItem("loggedIn", true);
        myStorage.setItem("email",response.email);
        this.forceUpdate()
    }
        
    }

    componentClicked = () => {
        console.log('Facebook btn clicked');
    }


    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
          input
        });
      }

    toggleNav() {
        this.setState({
            isNavOpen : !this.state.isNavOpen
        });
    }

    toggleLoginModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    logout(){
        myStorage.setItem("loggedIn", false);
        myStorage.clear();
        this.forceUpdate()
        this.setState({input: {},
            errors: {},
            auth: false,
            name: '',
            picture: '',
            email:'',
            gender:'',
            birthday: '',
            loginErrorMessage:'',
            RegistrationerrorMessage:''})
    }

    handleRegistration(event){ 
        event.preventDefault();
        if(this.validateRegistration()){

            axios.post(process.env.REACT_APP_Domain + "/newuser", this.state.input).then(response => {
                this.toggleRegistrationModal();
                let input = {};
                input["name"] = "";
                input["email"] = "";
                input["password"] = "";
                input["confirmPassword"] = "";
                input["dateOfBirth"] = "";
                input["gender"] = "";
                this.setState({input:input,RegistrationerrorMessage:''});
                
            })
            .catch((error) => {
                if(error.status===401){
                    this.setState({RegistrationerrorMessage:'This E-mail address is already registered'});
                }
            });
        }
    }

    toggleRegistrationModal(){
        this.setState({
            isRegistrationModalOpen : !this.state.isRegistrationModalOpen
        });
    }

    validateLogin(){
                let input = this.state.input;
        let errors = {};
        let isValid = true;
    
        if (!input["email"]) {
          isValid = false;
          errors["loginEmail"] = "Please enter your email Address.";
        }

        if (!input["password"]) {
            isValid = false;
            errors["loginPassword"] = "Please enter your password.";
          }

          this.setState({
            errors: errors
          });
      
          return isValid;
    }

    validateRegistration(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
    
        if (!input["fullname"]) {
          isValid = false;
          errors["fullname"] = "Please enter your name.";
        }
    
        if (!input["email"]) {
          isValid = false;
          errors["email"] = "Please enter your email Address.";
        }
    
        if (typeof input["email"] !== "undefined") {
            
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
          }
        }
    
        if (!input["password"]) {
          isValid = false;
          errors["password"] = "Please enter your password.";
        }

        if (!input["gender"]) {
            isValid = false;
            errors["gender"] = "Please specify your gender.";
          }
    
        if (!input["confirmPassword"]) {
          isValid = false;
          errors["confirmPassword"] = "Please confirm your password.";
        }

        if (!input["dateOfBirth"]) {
            isValid = false;
            
            errors["dateOfBirth"] = "Please Enter your Date of Birth.";
          }
    
        if (typeof input["password"] !== "undefined" && typeof input["confirmPassword"] !== "undefined") {
            
          if (input["password"] !== input["confirmPassword"]) {
            isValid = false;
            errors["confirmPassword"] = "Passwords don't match.";
          }
        } 
    
        this.setState({
          errors: errors
        });
    
        return isValid;
    }

    

    handleLogin(event){
        event.preventDefault();
        if(this.validateLogin()){
            
            axios.post(process.env.REACT_APP_Domain + "/getUser", this.state.input).then((response) => {
                if(response.data.status.toString()==="pass") {
                    myStorage.setItem("email",this.state.input.email)  
                    this.toggleLoginModal();    
                    let input = {};
                    input["loginEmail"] = "";
                    input["loginPassword"] = "";
                    input["rememberMe"] = "";
                    this.setState({input:input,loginErrorMessage:''});
                    myStorage.setItem("loggedIn", true);       
                    this.forceUpdate()
                }
                else if (response.data.status.toString()==="noUser"){
                    this.setState({loginErrorMessage:'The e-mail address you entered is not correct'});
                }
                else if (response.data.status.toString()==='wrongPassword'){
                    this.setState({loginErrorMessage:'The password you entered is not correct'});
                }
                
              }, (error) => {
                console.log(error);
              });;
        }
    }

    render() {
        let facebookData;
        this.state.auth ?
        facebookData = (
            <div style={{
                width: '400px',
                margin: 'auto',
                background: '#f4f4f4',
                padding: '20px',
                color: '#000'
            }}>
                <img src={this.state.picture} alt={this.state.name} />
                <h2>Welcome {this.state.name}!</h2>
            </div>
        ) : 
        facebookData = (<FacebookLogin
            appId={process.env.REACT_APP_FB_APPLICATION_ID}
            fields="picture,name,email,birthday,gender"
            onClick={this.componentClicked}
            callback={this.responseFacebook} 
            cssClass="loginBtn loginBtn--facebook"
            />);
                    
          if(myStorage.getItem("loggedIn") === "true"){
              return (
                  <div>
                <React.Fragment>
                    <Navbar dark expand="md">
                        <div className="container">
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Logo' /></NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/previousTests'><span className="fa fa-home fa-lg"></span>Previous Tests</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/getstarted'><span className="fa fa-upload fa-lg"></span>Make a Test</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/account'><span className="fa fa-info fa-lg"></span>Account Settings</NavLink>
                                </NavItem>

                                </Nav>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Button outline onClick={this.logout}>
                                            <span className="fa fa-sign-out fa-lg"></span>Logout
                                        </Button>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                </React.Fragment>
              <Redirect to="/dashboard"/>
              </div>
              )
          }
          else{
            return (
            <div>
                <React.Fragment>
                    <Navbar dark expand="md">
                        <div className="container">
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Logo' /></NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/getstarted'><span className="fa fa-upload fa-lg"></span> Get Started</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                                </Nav>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Button outline onClick={this.toggleLoginModal}>
                                            <span className="fa fa-sign-in fa-lg"></span>Login
                                        </Button>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleLoginModal} id="login">
                        <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input type="email" id="email" name="email" value={this.state.input.email} onChange={this.handleChange}></Input>
                                    <div className="text-danger">{this.state.errors.loginEmail}</div>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password" value={this.state.input.password} onChange={this.handleChange}></Input>
                                    <div className="text-danger">{this.state.errors.loginPassword}</div>
                                </FormGroup>
                                <div> 
                                <div className="text-danger">{this.state.loginErrorMessage}</div>
                                    </div>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="remember"  value={this.state.input.rememberMe} onChange={this.handleChange}/>Remember Me
                                    </Label>
                                </FormGroup>
                                <FormGroup> 
                                <Link onClick={() => {this.toggleRegistrationModal(); this.toggleLoginModal()}}> Not a user? Register here</Link>
                                </FormGroup>
                                <FormGroup>
                                <Button type="submit" value="submit" color="primary">Login</Button>
                                </FormGroup>
                                <FormGroup>
                                {facebookData} 
                                </FormGroup>
                                <FormGroup>
                                    <GoogleLogin
                                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                    buttonText="Login with Google"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    scope={'https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read'}
                                    />
                                 </FormGroup>
                            </Form>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.isRegistrationModalOpen} toggle={this.toggleRegistrationModal} id="register">
                        <ModalHeader toggle={this.toggleRegistrationModal}>Register</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleRegistration}>
                                <FormGroup>
                                    <Input type="text" id="fullname" name="fullname" placeholder="Full Name" value={this.state.input.name} onChange={this.handleChange}></Input>
                                    <div className="text-danger">{this.state.errors.fullname}</div>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="email" id="email" name="email" placeholder="E-mail Address" value={this.state.input.email} onChange={this.handleChange}></Input>
                                    <div className="text-danger">{this.state.errors.email}</div>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" id="password" name="password" placeholder="Password" value={this.state.input.password} onChange={this.handleChange}></Input>
                                    <div className="text-danger">{this.state.errors.password}</div>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={this.state.input.confirmPassword} onChange={this.handleChange}></Input>
                                    <div className="text-danger">{this.state.errors.confirmPassword}</div>
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
                                <div className="text-danger">{this.state.RegistrationerrorMessage}</div>
                                <Button type="submit" value="submit" color="primary">Register</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
                <Redirect to="/home"/>
                </div>
            )        
          }
            
    }
}

export default Header;