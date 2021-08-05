import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
// import {Link} from 'react-router-dom'


  class Logout extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null
      }

  }



  componentDidMount(){
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    
    this.setState({user:userId,userEmail:userEmail})
  }




    Logout= ()=>{
        firebase.auth().signOut();
    }

    render(){
        return(
          <div>
            
            <div className="center">
              <br/> <br/><br/>


              <div className='container'>
                
               <span style={{color:'blue', fontSize:'20px'}}><b>Welcome... </b> <span><b style={{color:'blue',marginLeft:'30px'}}>{this.state.userEmail}</b></span></span>
              </div>






  {/* card code from materialize css */}
  
   <div className="row container" style={{margin:'auto'}}>
    {/* <div className="col s12 m6"> */}
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Introduction</span>
          <p style={{textAlign:'left'}}>This online web based saftware is Prepared for small businesses. This mini software have three features; 
            <span><b><br/>1-Manage Accounts Payables and Receivables 
            <br/>2-Text Record other than Financial Transactions 
            <br/>3-UpLoad important Documents and get on demand.</b> </span>
            <br/>You can recored your business transactions relating to vendors and sellers and can get their account statements at any where in all over the world.
            <br/>You can Save your important business or personal documents (images,PDF etc) and can veiw/download on need at any where in all over the world. </p>
        </div>
      </div>
    {/* </div> */}
  </div>
  











                <br/>
                <button className="waves-effect waves-dark btn red" onClick={this.Logout}>Logout</button>
            </div>
            </div>
        )
    }


  }

export default Logout;