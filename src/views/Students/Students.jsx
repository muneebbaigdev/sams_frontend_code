import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import bgimg from '../../assets/img/addstudent.png'
import bgimg2 from '../../assets/img/modifystudent.png'
import bgimg3 from '../../assets/img/deletestudent.jpg'
import bgimg4 from '../../assets/img/promotestudents.png'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { apiaddress } from "auth/apiaddress";
import { postData } from "auth/datapost";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);
export default function Students() {
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

    if(countStringOccurrences(res,'addstudent')===1){
      setperm(prevPerm => ({ ...prevPerm, a: true }));
    }
    if(countStringOccurrences(res,'modifystudent')===1){
      setperm(prevPerm => ({ ...prevPerm, b: true }));
    }
    if(countStringOccurrences(res,'deletestudent')===1){
      setperm(prevPerm => ({ ...prevPerm, c: true }));
    }
    if(countStringOccurrences(res,'promotestudents')===1){
      setperm(prevPerm => ({ ...prevPerm, d: true }));
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
        <Link to="/admin/addnewstudent">
          <Card chart>
            <CardHeader color="success">
              <img src={bgimg} style={{width:'100%',height:'50%'}}/>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Add Students</h4>
            </CardBody>

          </Card>
          </Link>
        </GridItem>
):('')}
    
        {perm.b?(
        <GridItem xs={12} sm={12} md={4}>
        <Link to="/admin/modifystudent">
          <Card chart>
            <CardHeader color="warning">
            <img src={bgimg2} style={{width:'100%',height:'50%'}}/>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Modify Students</h4>
            </CardBody>
          </Card>
          </Link>
        </GridItem>
     ):('')}
     {perm.c?(
        <GridItem xs={12} sm={12} md={4}>
        <Link to="/admin/deletestudent">

          <Card chart>
            <CardHeader color="danger">
            <img src={bgimg3} style={{width:'100%',height:'50%'}}/>

            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Delete Students</h4>
            </CardBody>
          </Card>
          </Link>

        </GridItem>
):('')}

{perm.d?(
        <GridItem xs={12} sm={12} md={4}>
        <Link to="/admin/promotestudents">

          <Card chart>
            <CardHeader color="danger">
            <img src={bgimg4} style={{width:'100%',height:'50%'}}/>

            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Promote Students</h4>
            </CardBody>
          </Card>
          </Link>

        </GridItem>
):('')}

      </GridContainer>

    </div>
  );
}