

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


import { useState } from 'react'; 

 function App() {

   const [emailContent, setEmailContent]=useState('');
   const[tone , settone]=useState('');   
   const[generatedReplay ,setGeneratedReplay]=useState('')
   const[loading,setloading]=useState('');
  const[error, setError]=useState('');
  

 const handlesumbit=async()=>{
  setloading(true)
  setError('');
  try{
const response=await axios.post("http://localhost:8080/api/email/generate",{emailContent, tone })
 
setGeneratedReplay(typeof response.data==='string'? response.data :JSON.stringify(response))
  }catch(error){
    setError("Failed to generate email replay please try again");
    console.log(error);

  }finally{
    setloading(false);
  }

 };


  return (

   
    <div className="container py-4">
      <h1 className="mb-4 text-center">Email Reply Generator</h1>

      <div className="mb-3">
        <label htmlFor="emailContent" className="form-label">
         Original Email Content
        </label>
        <textarea
          id="emailContent"
          className="form-control"
          value={emailContent|| ''}
          onChange={(e)=>setEmailContent(e.target.value)}
          rows="7"
          />
      </div>

      <div className="mb-3">
        <label htmlFor="tone" className="form-label">
          Tone (Optional)
        </label>
        <select
       
          id="tone"
          className="form-select"
          value={tone|| ''}
          onChange={(e)=>settone(e.target.value)} >
          
        
          <option value="">None</option>
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="friendly">Friendly</option>
        </select>
      </div>

      <div>
        <button
          className="btn btn-primary btn-lg btn-block "onClick={handlesumbit} disabled={!emailContent ||loading}> Generate</button>
               
      </div>

      

<div className="mb-3 py-4">
  <label htmlFor="emailContent" className="form-label">
   AI Replay Email
  </label>
  <textarea
    id="emailContent"
    className="form-control"
    rows="7"
    value={generatedReplay}
    
    />
</div > 
<div>
        <button
          className="btn btn-info btn-lg btn-block " 
          onClick={()=>{navigator.clipboard.writeText(generatedReplay)
          
          alert("copied");
          }}>
            Copy to Clipboard</button>
             
      </div>
      



      </div>

  )
 }
export default App;
