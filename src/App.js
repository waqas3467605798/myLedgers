import react, {Component} from 'react'
import Content from './components/Content'
import Header from './components/Header'
import Purchase from './components/Purchase'
import PurchaseReturn from './components/PurchaseReturn'
import GetData from './components/GetData'
import ShowAll from './components/Showall'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'





  class App extends Component{

  render(){
  return (
    <BrowserRouter>
    <div>
      <Header/>

      <Route exact path='/' component={Content}/>
      <Route path='/Purchase' component={Purchase}/>
      <Route path='/PurchaseReturn' component={PurchaseReturn}/>
      <Route path='/GetData' component={GetData}/>
      <Route path='/ShowAll' component={ShowAll}/>
      {/* <Content />
      <SaveData/>
      <GetData/> */}
    </div>
    </BrowserRouter>
  );
}
}

export default App;
