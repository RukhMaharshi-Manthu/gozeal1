
import './App.css';

import React, {useState} from 'react';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core';


function App() {
 
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  //certificate name
  const [certficate, setCertficate]=useState('');
  const [error,setError]=useState('');
  const [error1,setError1]=useState('');
  
  //issuer
  const [issuer, setIssuer]=useState('');

   // for onchange event
   const [pdfFile, setPdfFile]=useState(null);
   const [pdfFileError, setPdfFileError]=useState('');
  
 //isubmit
 const [isSubmit, setIsSubmit] = useState(true)

 const [isval, issetval] = useState(false)
   // for submit event
   const [viewPdf, setViewPdf]=useState(null);
 
   // onchange event
   const fileType=['application/pdf'];
   const handlePdfFileChange=(e)=>{
    console.log('functioncalled');
     let selectedFile=e.target.files[0];
     if(selectedFile){
      console.log('entered to selectedfile');
       if(selectedFile&&fileType.includes(selectedFile.type)){
        console.log('entered to selectedfile is in filetype');
         let reader = new FileReader();
             reader.readAsDataURL(selectedFile);
             reader.onloadend = (e) =>{
               setPdfFile(e.target.result);
               setPdfFileError('');
               
             
               
             }
       }
       else{
         setPdfFile(null);
         setPdfFileError('Please select valid pdf file');
       }
     }
     else{
       console.log('select your file');
     }
   }
 
   // form submit
   const handlePdfFileSubmit=(e)=>{
     e.preventDefault();
     if(pdfFile!==null){
       console.log(pdfFile);

      if(certficate!==''){
        console.log(certficate);

        if(issuer!==''){
          console.log(issuer);
          
          setViewPdf(pdfFile);
          console.log("pdfFile");
          console.log(pdfFile);
          setIsSubmit(false); }
        else{
          setError1('please enter issuer name')
        }

      }
      else{
        setError('please enter certificate name');
      }
      
     }
     else{
       setViewPdf(null);
     }

    
   }

  return (
    <div className="App">
      <h1>Skills-Based Certifications</h1>
       <h6>(You can add upto 5 certifications)</h6>
     {
        isSubmit
        ?  (
          <div className="form1">

          <form onSubmit={handlePdfFileSubmit}>
            <table className="tab1">
             
              <tr>
                <th></th>
                <th><span>x</span></th>
              </tr>
              <tr>
                <td><b className="text1">Certification Name</b></td>
                <td><b className="text1">Issuer </b></td>
              </tr>
          
              <tr>
                <td><input type="text" className="box1" placeholder="Enter a certification name"
                onChange={e => setCertficate(e.target.value)} required/></td>
                <td><input type="text" className="box1" placeholder="Enter a Issuer name"
                onChange={e =>setIssuer(e.target.value)
                   } required/>
                
                 </td>
                 
              </tr>
              <tr>
                <td><h6 className="note3">{error}</h6></td>
                <td><h6 className="note3">{error1}</h6></td>
              </tr>
              <tr>
                <td colspan="2">
                <div class="file-upload-wrapper" data-text="Upload a file showing your certification">
             <input name="file-upload-field" type="file" class="file-upload-field" value="" accept=".pdf,.jpg"
              required onChange={handlePdfFileChange}/></div>
          
           <h6 className="note2">(File format should be only pdf and jpg)</h6>
                </td>
              </tr>
              
              <tr>
                <td></td>
                <td><button type="submit" className="sub1" onClick={handlePdfFileSubmit}>Save certification</button></td>
              </tr>
            </table>
          </form>
          
          </div>
        )
        :  (
          <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        <table>
          <tr>
            <th> <div className="circle">1</div></th>
            <th><b>MongoDB Basics</b></th>
            <th><b  className="blight">MongoDB University</b></th>
          </tr>

        
        </table>
        <a href={viewPdf}>View Certification</a>
       
      
      
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf}
          
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}
      console.log(fileUrl);
      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf&&<>No pdf file selected</>}
      </div>
        )

      }
    </div>
  );
}

export default App;
