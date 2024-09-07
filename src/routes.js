/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import WarningIcon from '@material-ui/icons/Warning';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
// core components/views for RTL layout
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ApartmentIcon from '@material-ui/icons/Apartment'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Students from "views/Students/Students";
import Addstudent from "views/Students/Addstudent";
import Modifystudent from "views/Students/Modifystudent";
import DeleteStudent from "views/Students/DeleteStudent";
import Users from "views/Users/Users";
import Adduser from "views/Users/Adduser";
import Modifyuser from "views/Users/Modifyuser";
import Deleteuser from "views/Users/Deleteuser";
import Modifystu from "views/Students/Modifystu";
import Fines from "views/Fines/Fines";
import FinesDetail from "views/Fines/Finedetail";
import Classsections from "views/classsections/Classsections";
import Classes from "views/classsections/Classes";
import Sections from "views/classsections/Sections";
import Departments from "views/classsections/Departments";
import Shifts from "views/classsections/Shifts";
import Markattendance from "views/MarkAttendance/Markattendance";
import Randomattendance from "views/MarkAttendance/Randomattendance";
import Reports from "views/Reports/Reports";
import Viewattendance from "views/Viewattendance/Viewattendance";
import Todaydetail from "views/Dashboard/Todaydetail";
import Setpermissions from "views/Users/Setpermissions";
import Modifyuserform from "views/Users/Modifyuserform";
import Editpermissions from "views/Users/Editpermissions";
import Assignclasses from "views/Users/Assignclasses";
import Blockeddates from "views/Users/Blockeddates";
import Createsessions from "views/Users/Createsessions";
import StudentWiseReport from "views/Reports/StudentWiseReport";
import ClassWiseReports from "views/Reports/ClassWiseReports";
import DepartmentWiseReport from "views/Reports/DepartmentWiseReport";
import Warningletters from "views/warnings/Warningletters";
import Userlogs from "views/logs/Userlogs";
import DashboarddReport from "views/Dashboard/DashboarddReport";
import Classfines from "views/Fines/Classfines";
import Departmentfines from "views/Fines/Departmentfines";
import View from "views/Dashboard/View";
import Promotestudents from "views/Students/Promotestudents";

function getFormattedDate() {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const monthIndex = today.getMonth(); // January is 0!
    const month = months[monthIndex];
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
}

const dashboardRoutes = [
{path: "/view",name: "view",rtlName: "view",icon: Dashboard,component: View,visible:false,layout: "/admin"},
{path: "/dashboard",name: "Dashboard",rtlName: "dashboard",icon: Dashboard,component: DashboardPage,visible:true,layout: "/admin"},
{path: "/departmentondashboard",name: "Department Status View",rtlName: "departmentondashboard",icon: SupervisedUserCircleIcon,component: Dashboard,visible:false,layout: "/admin"},
{path: "/dashboardreport",name: "ICT DAILY STATE OF "+getFormattedDate(),rtlName: "dashboardreport",icon: Dashboard,component: DashboarddReport,visible:false,layout: "/admin"},
{path: "/todaydetail/:classn/:section",name: "Today Detail",rtlName: "todaydetail",icon: Dashboard,component: Todaydetail,visible:false,layout: "/admin"},
{path: "/markattendance",name: "Mark Attendance",rtlName: "MarkAttendance",icon: Person,component: Markattendance,visible:true,layout: "/admin"},
{path: "/randomattendance/:date",name: "Random Attendance",rtlName: "RandomAttendance",icon: Person,component: Randomattendance,visible:false,layout: "/admin"},
{path: "/markattendancebydate",name: "Mark Attendance By Date",rtlName: "MarkAttendancebydate",icon: Person,component: Markattendance,visible:false,layout: "/admin"},
{path: "/viewattendance",name: "View Attendance",rtlName: "ViewAttendance",icon: "content_paste",component: Viewattendance,visible:true,layout: "/admin"},
{path: "/reports",name: "Reports",rtlName: "Reports",icon: LibraryBooks,component: Reports,visible:true,layout: "/admin"},
{path: "/studentreport",name: "Student Report",rtlName: "studentreport",icon: LibraryBooks,component: StudentWiseReport,visible:false,layout: "/admin"},
{path: "/classreport",name: "Class Report",rtlName: "classreport",icon: LibraryBooks,component: ClassWiseReports,visible:false,layout: "/admin"},
{path: "/departmentreport",name: "Department Report",rtlName: "departmentreport",icon: LibraryBooks,component: DepartmentWiseReport,visible:false,layout: "/admin"},
{path: "/warningletters",name: "Warning Letters",rtlName: "warningletters",icon: WarningIcon,component: Warningletters,visible:true,layout: "/admin"},
{path: "/fines",name: "Fines",rtlName: "Fines",icon: MonetizationOnIcon,component: Fines,visible:true,layout: "/admin"},
{path: "/classfines",name: "Class Fines",rtlName: "classFines",icon: MonetizationOnIcon,component: Classfines,visible:false,layout: "/admin"},
{path: "/finedetail/:adn/:sdate/:ldate",name: "Fine Detail",rtlName: "Finedetail",icon: MonetizationOnIcon,component: FinesDetail,visible:false,layout: "/admin"},
{path: "/departmentfines",name: "Department Fines",rtlName: "departmentFines",icon: MonetizationOnIcon,component: Departmentfines,visible:false,layout: "/admin"},
{path: "/classes&sections",name: "Classes & Sections",rtlName: "Classes&Sections",icon: ApartmentIcon,component: Classsections,visible:true,layout: "/admin"},
{path: "/classes",name: "Classes",rtlName: "Classes",icon: ApartmentIcon,component: Classes,visible:false,layout: "/admin"},
{path: "/sections",name: "Sections",rtlName: "Sections",icon: ApartmentIcon,component: Sections,visible:false,layout: "/admin"},
{path: "/departments",name: "Departments",rtlName: "Departments",icon: ApartmentIcon,component: Departments,visible:false,layout: "/admin"},
{path: "/shifts",name: "Shifts",rtlName: "Shifts",icon: ApartmentIcon,component: Shifts,visible:false,layout: "/admin"},
{path: "/students",name: "Students",rtlName: "Students",icon: SupervisedUserCircleIcon,component: Students,visible:true,layout: "/admin"},
{path: "/addnewstudent",name: "Add Student",rtlName: "addstudent",icon: Dashboard,component: Addstudent,visible:false,layout: "/admin"},
{path: "/modifystudent",name: "Modify Student",rtlName: "modifystudent",icon: Dashboard,component: Modifystudent,visible:false,layout: "/admin"},
{path: "/modifystu/:admission_number/:roll_no/:student_full_name/:student_mobile_number/:father_full_name/:father_mobile_number/:joining_date/:email/:cnic/:department/:class1/:section/:shift/modify",name: "Modify Student",rtlName: "Modifystu",icon: Dashboard,component: Modifystu,visible:false,layout: "/admin"},
{path: "/deletestudent",name: "Delete Student",rtlName: "deletestudent",icon: Dashboard,component: DeleteStudent,visible:false,layout: "/admin"},
{path: "/promotestudents",name: "Promote Students",rtlName: "promotestudents",icon: SupervisedUserCircleIcon,component: Promotestudents,visible:false,layout: "/admin"},
{path: "/users",name: "Users",rtlName: "Users",icon: SupervisorAccountIcon,component: Users,visible:true,layout: "/admin"},
{path: "/adduser",name: "Add Employee",rtlName: "adduser",icon: Dashboard,component: Adduser,visible:false,layout: "/admin"},
{path: "/setpermissions/:employee_number/:employee_full_name/:employee_mobile_number/:father_full_name/:father_mobile_number/:joining_date/:email/:cnic/:password",name: "Set Employee Permissions",rtlName: "setemployeepermissions",icon: Dashboard,component: Setpermissions,visible:false,layout: "/admin"},
{path: "/modifyuser",name: "Modify Employee",rtlName: "modifyuser",icon: Dashboard,component: Modifyuser,visible:false,layout: "/admin"},
{path: "/modifyuserform/:employee_number/:employee_full_name/:employee_mobile_number/:father_full_name/:father_mobile_number/:joining_date/:email/:cnic/:password",name: "Modify User",rtlName: "modifyuserform",icon: Dashboard,component: Modifyuserform,visible:false,layout: "/admin"},
{path: "/editpermissions/:employee_number/:employee_full_name/:employee_mobile_number/:father_full_name/:father_mobile_number/:joining_date/:email/:cnic/:password",name: "Set Employee Permissions",rtlName: "setpermissions",icon: Dashboard,component: Editpermissions,visible:false,layout: "/admin"},
{path: "/deleteuser",name: "Delete Employee",rtlName: "deleteuser",icon: Dashboard,component: Deleteuser,visible:false,layout: "/admin"},
{path: "/assignclasses",name: "Assign Classes To Users",rtlName: "assignclasses",icon: Dashboard,component: Assignclasses,visible:false,layout: "/admin"},
{path: "/assignblockeddate",name: "Blocked Dates",rtlName: "blockeddates",icon: SupervisorAccountIcon,component: Blockeddates,visible:false,layout: "/admin"},
{path: "/createsessions",name: "Create Sessions",rtlName: "createsessions",icon: SupervisorAccountIcon,component: Createsessions,visible:false,layout: "/admin"},
{path: "/logs",name: "Logs",rtlName: "logs",icon: ImportContactsIcon,component: Userlogs,visible:true,layout: "/admin"},
{path: "/morning",name: "morning",rtlName: "morning",icon: ImportContactsIcon,component: Warningletters,visible:false,layout: "/admin"},
{path: "/evening",name: "evening",rtlName: "evening",icon: ImportContactsIcon,component: Warningletters,visible:false,layout: "/admin"},
];

export default dashboardRoutes;
