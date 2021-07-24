import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link} from 'react-router-dom'

  class Header extends Component{
      constructor(){
          super();
          this.state = {
            user:null,
            userEmail:null
            
          }
      }


      componentWillMount(){
        var userId = firebase.auth().currentUser.uid;
        var userEmail = firebase.auth().currentUser.email
        
        this.setState({user:userId,userEmail:userEmail})
      }
     


  render(){
    
    return (
    
    
    <div>
    
      <div id='div1'> 
      Khata Book
      </div>

      <div id='div2'>
     <Link to='/Content' style={{textDecoration:'none', marginRight:'22px'}}> Create Account</Link>
     <Link to='/' style={{textDecoration:'none', marginRight:'22px'}}> Data Entry </Link>
     <Link to='/Ledger' style={{textDecoration:'none', marginRight:'22px'}} > Account Statement </Link>
     <Link to='/Trial' style={{textDecoration:'none', marginRight:'22px'}} > Summary </Link>
     <Link to='/RecordBook' style={{textDecoration:'none', marginRight:'22px'}} > Record Book </Link>
     <Link to='/MyDocs' style={{textDecoration:'none', marginRight:'22px'}} > My Documents </Link>
     <Link to='/Logout' style={{textDecoration:'none', marginRight:'22px'}} > Logout </Link>
     
      </div>
      <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
    </div>
  );
}
}

export default Header;
