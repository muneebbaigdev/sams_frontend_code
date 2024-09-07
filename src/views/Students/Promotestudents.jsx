import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { apiaddress } from 'auth/apiaddress';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { postData } from 'auth/datapost';
import Swal from 'sweetalert2';


function Promotestudents() {
const [classes,setClasses]=useState([])
const user = localStorage.getItem('username')
const ApiCaller = async () => {
  
    try {

      const res1 = await postData(apiaddress+'/get-special-classes',{number:user})
      setClasses(res1)

    } catch (error) {
      console.log(error);
    }
  
  };
useEffect(()=>{
    ApiCaller()
},[])

const promote = async ()=>{
const orign = classes[document.getElementById('orign').value]
const destination = classes[document.getElementById('destination').value]
const res = await postData(apiaddress+'/promote-students',{orign,destination})
if(res.error===false){
    Swal.fire({
        title: 'Students Promoted',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'OK'
      })
}else{
  Swal.fire({
    title: 'An Error Occured',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'OK'
  })
}
}

  return (
<GridContainer>
<GridItem xs={12} sm={12} md={12}>
<Card chart>
<CardHeader color="primary">
<h4>Promote Students</h4>
</CardHeader>
<CardBody>
<GridContainer justify="center" alignItems="center" spacing={2}>
    
    
    <GridItem xs={12} sm={6} md={5}>
    <select id='orign' className='nativesize'>
        {classes.map((cla,cnt)=>(
    <option value={cnt}>{cla.class} {cla.section}</option>
    ))}
    </select>
    <br />
    <br />
    </GridItem>

    <GridItem xs={12} sm={6} md={5}>
    <select id='destination' className='nativesize'>
        {classes.map((cla,cnt)=>(
    <option value={cnt}>{cla.class} {cla.section}</option>
    ))}
    </select>
    <br />
    <br />
    </GridItem>

    <GridItem xs={12} sm={6} md={5}>
    <button className='nativesize' id='promotebutton' onClick={promote}>Promote</button>
    </GridItem>


</GridContainer>
</CardBody>
</Card>
</GridItem>
</GridContainer>
  )
}

export default Promotestudents
