import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import dashboardRoutes from 'routes'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Switch from '@material-ui/core/Switch';
import CardFooter from 'components/Card/CardFooter';
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

const abc = (i) => {
  var delta = '';
  switch (i) {
    case 'pending':
      delta = 'red';
      break; 
    case 'dispatched':
      delta = 'green';
      break; 
    default:
      delta = 'black';
      break; 
  }
  return delta;
}
function Warningletters() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const user = localStorage.getItem("username");
  const [session,setsession] = useState([]);
  const [warningletters,setwarningletters] = useState([])


  const ApiCaller3 = async (classn,section,sessiont) => {

  const res5 = await postData(apiaddress+'/get-warning-letters',{classn,section,session:sessiont})
  setwarningletters(res5)

  }
  const ApiCaller2 = async (props) => {
    try {
      const res1 = await postData(apiaddress + "/get-special-classes", {
        number: user,
      });
      setClasses(res1);
      const res2 = await postData(apiaddress + "/get-special-sections", {
        number: user,
      });
      setSections(res2);
      const res3 = await postData(apiaddress + "/get-sessions", {
        number: user,
      });
      setsession(res3);
      await ApiCaller3(res1[0].class,res2[0].section,res3[0].session)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const hello = async () => {
      await ApiCaller2();
    }
    hello();

  }, []);
  const handleDropdownChange = async () => {
      const txa = document.getElementById("classn").value
      const tclass = classes[txa].class
      const tsection = classes[txa].section
      const tsession = document.getElementById("session").value
      ApiCaller3(tclass,tsection,tsession)

  };

   async function printDiv(name1,roll_no,warningtype) {
    console.log(name1,roll_no,warningtype)
    const result = await postData(apiaddress+'/warning-dispatched',{name1,roll_no,warningtype})
    if(result.error===true){
      Swal.fire({
        title: 'Error!',
        text: 'an error occurued',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      Swal.fire({
        title: 'WARNING LETTER DISPATCHED',
        text: 'RECORD ADDED',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      const txa = document.getElementById("classn").value
      const tclass = classes[txa].class
      const tsection = classes[txa].section
      const tsession = document.getElementById("session").value
      ApiCaller3(tclass,tsection,tsession)
    }   
    
    }



  return (
    <>
<div id="tohide">
<div className='a11'>
<GridContainer justify="center" alignItems="center">

<GridItem xs={12} sm={3} md={3}> 
<p className='viewdepname'>ICT DEPARTMENT</p>
</GridItem>

<GridItem xs={12} sm={3} md={3}>
<select className='viewdepname' id="session" onChange={handleDropdownChange}>
        
        {session.map((session)=>(
                       <option value={session.session}>{session.session}</option>
                     ))}
   
               </select>
</GridItem>

<GridItem xs={12} sm={3} md={3}>
<select className='viewdepname' id="classn" onChange={handleDropdownChange}>
        
        {classes.map((classes,count)=>(
                       <option value={count}>{classes.class} {classes.section}</option>
                     ))}
   
               </select>
</GridItem>

{/* <GridItem xs={12} sm={3} md={3}>
<select className='viewdepname' id="section" onChange={handleDropdownChange}>
          {sections.map((sections)=>(
                        <option value={sections.section}>{sections.section}</option>
                      ))}
            </select>
</GridItem> */}

</GridContainer>
</div>
<GridContainer justify="center" alignItems="center" spacing={1}>
<GridItem xs={12} sm={12} md={12}>   
<Card>
<CardBody>

<GridContainer justify="center" alignItems="center" spacing={1}>

{warningletters.map((letter)=>(

<GridItem xs={12} sm={6} md={4}>
<Card>
<CardHeader>
<div className="dummydiv">
<table>
  <tbody>
  <tr>
    <td>
    <p className='inlinep bgcolorblue'>Name</p>
    </td>
    <td><p className='datatext'>{letter.name}</p></td>
  </tr>
  <tr>
    <td>
    <p className='inlinep bgcolorblue'>Admission Number</p>
    </td>
    <td>
    <p className='datatext'>{letter.admission_number}</p>
    </td>
  </tr>
  <tr>
    <td>
    <p className='inlinep bgcolorblue'>Roll Number</p>
    </td>
    <td>
    <p className='datatext'>{letter.roll_no}</p>
    </td>
  </tr>
  <tr>
    <td>
    <p className='inlinep bgcolorblue'>Absents Count</p>
    </td>
    <td>
    <p className='datatext'>{letter.absent_count}</p>
    </td>
  </tr>
  <tr>
  <td>
  <p className='inlinep bgcolorblue'>Warning Type</p>
  </td>
  <td>
  <p className='datatext'>{letter.warningtype}</p>
  </td>
  </tr>
  <tr>
    <td>
    <p className='inlinep bgcolorblue'>Warning Status</p>
    </td>
    <td>
    <p className='datatext' style={{color:abc(letter.warning_status)}}>{letter.warning_status}</p>
    </td>
  </tr>
  </tbody>
</table>
<Button onClick={()=>{printDiv(letter.name,letter.roll_no,letter.warningtype)}} color="primary">Print & Dispatch</Button>


</div>
</CardHeader>
</Card>
</GridItem>

                     ))}




</GridContainer>

</CardBody>
</Card>
</GridItem>
</GridContainer>
</div>

</>
  )
}
export default Warningletters