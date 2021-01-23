import React, { Component } from 'react';
import {Jumbotron,Button} from 'reactstrap';
import Upload from './UploadComponent';


class GetStarted extends Component {

    componentDidMount(){
        document.title = "Get Started"
      }

    render(){
        return (
            <div>
                <Jumbotron className="full-page getStarted">
                    <div className="container" >
                        <div className="row row-header">
                            <div className="center col-12 col-sm-6">
                            <h1>Upload your X-ray image</h1>
                                <br></br>
                                <h4>Press the choose file button and choose the X-ray image your want to upload then press Examine to get your result.</h4>
                                <h4>It must be one of these formats (.JPG, .JPEG, .PNG)</h4>                            
                            </div>
                        </div>
                    </div>
                    {/* <Button color="primary">Upload</Button> */}
                    <Upload />
                </Jumbotron>
                
            </div>
        );
    }
}

export default GetStarted;