import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import bgimg from '../../assets/img/studentreport.png'
import bgimg2 from '../../assets/img/modifystudent.png'
import bgimg3 from '../../assets/img/departmentreport.jpg'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { postData } from "auth/datapost";
import { apiaddress } from "auth/apiaddress";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
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
export default function Reports() {
  const classes = useStyles();
  
  const [perm,setperm] = useState({a:false,b:false,c:false})
  const caller = async () => {
    const usern = localStorage.getItem('username')
    const res = await postData(apiaddress+'/get-permissions',{usern})
    if(countStringOccurrences(res,'studentreport')===1){
      setperm(prevPerm => ({ ...prevPerm, a: true }));
    }
    if(countStringOccurrences(res,'classreport')===1){
      setperm(prevPerm => ({ ...prevPerm, b: true }));
    }
    if(countStringOccurrences(res,'departmentreport')===1){
      setperm(prevPerm => ({ ...prevPerm, c: true }));
    }
    
  }
  useEffect(()=>{
    caller()
  },[])
  return (
    <div>

      <GridContainer>
   
    {perm.a?(
        <GridItem xs={12} sm={12} md={4}>
        <Link to="/admin/studentreport">
          <Card chart>
            <CardHeader color="success">
              <img src={bgimg} style={{width:'100%',height:'50%'}}/>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Student Report</h4>
            </CardBody>

          </Card>
          </Link>
        </GridItem>
    ):('')
}

{perm.b?(
        <GridItem xs={12} sm={12} md={4}>
        <Link to="/admin/classreport">
          <Card chart>
            <CardHeader color="warning">
            <img src={bgimg2} style={{width:'100%',height:'50%'}}/>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Class Report</h4>
            </CardBody>
          </Card>
          </Link>
        </GridItem>
         ):('')
        }

{perm.c?(

        <GridItem xs={12} sm={12} md={4}>
        <Link to="/admin/departmentreport">

          <Card chart>
            <CardHeader color="danger">
            <img src={bgimg3} style={{width:'100%',height:'50%'}}/>

            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Department Report</h4>
            </CardBody>
          </Card>
          </Link>

        </GridItem>
         ):('')
        }

      </GridContainer>

    </div>
  );
}