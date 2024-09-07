import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { apiaddress } from 'auth/apiaddress';
import axios from 'axios';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Chart from 'chart.js';
import { postData } from 'auth/datapost';

function Todaydetail() {
    const {classn,section} = useParams()
    const [students, setStudents] = React.useState([{ admission_number: 1, roll_no: 1, student_full_name: 'hello', status1: 'p' }]);
    const [barData, setBarData] = React.useState([0, 0, 0, 0, 0]);

    const ApiCaller = async () => {
      try {
        const response = await postData(apiaddress+'/dashboard-chart-expanded', {classn, section});
        setBarData(response);

        const response2 = await postData(apiaddress+'/student-is-listing', {class1:classn, section1:section});
        setStudents(response2);

      } catch (err) {
        console.log(err);
      }
  
    };
  
    React.useEffect(() => {
      const Priority = async () =>{
        try{
          await ApiCaller();
        }catch (err){
          console.log(err)
        }
      }
      Priority()
      
    }, []);

    setTimeout(() => {
      const ctx = document.getElementById('myChart').getContext('2d');
      
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Strength","Present","Absent","Leave","Late"],
            datasets: [{
                label: classn+' '+section,
                data: barData,
                backgroundColor: [
                    '#ec407a',
                    '#00a40e',
                    'red',
                    '#00acc1',
                    'orange'
                ],
                borderColor: [
                  '#ec407a',
                  '#00a40e',
                  'red',
                  '#00acc1',
                  'orange'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
      });

      
      }, 200);


  return (
    <GridContainer>
   

   <GridItem xs={12} sm={12} md={12}>

     <Card chart>
       <CardHeader color="primary">
       <h4>Today Detail</h4>
       </CardHeader>
       <CardBody>
         
<GridContainer justify="center" alignItems="center" spacing={2}>
<GridItem xs={12} sm={8} md={6}>

<canvas id="myChart"/>

</GridItem>
<GridItem xs={12} sm={12} md={12}>
<ul className='myul'>
        <li className='fullwidth colorwhite' style={{backgroundColor:'red'}}>
        <span className='width30'>Roll No</span>
        <span className='width40'>Student Name</span>
        <span className='width30'>Today Status</span>
        </li>

        {students.map((student) => (
        <li className='fullwidth' key={student.admission_number}>
          <span className='width30'>{student.roll_no}</span>
          <span className='width40'>{student.student_full_name}</span>
          <span className='width30'>{student.status1}</span>
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

export default Todaydetail
