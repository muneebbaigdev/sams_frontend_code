import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { apiaddress } from 'auth/apiaddress';
import { postData } from 'auth/datapost';
import Swal from 'sweetalert2';

const Shifts = () => {

const [shifts,setShifts]=useState([])
const ApiCaller2 = async (props) => {

  try {
    const res1 = await postData(apiaddress+'/get-shifts',{data:true})
    setShifts(res1)
  } catch (error) {
    console.log(error);
  }

};
useEffect(()=>{ 
  ApiCaller2()
},[])
const addthisshift = async () => {

    let newshift = document.getElementById('newshift').value
    if(newshift.length === 0){
      Swal.fire({
        title: 'Please Fill The Input First!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{

      await postData(apiaddress+'/add-new-shift',{newshift})
      Swal.fire({
        title: 'Shift Added!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      await ApiCaller2()
      document.getElementById('newshift').value = ''
    }
}
const deletethisshift = async (deleteshift) => {

  await postData(apiaddress+'/delete-that-shift',{deleteshift})
  Swal.fire({
    title: 'Section Deleted!',
    text: 'Do you want to continue',
    icon: 'warning',
    confirmButtonText: 'OK'
  })
  await ApiCaller2()

}

  return (
    <Card>
            <CardHeader color="primary">
              <h4>Add Or Delete Shifts</h4>
            </CardHeader>
            <CardBody>
<GridContainer justify="center" alignItems="center" spacing={1}>

   <GridItem xs={12} sm={12} md={12}>

    <ul className='myul'>
    <li>
                
                <input id='newshift' style={{backgroundColor:'greenyellow'}} className='wf4' placeholder='Add New Shift' required/>
              <p className='wf3' onClick={()=>{addthisshift()}}>Add This Shift</p>
              
              </li>

              <li>
                
                <p style={{backgroundColor:'greenyellow'}} className='wf1'>Shift</p>
              <p style={{backgroundColor:'greenyellow'}} className='wf1'>Delete This Shift</p>

              </li>
            
              {shifts.map((shifts)=>(<li>
                
                <p className='wf1'>{shifts.shifts}</p>
                <p className='wf2' onClick={()=>{deletethisshift(shifts.shifts)}}>Delete This Shift</p>
           
                
                </li>))}
              
</ul>

</GridItem>

    </GridContainer>
    </CardBody>
    </Card>

  );

};

export default Shifts;