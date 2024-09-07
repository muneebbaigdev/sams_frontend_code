import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { apiaddress } from 'auth/apiaddress';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { postData } from 'auth/datapost';
import Swal from 'sweetalert2';



function getFormattedDate() {
  
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');

  return year + month + day;
}
function reverseformatDate(inputDate) {
  // Check if the input date string is valid
  if (!/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
    throw new Error('Invalid date format. Please provide a date in "YYYY-MM-DD" format.');
  }

  // Extract year, month, and day from the input date string
  const [year, month, day] = inputDate.split('-');

  // Concatenate the year, month, and day to get the desired format
  const formattedDate = `${year}${month}${day}`;

  return formattedDate;
}
function countStringOccurrences(arr, searchString) {
  return arr.reduce((count, current) => {
    return count + (current === searchString);
  }, 0);
}
function formatDate(inputDate) {
  // Check if the input date string is valid
  if (!/^\d{8}$/.test(inputDate)) {
    throw new Error('Invalid date format. Please provide a date in "YYYYMMDD" format.');
  }

  // Extract year, month, and day from the input date string
  const year = inputDate.substring(0, 4);
  const month = inputDate.substring(4, 6);
  const day = inputDate.substring(6, 8);

  // Concatenate the year, month, and day with "-" to get the desired format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}


const Markattendance = () => {
const [classes,setClasses]=useState([])
const [sections,setSections] = useState([])
const user = localStorage.getItem('username')
const fulldate = new Date().toISOString().split('-')[0];
const [students, setStudents] = useState([{admission_number:0,roll_no:0,student_full_name:''}]);
const [selectedValue, setSelectedValue] = useState({classn: '',section: '',date: fulldate,status:''});
const [index, setIndex] = useState(0);
const [blockeddates,setblockeddates] = useState([]);
const [date,setdate] = useState(getCurrentDate())
const [allowed,setallowed] = useState(false)


const ApiCaller = async () => {

  try {
    const res1 = await postData(apiaddress+'/get-special-classes',{number:user})
    setClasses(res1)
    const res2 = await postData(apiaddress+'/get-special-sections',{number:user})
    setSections(res2)
    const res3 = await postData(apiaddress+'/get-blocked-dates',{number:user})
    setblockeddates(res3.resdates)
    const response2 = await postData(apiaddress+'/get-students-list', {class1:res1[0].class,section1:res1[0].section});
    setStudents(response2)
  } catch (error) {
    console.log(error);
  }

};
const handleDropdownChange = async (event) => {
  var a = classes[event.target.value].class
  var b =classes[event.target.value].section
  setSelectedValue({
    ...selectedValue,
  classn:a,
  section:b
  });
  await ApiCaller3()
};
const ApiCaller2 = async (props) => {
  try {  

    const response = await postData(apiaddress+'/mark-attendance',{ admission_number:props[0] ,status:props[1],date});
    if(response.err){
    Swal.fire({
      title: 'Error!',
      text: response.msg,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
    
  } catch (error) {
    console.log(error);
  }

};
const ApiCaller3 = async (props) => {
  try {  
    const class1 = classes[document.getElementById('classn').value].class
    const section1 = classes[document.getElementById('classn').value].section
    
    setTimeout(async () => {

      const response2 = await postData(apiaddress+'/get-students-list', {class1,section1});
      setStudents(response2)
    }, 200);      
  } catch (error) {
    console.log(error);
  }

};
const handledatepermission = async () => {
  const res = await postData(apiaddress+'/get-permissions',{usern:user})
  setallowed((countStringOccurrences(res,'MarkAttendancebydate')===1))
}
const handledatechange = async (e) => {
const trt = (reverseformatDate(e.target.value))
setdate(trt)
}
const handleAttendance = async (status, adn) => {
      ApiCaller2([adn,status]);
  if (index < students.length - 1) {
    setIndex(prevIndex => prevIndex + 1);
  }else{
    Swal.fire({
      title: 'Attendance Marked!',
      text: 'Do you want to continue',
      icon: 'success',
      confirmButtonText: 'Continue'
    })


  }
};

useEffect(()=>{
  const tb = async () => {
    await handledatepermission()
    await ApiCaller()
  }
  tb();
},[])
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date().getDay();
const dayName = daysOfWeek[today];
const searchString = getFormattedDate();
const occurrences = blockeddates.filter(item => item === searchString).length;
  if(dayName==='Saturday' | dayName==='Sunday'){

    return(

      <h1>Today is a General Holiday</h1>
      
    )}
  else if(occurrences===1){
    return(

      <h1>Today is a Special Holiday</h1>
    )
  }
  else{

  return (
  
  <GridContainer>
      
  
          <GridItem xs={12} sm={12} md={12}>
  
            <Card chart>
              <CardHeader color="primary">
              <h4>Mark Attendance</h4>
              </CardHeader>
              <CardBody>
                
              <GridContainer justify="center" alignItems="center" spacing={2}>

              <GridItem xs={12} sm={12} md={12}>
                {allowed?(
                <div id="datepick">
                <input id='date' type="date" value={formatDate(date)} onChange={handledatechange}/>
                </div>
                ):('')}
            </GridItem>

            <GridItem xs={8} sm={6} md={8}>
<select className='nativesize' id="classn" onChange={handleDropdownChange}>
        
      {classes.map((classes,count)=>(
                      <option value={count}>{classes.class} {classes.section}</option>
                    ))}
  
              </select>
</GridItem>
  
              {/* <GridItem xs={12} sm={12} md={5}>
  
        <select className='nativesize' id="section" value={selectedValue.section} onChange={handleDropdownChange}>
        {sections.map((sections)=>(
                      <option value={sections.section}>{sections.section}</option>
                    ))}
          </select>
  
          </GridItem> */}
  
          <GridItem xs={12} sm={6} md={5}>
          <p className='nativesize'>Admission Number</p>
          </GridItem>
  
          <GridItem xs={12} sm={6} md={5}>
          <p className='nativesize'>{students[index].admission_number}</p>
              </GridItem>
  
              <GridItem xs={12} sm={6} md={5}>
          <p className='nativesize'>Roll Number</p>
          </GridItem>
  
          <GridItem xs={12} sm={6} md={5}>
          <p className='nativesize'>{students[index].roll_no}</p>
              </GridItem>
  
          
              <GridItem xs={12} sm={6} md={5}>
          <p className='nativesize'>Name</p>
          </GridItem>
  
          <GridItem xs={12} sm={6} md={5}>
          <p className='nativesize'>{students[index].student_full_name}</p>
              </GridItem>
  
              <GridItem xs={12} sm={6} md={5}>
              <button className='nativesize presentbtn' onClick={()=>{handleAttendance('p',students[index].admission_number)}}>Present</button>
          </GridItem>
  
          <GridItem xs={12} sm={6} md={5}>
          <button className='nativesize absentbtn' onClick={()=>{handleAttendance('a',students[index].admission_number)}}>Absent</button>
              </GridItem>
  
              <GridItem xs={12} sm={6} md={5}>
              <button className='nativesize leavebtn' onClick={()=>{handleAttendance('l',students[index].admission_number)}}>Leave</button>
          </GridItem>
  
          <GridItem xs={12} sm={6} md={5}>
          <button className='nativesize latebtn' onClick={()=>{handleAttendance('lt',students[index].admission_number)}}>Late</button>
              </GridItem>
  
        
  
      
        
  
  
      <Link to={'/admin/randomattendance/'+date}>
        <h3 className='hyperh3'>Random Attendance</h3>
        </Link>
  
        </GridContainer>
        </CardBody>
            </Card>
          </GridItem>
  </GridContainer>
  
    );

}
};
export default Markattendance;



