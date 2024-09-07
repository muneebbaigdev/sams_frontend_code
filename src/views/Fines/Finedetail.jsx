import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect, useRef} from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { apiaddress } from "auth/apiaddress";
import { postData } from "auth/datapost";

function getLastDateOfMonth2() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  let day = currentDate.getDate();

  // Add leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Concatenate the year, month, and day to get the desired format
  const todayDate = `${year}-${formattedMonth}-${formattedDay-1}`;

  return todayDate;
}


const FinesDetail = () => {
const {adn,sdate,ldate} = useParams()
const [student,setStudent] = useState([{admission_number:0,roll_no:0,student_full_name:'',class:'',section:''}]);
const [fine,setFine] = useState([]);
let totalfine = 0
const [selectedValue,setSelectedValue] = useState({admission_number:adn,sdate:sdate,ldate:ldate})
function reverseDateFormat(inputDate) {
    // Split the input date into an array with individual digits
    const dateArray = inputDate.split('');
  
    // Insert '-' at the appropriate positions to create the original format
    const outputDate = [
      dateArray.slice(0, 4).join(''),
      dateArray.slice(4, 6).join(''),
      dateArray.slice(6).join('')
    ].join('-');
  
    return outputDate;
  }
  function convertDateFormat(inputDate) {
    // Split the input date into an array
    const dateArray = inputDate.split('-');
  
    // Join the array elements to create the desired format
    const outputDate = dateArray.join('');
  
    return outputDate;
  }
const ApiCaller = async ()=>{

    try {
      
        const response1 = await postData(apiaddress+'/get-student-info',{value:{admission_number:adn}});
        setStudent(response1)
        const response2 = await postData(apiaddress+'/detailedfines',{admission_number:adn,sdate,ldate});
        setFine(response2);

    } catch (error) {
        console.log(error);
    }
    }

useEffect(()=>{
const maxi = async () => {
    await ApiCaller()
    const maxDate = getLastDateOfMonth2();
    document.getElementById('ldate').setAttribute('max', maxDate);
    document.getElementById('sdate').setAttribute('max', maxDate);
}
maxi()

},[])
const getColorForStatus = (status) => {
  switch (status) {
    case 'Present':
      return 'greenyellow';
    case 'Special Absent':
      return 'rgb(255,25,25)';
      case 'Regular Absent':
        return 'rgb(255,102,102)';
    case 'Leave':
      return 'rgb(4, 166, 253)';
    case 'Late':
      return 'rgba(253, 170, 4, 0.652)';
      case 'Consective 5 Absent':
        return 'rgb(255,25,25)';
    default:
      return 'rgba(0,0,0,0)';
  }
};

const countTotal = ()=>{
    let total = {fine:0}
    for(var count = 0; count<fine.length; count++){

      total.fine += fine[count].fine
  
    }
    return total;
  }

const totalf = countTotal()


    const handleDropdownChange = (event) => {
        setSelectedValue({
          admission_number:adn,
          sdate:convertDateFormat(document.getElementById('sdate').value),
          ldate:convertDateFormat(document.getElementById('ldate').value)
        
        });
      };

    return(
        <Card>
        <CardHeader color="primary">
          <h4>Fines List</h4>
        </CardHeader>
        <CardBody>
        <div className='a11'>
<GridContainer justify="center" alignItems="center" spacing={1}>

<GridItem xs={12} sm={4} md={2}>
<p className="viewdepname">{adn}</p>

</GridItem>

<GridItem xs={12} sm={4} md={2}>
<input disabled className="viewdepname" type="text" value={student[0].roll_no} onChange={handleDropdownChange}/>

</GridItem>

<GridItem xs={12} sm={4} md={2}>
<p className="viewdepname">{student[0].student_full_name}</p>

</GridItem>

<GridItem xs={12} sm={4} md={2}>
<p className="viewdepname">{student[0].class + ' ' + student[0].section}</p>

</GridItem>

<GridItem xs={12} sm={4} md={2}>
<input disabled className="viewdepname" type="date" id="sdate" value={reverseDateFormat(selectedValue.sdate)} onChange={handleDropdownChange} />

</GridItem>

<GridItem xs={12} sm={4} md={2}>
<input disabled className="viewdepname" type="date" id="ldate" value={reverseDateFormat(selectedValue.ldate)} onChange={handleDropdownChange}/>

</GridItem>

</GridContainer>
</div>

<GridContainer justify="center" alignItems="center" spacing={1}>

<GridItem xs={12} sm={12} md={12}>

<ul className='myulx'>
  <li className="mainli">
    <span  className="s1">Date</span>
    <span  className="s1">Day</span>
    <span  className="s1">Status</span>
    <span  className="s1">Fine Count</span>
  </li>
  {fine.map((fine) => (

<li
style={{ backgroundColor: getColorForStatus(fine.status)}}
id={fine.date.toString()} key={fine.date}>
    <span  className="s1">{fine.date}</span>
    <span  className="s1">{fine.day}</span>
    <span  className="s1">{fine.status}</span>
    <span  className="s1">{fine.fine}</span>
</li>


))}
<li className="lastli">
<span  className="s1">---</span>
    <span  className="s1">---</span>
    <span  className="s1">---</span>
    <span  className="s1">{totalf.fine}</span>
</li>

</ul>

</GridItem>

</GridContainer>
    </CardBody>
    </Card>

    )
}

export default FinesDetail;