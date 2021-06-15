import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'

import firebase from './Fire'


  






class Trial extends Component{
  constructor(){
    super();
    this.state = {
      partyObjects:[],
      arrayForSum:[],
      status:false
    }
  }





  componentDidMount(){

    firebase.database().ref('partyList').on('child_added' , (data)=> { 
      this.state.partyObjects.push(data.val())
    }  )

    
  }



  getData = ()=>{
    this.setState({status:true})        //As status true, the render function will run again - because of change in state
    // this.setState({sum:[]}) 
  }






    render(){
      return(
        <div className='container'>
        <br/><br/><br/>
        <button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'30%'}}>Get Trial Balance</button> <br/>
        
        <div className={this.state.status === true ? '' : 'display'}>
        
        <table className="striped"><thead><tr><th>Account Title</th><th>Balance</th></tr></thead><tbody>{this.state.partyObjects.map(  (name,ind)=>{return <tr key={ind} className={name.sum.reduce( (total,num)=>{return total+num},0)===0 ? 'display' : ''}><td>{name.partyName}</td><td className={name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? 'trialPositiveAmt' : 'trialNegativeAmt'}>{name.sum.reduce( (total,num)=>{return total+num},0)}</td></tr>}  )}</tbody></table>
        </div>
        </div>

      );
    }
  
}


export default Trial;