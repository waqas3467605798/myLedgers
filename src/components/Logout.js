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
            <div className="center">
              <br/>
                <div style={{color:'green',textAlign:'center'}}><b> {this.state.userEmail}</b></div>
                <br/><br/><br/><br/>
                <button className="waves-effect waves-dark btn red" onClick={this.Logout}>Logout</button>
            </div>
        )
    }


  }

export default Logout;