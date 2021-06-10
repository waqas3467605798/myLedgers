import react, {Component} from 'react'
import Content from './components/Content'
import Header from './components/Header'
import DataEntry from './components/DataEntry'
import GetData from './components/GetData'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'





  class App extends Component{

  render(){
  return (
    <BrowserRouter>
    <div>
      <Header/>

      <Route exact path='/' component={DataEntry}/>
      <Route path='/Content' component={Content}/>
      <Route path='/GetData' component={GetData}/>
      
    </div>
    </BrowserRouter>
  );
}
}

export default App;
