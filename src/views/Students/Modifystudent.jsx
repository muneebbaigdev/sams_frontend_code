import React,{useState,useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { apiaddress } from 'auth/apiaddress';
import { postData } from 'auth/datapost';
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

const Modifystudent = () => {
  const user = localStorage.getItem('username')
  const classes = useStyles();
  const [classes1, setClasses] = useState([]);
  const [students, setData] = useState([{
    admission_number:'',
    roll_no:'',
    student_full_name:'',
    student_mobile_number:'',
    father_full_name:'',
    father_mobile_number:'',
    joining_date:'',
    cnic:'',
    email:'',
    department:'',
    class1:'',
    section:'',
    shift:''
  }]);
  const [selectedValue, setSelectedValue] = useState({classn:'',section:''});

const ApiCaller = async () => {

    try {
      const res1 = await postData(apiaddress + "/get-special-classes", {number: user});
      setClasses(res1);
      const response = await postData(apiaddress+'/get-students-list',{class1:res1[0].class,section1:res1[0].section});
      setData(response);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
 
}

const handleDropdownChange = async (event) => {
const psd = document.getElementById('classn').value
 setSelectedValue({classn:classes1[psd].class,section:classes1[psd].section});
 const response = await postData(apiaddress+'/get-students-list',{class1:classes1[psd].class,section1:classes1[psd].section});
 setData(response);
};

useEffect(() => {

ApiCaller();

}, []);



return (
  <>
  <GridContainer>
  <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Delete Student</h4>
      </CardHeader>
      <CardBody>

    <GridContainer>

  <GridItem xs={12} sm={6} md={6}>
  <select className='myselectdropdown' id="classn" onChange={handleDropdownChange}>
        
        {classes1.map((classes,count)=>(
                       <option value={count}>{classes.class} {classes.section}</option>
                     ))}
   
               </select>
     </GridItem>
     {/* <GridItem xs={12} sm={6} md={6}>
 <select className='myselectdropdown' id="section" value={selectedValue.section} onChange={handleDropdownChange}>

 <option value="a">A</option>
 <option value="b">B</option>

 </select>

 </GridItem> */}

</GridContainer>

<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Admission Number</TableCell>
            <TableCell>Roll Number</TableCell>
            <TableCell align="right">Student Name</TableCell>
            <TableCell align="right">Modify Student</TableCell>

          </TableRow>
        </TableHead>

     <TableBody>


          {students.map((students) => (

            <TableRow key={students.admission_number}>

              <TableCell component="th" scope="row">{students.admission_number}</TableCell>
              <TableCell component="th" scope="row">{students.roll_no}</TableCell>
              <TableCell align="right">{students.student_full_name}</TableCell>
              <TableCell align="right">
              <Link to={'/admin/modifystu/'+students.admission_number+'/'+students.roll_no+'/'+students.student_full_name+'/'+students.student_mobile_number+'/'+students.father_full_name+'/'+students.father_mobile_number+'/'+students.joining_date+'/'+students.email+'/'+students.cnic+'/'+students.department+'/'+students.class+'/'+students.section+'/'+students.shift+'/modify'}>
                <button id='del_btn' className='deletebtn'>Modify Student</button>
                </Link>
              </TableCell>

            </TableRow>
          ))}
 

        </TableBody>
      </Table>
    </TableContainer>
      </CardBody>
    </Card>
  </GridItem>

</GridContainer>

      </>
);
}

export default Modifystudent
