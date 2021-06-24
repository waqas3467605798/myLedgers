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
      status:false,
      ledgerDisplay:false,
      ledger:[],
      ledgerBalance:[],
      sum:[],
      accountTitle:'',
      ledgerFor30Days:-50
    }
  }





  componentDidMount(){

    firebase.database().ref('partyList').on('child_added' , (data)=> { 
      this.state.partyObjects.push(data.val())
    }  )

    
  }



 


  displayLedger = (i)=> {

this.setState({ledgerDisplay:true})
var reqObj = this.state.partyObjects[i]
this.setState({accountTitle:reqObj.partyName})
if('ledger' in reqObj){
var ledgerData = reqObj.ledger;
var ledgerBalance = reqObj.sum
this.setState({ledger: ledgerData, renderLedgerData:true, noData:null, ledgerBalance:ledgerBalance})

}
else{
 
 var noDataFound = 'No data found'
 this.setState({noData: noDataFound, renderLedgerData:false})
 console.log(noDataFound)
 
}

this.setState({sum:[]}) //As the render method will run again, so the array of sum and sumQty in state should be zero
  
// }else{alert('Please select the Account First')}

}


backToTrial = ()=>{
  this.setState({ledgerDisplay:false})
}






  getData = ()=>{
    this.setState({status:true})        //As status true, the render function will run again - because of change in state
    // this.setState({sum:[]}) 
  }






    render(){
      return(
        <div className='container'>
          {/* the below div is in case of trial display */}
          <div className={this.state.ledgerDisplay === false ? '' : 'display'}> 




        <br/>
        <h5>Summary</h5>
        <button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'30%'}}>Get Summary</button> <br/>
        
        <div className={this.state.status === true ? '' : 'display'}>
        
        <table><thead><tr><th>Account Title</th><th>Receivable</th><th>Payable</th></tr></thead><tbody>{this.state.partyObjects.map(  (name,ind)=>{return <tr key={ind} className={name.sum.reduce( (total,num)=>{return total+num},0)===0 ? 'display' : ''}><td><a href='#' onClick={()=>this.displayLedger(ind)}>{(ind+1) + '- ' + name.partyName}</a></td><td className={name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? 'trialPositiveAmt' : 'trialNegativeAmt'}><b>{name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? name.sum.reduce( (total,num)=>{return total+num},0) : '-'}</b></td><td className={name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? 'trialPositiveAmt' : 'trialNegativeAmt'}><b>{name.sum.reduce( (total,num)=>{return total+num},0) < 0 ? name.sum.reduce( (total,num)=>{return total+num},0) : '-'}</b></td></tr>}  )}</tbody></table>
        </div>
        
      
        </div>
        
        
        

        {/* the following div is in case of ledger display */}
        <div className={this.state.ledgerDisplay === true ? '' : 'display'}>
          <br/><br/>
        <p><b>ACCOUNT TITLE:</b> <span style={{color:'green'}}>{this.state.accountTitle} </span><br/>
        <span style={{color:'red',fontSize:'20px'}}>Last 50-Transactions</span></p>
        <table><thead><tr><th>Sr#</th><th>Date</th><th>Remarks</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td>{index+1}</td><td>{item.date}</td><td>{item.narration}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit >=0 ? item.debit : ''}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit <0 ? item.debit : ''}</td><td className={this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0) >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}><b>{this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0)}</b></td></tr>}).slice(this.state.ledgerFor30Days)    }</tbody></table>  {/*the Slice method is applied on map array to get only last 30 transactions as on your need*/ }
        <button className="waves-effect waves-dark btn" onClick={this.backToTrial}>Back to summary</button>
        </div>
        
        
        
        </div>

      );
    }
  
}


export default Trial;