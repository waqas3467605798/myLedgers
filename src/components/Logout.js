import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
// import {Link} from 'react-router-dom'


  class Logout extends Component{



    Logout= ()=>{
        firebase.auth().signOut();
    }

    render(){
        return(
            <div className="center">
                    <br/><br/><br/><br/>
                <button className="waves-effect waves-dark btn red" onClick={this.Logout}>Logout</button>
            </div>
        )
    }


  }

export default Logout;