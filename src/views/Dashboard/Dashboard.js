import React, { useState } from "react";
import Chart from "chart.js";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { apiaddress } from "auth/apiaddress";
import { postData } from "auth/datapost";
import ChartComponent from "./ChartComponent";
const useStyles = makeStyles(styles);
function countStringOccurrences(arr, targetString) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === targetString) {
      count++;
    }
  }

  return count;
}


export default function Dashboard() {
const classes = useStyles();
const [tstrength,setTStrength] = React.useState({strength:0})
const [tpresent,setPresent] = React.useState({present:0})
const [tabsent,setAbsent] = React.useState({absent:0})
const [tleave,setLeave] = React.useState({leaves:0})
const[lates,setlates] = React.useState({lates:0})
const[data,setData] = React.useState([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]])
const [permissions,Setpermissions] = React.useState({morning:false,evening:false,a:false})
const [classsections,setclasssections] = useState([])

  const ApiCaller = async ()=>{
    try{

      const resx = await postData(apiaddress + "/get-permissions",{usern:localStorage.getItem('username')})
      const a = countStringOccurrences(resx,'morning')
      const b = countStringOccurrences(resx, 'evening')
      const c = countStringOccurrences(resx, 'departmentondashboard')
      if(a === 1){

      Setpermissions(prevpermissions => ({ ...prevpermissions, morning:true }))
      }
      if(b === 1){
      Setpermissions(prevpermissions => ({ ...prevpermissions,evening:true}))
      }
      if(c === 1){
        Setpermissions(prevpermissions => ({ ...prevpermissions,a:true}))
        }
      if((a+b)<2){
        document.getElementById('shift').style.visibility = 'hidden'
      }
      const restx = await postData(apiaddress+'/get-special-classes',{number:localStorage.getItem('username')})
      setclasssections(restx)
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
      const response5 = await postData(apiaddress+'/dashboard-charts', {classsections:restx});
      setData(response5)

  
      return
    }catch (err){

      console.log(err)

    }

  }
  React.useEffect(() => {
    ApiCaller();
  
  }, []);

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
<div>
{permissions.a?(
<GridContainer justify="center" alignItems="center" spacing={2}>

  <GridItem xs={12} sm={12} md={2}>
    <Card>
      <CardHeader color="warning" stats icon>
        <CardIcon color="rose">
        <h2 style={{color:'white',minWidth:'50px'}}>
          {tstrength.strength}
        </h2>
        </CardIcon>

      </CardHeader>
      <CardFooter stats>
      <p className={classes.cardCategory}>Total ICT Strength</p>
      </CardFooter>
    </Card>
  </GridItem>

  <GridItem xs={12} sm={6} md={2}>
    <Card>
      <CardHeader color="warning" stats icon>
        <CardIcon color="success">
        <h2 style={{color:'white',minWidth:'50px'}}>
          {tpresent.present}
        </h2>
        </CardIcon>

        
      </CardHeader>
      <CardFooter stats>
      <p className={classes.cardCategory}>Total ICT Present</p>
      </CardFooter>
    </Card>
  </GridItem>

  <GridItem xs={12} sm={6} md={2}>
    <Card>
      <CardHeader color="warning" stats icon>
        <CardIcon color="danger">
        <h2 style={{color:'white',minWidth:'50px'}}>
          {tabsent.absent}
        </h2>
        </CardIcon>

        
      </CardHeader>
      <CardFooter stats>
      <p className={classes.cardCategory}>Total ICT Absent</p>
      </CardFooter>
    </Card>
  </GridItem>

  <GridItem xs={12} sm={6} md={2}>
    <Card>
      <CardHeader color="warning" stats icon>
        <CardIcon color="info">
        <h2 style={{color:'white',minWidth:'50px'}}>
          {tleave.leaves}
        </h2>
        </CardIcon>

        
      </CardHeader>
      <CardFooter stats>
      <p className={classes.cardCategory}>Total ICT Leave</p>
      </CardFooter>
    </Card>
  </GridItem>

  <GridItem xs={12} sm={6} md={2}>
    <Card>
      <CardHeader color="warning" stats icon>
        <CardIcon color="warning">
        <h2 style={{color:'white',minWidth:'50px'}}>
          {lates.lates}
        </h2>
        </CardIcon>

        
      </CardHeader>
      <CardFooter stats>
      <p className={classes.cardCategory}>Total ICT Late</p>
      </CardFooter>
    </Card>
  </GridItem>

  <GridItem xs={12} sm={6} md={2}>
  <Link to={'/admin/dashboardreport'}>
    <Card>

<CardBody style={{background:'linear-gradient(60deg, #26c6da, #00acc1)',borderRadius:'5px',color:'white',cursor:'pointer'}}>
<h3>Print Details</h3>
</CardBody>
    </Card>
  </Link>
  </GridItem>



</GridContainer>
):('')}

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


<GridContainer>
{classsections.map((cla,cnt)=>(
      <GridItem xs={12} sm={12} md={4}>
        <Link to={'/admin/todaydetail/'+cla.class+'/'+cla.section}>
          <Card chart>
            <CardHeader>
            <ChartComponent chartId="myChart" chartData={{data:data[cnt],label:cla.class+' '+cla.section}} />
            </CardHeader>
          </Card>
          </Link>
      </GridItem>

))}
</GridContainer>
</div>
);
}