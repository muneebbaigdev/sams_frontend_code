import React, { useEffect } from 'react'
import { createContext, useContext, useState } from "react"
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { publicroutes,privateroutes } from './navigation';
import { apiaddress } from './apiaddress';
import Setpermissions from 'views/Users/Setpermissions';
import { string } from 'prop-types';
import { hashit, postData } from './datapost';
const AuthContext = createContext();


export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {

     

     const [ user, setUser ] = useState({name: "", isAuthenticated: false})
     const [permissions,setPermissions] = useState([])


     const login = async (userName, password) => {
     const token = hashit(userName,password)
     return new Promise(async (resolve, reject) => {

     const getdata = await postData(apiaddress+'/match-user',{userName:token})

     if (userName === getdata.employee_number & token === getdata.emp_token) {
     localStorage.setItem('user',getdata.employee_full_name)
     localStorage.setItem('username',getdata.emp_token)
     setUser({name: userName, isAuthenticated: true})
     const getpermissions = await postData(apiaddress+'/get-permissions',{usern:getdata.emp_token,token:getdata.emp_token})
     setPermissions(getpermissions)

     resolve("success")
     } else {
     reject("Incorrect username or password")

     }
     })


     }

     const logout = () => {

     setUser({...user, isAuthenticated: false})
     localStorage.setItem('user','null')
     localStorage.setItem('username','null')
     }

     const getperm = async () => {

     const usern = localStorage.getItem('username')
     const getpermissions = await postData(apiaddress+'/get-permissions',{usern,token:usern})
     setPermissions(getpermissions)

     }
     useEffect(()=>{
     getperm()
     },[])



if(typeof(localStorage.getItem('username')) === 'object' | localStorage.getItem('username')==='null'){
     return (
          <AuthContext.Provider value={{user, login, logout}}>
               <Switch>

               {publicroutes}
              
               </Switch>
         </AuthContext.Provider>

)  

}else if(localStorage.getItem('username').length === 64){
 
return (
     <AuthContext.Provider value={{user,permissions, login, logout}}>
          <Switch>
       
          {privateroutes}
     
          </Switch>
    </AuthContext.Provider>

)

}
// else{

//      return (
//           <AuthContext.Provider value={{user, login, logout}}>
//                <Switch>

//                {publicroutes}
              
//                </Switch>
//          </AuthContext.Provider>

// ) 
// }

}



