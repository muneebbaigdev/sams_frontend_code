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
import { apiaddress } from 'auth/apiaddress';
import { postData } from 'auth/datapost';
import Swal from 'sweetalert2';
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

const DeleteStudent = () => {
  const classes = useStyles();
  const [students, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState({classn:'1st-year',section:'a'});
  const [classes1, setClasses] = useState([]);
  const user = localStorage.getItem('username')

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

const handleDeleteStudents = async (value) => {

  postData(apiaddress+'/delete-student',{value});
  Swal.fire({
    title: 'Student Deleted!',
    text: 'Do you want to continue',
    icon: 'warning',
    confirmButtonText: 'OK'
  })

  const response = await postData(apiaddress+'/get-students-list',{class1:classes1[document.getElementById('classn').value].class,section1:classes1[document.getElementById('classn').value].section});
  setData(response);

  
  };

useEffect(()=>{
ApiCaller();
},[])


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


</GridContainer>

<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Admission Number</TableCell>
            <TableCell align="right">Student Name</TableCell>
            <TableCell align="right">Delete</TableCell>

          </TableRow>
        </TableHead>

     <TableBody>


          {students.map((students) => (

            <TableRow key={students.admission_number}>

              <TableCell component="th" scope="row">{students.admission_number}</TableCell>
              <TableCell align="right">{students.student_full_name}</TableCell>
              <TableCell align="right"><button id='del_btn' className='deletebtn' onClick={() => handleDeleteStudents(students.admission_number)}>Delete</button></TableCell>

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

export default DeleteStudent
