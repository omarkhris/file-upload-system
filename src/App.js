import './App.css';
import React, {Component} from 'react';

import axios from 'axios';
class App extends Component{
  state = {
    selectedFile: null,
    fileUploadedSuccessFully: false
  }

  onFileChange = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )

    //call api 

    axios.post("https://34dviy5dyb.execute-api.us-east-1.amazonaws.com/prodApi", formData).then(()=>{
       this.setState({selectedFile: null});
    this.setState({fileUploadedSuccessFully:true});
    })
    console.log(formData);
   
  }

  fileData = () =>{
    if(this.state.selectedFile){
      <div>
        <h2>File Details:</h2>
        <p>File Name: {this.state.selectedFile.name}</p>
        <p>File Type: {this.state.selectedFile.type}</p>
        <p>Last Modified: {" "} {this.state.selectedFile.lastModifiedDate.toDateString()}</p>


      </div>
    }else if(this.state.fileUploadedSuccessFully){
      return (
        <div>
          <br />
          <h4>your file has been uploaded successfully!</h4>
        </div>
      );
    }else {
      return (
        <div>
          <br />
          <h4>Choose a file and then press the upload button</h4>
        </div>
      )
    }
  }

  render() {
    return( 
      <div className='container'>

        <h2>FileMerch File Upload system</h2>
        <h3>File Upload with react and serverless API!</h3>

        <div>
          <input type='file' onChange={this.onFileChange}/>
            <button onClick={this.onFileUpload}>
              Upload
              </button>
        </div>
        {this.fileData()}
      </div>
  )
  }

}
export default App;
