import react, {Component} from 'react'
import '../App.css';
// import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'
import App from '../App'



//This Component is made to show the all App you made
class Login extends Component{
    constructor(){
        super();
        this.state ={
                user:null
        }

    }


    componentDidMount(){
        this.authListener();
        
        }
        
        authListener = ()=>{
        firebase.auth().onAuthStateChanged( (user)=>{
            if(user){
                this.setState({user})
                // console.log(user.email)
        
        
            } else {
                this.setState({user:null})
            }
        })
        }

    render(){
        return(
        <div>

{this.state.user ? (<App/>) : <LoginForm/>}

        </div>
        )
    }
}

export default Login;









//THis Component is made to login by the user (it is login form)
class LoginForm extends Component{

    signin = ()=>{
     const email = document.querySelector('#email').value;
     const password = document.querySelector('#password').value;
     
 
 
 
     firebase.auth().signInWithEmailAndPassword(email, password)
     .then( (u)=>{
 
         // console.log(u.user.uid)
         // console.log(u)
         
     } )
     .catch( (err)=>{
         alert('Your Password is incorrect or you are not registered.')
         console.log('error')
     } )
 
    } 
 
 
     render(){
         return (
             <div>
 
 <div id='div1'> 
      Accounts Payable/Receivable Management System
      </div>
<br/><br/><br/>
             <div className="row">
             <div className="col s12">
              
              
              
               <div className="input-field">
              <input placeholder="Email" id="email" type="text" className="validate" />
              {/* <label forhtml="first_name">First Name</label> */}
               </div>
 
               <div className="input-field">
              <input placeholder="Password" id="password" type="password" className="validate" />
              {/* <label forhtml="first_name">First Name</label> */}
               </div>
 
               <button className="waves-effect btn-large" onClick={this.signin}>Login</button>
              </div>
              </div>
 


              <br/><br/>
<div className='bottomLine'> 
Prepared By: Waqas Saleem <br/>
Accounts Payable/Receivable Management System<br/>
Contact: 0346-7605798 Email: waqas_mba86@yahoo.com
</div>


             </div>
         )
     }
 }

