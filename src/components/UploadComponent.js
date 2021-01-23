import axios from 'axios'; // npm install --save axios
import React,{Component} from 'react'; 
import {Button} from 'reactstrap';

const substrings = ["jpg", "jpeg", "png"];
class Upload extends Component { 
   
    state = { 
  
      // Initially, no file is selected 
      selectedFile: null,
      errors:{},
      message: 'Choose image before Pressing the Examine button',
      isLoading: false
    }; 
     
    // On file select (from the pop up) 
    onFileChange = event => { 
     
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
      var reader = new FileReader();
      var url = reader.readAsDataURL(event.target.files[0]);

      reader.onloadend = function (e) {
          this.setState({
              imgSrc: [reader.result]
          })
        }.bind(this);
        
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
      axios.post(process.env.REACT_APP_Domain  + "/upload", formData, {onUploadProgress:ProgressEvent => {
        console.log("upload progress "+ Math.round((ProgressEvent.loaded / ProgressEvent.total * 100))+"%")
        this.setState({message: 'Uploading: ' + Math.round((ProgressEvent.loaded / ProgressEvent.total * 100))+"%",isLoading:true});
      }
      }
      );
      this.setState({message: 'Processing... This could take a minute'});
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
            <img src={this.state.imgSrc} height='200px' width='200px'/>
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
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
          <h4>
          {this.state.message}
          
          {this.state.isLoading === true &&
            <div class="center loader"></div>
           }
          </h4>
        </div> 
      ); 
    } 
  } 
  
  export default Upload;
