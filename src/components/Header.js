import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link} from 'react-router-dom'

  class Header extends Component{
      constructor(){
          super();
          this.state = {
            
          }
      }



     


  render(){
    
    return (
    
    
    <div>
    
      <div id='div1'> 
      Accounts Payable/Receivable Management System
      </div>


      <div id='div2'>
     <Link to='/Content' style={{textDecoration:'none', marginRight:'22px'}}> Create Account</Link>
     <Link to='/' style={{textDecoration:'none', marginRight:'22px'}}> Data Entry </Link>
     <Link to='/Ledger' style={{textDecoration:'none', marginRight:'22px'}} > Account Statement </Link>
     <Link to='/Trial' style={{textDecoration:'none', marginRight:'22px'}} > Summary </Link>
     <Link to='/Logout' style={{textDecoration:'none', marginRight:'22px'}} > Logout </Link>
     
     
     
    
      </div>
    
    </div>
  );
}
}

export default Header;
