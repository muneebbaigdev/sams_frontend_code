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
function getFirstDateOfMonth(monthName, year) {
  // Create a mapping of month names to their corresponding numeric values
  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  // Get the numeric value of the input month name
  const month = monthMap[monthName];

  if (!month) {
    // Handle invalid month names
    throw new Error('Invalid month name');
  }

  // Get the day as 1
  const day = 1;

  // Add leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Concatenate the year, month, and day to get the desired format
  const firstDateOfMonth = `${year}${formattedMonth}${formattedDay}`;

  return firstDateOfMonth;
}
function getLastDateOfMonth(monthName, year) {
  // Create a mapping of month names to their corresponding numeric values
  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  // Get the numeric value of the input month name
  const month = monthMap[monthName];

  if (!month) {
    // Handle invalid month names
    throw new Error('Invalid month name');
  }

  // Get the last day of the input month
  const lastDayOfMonth = new Date(year, month, 0).getDate();

  // Add leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = lastDayOfMonth < 10 ? `0${lastDayOfMonth}` : lastDayOfMonth;

  // Concatenate the year, month, and last day to get the desired format
  const lastDateOfMonth = `${year}${formattedMonth}${formattedDay}`;

  return lastDateOfMonth;
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

const Departmentfines = () => {
  const [session,setsession] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const user = localStorage.getItem("username");
  const [classfines,setclassfines] = useState([{class1:'Class Name',section1:'Section',fine:'fine',style:'header'}])
  const [count, setCount] = useState(0);
  const [permissions,Setpermissions] = useState({morning:false,evening:false})

  const alphamonthts = [
    {monthname:'January',value:1},
    {monthname:'February',value:2},
    {monthname:'March',value:3},
    {monthname:'April',value:4},
    {monthname:'May',value:5},
    {monthname:'June',value:6},
    {monthname:'July',value:7},
    {monthname:'August',value:8},
    {monthname:'September',value:9},
    {monthname:'October',value:10},
    {monthname:'November',value:11},
    {monthname:'December',value:12},
    {monthname:'All Months',value:13}
  ]
  const colorpick = (color) => {
    switch(color){
        case('header'):
        return {backgroundColor:'#00acc1',color:'white',fontWeight:'bold',margin:'5px'}
        break;
    
        case('body'):
        return {backgroundColor:'rgba(233, 30, 99,.4)',border:'none',margin:'5px'}
        break;
    
        case('footer'):
        return {backgroundColor:'#00acc1',color:'white',fontWeight:'bold',margin:'5px'}
        break;

        case('span'):
        return {display:'inline-block',width:'30%'}
        break;

        case('print'):
        return {backgroundColor:'#00acc1',color:'white',fontWeight:'bold',margin:'0 auto',height:'50px',width:'150px',border:'none',borderRadius:'5px',cursor:'pointer'}
        break;
    
        default:
        return {backgroundColor:'black'}
        break;
    }
    }

  const [selectedValue, setSelectedValue] = useState({
    sdate: getFirstDateOfMonth('January','2024'),
    ldate: getLastDateOfMonth('January','2024'),
  });

  const ApiCaller2 = async (props) => {
    try {
      const res1 = await postData(apiaddress + "/get-special-classes", {
        number: user,
      });
      setClasses(res1);
      const res2 = await postData(apiaddress + "/get-special-sections", {
        number: user,
      });
      // const res4 = await postData(apiaddress + "/get-permissions",{usern:localStorage.getItem('username')})
      // const a = countStringOccurrences(res4,'morning')
      // const b = countStringOccurrences(res4, 'evening')
      // if(a === 1){

      //   Setpermissions(prevpermissions => ({ ...prevpermissions, morning:true }))
      // }
      // if(b === 1){
      //  Setpermissions(prevpermissions => ({ ...prevpermissions,evening:true}))
      // }
      setSections(res2);
      const res3 = await postData(apiaddress + "/get-sessions", {
        number: user,
      });
      setsession(res3);
      setTimeout(async () => {
        var totalfine = 0
        for(var t=0; t<res1.length; t++){
        const response2 = await postData(apiaddress+'/get-students-list', {class1:res1[t].class,section1:res1[t].section});
        const abc = await postData(apiaddress + "/allfines", {students: response2,sdate: selectedValue.sdate,ldate: selectedValue.ldate,});
        const fineofclass = 0
        for(var l=0; l<abc.length; l++){
          fineofclass = fineofclass + abc[l].fine
        }
        totalfine = totalfine+fineofclass
        setclassfines(prevClassfines => [
          ...prevClassfines,
          { class1: res1[t].class, section1: res1[t].section, fine: fineofclass,style:'body' }
        ]);

      }

      setclassfines(prevClassfines => [
        ...prevClassfines,
        { class1: 'Total Fine', section1: '', fine: totalfine,style:'footer' }
      ]);

      }, 100);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    ApiCaller2();
  }, []);
  const ApiCaller3 = async (c,d) => {
    try {
        setclassfines([{class1:'Class Name',section1:'Section',fine:'fine',style:'header'}])

        var totalfine = 0

        for(var t=0; t<classes.length; t++){
        const response2 = await postData(apiaddress+'/get-students-list', {class1:classes[t].class,section1:classes[t].section});
        const abc = await postData(apiaddress + "/allfines", {students: response2,sdate: c,ldate: d});
        const fineofclass = 0
        for(var l=0; l<abc.length; l++){
          fineofclass = fineofclass + abc[l].fine
        }
        totalfine = totalfine+fineofclass
        setclassfines(prevClassfines => [
          ...prevClassfines,
          { class1: classes[t].class, section1: classes[t].section, fine: fineofclass,style:'body' }
        ]);

      }


      setclassfines(prevClassfines => [
        ...prevClassfines,
        { class1: 'Total Fine', section1: '', fine: totalfine,style:'footer' }
      ]);


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

  const handleDropdownChange = async () => {
    var a = document.getElementById('session').value
    var b = document.getElementById('months').value
if (b != 'All Months'){
    var c = getFirstDateOfMonth(b,a)
    var d = getLastDateOfMonth(b,a)
    setSelectedValue({
      sdate: convertDateFormat(c),
      ldate: convertDateFormat(d),
    });
    ApiCaller3(c,d);
  }else if(b === 'All Months'){

    const sandldate = await postData(apiaddress+'/get-sessions',{data:'abcd'})
    for(var x=0; x<sandldate.length; x++){
        if(a === (sandldate[x].session).toString()){
            var m = convertDateFormat(sandldate[x].startdate,document.getElementById('session').value)
            var n = convertDateFormat(sandldate[x].enddate,document.getElementById('session').value)
            setSelectedValue({
              sdate: m,
              ldate: n,
            });
            ApiCaller3(m,n);
        }
    }

  }
    



  };

  return (
    <>
    <div id="mainfinediv">
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Department Fines</h4>
      </CardHeader>
      <CardBody>
      <div className="a11">
        <GridContainer justify="center" alignItems="center" spacing={1}>
        <GridItem xs={12} sm={6} md={2}>
<p style={{color:'white',fontWeight:'bold'}}>ICT Department</p>

          </GridItem>
          {/* <GridItem xs={12} sm={6} md={2}>

<select className='viewdepname' id="shift">
  {permissions.morning?(
<option value="morning">Morning</option>
):('')}
  {permissions.evening?(
<option value="evening">Evening</option>
):('')}
</select>

          </GridItem> */}
        <GridItem xs={12} sm={6} md={2}>
          <select className='viewdepname' id="session" onChange={handleDropdownChange}>
                              {session.map((session)=>(
                       <option value={session.session}>{session.session}</option>
                     ))}

   
               </select>

        </GridItem>

          <GridItem xs={12} sm={6} md={2}>

                      <select className='viewdepname' id="months" onChange={handleDropdownChange}>
          {alphamonthts.map((alpha)=>(
                        <option value={alpha.monthname}>{alpha.monthname}</option>
                      ))}
            </select>
          </GridItem>

          <GridItem xs={12} sm={6} md={2}>
            <input
              className="viewdepname"
              type="date"
              id="sdate"
              value={reverseDateFormat(selectedValue.sdate)}
              disabled={true}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={2}>

            <input
              className="viewdepname"
              type="date"
              id="ldate"
              value={reverseDateFormat(selectedValue.ldate)}
              disabled={true}
            />



          </GridItem>

        </GridContainer>
      </div>

      <div className="subline">
      <GridContainer justify="center" alignItems="center" spacing={1}>
          <GridItem xs={12} sm={12} md={12}>
            <ul className="myul">

              {classfines.map((finex) => (
                <li style={colorpick(finex.style)}>
                  <span style={colorpick('span')}>{finex.class1}</span>
                  <span style={colorpick('span')}>{finex.section1}</span>
                  <span style={colorpick('span')}>{finex.fine}</span>
                </li>
              ))}

            </ul>
          </GridItem>
      </GridContainer>
      </div>
      </CardBody>
    </Card>
  
    </div>
    <button style={colorpick('print')} onClick={handlePrint}>Print</button>
    </>
  );
};

export default Departmentfines;
