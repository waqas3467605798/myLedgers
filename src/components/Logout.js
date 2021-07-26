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



  componentWillMount(){
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
            <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
            <div className="center">
              <br/>
                {/* <div style={{color:'green'}}><b> {this.state.userEmail}</b></div> */}
                <br/><br/>
                <button className="waves-effect waves-dark btn red" onClick={this.Logout}>Logout</button>
            </div>
            </div>
        )
    }


  }

export default Logout;