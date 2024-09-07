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

const Sections = () => {

const [sections,setSections]=useState([])
const ApiCaller2 = async (props) => {

  try {
    const res1 = await postData(apiaddress+'/get-sections',{data:true})
    setSections(res1)
  } catch (error) {
    console.log(error);
  }

};
useEffect(()=>{ 
  ApiCaller2()
},[])
const addthissection = async () => {

    let newsection = document.getElementById('newsection').value
    if(newsection.length === 0){
      Swal.fire({
        title: 'Please Fill The Input First!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      
      await postData(apiaddress+'/add-new-section',{newsection})
      Swal.fire({
        title: 'Section Added!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      await ApiCaller2()
      document.getElementById('newsection').value = ''
    }
}
const deletethissection = async (deletesection) => {

  await postData(apiaddress+'/delete-that-section',{deletesection})
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
              <h4>Add Or Delete Sections</h4>
            </CardHeader>
            <CardBody>
<GridContainer justify="center" alignItems="center" spacing={1}>

   <GridItem xs={12} sm={12} md={12}>

    <ul className='myul'>
    <li>
                
                <input id='newsection' style={{backgroundColor:'greenyellow'}} className='wf4' placeholder='Add New Section' required/>
              <p className='wf3' onClick={()=>{addthissection()}}>Add This Section</p>
              
              </li>

              <li>
                
                <p style={{backgroundColor:'greenyellow'}} className='wf1'>Section</p>
              <p style={{backgroundColor:'greenyellow'}} className='wf1'>Delete This Section</p>

              </li>
            
              {sections.map((sections)=>(<li>
                
                <p className='wf1'>{sections.sections}</p>
                <p className='wf2' onClick={()=>{deletethissection(sections.sections)}}>Delete This Section</p>
           
                
                </li>))}
              
</ul>

</GridItem>

    </GridContainer>
    </CardBody>
    </Card>

  );

};

export default Sections;