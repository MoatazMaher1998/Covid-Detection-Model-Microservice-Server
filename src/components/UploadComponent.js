import axios from 'axios'; // npm install --save axios
import React,{Component} from 'react'; 
import {Button} from 'reactstrap';
const herokuServer = "https://checkmeplease.herokuapp.com";
const localhost = "http://localhost:8080";
const substrings = ["jpg", "jpeg", "png"];
class Upload extends Component { 
   
    state = { 
  
      // Initially, no file is selected 
      selectedFile: null,
      errors:{}
    }; 
     
    // On file select (from the pop up) 
    onFileChange = event => { 
     
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
     
    }; 
     
    // On file upload (click the upload button) 
    onFileUpload = () => { 
     
      // Create an object of formData 
      const formData = new FormData(); 
      let errors = {};
     
      // Update the formData object 
      try{
      formData.append( 
        "file", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      );
      
      if (new RegExp(substrings.join("|")).test(this.state.selectedFile.name )) {
        // Details of the uploaded file 
      console.log(this.state.selectedFile); 
      // Request made to the backend api 
      // Send formData object 
      axios.post(herokuServer  + "/upload", formData, {onUploadProgress:ProgressEvent =>
        console.log("upload progress "+ Math.round((ProgressEvent.loaded / ProgressEvent.total * 100))+"%")
      
      }
      );
      errors = {};
    }
      else{
        errors["fileError"] = "Please select an image";
      }
    }
      catch(error){
        if (!this.state.selectedFile) {
          errors["fileError"] = "Please select an image first";
          console.log(errors);
        }
      }
      this.setState({
        errors: errors
      });
    }; 
     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
     
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
            <h4>Choose image before Pressing the Examine button</h4> 
          </div> 
        ); 
      } 
    }; 
     
    render() { 
     
      return ( 
        <div> 
 
            <h3> 
              Upload your image here 
            </h3> 
            <div> 
                <input type="file" onChange={this.onFileChange} /> 
                <Button color="primary" onClick={this.onFileUpload}> 
                  Examine
                </Button> 
                <div className="text-danger">{this.state.errors.fileError}</div>
            </div> 
          {this.fileData()} 
        </div> 
      ); 
    } 
  } 
  
  export default Upload;
