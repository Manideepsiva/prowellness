import React from 'react';
import ReactDOM from 'react-dom/client';
import 'core-js'
import ClientAppointmentDashcomp from './components/app-client-dashcompleted'; 
import ClientAppointmentDash from './components/appoint-client-dash';
import HospitalForm from './components/hospitalRegistration';
import Adminlogin from './components/adminlogin';
import Hospitallogin from './components/hospitallogin';
import Hospitalcompleted from './components/hospitaladmincompleted';
import { CSpinner } from '@coreui/react';
import Hospitaldefault from './components/hospitaldefault';
import HospitalDashboard from './components/hospitaladmindash';
import ClientAppointmentDashtoday from './components/app-client-dashtoday';
import ManageHospitalRequests from './components/adminhospitalrequests';
import DefaultLayout from './components/DefaultLayout';
import Dashboard from "./components/Dashboard" 
import ManageClients from './components/adminmanageusers';
import App from './App';
import DiagnosticTests from './components/hospitaladminedittest';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,redirect,RouterProvider,useNavigate,Navigate} from 'react-router-dom';
import Hoempage from './components/homepage';
import Auth from './components/authpage';
import Login from './components/login';
import Register from './components/register';
import Showerror from './components/showerror';
import ManageHospitals from './components/adminmanagehospital';
import './scss/style.scss';
import Clientdashboard from './components/client-dashboard';
import clientstyle from './assets/css/style.module.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store,{persistor} from "./store"
import Hospitalonging from './components/hospitaladminongoing';
import Hospitalavailableseetests from './components/hospitalseetestsavailable';
import Hospitaladminupcoming from './components/hospitaladminupcoming';
import {setNotification} from "./slices/booktestslice"
import { setPatientName,
  setGender,
  setEmail,
  setPhoneNo,
  setArea,
  setCity,
  setPatState,
  setPostalCode,
  setAppDate,
  setSlot,
  setAdditionalInfo, } from './slices/patientDetailsSlice';


import Clientshowrates from './components/client-showrates';
import Manageappointments from "./components/adminmanageappointments"
import Appointmentclient from './components/Appointment-client';
import Appointmentpayment from './components/Appointment-payment';
import Clientsearchorgans from './components/client-seachbyorgans';
import emailvalidator from 'validator'
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/newforgotpassword';
import WelcomePage from './components/landingpage';




const logout = ()=>{
  localStorage.removeItem('token');
  return redirect("/login");

}
const checkauth = async () => {
  const token = window.localStorage.getItem('token');
  if (!token) {
    return { isAuthenticated: false, role: null };
  }

  const response = await fetch('https://prowellness-liart.vercel.app/api/verify-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 403) {
    return { isAuthenticated: false, role: null };
  }

  if (!response.ok) {
    return { isAuthenticated: false, role: null };
  }

  const data = await response.json(); // Assuming the response contains user data
  return { isAuthenticated: true, role: data.role }; // Adjust based on your API response structure
}


const router = createBrowserRouter([{
  path:"/",
  loader: async () => {
    const { isAuthenticated, role } = await checkauth();
    
    if (isAuthenticated) {
      if (role === 'user') {
        return redirect("/authpage");
      } else if (role === 'hospitaluser') {
        return redirect("/hospitaladmin/dashboard");
      } else if (role === 'admin') {
        return redirect("/admin/dashboard");
      }
    }
    return null; // User is not authenticated, allow them to stay on the login page
  },
  element:<WelcomePage/>,
 
  
},

{  path:'/register',
   element:<Register />,
   loader:async ()=>
    {const {isAuthenticated} = await checkauth();
      if(isAuthenticated) return redirect("/authpage"); 
      return null
    },
   action:async ({request})=>{

    const formdata = await request.formData();
    const usermail = formdata.get("loginId");
    const password = formdata.get("password");
    const username = formdata.get("username");
    const age = formdata.get("age");
    
    
    if (!emailvalidator.isEmail(usermail)) {
      return redirect('/register?message=Invalid%20email%20format');
    }

    // Password validation
    const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
    if (!passwordRegex.test(password) || /\s/.test(password)) {
      return redirect('/register?message=Password%20must%20be%20at%20least%208%20characters,%20alphanumeric,%20and%20contain%20no%20spaces');
    }

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
    if (!usernameRegex.test(username) || /\s/.test(username)) {
      return redirect('/register?message=Username%20must%20be%20at%20least%204%20characters%20and%20contain%20no%20spaces');
    }

    // Age validation
    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || ageNumber < 18 || ageNumber > 100) {
      return redirect('/register?message=Age%20must%20be%20a%20number%20between%2018%20and%20100');
    }



    const response = await fetch('https://prowellness-liart.vercel.app/api/register', {
      method: 'POST',
      body: JSON.stringify({ usermail, password,username,age }),
      headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok){
      return redirect('/login')
    }else{
      console.log("helo there");
      return redirect('/register?message=User%20already%20exists');
    }


   }

},
{
path :'/login',
element:<Login  />,
loader: async () => {
  const { isAuthenticated, role } = await checkauth();
  
  if (isAuthenticated) {
    if (role === 'user') {
      return redirect("/authpage");
    } else if (role === 'hospitaluser') {
      return redirect("/hospitaladmin/dashboard");
    } else if (role === 'admin') {
      return redirect("/admin/dashboard");
    }
  }
  return null; 
},
action : async({request})=>{
  const formdata = await request.formData();
  const usermail = formdata.get('loginId');
  const password = formdata.get('password');

  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!emailRegex.test(usermail)) {
      return redirect('/login?message=Invalid%20email%20format');
    }



  const response = await fetch("https://prowellness-liart.vercel.app/api/login",{
    method:'POST',
    body:JSON.stringify({usermail,password}),
    headers:{'Content-Type':'application/json'},

  });
  if(response.ok){
    const data = await response.json();
     window.localStorage.setItem('token',data.token);
     return redirect('/authpage');

  }
  return redirect('/login?message=invalid%20credentials');
  

}
},
{
   path:'/forgotpass',
   element:<ForgotPassword/>


},
{
  path:'/resetpassword',
  element:<ResetPassword/>

},



{
  path :'/hospitallogin',
  element:<Hospitallogin />,
  loader: async () => {
    const { isAuthenticated, role } = await checkauth();
    
    if (isAuthenticated) {
      if (role === 'user') {
        return redirect("/authpage");
      } else if (role === 'hospitaluser') {
        return redirect("/hospitaladmin/dashboard");
      } else if (role === 'admin') {
        return redirect("/admin/dashboard");
      }
    }
    return null; 
  },
  action : async({request})=>{
    const formdata = await request.formData();
    const usermail = formdata.get('loginId');
    const password = formdata.get('password');
    const response = await fetch("https://prowellness-liart.vercel.app/api/hospitallogin",{
      method:'POST',
      body:JSON.stringify({usermail,password}),
      headers:{'Content-Type':'application/json'},
  
    });
    if(response.ok){
      const data = await response.json();
       window.localStorage.setItem('token',data.token);
       return redirect('/hospitaladmin/dashboard');
  
    }
    return redirect('/hospitallogin?message=invalid%20credentials');
    
  
  }
  },
  {path:"/hospitalregistration",
    element:<HospitalForm/>,
    action:async ({ request }) =>{
      const formData = await request.formData();

  const hospitalName = formData.get('hospitalName');
  const phone = formData.get('phone');
  const email = formData.get('email');
  const address = formData.get('address');
  const state = formData.get('state');
  const district = formData.get('district');

  // Validation logic
  const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // General email format
  const hospitalNameRegex = /^[a-zA-Z0-9\s]+$/; // Alphanumeric (letters, numbers, and spaces)

  if (!hospitalName || !hospitalNameRegex.test(hospitalName)) {
    return redirect('/hospitalregistration?message=Invalid%20hospital%20name');
  }

  if (!phone || !phoneRegex.test(phone)) {
    return redirect('/hospitalregistration?message=Invalid%20phone%20number');
  }

  if (!email || !emailRegex.test(email)) {
    return redirect('/hospitalregistration?message=Invalid%20email%20address');
  }

  // If validation passes, prepare the data for submission
  const data = new FormData();
  data.append('hospitalName', hospitalName);
  data.append('phone', phone);
  data.append('email', email);
  data.append('address', address);
  data.append('state', state);
  data.append('district', district);

  for (let i = 1; i <= 4; i++) {
    const doc = formData.get(`document${i}`);
    if (doc) {
      data.append(`document${i}`, doc);
    }
  }

  // Submit data
  const response = await fetch('https://prowellness-liart.vercel.app/api/hospitalregistration', {
    method: 'POST',
    body: data,
  });

  if (response.ok) {
    return redirect('/'); // Redirect after successful submission
  } else {
    return redirect('/hospitalregistration?message=Submission%20failed');
  }
    }

  },



  {
    path :'/adminlogin',
    element:<Adminlogin />,
    loader: async () => {
      const { isAuthenticated, role } = await checkauth();
      console.log("inside loader of admin",isAuthenticated,role)
      
      
      if (isAuthenticated) {
        if (role === 'user') {
          return redirect("/authpage");
        } else if (role === 'hospitaluser') {
          return redirect("/hospitaladmin/dashboard");
        } else if (role === 'admin') {
          return redirect("/admin/dashboard");
        }
      }
      return null; 
    },
    action : async({request})=>{
      const formdata = await request.formData();
      const usermail = formdata.get('loginId');
      const password = formdata.get('password');
      const response = await fetch("https://prowellness-liart.vercel.app/api/adminlogin",{
        method:'POST',
        body:JSON.stringify({usermail,password}),
        headers:{'Content-Type':'application/json'},
    
      });
      console.log("inside admin logn")
      if(response.ok){
        console.log("resposnse ok")
        const data = await response.json();
         window.localStorage.setItem('token',data.token);
         return redirect('/admin/dashboard');
    
      }
      console.log("resposnse not ok redirect")
      return redirect('/adminlogin?message=invalid%20credentials');
      
    
    }
    },




{
  path :'/authpage',
  element:<Clientdashboard/>,
  loader:async ()=>{
    const {isAuthenticated,role } = await checkauth();
    if (!isAuthenticated || role !== 'user') return redirect("/");
    const token = window.localStorage.getItem('token');
   
    return "hello";
    

  },
  children:[
    {}
  ]
},
{
  path:'/logout',
  loader :async()=>{
    logout();
    return redirect('/');
  }
},{

  path :'/authpage/showrates',
  element:<Clientshowrates/>,
  loader:async ()=>{
    const {isAuthenticated,role } = await checkauth();
    if (!isAuthenticated || role !== 'user') return redirect("/");
    const token = window.localStorage.getItem('token');
   
    return "hello";
    

  }
},
{
    path:"/authpage/appointmentsdashboard/upcoming",
    element:<ClientAppointmentDash/>,
    loader:async ()=>{
      const {isAuthenticated,role } = await checkauth();
      if (!isAuthenticated || role !== 'user') return redirect("/");
      const token = window.localStorage.getItem('token');
     
      return "hello";
      
  
    }



},
{
  path:"/authpage/appointmentsdashboard/completed",
  element:<ClientAppointmentDashcomp/>,
  loader:async ()=>{
    const {isAuthenticated,role } = await checkauth();
    if (!isAuthenticated || role !== 'user') return redirect("/");
    const token = window.localStorage.getItem('token');
   
    return "hello";
    

  }



},


{
  path:"/authpage/appointmentsdashboard/today",
  element:<ClientAppointmentDashtoday/>,
  loader:async ()=>{
    const {isAuthenticated,role } = await checkauth();
    if (!isAuthenticated || role !== 'user') return redirect("/");
    const token = window.localStorage.getItem('token');
   
    return "hello";
    

  }



},
{
  path:"/authpage/searchbyorgans",
  element:<Clientsearchorgans/>,
  loader:async ()=>{
    const {isAuthenticated,role } = await checkauth();
    if (!isAuthenticated || role !== 'user') return redirect("/");
    const token = window.localStorage.getItem('token');
   
    return "hello";
    

  }



},

{
  path : '/authpage/showrates/book',
  element:<Appointmentclient/>,
  loader:async ()=>{
    const {isAuthenticated,role } = await checkauth();
    if (!isAuthenticated || role !== 'user') return redirect("/");
    const token = window.localStorage.getItem('token');
   
    return "hello";
    

  },
  action:async({request})=>{
    const formData = await request.formData();

    const patientName = formData.get('name');
    const gender = formData.get('gender');
    const email = formData.get('email');
    const phoneNo = formData.get('phone');
    const area = formData.get('area');
    const city = formData.get('city');
    const patstate = formData.get('state');
    const postalcode = formData.get('postalCode');
    const appdate = formData.get('date');
    const slot = formData.get('time');
    const additionalinfo = formData.get('message');
    store.dispatch(setPatientName(patientName));
    store.dispatch(setGender(gender));
    store.dispatch(setEmail(email));
    store.dispatch(setPhoneNo(phoneNo));
    store.dispatch(setArea(area))
    store.dispatch(setCity(city));
    store.dispatch(setPatState(patstate));
    store.dispatch(setPostalCode(postalcode));
    store.dispatch(setAppDate(appdate));
    store.dispatch(setSlot(slot));
    store.dispatch(setAdditionalInfo(additionalinfo));
    return redirect('/authpage/showrates/book/payment');
    ;


  }
},{

path:'/authpage/showrates/book/payment',
element:<Appointmentpayment/>,
loader:async ()=>{
  const {isAuthenticated,role } = await checkauth();
  if (!isAuthenticated || role !== 'user') return redirect("/");
  const token = window.localStorage.getItem('token');
 
  return "hello";
  

}



}

,{
  
    path: "/admin",
    element: <DefaultLayout />,
    loader: async () => {
      const { isAuthenticated, role } = await checkauth();
      if (!isAuthenticated || role !== 'admin') return redirect("/");
      return null;
    },
    
    children: [
      {
        path: "dashboard",
        element:<Dashboard/>, 
      },
      {
        path: "manageusers",
        element: <ManageClients />,

      },
      {

        path:"managehospitaladmins",
        element: <ManageHospitals />
      },
      {
        path:"hospitalrequests",
        element:<ManageHospitalRequests/>
      },
      {
        path:"manageappointments",
        element:<Manageappointments/>
      }
     
    ],
  
},{

  path:"/hospitaladmin",
  element:<Hospitaldefault/>,
  loader: async () => {
    const { isAuthenticated, role } = await checkauth();
    if (!isAuthenticated || role !== 'hospitaluser') return redirect("/");
    return null;
  },
  children: [
    {
      path: "dashboard",
      element: <HospitalDashboard />, // Render Dashboard here
    
      
    },
    {
      path:"edittest",
      element:<DiagnosticTests/>
    },{
      path:"upcomingtests",
      element:<Hospitaladminupcoming/>

    },{
      path:"ongoing",
      element:<Hospitalonging/>


    },{
      path:"completed",
      element:<Hospitalcompleted/>
    },
    {
      path:"diagnostictests",
      element:<Hospitalavailableseetests/>
    }
   
   
  ],





    
}

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>  
    <PersistGate loading={null} persistor={persistor}>
  <RouterProvider router={router} />
  </PersistGate>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
