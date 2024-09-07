import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { apiaddress } from "auth/apiaddress";
import { postData } from "auth/datapost";

function countStringOccurrences(arr, targetString) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === targetString) {
      count++;
    }
  }

  return count;
}
function DashboarddReport() {

const [tstrength,setTStrength] = React.useState({strength:0})
const [tpresent,setPresent] = React.useState({present:0})
const [tabsent,setAbsent] = React.useState({absent:0})
const [tleave,setLeave] = React.useState({leaves:0})
const[lates,setlates] = React.useState({lates:0})
const[data,setData] = React.useState([[0,0,0,0,0]])
const [permissions,Setpermissions] = React.useState({morning:false,evening:false})
const [classsections,setclasssections] = useState([{class:'',section:''}])



const ApiCaller = async ()=>{

      const resx = await postData(apiaddress + "/get-permissions",{usern:localStorage.getItem('username')})
      const a = countStringOccurrences(resx,'morning')
      const b = countStringOccurrences(resx, 'evening')
      if(a === 1){

      Setpermissions(prevpermissions => ({ ...prevpermissions, morning:true }))
      }
      if(b === 1){
      Setpermissions(prevpermissions => ({ ...prevpermissions,evening:true}))
      }
      if((a+b)<2){
        document.getElementById('shift').style.visibility = 'hidden'
      }
      const rax = await postData(apiaddress+'/get-special-classes',{number:localStorage.getItem('username')})
      setclasssections(rax)
      const response0 = await postData(apiaddress+'/today-ict-strength', {shift:document.getElementById('shift').value});
      setTStrength(response0)
      const response1 = await postData(apiaddress+'/today-ict-present', {shift:document.getElementById('shift').value});
      setPresent(response1)
      const response2 = await postData(apiaddress+'/today-ict-absent', {shift:document.getElementById('shift').value});
      setAbsent(response2)
      const response3 = await postData(apiaddress+'/today-ict-leave', {shift:document.getElementById('shift').value});
      setLeave(response3)
      const response4 = await postData(apiaddress+'/today-ict-lates', {shift:document.getElementById('shift').value});
      setlates(response4)
      const response5 = await postData(apiaddress+'/dashboard-charts', {classsections:rax});
      setData(response5)
    

      

      return
  }
  React.useEffect(() => {
    ApiCaller();
  
  }, []); 

const handlePrint = async () => {


document.getElementById('donotprint').style.visibility = 'hidden'
document.body.style.visibility = 'hidden'
document.getElementById('printdata').style.visibility = 'visible'
window.print();
document.getElementById('showbtn').style.visibility = 'visible'
document.getElementById('donotpring').style.visibility = 'visible'
document.body.style.visibility = 'visible'

};
const colorpick = (color) => {
    const mct = color % 2
switch(mct){
    case(0):
    return {backgroundColor:'white'}
    case(1):
    return {backgroundColor:'rgba(233, 30, 99,.4)',border:'none'}
    default:
    return {backgroundColor:'black',color:'white'}
}
}
const rewrite = async () =>{
    const response0 = await postData(apiaddress+'/today-ict-strength', {shift:document.getElementById('shift').value});
    setTStrength(response0)
    const response1 = await postData(apiaddress+'/today-ict-present', {shift:document.getElementById('shift').value});
    setPresent(response1)
    const response2 = await postData(apiaddress+'/today-ict-absent', {shift:document.getElementById('shift').value});
    setAbsent(response2)
    const response3 = await postData(apiaddress+'/today-ict-leave', {shift:document.getElementById('shift').value});
    setLeave(response3)
    const response4 = await postData(apiaddress+'/today-ict-lates', {shift:document.getElementById('shift').value});
    setlates(response4)
    const response5 = await postData(apiaddress+'/dashboard-charts', {classsections});
    setData(response5)
  }


return (
<div id="donotprint">
<div id='printdata'>
<Card>

<CardBody>

<GridContainer justify="center" alignItems="center" spacing={1}>
<GridItem xs={12} sm={12} md={12}>

<select id="shift" onChange={rewrite}>
  {permissions.morning?(
  <option value='morning'>
  Morning
  </option>
  ):('')}
  {permissions.evening?(
  <option value='evening'>
  Evening
  </option>
  ):('')}
</select>
</GridItem>
<GridItem xs={12} sm={12} md={12}>


<ul className="myul">
<li>
<span className="wd1">Class Name</span>
<span className="wd2">Strength</span>
<span className="wd3">Present</span>
<span className="wd1">Absent</span>
<span className="wd1">Leave</span>
<span className="wd3">Late</span>
</li>
{data.map((dat,cnt)=>(
<li>
<span style={colorpick(cnt)} className="wv1">{classsections[cnt].class+' '+classsections[cnt].section}</span>
<span style={colorpick(cnt)} className="wv2">{dat[0]}</span>
<span style={colorpick(cnt)} className="wv3">{dat[1]}</span>
<span style={colorpick(cnt)} className="wv1">{dat[2]}</span>
<span style={colorpick(cnt)} className="wv1">{dat[3]}</span>
<span style={colorpick(cnt)} className="wv3">{dat[4]}</span>
</li>
))}

<li>
<span style={{backgroundColor:'#00acc1',color:'white',fontWeight:'bold'}} className="wv1">Total</span>
<span style={{backgroundColor:'#00acc1',color:'white',fontWeight:'bold'}} className="wv2">{tstrength.strength}</span>
<span style={{backgroundColor:'#00acc1',color:'white',fontWeight:'bold'}} className="wv3">{tpresent.present}</span>
<span style={{backgroundColor:'#00acc1',color:'white',fontWeight:'bold'}} className="wv1">{tabsent.absent}</span>
<span style={{backgroundColor:'#00acc1',color:'white',fontWeight:'bold'}} className="wv1">{tleave.leaves}</span>
<span style={{backgroundColor:'#00acc1',color:'white',fontWeight:'bold'}} className="wv3">{lates.lates}</span>
</li>
</ul>





</GridItem>
</GridContainer>

</CardBody>
</Card>
</div>
<button id="showbtn" style={{backgroundColor:'#00acc1',color:'white',fontWeight:'bold',margin:'0 auto',height:'50px',width:'150px',border:'none',borderRadius:'5px',cursor:'pointer'}} onClick={handlePrint}>Print</button>
</div>
);
};

export default DashboarddReport
