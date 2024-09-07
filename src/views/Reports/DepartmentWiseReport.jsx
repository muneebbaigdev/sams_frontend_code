import React, { useEffect, useState } from 'react';
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Chart from 'chart.js';
import '../Viewattendance/viewattendance.css'
import { apiaddress } from 'auth/apiaddress';
import { postData } from 'auth/datapost';
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
function getDatesByPeriod(period) {
  const today = new Date();
  let startDate, endDate;

  switch (period) {
      case 'thisweek':
          startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
          endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (5 - today.getDay()));
          break;
      case 'lastweek':
          startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 6);
          endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 2);
          break;
      case 'thismonth':
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          break;
      case 'lastmonth':
          startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          endDate = new Date(today.getFullYear(), today.getMonth(), 0);
          break;
      case 'thisyear':
          startDate = new Date(today.getFullYear(), 0, 1);
          endDate = new Date(today.getFullYear(), 11, 31);
          break;
      case 'lastyear':
          startDate = new Date(today.getFullYear() - 1, 0, 1);
          endDate = new Date(today.getFullYear() - 1, 11, 31);
          break;
      default:
          return [];
  }

  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');
          dates.push(`d${year}${month}${day}`);
      }
      currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
function getDatesInRange(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  
  const dates = [];
  let currentDate = startDate;
  
  while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');
          dates.push(`d${year}${month}${day}`);
      }
      currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
}
function convertDateFormat(dateString) {
  // Check if the input string has the correct format "dYYYYMMDD"
  if (dateString.length !== 9 || dateString[0] !== 'd') {
    throw new Error('Invalid date format. Expected format: dYYYYMMDD');
  }

  // Extract year, month, and day from the input string
  const year = dateString.substring(1, 5);
  const month = dateString.substring(5, 7);
  const day = dateString.substring(7, 9);

  // Concatenate the parts with dashes to get the desired format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

function DepartmentWiseReport() {
const getvalue = getTodayDate()
const [dates,setDates] = useState({sdate:getvalue,ldate:getvalue})
const [selectedValue,setSelectedValue] = useState({crietaria:'daily',duration:'thisweek'})
const [att,setAtt] = useState({str:0,p:0,a:0,l:0,lt:0})
const [tableContent,settablecontent] = useState();
const [permissions,Setpermissions] = useState({morning:false,evening:false})


const toggleoption = async () => {
  var a = document.getElementById('viewchart').style.display
  var b = document.getElementById('documentreport').style.display
  if(a != 'none'){
    document.getElementById('viewchart').style.display = 'none'
    document.getElementById('documentreport').style.display = 'block'
    document.getElementById('togglebutton').innerText = 'Chart View'
  }else{
    document.getElementById('viewchart').style.display = 'block'
    document.getElementById('documentreport').style.display = 'none'
    document.getElementById('togglebutton').innerText = 'Document View'
  }
}
const handlePrint = async () => {
  document.body.style.visibility = 'hidden'

  document.getElementById('printdata').style.visibility = 'visible'
  document.getElementById('printdata').style.position = 'absolute';
  document.getElementById('printdata').style.top = '0';
  document.getElementById('printdata').style.left = '0';
  window.print();
  
  document.body.style.visibility = 'visible'
  document.getElementById('printdata').style.position = 'relative';
  
};
const CallApi = async () => {
var datesd = []
var labeld = []
var presentd = []
var absentd = []
var leaved = []
var lated = []

if(selectedValue.duration === 'custom'){datesd = getDatesInRange(dates.sdate,dates.ldate)}
else{datesd =getDatesByPeriod(selectedValue.duration)}
setDates({sdate:convertDateFormat(datesd[0]),ldate:convertDateFormat(datesd[datesd.length-1])})
const re = await postData(apiaddress+'/department-report',{crietaria:selectedValue.crietaria,duration:selectedValue.duration,dates:datesd,shift:document.getElementById('shift').value})
setAtt({str:re.tstr,p:re.tp,a:re.ta,l:re.tl,lt:re.tlt})
labeld = re.labels
presentd=re.presentd
absentd = re.absentd
leaved = re.leaved
lated = re.lated
document.getElementById('myChart').value = ''
var datasetd = [
{
label: 'Present',
data: presentd,
backgroundColor: [
'rgba(0,255,0,0.2)'
],
borderColor: [
'rgba(0,255,0,1)'
],
borderWidth: 1
},
{
label: 'Absent',
data: absentd,
backgroundColor: [
'rgba(255, 99, 132, 0.2)'
],
borderColor: [
'rgba(255, 99, 132, 1)'
],
borderWidth: 1
},
{
label: 'Leave',
data: leaved,
backgroundColor: [
'rgba(0,0,215, 0.2)'
],
borderColor: [
'rgba(0,0,215, 1)'
],
borderWidth: 1
},
{
label: 'Late',
data: lated,
backgroundColor: [
'rgba(255, 150, 0, 0.2)'
],
borderColor: [
'rgba(255, 150, 0, 1)'
],
borderWidth: 1
}
]
var ctx =await document.getElementById('myChart').getContext('2d');
ctx.clearRect(0,0,100,100);
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: labeld,
      datasets: datasetd
  },
  options: {
      responsive:true,
      maintainAspectRatio:true,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
}); 



if(selectedValue.crietaria === 'daily'){
  settablecontent(
    <table className='ttstable'>
      <tbody>
        <tr>
          <td>
            <p>Date</p>
          </td>
          <td className='prsnt'> 
            <p>Present</p>
          </td>
          <td className='absnt'> 
            <p>Absent</p>
          </td>
          <td className='lve'> 
            <p>Leave</p>
          </td>
          <td className='lte'> 
            <p>Late</p>
          </td>
        </tr>

        {(re.labels).map((label, count) => (
          <tr key={count}>
            <td>
              <p>{label}</p>
            </td>
            <td> 
              <p>{re.presentd[count]}</p>
            </td>
            <td> 
              <p>{re.absentd[count]}</p>
            </td>
            <td> 
              <p>{re.leaved[count]}</p>
            </td>
            <td> 
              <p>{re.lated[count]}</p>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
  }
  else if(selectedValue.crietaria === 'weekly'){
    settablecontent(
      <table style={{paddingLeft:'20%'}} className='ttstable'>
        <tbody>
          <tr>
            <td>
              <p>Date</p>
            </td>
            <td className='prsnt'> 
              <p>Present</p>
            </td>
            <td className='absnt'> 
              <p>Absent</p>
            </td>
            <td className='lve'> 
              <p>Leave</p>
            </td>
            <td className='lte'> 
              <p>Late</p>
            </td>
          </tr>
  
          {(re.labels).map((label, count) => (
            <tr key={count}>
              <td>
                <p>{label}</p>
              </td>
              <td> 
                <p>{re.presentd[count]}%</p>
              </td>
              <td> 
                <p>{re.absentd[count]}%</p>
              </td>
              <td> 
                <p>{re.leaved[count]}%</p>
              </td>
              <td> 
                <p>{re.lated[count]}%</p>
              </td>
            </tr>
          ))}
  
        </tbody>
      </table>
    );
    }  else if(selectedValue.crietaria === 'monthly'){
      settablecontent(
        <table style={{paddingLeft:'20%'}} className='ttstable'>
          <tbody>
            <tr>
              <td>
                <p>Month</p>
              </td>
              <td className='prsnt'> 
                <p>Present</p>
              </td>
              <td className='absnt'> 
                <p>Absent</p>
              </td>
              <td className='lve'> 
                <p>Leave</p>
              </td>
              <td className='lte'> 
                <p>Late</p>
              </td>
            </tr>
    
            {(re.labels).map((label, count) => (
              <tr key={count}>
                <td>
                  <p>{label}</p>
                </td>
                <td> 
                  <p>{re.presentd[count]}%</p>
                </td>
                <td> 
                  <p>{re.absentd[count]}%</p>
                </td>
                <td> 
                  <p>{re.leaved[count]}%</p>
                </td>
                <td> 
                  <p>{re.lated[count]}%</p>
                </td>
              </tr>
            ))}
    
          </tbody>
        </table>
      );
      }  else if(selectedValue.crietaria === 'yearly'){
        settablecontent(
          <table style={{paddingLeft:'20%'}} className='ttstable'>
            <tbody>
              <tr>
                <td>
                  <p>Year</p>
                </td>
                <td className='prsnt'> 
                  <p>Present</p>
                </td>
                <td className='absnt'> 
                  <p>Absent</p>
                </td>
                <td className='lve'> 
                  <p>Leave</p>
                </td>
                <td className='lte'> 
                  <p>Late</p>
                </td>
              </tr>
      
              {(re.labels).map((label, count) => (
                <tr key={count}>
                  <td>
                    <p>{label}</p>
                  </td>
                  <td> 
                    <p>{re.presentd[count]}%</p>
                  </td>
                  <td> 
                    <p>{re.absentd[count]}%</p>
                  </td>
                  <td> 
                    <p>{re.leaved[count]}%</p>
                  </td>
                  <td> 
                    <p>{re.lated[count]}%</p>
                  </td>
                </tr>
              ))}
      
            </tbody>
          </table>
        );
        }


} 
const handlecrietaria = async (e) => {
  setSelectedValue({...selectedValue,crietaria:e.target.value})

}
const handlesdate = async (e) => {
setDates({...dates,sdate:e.target.value})
}
const handleldate = async (e) => {
  setDates({...dates,ldate:e.target.value})
}
const handleduration = async (e) => {
  setSelectedValue({...selectedValue,duration:e.target.value})
  if(e.target.value === 'custom'){
    document.getElementById('sdate').disabled = false
    document.getElementById('ldate').disabled = false
  }else{
    document.getElementById('sdate').disabled = true
    document.getElementById('ldate').disabled = true
  }
}
function countStringOccurrences(arr, targetString) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === targetString) {
      count++;
    }
  }

  return count;
}
const shiftsetup = async () => {

      const res4 = await postData(apiaddress + "/get-permissions",{usern:localStorage.getItem('username')})
      const a = countStringOccurrences(res4,'morning')
      const b = countStringOccurrences(res4, 'evening')
      if(a === 1){

      Setpermissions(prevpermissions => ({ ...prevpermissions, morning:true }))
      }
      if(b === 1){
      Setpermissions(prevpermissions => ({ ...prevpermissions,evening:true}))
      }

}
useEffect(()=>{
  shiftsetup()
},[])


  return (
    <>
<div className='a11'>
<GridContainer justify="center" alignItems="center">



<GridItem xs={12} sm={4} md={2}> 
<p className='viewdepname'>ICT DEPARTMENT</p>
</GridItem>

<GridItem xs={12} sm={6} md={1}>

<select className='viewdepname' id="shift">
{permissions.morning?(
<option value="morning">Morning</option>
):('')}
{permissions.evening?(
<option value="evening">Evening</option>
):('')}
</select>

</GridItem>

<GridItem xs={12} sm={4} md={1}>
<select id='crietaria' className='viewdepname' value={selectedValue.crietaria} onChange={handlecrietaria}>
  <option value="daily">Daily</option>
  <option value="weekly">Weekly</option>
  <option value="monthly">Monthly</option>
  <option value="yearly">Yearly</option>
</select>
</GridItem>

<GridItem xs={12} sm={4} md={2}>
<select id='duration' className='viewdepname' value={selectedValue.duration} onChange={handleduration}> 
<option value="thisweek">This Week</option>
<option value="lastweek">Last Week</option>
<option value="thismonth">This Month</option>
<option value="lastmonth">Last Month</option>
<option value="thisyear">This Year</option>
<option value="lastyear">Last Year</option>
<option value="custom">Custom</option>


</select>
</GridItem>

<GridItem xs={12} sm={4} md={2}>
<input type='date' id='sdate' max={getvalue} value={dates.sdate} onChange={handlesdate} className='viewdepname' disabled/>
</GridItem>

<GridItem xs={12} sm={4} md={2}>  
<input type='date' id='ldate' max={getvalue} value={dates.ldate} onChange={handleldate} className='viewdepname' disabled/>
</GridItem>

<GridItem xs={12} sm={4} md={2}> 
<p className='viewdepname' onClick={CallApi} style={{cursor:'pointer',border:'1px solid green',backgroundColor:'rgba(0,255,0,0.2)'}}>Show</p>
</GridItem>
  


</GridContainer>
</div>

<div className="mainbody">
<GridContainer justify="center" alignItems="center">

  
<GridItem xs={12} sm={12} md={12}> 

<GridContainer justify="center" alignItems="center">

<GridItem xs={12} sm={12} md={2}> 
<div className="deltabox strngth">
<h4>Total Strength</h4>
<h1>{att.str}</h1>

</div>
</GridItem>
<GridItem xs={12} sm={6} md={2}> 
<div className="deltabox prsnt">
<h4>Total Present</h4>
<h1>{att.p}%</h1>

</div>
</GridItem>
<GridItem xs={12} sm={6} md={2}> 
<div className="deltabox absnt">
<h4>Total Absent</h4>
<h1>{att.a}%</h1>

</div>
</GridItem>
<GridItem xs={12} sm={6} md={2}> 
<div className="deltabox lve">
<h4>Total Leave</h4>
<h1>{att.l}%</h1>

</div>
</GridItem>
<GridItem xs={12} sm={6} md={2}> 
<div className="deltabox lte">
<h4>Total Late</h4>
<h1>{att.lt}%</h1>

</div>
</GridItem>

<GridItem xs={12} sm={6} md={2}>
<div className="deltabox strngth">
  <button id='togglebutton' onClick={toggleoption}>Document View</button>
  <button id='togglebuttonx' onClick={handlePrint}>Print</button>
  </div>
</GridItem>

</GridContainer>

</GridItem>


<GridItem xs={12} sm={12} md={12}> 
<div id="printdata">
<div id="viewchart">
<div className="piecapsule">
<canvas className='piechart' id="myChart" />
</div>
</div>
<div style={{display:'none'}} id="documentreport">
  <table>
    <tbody className='hellotablee'>
      <tr>
        <td>
        <p>DEPARTMENT NAME</p>
        </td>
        <td> 
          <p>ICT DEPARTMENT</p>
        </td>
      </tr>
      
      <tr>
        <td>
        <p>START DATE</p><p>{dates.sdate}</p>
        </td>
        <td> <p>END DATE</p><p>{dates.ldate}</p></td>
      </tr>
    </tbody>
  </table>
  <table>
    <tbody className='hellotablee2'>
      <tr>
        <th><p>TOTAL STRENGTH</p></th>
        <th><p>TOTAL PRESENT</p></th>
        <th><p>TOTAL ABSENT</p></th>
        <th><p>TOTAL LEAVE</p></th>
        <th><p>TOTAL LATE</p></th>
      </tr>
      <tr>
        <th><p>{att.str}</p></th>
        <th><p>{att.p}%</p></th>
        <th><p>{att.a}%</p></th>
        <th><p>{att.l}%</p></th>
        <th><p>{att.lt}%</p></th>
      </tr>
    </tbody>
  </table>

{tableContent}
</div>
</div>
</GridItem>

</GridContainer>
</div>


</>
  )
}

export default DepartmentWiseReport
