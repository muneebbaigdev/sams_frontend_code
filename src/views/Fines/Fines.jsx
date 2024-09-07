import React, {useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import bgimg from '../../assets/img/classes.jpeg'
import bgimg2 from '../../assets/img/departments.jpg'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { apiaddress } from "auth/apiaddress";
import { postData } from "auth/datapost";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

export default function Fines() {
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
  const [perm,setperm] = useState({a:false,b:false})
  const caller = async () => {
    const usern = localStorage.getItem('username')
    const res = await postData(apiaddress+'/get-permissions',{usern})
    if(countStringOccurrences(res,'classFines')===1){
      setperm(prevPerm => ({ ...prevPerm, a: true }));
    }
    if(countStringOccurrences(res,'departmentFines')===1){
      setperm(prevPerm => ({ ...prevPerm, b: true }));
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
        <Link to="/admin/classfines">
          <Card chart>
            <CardHeader color="success">
              <img src={bgimg} style={{width:'100%',height:'50%'}}/>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Class and Student Wise Fines</h4>
            </CardBody>

          </Card>
          </Link>
        </GridItem>
):('')}
    
{perm.b?(
        <GridItem xs={12} sm={12} md={5}>
        <Link to="/admin/departmentfines">
          <Card chart>
            <CardHeader color="warning">
            <img src={bgimg2} style={{width:'100%',height:'50%'}}/>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Department Fines</h4>
            </CardBody>
          </Card>
          </Link>
        </GridItem>
):('')} 



      </GridContainer>

    </div>
  );
}