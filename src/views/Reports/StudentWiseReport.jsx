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
function StudentWiseReport() {
const [tableContent,settablecontent] = useState();
const [runningstu,setrunningstu] = useState({admission_number:0})
const [students,setstudents] = useState([{roll_no:0,student_full_name:'null'}])
const [select,setselect] = useState({roll_no:0,name:'null'})
const [classes,setClasses]=useState([])
const [sections,setSections] = useState([])
const [stdval,setstdval] = useState({classn:'',section:''})
const getvalue = getTodayDate()
const [dates,setDates] = useState({sdate:getvalue,ldate:getvalue})
const [selectedValue,setSelectedValue] = useState({crietaria:'daily',duration:'thisweek'})
const [ddates,setddates] = useState({sdate:'',ldate:''})
const [att,setAtt] = useState({str:0,p:0,a:0,l:0,lt:0})
const user = localStorage.getItem('username')
const [labeld1,setlabeld1] = useState([])
const [pushup,setpushup] = useState([{
  week: 'Week 1',
  monday: '',
  tuesday: '',
  wednesday: '',
  thursday: '',
  friday: '',
  days: 0,
  present: 0,
  absent: 0,
  leave: 0,
  late: 0
}])
const [attendance1,setattendance1] = useState([])

const [tts,setvaloftts] = useState({tp:0,ta:0,tl:0,tlt:0})

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
const pickcol = (count) => {
  switch(count){
    case ('P'):
    return '#00a40e';
    case ('A'):
    return 'red'
    case ('L'):
    return '#00acc1'
    case ('LT'):
    return 'rgb(255, 89, 0)'
    default:
    return 'black';
  }
}
const CallApi = async () => {

var labeld = []
var presentd = []
var absentd = []
var leaved = []
var lated = []
var datesd = []
var re = []
if(selectedValue.duration === 'custom'){
datesd = getDatesInRange(dates.sdate,dates.ldate)
}
else{
datesd =getDatesByPeriod(selectedValue.duration)
}
re = await postData(apiaddress+'/student-report',{crietaria:selectedValue.crietaria,duration:selectedValue.duration,dates:datesd,admission_number:runningstu.admission_number})
console.log(re)
setattendance1([])
setddates({sdate:convertDateFormat(datesd[0]),ldate:convertDateFormat(datesd[datesd.length-1])})
setAtt({str:re.tstr,p:re.tp,a:re.ta,l:re.tl,lt:re.tlt})
labeld = re.labels
presentd=re.presentd
absentd = re.absentd
leaved = re.leaved
lated = re.lated
setvaloftts({tp:0,ta:0,tl:0,tlt:0})
setpushup(re.pushup)
setlabeld1(re.labels)
setvaloftts({tp:re.tp1,ta:re.ta1,tl:re.tl1,tlt:re.tlt1})


for(var i=0; i<(re.labels).length; i++){
if(re.presentd[i]===1){
setattendance1(prevAttendance => [...prevAttendance, 'Present']);
}else if(re.absentd[i]===1){
setattendance1(prevAttendance => [...prevAttendance,'Absent'])
}else if(re.leaved[i]===1){
setattendance1(prevAttendance => [...prevAttendance,'Leave'])
}else if(re.lated[i]===1){
setattendance1(prevAttendance => [...prevAttendance,'Late'])
}else{
setattendance1(prevAttendance => [...prevAttendance,'No Data'])
}
}



//main chartt startt here
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
//main chartt ends here

var lp = 0
var la = 0
var ll = 0
var llt = 0

for(var h=0; h<presentd.length; h++){
  lp = lp+presentd[h]
  la = la+absentd[h]
  ll = ll+leaved[h]
  llt = llt+lated[h]
}

var ftotalp = {monday:0,tuesday:0,wednesday:0,thursday:0,friday:0}
var ftotala = {monday:0,tuesday:0,wednesday:0,thursday:0,friday:0}
var ftotall = {monday:0,tuesday:0,wednesday:0,thursday:0,friday:0}
var ftotallt = {monday:0,tuesday:0,wednesday:0,thursday:0,friday:0}
var loco = {p:0,a:0,l:0,lt:0}
for (var g=0; g<labeld.length; g++){
  loco.p+=presentd[g]
  loco.a+=absentd[g]
  loco.l+=leaved[g]
  loco.lt+=lated[g]
}
for(var o=0; o<pushup.length; o++){
  var tes = pushup
  var pees = tes[o]
  switch (pees.monday){
    case ('P'):
    ftotalp.monday++;
    break;

    case ('A'):
    ftotala.monday++
    break;

    case ('L'):
    ftotall.monday++
    break;

    case ('LT'):
    ftotallt.monday++
    break;

    default:
    break;
  }
  switch (pees.tuesday){
    case ('P'):
    ftotalp.tuesday++;
    break;

    case ('A'):
    ftotala.tuesday++
    break;

    case ('L'):
    ftotall.tuesday++
    break;

    case ('LT'):
    ftotallt.tuesday++
    break;

    default:
    break;
  }
  switch (pees.wednesday){
    case ('P'):
    ftotalp.wednesday++;
    break;

    case ('A'):
    ftotala.wednesday++
    break;

    case ('L'):
    ftotall.wednesday++
    break;

    case ('LT'):
    ftotallt.wednesday++
    break;

    default:
    break;
  }
  switch (pees.thursday){
    case ('P'):
    ftotalp.thursday++;
    break;

    case ('A'):
    ftotala.thursday++
    break;

    case ('L'):
    ftotall.thursday++
    break;

    case ('LT'):
    ftotallt.thursday++
    break;

    default:
    break;
  }
  switch (pees.friday){
    case ('P'):
    ftotalp.friday++;
    break;

    case ('A'):
    ftotala.friday++
    break;

    case ('L'):
    ftotall.friday++
    break;

    case ('LT'):
    ftotallt.friday++
    break;

    default:
    break;
  }
}
if(selectedValue.crietaria === 'daily'){
settablecontent(
  <table>
    <tbody className='hellotablee hellotablee1'>
      <tr>
        <td>
          <p>Date</p>
        </td>
        <td> 
          <p>Status</p>
        </td>
      </tr>
      {/* Map over labeld1 and render table rows */}
      {labeld1.map((label, count) => (
        <tr key={count}> {/* Add a key prop for each table row */}
          <td>
            <p>{label}</p>
          </td>
          <td> 
            <p>{attendance1[count]}</p>
          </td>
        </tr>
      ))}
      {/* Additional table rows */}
      <tr>
        <td>
          <p>TOTAL PRESENT</p>
        </td>
        <td> 
          <p>{re.tp1}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p>TOTAL ABSENT</p>
        </td>
        <td> 
          <p>{re.ta1}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p>TOTAL LEAVE</p>
        </td>
        <td> 
          <p>{re.tl1}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p>TOTAL LATE</p>
        </td>
        <td> 
          <p>{re.tlt1}</p>
        </td>
      </tr>
    </tbody>
  </table>
);
}else if(selectedValue.crietaria === 'weekly'){

settablecontent(
  <table className='ttstable'>
    <tbody>
      <tr>
        <td>
          <p>Week</p>
        </td>
        <td> 
          <p>Monday</p>
        </td>
        <td> 
          <p>Tuesday</p>
        </td>
        <td> 
          <p>Wednesday</p>
        </td>
        <td>
          <p>Thursday</p>
        </td>
        <td> 
          <p>Friday</p>
        </td>
        <td> 
          <p>Days</p>
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

{
pushup.map((push)=>(
<tr>
<td>
  <p>{push.week}</p>
</td>
<td style={{color:pickcol(push.monday)}}> 
  <p>{push.monday}</p>
</td>
<td style={{color:pickcol(push.tuesday)}}> 
  <p>{push.tuesday}</p>
</td>
<td style={{color:pickcol(push.wednesday)}}> 
  <p>{push.wednesday}</p>
</td>
<td style={{color:pickcol(push.thursday)}}>
  <p>{push.thursday}</p>
</td>
<td style={{color:pickcol(push.friday)}}> 
  <p>{push.friday}</p>
</td>
<td> 
  <p>{push.days}</p>
</td>
<td className='prsnt'>
  <p>{push.present}</p>
</td>
<td className='absnt'> 
  <p>{push.absent}</p>
</td>
<td className='lve'> 
  <p>{push.leave}</p>
</td>
<td className='lte'> 
  <p>{push.late}</p>
</td>

</tr> 
))

}

<tr>
<td className='strngth'>
<p>TOTAL</p>
</td>
<td className='strngth'> 
<p>{ftotalp.monday+ftotala.monday+ftotall.monday+ftotallt.monday}</p>
</td>
<td className='strngth'> 
<p>{ftotalp.tuesday+ftotala.tuesday+ftotall.tuesday+ftotallt.tuesday}</p>
</td>
<td className='strngth'> 
<p>{ftotalp.wednesday+ftotala.wednesday+ftotall.wednesday+ftotallt.wednesday}</p>
</td>
<td className='strngth'>
<p>{ftotalp.thursday+ftotala.thursday+ftotall.thursday+ftotallt.thursday}</p>
</td>
<td className='strngth'> 
<p>{ftotalp.friday+ftotala.friday+ftotall.friday+ftotallt.friday}</p>
</td>
<td className='strngth'> 
<p></p>
</td>
<td className='strngth'>
<p>{loco.p}</p>
</td>
<td className='strngth'> 
<p>{loco.a}</p>
</td>
<td className='strngth'> 
<p>{loco.l}</p>
</td>
<td className='strngth'> 
<p>{loco.lt}</p>
</td>

</tr>

<tr>
<td className='prsnt'>
<p>PRESENT</p>
</td>
<td className='prsnt'> 
<p>{ftotalp.monday}</p>
</td>
<td className='prsnt'> 
<p>{ftotalp.tuesday}</p>
</td>
<td className='prsnt'> 
<p>{ftotalp.wednesday}</p>
</td>
<td className='prsnt'>
<p>{ftotalp.thursday}</p>
</td>
<td className='prsnt'> 
<p>{ftotalp.friday}</p>
</td>
<td> 
<p></p>
</td>
<td>
<p></p>
</td>
<td> 
<p></p>
</td>
<td> 
<p></p>
</td>
<td> 
<p></p>
</td>

</tr>

<tr>
<td className='absnt'>
<p>ABSENT</p>
</td>
<td className='absnt'> 
<p>{ftotala.monday}</p>
</td>
<td className='absnt'> 
<p>{ftotala.tuesday}</p>
</td>
<td className='absnt'> 
<p>{ftotala.wednesday}</p>
</td>
<td className='absnt'>
<p>{ftotala.thursday}</p>
</td>
<td className='absnt'> 
<p>{ftotala.friday}</p>
</td>
<td> 
<p></p>
</td>
<td>
<p></p>
</td>
<td> 
<p></p>
</td>
<td> 
<p></p>
</td>
<td> 
<p></p>
</td>

</tr>

<tr>
<td className='lve'>
<p>LEAVE</p>
</td>
<td className='lve'> 
<p>{ftotall.monday}</p>
</td>
<td className='lve'> 
<p>{ftotall.tuesday}</p>
</td>
<td className='lve'> 
<p>{ftotall.wednesday}</p>
</td>
<td className='lve'>
<p>{ftotall.thursday}</p>
</td>
<td className='lve'> 
<p>{ftotall.friday}</p>
</td>
<td> 
<p></p>
</td>
<td>
<p></p>
</td>
<td> 
<p></p>
</td>
<td> 
<p></p>
</td>
<td> 
<p></p>
</td>

</tr>

<tr>
<td className='lte'>
<p>LATE</p>
</td>
<td className='lte'> 
<p>{ftotallt.monday}</p>
</td>
<td className='lte'> 
<p>{ftotallt.tuesday}</p>
</td>
<td className='lte'> 
<p>{ftotallt.wednesday}</p>
</td>
<td className='lte'>
<p>{ftotallt.thursday}</p>
</td>
<td className='lte'> 
<p>{ftotallt.friday}</p>
</td>
<td> 
<p></p>
</td>
<td>
<p></p>
</td>
<td> 
<p></p>
</td>
<td> 
<p></p>
</td>
<td> 
<p></p>
</td>

</tr>

    </tbody>
  </table>
);
}else if(selectedValue.crietaria === 'monthly'){
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

        <tr>
          <td>
            <p>TOTAL</p>
          </td>
          <td className='prsnt'> 
            <p>{lp}</p>
          </td>
          <td className='absnt'> 
            <p>{la}</p>
          </td>
          <td className='lve'> 
            <p>{ll}</p>
          </td>
          <td className='lte'> 
            <p>{llt}</p>
          </td>
        </tr>
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

<tr>
          <td>
            <p>TOTAL</p>
          </td>
          <td className='prsnt'> 
            <p>{lp}</p>
          </td>
          <td className='absnt'> 
            <p>{la}</p>
          </td>
          <td className='lve'> 
            <p>{ll}</p>
          </td>
          <td className='lte'> 
            <p>{llt}</p>
          </td>
        </tr>
  
        </tbody>
      </table>
    );
    }

} 

const Apiforclasssec = async () => {
  const res1 = await postData(apiaddress+'/get-special-classes',{number:user})
  setClasses(res1)
  const res2 = await postData(apiaddress+'/get-special-sections',{number:user})
  setSections(res2)
  let a = res1[0]
  let b = res2[0]
  let c = a.class
  let d = b.section
  const res3 = await postData(apiaddress+'/get-students-list',{class1:c,section1:d})
  setstudents(res3)
  setselect({roll_no:res3[0].admission_number,name:res3[0].student_full_name})
  setrunningstu(res3[0])

  
}
useEffect(()=>{

  Apiforclasssec()
  settablecontent(
    <table>
      <tbody className='hellotablee hellotablee1'>
        <tr>
          <td>
            <p>Date</p>
          </td>
          <td> 
            <p>Status</p>
          </td>
        </tr>
        {/* Map over labeld1 and render table rows */}
        {labeld1.map((label, count) => (
          <tr key={count}> {/* Add a key prop for each table row */}
            <td>
              <p>{label}</p>
            </td>
            <td> 
              <p>{attendance1[count]}</p>
            </td>
          </tr>
        ))}
        {/* Additional table rows */}
        <tr>
          <td>
            <p>TOTAL PRESENT</p>
          </td>
          <td> 
            <p>{tts.tp}</p>
          </td>
        </tr>
        {/* Include other rows as needed */}
      </tbody>
    </table>
  );
},[])


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
const handleclasschange = async (e) => {
const thrust = document.getElementById('class1').value
const cla = classes[thrust].class
const sec = classes[thrust].section
console.log(cla,sec)
setstdval({...stdval,classn:cla,section:sec})
const res3 = await postData(apiaddress+'/get-students-list',{class1:cla,section1:sec})
setstudents(res3)
setselect({roll_no:res3[0].admission_number,name:res3[0].student_full_name})
setrunningstu(res3[0])

}

const handlestuchange = async (e) => {
  var namee = ''
  for(var i=0; i<students.length; i++){
    if((students[i].admission_number).toString() === (e.target.value).toString()){
      namee = students[i].admission_number
    }
  }
  setselect({
    roll_no:e.target.value,
    name:namee
  })

  const val = e.target.value
  for (var i=0; i<students.length; i++){
    if((students[i].admission_number).toString() === val.toString() | (students[i].student_full_name).toString() === val.toString()){
      setrunningstu(students[i])
 
    }

  }

}
const handlestuchange1 = async (e) => {
  
  var rolee = ''
  for(var i=0; i<students.length; i++){
    if((students[i].roll_no).toString() === (e.target.value).toString()){
      rolee = students[i].student_full_name

    }
  }

  setselect({
    roll_no:e.target.value,
    student_full_name:rolee
  })

  const val = e.target.value

  for (var i=0; i<students.length; i++){
    if((students[i].admission_number).toString() === val.toString() | (students[i].student_full_name).toString() === val.toString()){
      setrunningstu(students[i])

    }

  }

}
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

const handlecrietaria = async (e) => {
  setSelectedValue({...selectedValue,crietaria:e.target.value})

}

  return (
    <>
<div className='a11'>
<GridContainer justify="center" alignItems="center">



<GridItem xs={12} sm={4} md={3}>  
<select className='viewdepname' name="class" id="class1" onChange={handleclasschange}>

        
{classes.map((classes,count)=>(
                        <option value={count}>{classes.class} {classes.section}</option>
                      ))}

</select>
</GridItem>

{/* <GridItem xs={12} sm={4} md={3}> 
<select className='viewdepname' name="class" id="section1" onChange={handlesectionchange}>

{sections.map((sections)=>(
                        <option value={sections.section}>{sections.section}</option>
                      ))}

</select>
</GridItem> */}

<GridItem xs={12} sm={4} md={3}>
  <select className='viewdepname h2' name="class" id="name" value={select.name} onChange={handlestuchange1}>

  {students.map((student)=>(
      <option value={student.admission_number}>{student.student_full_name}</option>
      ))}

  </select>
</GridItem>

<GridItem xs={12} sm={4} md={2}>
  <select className='viewdepname' name="class" id="roll_no" value={select.roll_no} onChange={handlestuchange}>

      {students.map((student)=>(
      <option value={student.admission_number}>{student.roll_no}</option>
      ))}

  </select>
</GridItem>

<GridItem xs={12} sm={4} md={2}>
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
<h4>Total Days</h4>
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
        <p>STUDENT NAME</p><p>{select.name}</p>
        </td>
        <td> 
          <p>STUDENT ROLL NO</p><p>{select.roll_no}</p>
        </td>
      </tr>
      
      <tr>
        <td>
        <p>START DATE</p><p>{ddates.sdate}</p>
        </td>
        <td> <p>END DATE</p><p>{ddates.ldate}</p></td>
      </tr>
    </tbody>
  </table>
  <table>
    <tbody className='hellotablee2'>
      <tr>
        <th><p>TOTAL DAYS</p></th>
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

export default StudentWiseReport