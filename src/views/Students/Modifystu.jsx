import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CancelIcon from '@material-ui/icons/Cancel';
import { apiaddress } from 'auth/apiaddress';
import { postData } from 'auth/datapost';
import Swal from 'sweetalert2';
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Modifystu() {
  const {
    admission_number,
    roll_no,
    student_full_name,
    student_mobile_number,
    father_full_name,
    father_mobile_number,
    joining_date,
    email,
    cnic,
    department,
    class1,
    section,
    shift
  } = useParams();

const [classes1,setClasses]=useState([])
const [sections,setSections] = useState([])
const [departments,setDepartments] = useState([])
const [shifts,setShifts] = useState([])
const user = localStorage.getItem('username')
const ApiCaller2 = async (props) => {

  try {
    const res1 = await postData(apiaddress+'/get-special-classes',{number:user})
    setClasses(res1)
    const res3 = await postData(apiaddress+'/get-departments',{data:true})
    setDepartments(res3)
    const res4 = await postData(apiaddress+'/get-shifts',{data:true})
    setShifts(res4)
  } catch (error) {
    console.log(error);
  }

};
useEffect(()=>{
  ApiCaller2()
},[])

const [formData, setFormData] = useState({
  admission_number: admission_number,
  roll_no: roll_no,
  student_full_name: student_full_name,
  joining_date: joining_date,
  email: email,
  cnic: cnic,
  department: department,
  class1: class1,
  section: section,
  shift: shift,
  student_mobile_number: student_mobile_number,
  father_full_name: father_full_name,
  father_mobile_number: father_mobile_number,
});

const handleInputChange = (e) => {

setFormData({
  admission_number: document.getElementById('admissionnumber').value,
  roll_no: document.getElementById('rollnumber').value,
  student_full_name: document.getElementById('studentfullname').value,
  joining_date: document.getElementById('joiningdate').value,
  email: document.getElementById('email').value,
  cnic: document.getElementById('cnic').value,
  department: document.getElementById('department').value,
  class1: classes1[document.getElementById('class').value].class,
  section: classes1[document.getElementById('class').value].section,
  shift: document.getElementById('shift').value,
  student_mobile_number: document.getElementById('studentmobilenumber').value,
  father_full_name: document.getElementById('fatherfullname').value,
  father_mobile_number: document.getElementById('fathermobilenumber').value,
})

};
const handleclasstoggle = () => {
  document.getElementById('errormessage').classList.toggle('msgboxshow')
}
const ApiCaller = async (props) => {

  try {
    const response = await postData(apiaddress+'/update-student',props);
    console.log(response);
    Swal.fire({
      title: 'Student Modified!',
      text: 'Do you want to continue',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    const res1 = await postData(apiaddress+'/get-special-classes',{number:user})
    setClasses(res1)
  } catch (error) {
    console.log(error);
  }

};
const handleSubmit = async (e) => {
  //document.getElementById('errormessage').classList.toggle('msgboxshow')
  e.preventDefault();
await ApiCaller(formData);

return


};

  const classes = useStyles();

  return (
    <div>
      <div id='errormessage' className="msgbox">
        <CancelIcon id='closeicon' onClick={handleclasstoggle} fontSize='large' />
        <h3 style={{margin:'20px'}} id='mainresponse'>hello</h3>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Student</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    
                    value = {formData.admission_number}
                    labelText="Admission Number"
                    id="admissionnumber"
                    formControlProps={{
                      disabled:true,
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'text',
                      onChange:handleInputChange
                    }}
                  />

                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                  value = {formData.roll_no}
                    labelText="Roll No"
                    id="rollnumber"
                    formControlProps={{
                      disabled:true,
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'text',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                  value = {formData.student_full_name}
                    labelText="Student Full Name"
                    id="studentfullname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'text',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  value = {formData.student_mobile_number}
                    labelText="Student Mobile Number"
                    id="studentmobilenumber"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'text',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  value = {formData.father_full_name}
                    labelText="Father Full Name"
                    id="fatherfullname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'text',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  value = {formData.father_mobile_number}
                    labelText="Father Mobile Number"
                    id="fathermobilenumber"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'text',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  value = {formData.joining_date}
                    labelText="joining_date"
                    id="joiningdate"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'date',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  value = {formData.email}
                    labelText="E-mail"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'email',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  value = {formData.cnic}
                    labelText="CNIC"
                    id="cnic"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'text',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
      
                  <select onChange={handleInputChange} value={formData.department} className='myinputselect' name="department" id="department">
                  <option  value="default">Select Department</option>
                  {departments.map((department)=>(
                    <option value={department.department}>{department.department}</option>
                  ))}
                  </select>
                 
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
           
                  <select onChange={handleInputChange} className='myinputselect' name="class" id="class">

                  {classes1.map((classes,count)=>(
                    <option value={count}>{classes.class} {classes.section}</option>
                  ))}

                  </select>
                </GridItem>
  
                <GridItem xs={12} sm={6} md={3}>
           
                  <select onChange={handleInputChange} value={formData.shift} className='myinputselect' name="shift" id="shift">
                  <option value="shift">Select Shift</option>
                  {shifts.map((shifts)=>(
                    <option value={shifts.shifts}>{shifts.shifts}</option>
                  ))}
                  </select>
                </GridItem>

              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={handleSubmit} color="primary">Modify Student</Button>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}
