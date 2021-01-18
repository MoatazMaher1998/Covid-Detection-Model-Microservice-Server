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
                                <h1>Upload your CT Scan Here</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper orci libero, porta hendrerit libero dignissim nec. Pellentesque eu velit pulvinar nisl posuere luctus. In dignissim nunc vitae felis pharetra, vitae congue augue lacinia. Mauris est urna, feugiat consectetur ipsum quis, volutpat pretium dolor. Aliquam vitae accumsan nisi. Maecenas a massa non nisl pretium commodo. Phasellus dignissim ante non nunc sollicitudin, ac rutrum arcu aliquet. Morbi eu varius urna. Nullam pulvinar sem quis neque lacinia ornare. Nullam fermentum euismod finibus.</p>                            
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