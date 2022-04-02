import React, {useState} from 'react'
import './App.css';

export default function Form() {
   
  
    // for onchange event
    const [pdfFile, setPdfFile]=useState(null);
    const [pdfFileError, setPdfFileError]=useState('');
   
    
  
    // for submit event
    const [viewPdf, setViewPdf]=useState(null);
  
    // onchange event
    const fileType=['application/pdf'];
    const handlePdfFileChange=(e)=>{
      let selectedFile=e.target.files[0];
      if(selectedFile){
        if(selectedFile&&fileType.includes(selectedFile.type)){
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
      setViewPdf(pdfFile);
    }
    else{
      setViewPdf(null);
    }
  }

    return (
        
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
      <td><input type="text" className="box1" placeholder="Enter a certification name" required/></td>
      <td><input type="text" className="box1" placeholder="Enter a Issuer name" required/></td>
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
}