import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CancelIcon from '@material-ui/icons/Cancel';
import { apiaddress } from 'auth/apiaddress';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { postData } from 'auth/datapost';
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

export default function Modifyuserform() {
  const {employee_number,employee_full_name,employee_mobile_number,father_full_name,father_mobile_number,joining_date,email,cnic,password} = useParams()

  const [permissions,setPermissions] = useState([])
  const usern = localStorage.getItem('username')


  let permissionsarray = []




const [formData, setFormData] = useState({
  employee_number,
  employee_full_name,
  employee_mobile_number,
  father_full_name,
  father_mobile_number,
  joining_date,
  email,
  cnic,
  password,
});

const handleInputChange = (e) => {

setFormData({
  employee_number:document.getElementById('Employee_number').value,
  employee_full_name:document.getElementById('Employee_full_name').value,
  employee_mobile_number:document.getElementById('Employee_mobile_number').value,
  father_full_name:document.getElementById('father_full_name').value,
  father_mobile_number:document.getElementById('father_mobile_number').value,
  joining_date:document.getElementById('joining_date').value,
  email:document.getElementById('email').value,
  cnic:document.getElementById('cnic').value,
  password:document.getElementById('password').value
})

};
const ApiCaller = async (props) => {

  try {
    const response = await postData(apiaddress+'/add-user',props);
    console.log(response);
    const getpermissions =await postData(apiaddress+'/get-permissions',{usern})
    setPermissions(getpermissions)
  } catch (error) {
    console.log(error);
  }

};
const handleSubmit = (e) => {

  e.preventDefault();
ApiCaller(formData);
  setFormData({
    employee_number:'',
    employee_full_name:'',
    employee_mobile_number:'',
    father_full_name:'',
    father_mobile_number:'',
    joining_date:'2024-09-01',
    email:'',
    cnic:'',
    password:''
  });



};

  const classes = useStyles();

  return (

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Modify Employee</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>


                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    
                    value = {formData.employee_number}
                    labelText="Employee Number"
                    id="Employee_number"
                    formControlProps={{
                      fullWidth: true,
                      disabled:true
                    }}
                    inputProps={{
                      type:'number',
                      onChange:handleInputChange
                    }}
                  />

                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                  value = {formData.employee_full_name}
                    labelText="Employee Full Name"
                    id="Employee_full_name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'text',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                  value = {formData.employee_mobile_number}
                    labelText="Employee Mobile Number"
                    id="Employee_mobile_number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'number',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                  value = {formData.father_full_name}
                    labelText="Father Full Name"
                    id="father_full_name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'text',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                  value = {formData.father_mobile_number}
                    labelText="Father Mobile Number"
                    id="father_mobile_number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'number',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                  value = {formData.joining_date}
                    labelText="Joining Date"
                    id="joining_date"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'date',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                  value = {formData.email}
                    labelText="E-mail"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'email',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                  value = {formData.cnic}
                    labelText="CNIC"
                    id="cnic"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'number',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                  value = {formData.password}
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:'text',
                      onChange:handleInputChange
                    }}
                  />
                </GridItem>




              </GridContainer>
            </CardBody>
            <CardFooter>
              <Link to={'/admin/editpermissions/'+formData.employee_number+'/'+formData.employee_full_name+'/'+formData.employee_mobile_number+'/'+formData.father_full_name+'/'+formData.father_mobile_number+'/'+formData.joining_date+'/'+formData.email+'/'+formData.cnic+'/'+formData.password}>
              <Button color="primary">Edit Permissions</Button>
              </Link>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>

  );
}
