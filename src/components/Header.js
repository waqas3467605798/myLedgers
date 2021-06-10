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
     {/* Reminder Book */}
      </div>


      <div id='div2'>
     <Link to='/Content' style={{textDecoration:'none', marginRight:'50px'}}> Create Account</Link>
     <Link to='/' style={{textDecoration:'none', marginRight:'50px'}}> Data Entry </Link>
     {/* <Link to='/PurchaseReturn' style={{textDecoration:'none', marginRight:'50px'}}> Sales/Purchase Return</Link> */}
     <Link to='/GetData' style={{textDecoration:'none', marginRight:'50px'}}> Reports </Link>
     
     
     {/* <Link to='/ShowAll' style={{textDecoration:'none', marginRight:'50px'}}> Show All </Link> */}
    
      </div>
    
    </div>
  );
}
}

export default Header;
