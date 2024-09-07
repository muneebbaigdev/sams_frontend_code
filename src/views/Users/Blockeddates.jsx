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

function Blockeddates() {

const classes = useStyles()
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = today.getFullYear();
var formattedDate = yyyy + '-' + mm + '-' + dd;
const [date,setdate] = useState(formattedDate)
const[comment,setcomment] = useState('')
const[blockeddates,setblockeddates] = useState([{idoffdates:0,date:0,comment:'null'}])
const handlechange = () => {
setdate(document.getElementById('date').value)
setcomment(document.getElementById('comment').value)
}

const ApiCaller = async (props) => {

  try {
    const data = await postData(apiaddress+'/get-blocked-dates',{data:true})
    setblockeddates(data.data)
  } catch (error) {
    console.log(error);
  }

};
const handleAdd = async () => {

    const res = await postData(apiaddress+'/add-blocked-date',{date,comment})
    if (res.error ===true){
      Swal.fire({
        title: 'RECORD ALREADY EXIST!',
        text: 'Do you want to continue',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    }else{
      Swal.fire({
        title: 'RECORD ADDED SUCCESSFULLY!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      ApiCaller()
      setdate('')
      setcomment('')
    }

}
const handleDelete = async (date) => {
    await postData(apiaddress+'/delete-blocked-date',{date})
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
    <h4 className={classes.cardTitleWhite}>Set Blocked Dates</h4>
</CardHeader>
<CardBody>
<GridContainer justify="center" alignItems="center" spacing={1}>

                <GridItem  xs={12} sm={6} md={3}>
                    <input id='date' onChange={handlechange} className='myselectdropdown' type="date" value={date} />
                </GridItem>
            
                <GridItem xs={12} sm={6} md={6}>
                    <input id='comment' onChange={handlechange} value={comment} className='myselectdropdown' type="text" />
                </GridItem>


                <GridItem xs={12} sm={6} md={3}>
                <button onClick={handleAdd} style={{backgroundColor:'green',color:'white',cursor:'pointer'}} className='myselectdropdown'>SET</button>
                </GridItem>


</GridContainer>

<GridContainer justify="center" alignItems="center" spacing={1}>

            <GridItem  xs={12} sm={12} md={12}>
                        <ul className='myul'>
                        <li>
                        <span className='wd2'>Date</span>
                        <span className='wd2'>Comment</span>
                        <span className='wd2'>Delete</span>
                        </li>

                        {blockeddates.map((co) => (
                        <li key={co.idoffdates}>

                            <span className='wx2'>{co.date}</span>
                            <span className='wx2'>{co.comment}</span>
                            <span onClick={()=>{handleDelete(co.idoffdates)}} className='wx3 hoverit'>Delete</span>

                        
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

export default Blockeddates
