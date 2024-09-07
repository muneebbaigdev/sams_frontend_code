import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import dashboardRoutes from 'routes'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Switch from '@material-ui/core/Switch';
import CardFooter from 'components/Card/CardFooter';
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

  function countStringOccurrences(arr, searchString) {
    return arr.reduce((count, current) => {
      return count + (current === searchString);
    }, 0);
  }


function Editpermissions() {
const {employee_number,employee_full_name,employee_mobile_number,father_full_name,father_mobile_number,joining_date,email,cnic,password} = useParams()
var state = {}
var statestr = []
var userpermissions = []
let thedata = async () => {
    let alpha = {}
    await dashboardRoutes.map((route)=>(
        alpha[route.rtlName] = false
    ))
    return alpha
}
let thedatastr = async () => {
    let alpha = []
    await dashboardRoutes.map((route)=>(
        alpha.push(route.rtlName)
    ))
    return alpha
}
useEffect(()=>{
const runit = async () =>{
state = await thedata()
statestr = await thedatastr()
const getpermissions = await postData(apiaddress+'/get-permissions',{usern:password})
getpermissions.map((perm)=>(
    userpermissions.push(perm) 
))

}
runit()
setTimeout(()=>{

var xab = Object.keys(state).length
for(var i = 0; i<xab; i++){
if(countStringOccurrences(userpermissions,statestr[i])>0){
document.getElementById(statestr[i]).checked = true
var d = statestr[i]
state[d] = true
}

}


}, 500);
},[])
const handleChange = (event) => {

    var x = document.getElementById(event).checked
    state[event] = x
    
  };
const submitdata = async (props) => {
var upstate = []
var xab = Object.keys(state).length
for(var i = 0; i<xab; i++){
    var test = dashboardRoutes[i].rtlName
    if(state[test]===true){
        upstate.push(test)
    }
}
const employee = {employee_number,employee_full_name,employee_mobile_number,father_full_name,father_mobile_number,joining_date,email,cnic,password}
const response = await postData(apiaddress+'/modify-user',{employee,upstate})
if (response.error === true){
  Swal.fire({
    title: 'An Error Occured!',
    text: 'Do you want to continue',
    icon: 'warning',
    confirmButtonText: 'OK'
  })
}else{
Swal.fire({
  title: 'User Modified!',
  text: 'Do you want to continue',
  icon: 'success',
  confirmButtonText: 'OK'
})
setTimeout(() => {
  window.location.href = '/admin/modifyuser';
}, 3000);

}
}


return (
<GridContainer justify="center" alignItems="center" spacing={1}>
<GridItem xs={12} sm={12} md={12}>   
<Card>
<CardHeader color="primary">
    <h3>Set Employee Permissions</h3>
</CardHeader>
<CardBody>
<GridContainer justify="center" alignItems="center" spacing={1}>

      {dashboardRoutes.map((route)=>(
        

        <GridItem xs={12} sm={6} md={4}>
            <Card>

                <CardHeader>
                <h6>{route.name}</h6>
                <label  className="switch">
                <input onClick={()=>{handleChange(route.rtlName)}} id={route.rtlName} type= "checkbox"/>
                <span className="slider round"></span>
                </label>
                
                </CardHeader>
            </Card>
       
        </GridItem>
        
        
        
      ))}

</GridContainer>
</CardBody>
<CardFooter>

<Button onClick = {submitdata} color="primary">Submit Modifications</Button>

</CardFooter>
</Card>
</GridItem>
</GridContainer>
  )

}
export default Editpermissions
