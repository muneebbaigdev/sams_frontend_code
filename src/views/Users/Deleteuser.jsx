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

const Deleteuser = () => {
  const classes = useStyles();
  const [users, setData] = useState([]);



const ApiCaller = async () => {

    try {
      const response = await postData(apiaddress+'/get-users-list',{});
      setData(response);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
 
}
const handleDropdownChange = (event) => {
 //setSelectedValue({classn:document.getElementById('classn').value,section:document.getElementById('section').value});
};
const handleDeleteUsers = async (value) => {

  await postData(apiaddress+'/delete-user',{username:value});
  Swal.fire({
    title: 'USER DELETED!',
    text: 'Do you want to continue',
    icon: 'warning',
    confirmButtonText: 'OK'
  })
  await ApiCaller()
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
        <h4 className={classes.cardTitleWhite}>Delete Users</h4>
      </CardHeader>
      <CardBody>


<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee Number</TableCell>
            <TableCell align="right">Employee Name</TableCell>
            <TableCell align="right">Delete</TableCell>

          </TableRow>
        </TableHead>

     <TableBody>


          {users.map((user) => (

            <TableRow key={user.employee_number}>

              <TableCell component="th" scope="row">{user.employee_number}</TableCell>
              <TableCell align="right">{user.employee_full_name}</TableCell>
              <TableCell align="right"><button id='del_btn' className='deletebtn' onClick={() => handleDeleteUsers(user.employee_number)}>Delete</button></TableCell>

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

export default Deleteuser
