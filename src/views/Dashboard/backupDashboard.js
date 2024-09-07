// export default function Dashboard() {
//   const [tstrength,setTStrength] = React.useState({strength:0})
//   const [tpresent,setPresent] = React.useState({present:0})
//   const [tabsent,setAbsent] = React.useState({absent:0})
//   const [tleave,setLeave] = React.useState({leaves:0})
//   const[lates,setlates] = React.useState({lates:0})
//   const[data,setData] = React.useState([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]])

import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import './dashboard.css'

const Dashboard = () => {

  async function postData(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      // console.log('Response:', responseData);
      return responseData;
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  const useStyles = makeStyles(styles);
  const [topdata,settopdata] = useState({tpresent:0,tabsent:0,tlate:0,tleave:0})
  const [presents,setpresents] = useState({firsta:0,firstb:0,seca:0,secb:0,thirda:0,thirdb:0})
  var lates = {firsta:0,firstb:0,seca:0,secb:0,thirda:0,thirdb:0}
  var absents = {firsta:0,firstb:0,seca:0,secb:0,thirda:0,thirdb:0}
 var kbs = {
    tpresent:15,
    tabsent:20,
    tleave:5,
    tlate:6}
    const ApiCaller = async ()=>{
    try{
//       const response0 = await axios.post('http://localhost:80/today-ict-strength', []);
//       setTStrength(response0.data)

      const response1 = await postData('http://localhost:80/today-ict-present', {hello:'true'});
      const response2 = await postData('http://localhost:80/today-ict-absent', {hello:'true'});
      const response3 = await postData('http://localhost:80/today-ict-leave', {hello:'true'});
      const response4 = await postData('http://localhost:80/today-ict-lates', {hello:'true'});
      settopdata({
        tpresent:response1.present,
        tabsent:response2.absent,
        tleave:response3.leaves,
        tlate:response4.lates})
      

      const response5 = await axios.post('http://localhost:80/dashboard-charts',{hello:'true'});
      const fa = response5.data[0]
      const fb = response5.data[1]
      const sa = response5.data[2]
      const sb = response5.data[3]
      const ta = response5.data[4]
      const tb = response5.data[5]
      setpresents({
        firsta:fa[1],
        firstb:fb[1],
        seca:sa[1],
        secb:sb[1],
        thirda:ta[1],
        thirdb:tb[1]
      })
      
      lates = {
        firsta:fa[4],
        firstb:fb[4],
        seca:sa[4],
        secb:sb[4],
        thirda:ta[4],
        thirdb:tb[4]
      }
      absents = {
        firsta:fa[2],
        firstb:fb[2],
        seca:sa[2],
        secb:sb[2],
        thirda:ta[2],
        thirdb:tb[2]
      }
      kbs = {
        tpresent:response1.present,
        tabsent:response2.absent,
        tleave:response3.leaves,
        tlate:response4.lates}

    }catch(err){
      console.log(err)
    }
    }
const renderDoughnutChart = () => {
  const ctx = document.getElementById("myDoughnutChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Present", "Absent", "Leave", "Late"],
      datasets: [
        {
          label: "Student Attendance",
          data: [kbs.tpresent,kbs.tabsent,kbs.tleave,kbs.tlate],
          backgroundColor: ["#00a40e", "red", "#00acc1", "orange"],
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: true,

    },
  });
};
const renderBarGraphLate = () => {
  const ctx = document.getElementById("myBarGraphLate").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["1st Year A", "1st Year B", "2nd Year A", "2nd Year B", "3rd Year A", "3rd Year B"],
      datasets: [
        {
          label: "Number of Late Students",
          data: [lates.firsta,lates.firstb,lates.seca,lates.secb,lates.thirda,lates.thirdb], // Sample data for late students in each class
          backgroundColor: "orange",
        },
      ]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });
};
const renderLineGraphAbsent = () => {
  const ctx = document.getElementById("myLineGraphAbsent").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["1st Year A", "1st Year B", "2nd Year A", "2nd Year B", "3rd Year A", "3rd Year B"],
      datasets: [
        {
          label: "Number of Absent Students",
          data: [absents.firsta,absents.firstb,absents.seca,absents.secb,absents.thirda,absents.thirdb], // Sample data for absent students in each class
          borderColor: "red",
          fill: false,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });
};

useEffect(() => {
  const fb = async()=>{
    try{
    await ApiCaller()
    setTimeout(() => {
      renderDoughnutChart()
      renderBarGraphLate()
      renderLineGraphAbsent()
    }, 200);


    }catch(err){
      console.log(err)
    }
  }
  fb();
}, []);



  return (
      <div className="dash_Main">
        <div className="Main_Line1">

          <canvas id="myDoughnutChart" className="chart"></canvas>
          <div className="capsule bbtt">
            <div className="BT" id="Present">
              <h4 className="BTST present" >Total Present</h4>
              <h2 className="BTST present" >{topdata.tpresent}</h2>
            </div>

            <div className="BT" id="Absent">
            <h4 className="BTST absent" >Total Absent</h4>
              <h2 className="BTST absent" >{topdata.tabsent}</h2>
            </div>

            <div className="BT" id="Leave">
            <h4 className="BTST leave" >Total Leave</h4>
              <h2 className="BTST leave" >{topdata.tleave}</h2>
            </div>

            <div className="BT" id="Late">
            <h4 className="BTST late" >Total Late</h4>
              <h2 className="BTST late" >{topdata.tlate}</h2>
            </div>
            </div>
        </div>
        <div className="Main_Line2">
          <canvas id="myBarGraphLate" className="Barchart"></canvas>
          <canvas id="myLineGraphAbsent" className="Linechart"></canvas>
        </div>
        <div className="block_text" id="Main_Line3">

        <div className="capsule2">

            <div className="BT">
              <h4 className="BTST present" id="bt" >1st-Year A</h4>
              <h2 className="BTST present" >{presents.firsta}</h2>
            </div>

            <div className="BT">
            <h4 className="BTST present" >1st-Year B</h4>
              <h2 className="BTST present" >{presents.firstb}</h2>
            </div>

            <div className="BT">
            <h4 className="BTST present" >2nd-Year A</h4>
              <h2 className="BTST present" >{presents.seca}</h2>
            </div>

            <div className="BT">
            <h4 className="BTST present" >2nd-Year B</h4>
              <h2 className="BTST present" >{presents.secb}</h2>
            </div>

            <div className="BT">
            <h4 className="BTST present" >3rd-Year A</h4>
              <h2 className="BTST present" >{presents.thirda}</h2>
            </div>

            <div className="BT">
            <h4 className="BTST present" >3rd-Year B</h4>
              <h2 className="BTST present" >{presents.thirdb}</h2>
            </div>


            </div>
            
          </div>
          </div>

  );
};

export default Dashboard;
