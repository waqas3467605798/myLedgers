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

        <br/>
        <h5>Summary</h5>
        <button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'30%'}}>Get Summary</button> <br/>
        
        <div className={this.state.status === true ? '' : 'display'}>
        
        <table><thead><tr><th>Account Title</th><th>Receivable</th><th>Payable</th></tr></thead><tbody>{this.state.partyObjects.map(  (name,ind)=>{return <tr key={ind} className={name.sum.reduce( (total,num)=>{return total+num},0)===0 ? 'display' : ''}><td>{(ind+1) + '- ' + name.partyName}</td><td className={name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? 'trialPositiveAmt' : 'trialNegativeAmt'}><b>{name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? name.sum.reduce( (total,num)=>{return total+num},0) : '-'}</b></td><td className={name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? 'trialPositiveAmt' : 'trialNegativeAmt'}><b>{name.sum.reduce( (total,num)=>{return total+num},0) < 0 ? name.sum.reduce( (total,num)=>{return total+num},0) : '-'}</b></td></tr>}  )}</tbody></table>
        </div>
        </div>

      );
    }
  
}


export default Trial;