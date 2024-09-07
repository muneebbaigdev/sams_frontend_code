import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { apiaddress } from "auth/apiaddress";
import { postData } from "auth/datapost";
function getFirstDateOfMonth() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = 1;

  // Add leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Concatenate the year, month, and day to get the desired format
  const firstDateOfMonth = `${year}${formattedMonth}${formattedDay}`;

  return firstDateOfMonth;
}
function getLastDateOfMonth() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  let day = currentDate.getDate();

  // Add leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Concatenate the year, month, and day to get the desired format
  const todayDate = `${year}${formattedMonth}${formattedDay}`;

  return todayDate;
}
function getLastDateOfMonth2() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  let day = currentDate.getDate();

  // Add leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Concatenate the year, month, and day to get the desired format
  const todayDate = `${year}-${formattedMonth}-${formattedDay}`;

  return todayDate;
}
function convertDateFormat(inputDate) {
  // Split the input date into an array
  const dateArray = inputDate.split("-");

  // Join the array elements to create the desired format
  const outputDate = dateArray.join("");

  return outputDate;
}
function reverseDateFormat(inputDate) {
  // Split the input date into an array with individual digits
  const dateArray = inputDate.split("");

  // Insert '-' at the appropriate positions to create the original format
  const outputDate = [
    dateArray.slice(0, 4).join(""),
    dateArray.slice(4, 6).join(""),
    dateArray.slice(6).join(""),
  ].join("-");

  return outputDate;
}

const Classfines = () => {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const user = localStorage.getItem("username");
  const [students, setData] = useState([]);
  const [count, setCount] = useState(0);
  const colorpick = (color) => {
    switch(color){
        case('odd'):
        return {backgroundColor:'white'}
        break;
    
        case('even'):
        return {backgroundColor:'rgba(233, 30, 99,.4)',border:'none'}
        break;
    
        case('total'):
        return {backgroundColor:'#00acc1',color:'white',fontWeight:'bold'}
        break;
        case('print'):
        return {backgroundColor:'#00acc1',color:'white',fontWeight:'bold',margin:'0 auto',height:'50px',width:'150px',border:'none',borderRadius:'5px',cursor:'pointer'}
        break;
    
        default:
        return {backgroundColor:'black'}
        break;
    }
    }
  const inside = 'even'
  const [selectedValue, setSelectedValue] = useState({
    classn: "",
    section: "",
    sdate: getFirstDateOfMonth(),
    ldate: getLastDateOfMonth(),
  });
  const [fine, setFine] = useState([
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
    { regurala: 0, speciala: 0, fine: 0 },
  ]);
  const countTotals = () => {
    let total = { regurala: 0, speciala: 0, fine: 0 };
    for (var count = 0; count < fine.length; count++) {
      total.regurala += fine[count].regurala;
      total.speciala += fine[count].speciala;
      total.fine += fine[count].fine;
    }
    return total;
  };
  let totals = countTotals();

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
      setTimeout(async () => {
        
        const response2 = await postData(apiaddress+'/get-students-list', {class1:res1[0].class,section1:res1[0].section});
        setData(response2)
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ApiCaller2();
  }, []);
  const ApiCaller3 = async (props) => {
    const vsx = document.getElementById('classn').value
    try {
        
        const response2 = await postData(apiaddress+'/get-students-list', {class1:classes[vsx].class,section1:classes[vsx].section});
        setData(response2)

    } catch (error) {
      console.log(error);
    }
  };
  const handlePrint = async () => {
    document.body.style.visibility = 'hidden'
    document.getElementById('mainfinediv').style.visibility = 'visible'
    window.print();
    
    document.body.style.visibility = 'visible'
    
    };


    const speci = async () => {

      try {
        let abc = await postData(apiaddress + "/allfines", {
          students: students,
          sdate: selectedValue.sdate,
          ldate: selectedValue.ldate,
        });
        setFine(abc);
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    async function getStudents() {
      try {
        setFine([
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
          { regurala: 0, speciala: 0, fine: 0 },
        ]);
        const maxDate = getLastDateOfMonth2();
        document.getElementById("ldate").setAttribute("max", maxDate);
        document.getElementById("sdate").setAttribute("max", maxDate);
        ApiCaller3();
      } catch (err) {
        console.log(err);
      }
    }
    getStudents();
  }, [selectedValue.classn, selectedValue.section]);

  const handleDropdownChange = async () => {
    try{
    const vsx = document.getElementById("classn").value
    setSelectedValue({
      classn: classes[vsx].class,
      section: classes[vsx].section,
      sdate: convertDateFormat(document.getElementById("sdate").value),
      ldate: convertDateFormat(document.getElementById("ldate").value),
    });
    await ApiCaller3();
  }catch (err){
    console.log(err)
  }
 

  
    

  };

  return (
    <div id="mainfinediv">
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Class and Students Wise Fines</h4>
      </CardHeader>
      <CardBody>
      <div className="a11">
        <GridContainer justify="center" alignItems="center" spacing={1}>

          <GridItem xs={12} sm={6} md={2}>
          <select className='viewdepname' id="classn" onChange={handleDropdownChange}>
        
        {classes.map((classes,count)=>(
                       <option value={count}>{classes.class} {classes.section}</option>
                     ))}
   
               </select>
          </GridItem>
{/* 
          <GridItem xs={12} sm={6} md={2}>
          <select className='viewdepname' id="section" value={selectedValue.section} onChange={handleDropdownChange}>
          {sections.map((sections)=>(
                        <option value={sections.section}>{sections.section}</option>
                      ))}
            </select>
          </GridItem> */}

          <GridItem xs={12} sm={6} md={2}>
            <input
              className="viewdepname"
              type="date"
              id="sdate"
              value={reverseDateFormat(selectedValue.sdate)}
              onChange={handleDropdownChange}
            />
          </GridItem>

          <GridItem xs={12} sm={6} md={2}>
            <input
              className="viewdepname"
              type="date"
              id="ldate"
              value={reverseDateFormat(selectedValue.ldate)}
              onChange={handleDropdownChange}
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={2}>
            <button
              onClick={speci}
              style={{ backgroundColor: "orange", color: "white",cursor:'pointer' }}
              className="viewdepname"
            >
              SHOW
            </button>
          </GridItem>

        </GridContainer>
      </div>
      <div className="subline">
      <GridContainer justify="center" alignItems="center" spacing={1}>
          <GridItem xs={12} sm={12} md={12}>
            <ul className="myul">
              <li>
                <span className="wd1">Admission Number</span>
                <span className="wd2">Student Name</span>
                <span className="wd3">Details</span>
                <span className="wd1">Regular Absent</span>
                <span className="wd1">Special Absent</span>
                <span className="wd3">Fine</span>
              </li>

              {students.map((student, count) => (

                <li key={student.admission_number}>
                  <span style={colorpick(inside)} className="wx1">{student.admission_number}</span>
                  <span style={colorpick(inside)} className="wx2">{student.student_full_name}</span>
                  <Link
                    to={
                      "/admin/finedetail/" +
                      student.admission_number +
                      "/" +
                      selectedValue.sdate +
                      "/" +
                      selectedValue.ldate +
                      ""
                    }
                  >
                    <span style={colorpick(inside)} className="wx3">Details</span>
                  </Link>
                  <span style={colorpick(inside)} className="wx1">{fine[count].regurala}</span>
                  <span style={colorpick(inside)} className="wx1">{fine[count].speciala}</span>
                  <span style={colorpick(inside)} className="wx3">{fine[count].fine}</span>
                </li>

              ))}

              <li>
                <span className="wv1">---</span>
                <span className="wv2">Total Absent's and Fine</span>
                <span className="wv3">---</span>
                <span className="wv1">{totals.regurala}</span>
                <span className="wv1">{totals.speciala}</span>
                <span className="wv3">{totals.fine}</span>
              </li>
            </ul>
          </GridItem>
      </GridContainer>
      </div>
      </CardBody>
    </Card>
    <button style={colorpick('print')} onClick={handlePrint}>Print</button>
    </div>
  );
};

export default Classfines;
