import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import bgimg from '../../assets/img/classes.jpeg'
import bgimg2 from '../../assets/img/sections.jpg'
import bgimg3 from '../../assets/img/departments.jpg'
import bgimg4 from '../../assets/img/shifts.png'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { apiaddress } from "auth/apiaddress";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { postData } from "auth/datapost";
const useStyles = makeStyles(styles);
export default function Classsections() {
  const classes = useStyles();
  function countStringOccurrences(arr, targetString) {
    let count = 0;
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === targetString) {
        count++;
      }
    }
  
    return count;
  }
  const [perm,setperm] = useState({a:false,b:false,c:false,d:false})
  const caller = async () => {
    const usern = localStorage.getItem('username')
    const res = await postData(apiaddress+'/get-permissions',{usern})

    if(countStringOccurrences(res,'Classes')===1){
      setperm(prevPerm => ({ ...prevPerm, a: true }));
    }
    if(countStringOccurrences(res,'Sections')===1){
      setperm(prevPerm => ({ ...prevPerm, b: true }));
    }
    if(countStringOccurrences(res,'Departments')===1){
      setperm(prevPerm => ({ ...prevPerm, c: true }));
    }
    if(countStringOccurrences(res,'Shifts')===1){
      setperm(prevPerm => ({ ...prevPerm, d: true }));
    }
    
  }
  useEffect(()=>{
    caller()
  },[])
  return (
    <div>

      <GridContainer justify="center" alignItems="center" spacing={1}>
    
        {perm.a?(
        <GridItem xs={12} sm={12} md={5}>
        <Link to="/admin/classes">
          <Card chart>
            <CardHeader color="success">
              <img src={bgimg} style={{width:'100%',height:'50%'}}/>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Classes</h4>
            </CardBody>

          </Card>
          </Link>
        </GridItem>
):('')}
    
        {perm.b?(
        <GridItem xs={12} sm={12} md={5}>
        <Link to="/admin/sections">
          <Card chart>
            <CardHeader color="warning">
            <img src={bgimg2} style={{width:'100%',height:'50%'}}/>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Sections</h4>
            </CardBody>
          </Card>
          </Link>
        </GridItem>
     ):('')}
        {perm.c?(
        <GridItem xs={12} sm={12} md={5}>
        <Link to="/admin/departments">

          <Card chart>
            <CardHeader color="danger">
            <img src={bgimg3} style={{width:'100%',height:'50%'}}/>

            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Departments</h4>
            </CardBody>
          </Card>
          </Link>

        </GridItem>
):('')}
        {perm.d?(
        <GridItem xs={12} sm={12} md={5}>
        <Link to="/admin/shifts">

          <Card chart>
            <CardHeader color="danger">
            <img src={bgimg4} style={{width:'100%',height:'50%'}}/>

            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Shifts</h4>
            </CardBody>
          </Card>
          </Link>

        </GridItem>
):('')}

      </GridContainer>

    </div>
  );
}