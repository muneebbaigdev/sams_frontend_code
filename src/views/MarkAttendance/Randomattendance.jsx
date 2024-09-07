import React, { useState, useEffect } from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { apiaddress } from 'auth/apiaddress';
import { postData } from 'auth/datapost';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
let s1 = {fontSize:'1.5rem',margin:'5px',backgroundColor:'rgb(140, 233, 0)',padding:'3px',width:'80px',':hover':{backgroundColor:'white'}}
let s2 = {fontSize:'1.5rem',margin:'5px',backgroundColor:'red',padding:'3px',width:'80px'}
let s3 = {fontSize:'1.5rem',margin:'5px',backgroundColor:'rgb(4, 166, 253)',padding:'3px',width:'80px'}
let s4 = {fontSize:'1.5rem',margin:'5px',backgroundColor:'rgba(253, 170, 4, 0.652)',padding:'3px',width:'80px'}

const Randomattendance = ()=> {

  const user = localStorage.getItem('username')
  const {date} = useParams();
  const [classes,setClasses]=useState([])
  const [sections,setSections] = useState([])
  const [selectedValue, setSelectedValue] = useState({classn: '',section: '',date: date,status:''});
  const [students1, setStudents] = useState([{
    admission_number: 0,
    roll_no: 0,
    student_full_name:'',
    status1: ''
  }]);
  const ApiCaller2 = async (props) => {
    try {  
      console.log(props)

      postData(apiaddress+'/mark-attendance',{ admission_number:props[0] ,status:props[1],date});
      
    } catch (error) {
      console.log(error);
    }

  };
  const handlebtn = async (status, adn) => {
    try{
   ApiCaller2([adn,status]);
   ApiCaller3()
   return    
    } catch (err){
      console.log(err)
    }

  };
  const ApiCaller3 = async (props) => {
    try {  
      const cs1 = classes[document.getElementById('classn').value].class
      const ss1 = classes[document.getElementById('classn').value].section
      setTimeout(async () => {

        const response2 = await postData(apiaddress+'/student-is-listing', {class1:cs1,section1:ss1});
        setStudents(response2)
      }, 200);      
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
  const ApiCaller = async () => {
  
    try {
      const res1 = await postData(apiaddress+'/get-special-classes',{number:user})
      setClasses(res1)
      const res2 = await postData(apiaddress+'/get-special-sections',{number:user})
      setSections(res2)
      setTimeout(async () => {
        const response2 = await postData(apiaddress+'/student-is-listing', {class1:res1[0].class,section1:res1[0].section});
        setStudents(response2)
      }, 200);
    } catch (error) {
      console.log(error);
    }
  
  };


  useEffect(() => {
    ApiCaller()

  }, []);

    return(

<GridContainer>
   

   <GridItem xs={12} sm={12} md={12}>

     <Card chart>
       <CardHeader color="primary">
       <h4>Random Attendance</h4>
       </CardHeader>
       <CardBody>
         
<GridContainer justify="center" alignItems="center" spacing={2}>


<GridItem xs={12} sm={6} md={5}>
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

<ul className='myul randomattendancelist'>

          <li style={{backgroundColor:'orangered'}}>
          <GridContainer justify="center" alignItems="center" spacing={2}>
          <GridItem xs={12} sm={12} md={1}>
          <p>Roll No</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
          <p>Student Name</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={1}>
          <p>Today Status</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={1}>
          <p>Present</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={1}>
          <p>Absent</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={1}>
          <p>Leave</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={1}>
          <p>Late</p>
          </GridItem>
          </GridContainer>
          </li>

          {students1.map((student) => (
                      <li key={student.admission_number}>
                      <GridContainer justify="center" alignItems="center" spacing={2}>
                      <GridItem xs={12} sm={12} md={1}>
                      <p>{student.roll_no}</p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                      <p>{student.student_full_name}</p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={1}>
                      <p>{student.status1}</p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={1}>
                      <p className='present' onClick={() => {handlebtn('p',student.admission_number) }}>Present</p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={1}>
                      <p className='absent' onClick={() => {handlebtn('a',student.admission_number) }}>Absent</p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={1}>
                      <p className='leave' onClick={() => {handlebtn('l',student.admission_number) }}>Leave</p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={1}>
                      <p className='late' onClick={() => {handlebtn('lt',student.admission_number) }}>Late</p>
                      </GridItem>
                      </GridContainer>
                      </li>

            ))}

</ul>

 </GridContainer>
 </CardBody>
     </Card>
   </GridItem>
</GridContainer>

    )
}
export default Randomattendance;