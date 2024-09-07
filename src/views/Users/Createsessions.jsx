import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
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

function Createsessions() {

const classes = useStyles()
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = today.getFullYear();
var formattedDate = yyyy + '-' + mm + '-' + dd;

const [sessions,setsessions] = useState([])
const [sdate,setsdate] = useState(formattedDate)
const [edate,setedate] = useState(formattedDate)
const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value, 10));
    };

    // Generate an array of years (e.g., from 1900 to 2099)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 200 }, (_, index) => currentYear - index);

const handlechange = () => {
setsdate(document.getElementById('sdate').value)
setedate(document.getElementById('edate').value)
}

const ApiCaller = async (props) => {

  try {
    const data = await postData(apiaddress+'/get-sessions',{data:true})
    setsessions(data)
    
  } catch (error) {
    console.log(error);
  }

};
const handleAdd = async () => {

    const resu = await postData(apiaddress+'/add-session',{selectedYear,sdate,edate})
    if(resu.error===true){
      Swal.fire({
        title: 'RECORD ALREADY EXIST!',
        text: 'Do you want to continue',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    }else{
      Swal.fire({
        title: 'RECORD SUCCESSFULLY ADDED!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    ApiCaller()
    }

}
const handleDelete = async (sid) => {
    await postData(apiaddress+'/delete-session',{sid})
    Swal.fire({
      title: 'RECORD SUCCESSFULLY DELETED!',
      text: 'Do you want to continue',
      icon: 'warning',
      confirmButtonText: 'OK'
    })
    ApiCaller()
}

useEffect(()=>{
  ApiCaller()
},[])

  return (
<GridContainer>
<GridItem xs={12} sm={12} md={12}>
<Card>
<CardHeader color="primary">
    <h4 className={classes.cardTitleWhite}>Create Sessions</h4>
</CardHeader>
<CardBody>
<GridContainer justify="center" alignItems="center" spacing={1}>

    

                <GridItem  xs={12} sm={6} md={3}>
                <select className='myselectdropdown' value={selectedYear} onChange={handleYearChange}>
                {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
                ))}
                </select>
                </GridItem>
            
                <GridItem xs={12} sm={6} md={3}>
                    <input id='sdate' onChange={handlechange} value={sdate} className='myselectdropdown' type="date" />
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                    <input id='edate' onChange={handlechange} value={edate} className='myselectdropdown' type="date" />
                </GridItem>


                <GridItem xs={12} sm={6} md={3}>
                <button onClick={handleAdd} style={{backgroundColor:'green',color:'white',cursor:'pointer'}} className='myselectdropdown'>SET</button>
                </GridItem>


</GridContainer>

<GridContainer justify="center" alignItems="center" spacing={1}>

            <GridItem  xs={12} sm={12} md={12}>
                        <ul className='myul'>
                        <li>
                        <span className='wd3'>Session</span>
                        <span className='wd2'>Start Date</span>
                        <span className='wd2'>End Date</span>
                        <span className='wd3'>Delete</span>
                        </li>

                        {sessions.map((co) => (
                        <li key={co.idsessiondates}>

                            <span className='wx3'>{co.session}</span>
                            <span className='wx2'>{co.startdate}</span>
                            <span className='wx2'>{co.enddate}</span>
                            <span onClick={()=>{handleDelete(co.idsessiondates)}} className='wx3 hoverit'>Delete</span>

                        </li>
                        ))}
                        </ul>
            </GridItem>

</GridContainer>


</CardBody>
</Card>
</GridItem>
</GridContainer>
  )
}

export default Createsessions
