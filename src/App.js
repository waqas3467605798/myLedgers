import react, {Component} from 'react'
import Header from './components/Header'
import Logout from './components/Logout'
import DoubleEntrySys from './components/DoubleEntrySys'
import AccountsRecord from './components/AccountsRecord'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'





  class App extends Component{

  render(){
  return (
    <BrowserRouter>
    <div>
      <Header/>
      
      <Route exact path='/' component={Logout}/>
      <Route path='/AccountsRecord' component={AccountsRecord}/>
      <Route path='/DoubleEntrySys' component={DoubleEntrySys}/>
      

<br/><br/>
<div className='bottomLine'> 
Prepared By: Waqas Saleem <br/>
Easy Accounts Management System<br/>
Contact: 0346-7605798 Email: waqas_mba86@yahoo.com
</div>



    </div>
    </BrowserRouter>
  );
}
}

export default App;
