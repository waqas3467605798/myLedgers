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
      Single Entry Accounting System
      </div>


      <div id='div2'>
     <Link to='/Content' style={{textDecoration:'none', marginRight:'50px'}}> Create Account</Link>
     <Link to='/' style={{textDecoration:'none', marginRight:'50px'}}> Data Entry </Link>
     <Link to='/Ledger' style={{textDecoration:'none', marginRight:'50px'}} > Ledger </Link>
     <Link to='/Trial' style={{textDecoration:'none', marginRight:'50px'}} > Trial Balance </Link>
     
     
     
    
      </div>
    
    </div>
  );
}
}

export default Header;
