import React, { Component } from "react";
import S3 from "aws-s3";

const config = {
    bucketName: 'harvestcrunch-bakedgoods',
    region: 'us-east-2',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
}
class S3Test extends Component{
    state = {
        selectedFile: null,
    }
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    fileUploadHandler = () => {
        const S3Client = new S3(config);
        var filename = this.state.selectedFile.name.split(".")[0];
        S3Client
            .uploadFile(this.state.selectedFile, filename)
            .then(data => {
                var link = document.getElementById("picLink");
                link.innerHTML = data.location;
                link.href = data.location;
            })
            .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <input type="file" onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler}>Upload to S3</button>
                <a id="picLink" href=""></a>
            </div>
        );
    }
    
}

export default S3Test;