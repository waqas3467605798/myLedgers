import react, {Component} from 'react'
// import Content from './components/Content'
import Header from './components/Header'
// import DataEntry from './components/DataEntry'
// import Ledger from './components/Ledger'
// import Trial from './components/Trial'
import Logout from './components/Logout'
import RecordBook from './components/RecordBook'
import MyDocs from './components/MyDocs'
import AccountsRecord from './components/AccountsRecord'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'





  class App extends Component{

  render(){
  return (
    <BrowserRouter>
    <div>
      <Header/>
      {/* <Route exact path='/' component={DataEntry} /> */}
      {/* <Route path='/Content' component={Content}/> */}
      {/* <Route path='/Ledger' component={Ledger}/> */}
      {/* <Route path='/Trial' component={Trial}/> */}
      <Route exact path='/' component={Logout}/>
      <Route path='/AccountsRecord' component={AccountsRecord}/>
      <Route path='/RecordBook' component={RecordBook}/>
      
      <Route path='/MyDocs' component={MyDocs}/>
      

<br/><br/>
<div className='bottomLine'> 
Prepared By: Waqas Saleem <br/>
Accounts Payable/Receivable Management System<br/>
Contact: 0346-7605798 Email: waqas_mba86@yahoo.com
</div>



    </div>
    </BrowserRouter>
  );
}
}

export default App;
