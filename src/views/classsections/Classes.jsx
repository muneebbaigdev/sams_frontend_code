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

const Classes = () => {

const [classes,setClasses]=useState([])
const ApiCaller2 = async (props) => {

  try {
    const res1 = await postData(apiaddress+'/get-classes',{data:true})
    setClasses(res1)
  } catch (error) {
    console.log(error);
  }

};
useEffect(()=>{ 
  ApiCaller2()
},[])
const addthisclass = async () => {

    let newclass = document.getElementById('newclass').value
    if(newclass.length === 0){
      Swal.fire({
        title: 'Please Fill The Input First!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      
      await postData(apiaddress+'/add-new-class',{newclass})
      Swal.fire({
        title: 'Class Added!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      await ApiCaller2()
      document.getElementById('newclass').value = ''
    }
}
const deletethisclass = async (deleteclass) => {

  await postData(apiaddress+'/delete-that-class',{deleteclass})
  Swal.fire({
    title: 'Class Deleted!',
    text: 'Do you want to continue',
    icon: 'warning',
    confirmButtonText: 'OK'
  })
  await ApiCaller2()

}

  return (
    <Card>
            <CardHeader color="primary">
              <h4>Add Or Delete Classes</h4>
            </CardHeader>
            <CardBody>
<GridContainer justify="center" alignItems="center" spacing={1}>

   <GridItem xs={12} sm={12} md={12}>

    <ul className='myul'>
    <li>
                
                <input id='newclass' style={{backgroundColor:'greenyellow'}} className='wf4' placeholder='Add New Class' required/>
              <p className='wf3' onClick={()=>{addthisclass()}}>Add This Class</p>
              
              </li>

              <li>
                
                <p style={{backgroundColor:'greenyellow'}} className='wf1'>Class</p>
              <p style={{backgroundColor:'greenyellow'}} className='wf1'>Delete This Class</p>

              </li>
            
              {classes.map((classes)=>(<li>
                
                <p className='wf1'>{classes.classes}</p>
                <p className='wf2' onClick={()=>{deletethisclass(classes.classes)}}>Delete This Class</p>
           
                
                </li>))}
              
</ul>

</GridItem>

    </GridContainer>
    </CardBody>
    </Card>

  );

};

export default Classes;