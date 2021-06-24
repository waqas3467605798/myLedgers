import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'

import firebase from './Fire'





class Ledger extends Component{
  constructor(){
      super();
      this.state = {
        
        partyObjects:[],
        sum:[],
        ledger:[],
        renderLedgerData:false,
        status:false,
        ledgerDeleteUpdate:false,
        deleteRefresh: false,
        editRefresh:false,
        noData:null,
        accountDeleteRefresh:false,
        cancelDelete:false,
        ledgerFor30Days:0,
        ledgerBalance:[]
        
        
      }
  }



  componentDidMount(){

    firebase.database().ref('partyList').on('child_added' , (data)=> { 
      this.state.partyObjects.push(data.val())
    }  )

  }
  


  
getData = ()=>{
    this.setState({status:true})        //As status true, the render function will run again - because of change in state
    this.setState({sum:[]})  //As the render method will run again, so the array of sum and sumQty in state should be zero
  }




// This function will run to get all transactions in the ledger
    partyLedger = ()=> {
      this.setState({ledgerFor30Days:0}) // because we want to see all transaction in the ledger

if(document.getElementById('selected_save4').value){

var objIndex = document.getElementById('selected_save4').selectedIndex
var reqObj = this.state.partyObjects[objIndex]

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
    
}else{alert('Please select the Account First')}

}




// This function will run to get last 30 transactions only
partyLedgerTwo = ()=> {

this.setState({ledgerFor30Days:-30})  // because we want to see only last 30-transaction in the ledger
  if(document.getElementById('selected_save4').value){
  
  var objIndex = document.getElementById('selected_save4').selectedIndex
  var reqObj = this.state.partyObjects[objIndex]
  
  if('ledger' in reqObj){
    var ledgerData = reqObj.ledger;
    var ledgerBalance = reqObj.sum 
    this.setState({ledger: ledgerData, renderLedgerData:true, noData:null, ledgerBalance:ledgerBalance})
   
   }
   else{
     
     var noDataFound = 'No data found'
     this.setState({noData: noDataFound, renderLedgerData:false})
    //  console.log(noDataFound)
     
   }
  
  this.setState({sum:[]}) //As the render method will run again, so the array of sum in state should be zero
      
  }else{alert('Please select the Account First')}
  


  
  }










//The Process of Delete functionality is starting from here...
deleteLedgerEntry = (i)=>{

  var delKey = prompt("write 'Y' and Press OK")

  if(delKey === 'Y'){
  var accountTitleName = document.getElementById('selected_save4').value
  var reqObj = this.state.partyObjects.find(  (obj)=>{return obj.partyName === accountTitleName}  )
  reqObj.ledger.splice(i,1)
  reqObj.sum.splice(i+1,1)

  firebase.database().ref('partyList').child(reqObj.key).set(reqObj)

this.setState({ledgerDeleteUpdate:true, sum:[], deleteRefresh:true})
  console.log(reqObj.sum)

  }else{this.setState({cancelDelete:true})
      alert('You have entered Wrong key') 
    }
  
}




deleteRfsh = ()=>{
  this.setState({deleteRefresh:false, sum:[]})
}





editEntry = (i)=>{
  var accountTitle = document.getElementById('selected_save4').value
  var reqObj = this.state.partyObjects.find(  (obj)=>{return obj.partyName === accountTitle}  )
  var objIndx = document.getElementById('selected_save4').selectedIndex
  var key = this.state.partyObjects[objIndx].key
  var ledger = this.state.partyObjects[objIndx].ledger
  var editDate = prompt('Please edit Entry Date',ledger[i].date)
  var editNarration = prompt('Please edit Narration',ledger[i].narration)
  var editAmount = prompt('Please edit Amount',ledger[i].debit)
  var editedObj = {date:editDate,narration:editNarration,debit:Number(editAmount)} 
  reqObj.ledger.splice(i,1,editedObj)
  reqObj.sum.splice(i+1,1,Number(editAmount))

  firebase.database().ref('partyList').child(reqObj.key).set(reqObj)

  this.setState({editRefresh:true,sum:[]})
}

editRfsh = ()=>{
  this.setState({editRefresh:false, sum:[]})
}



accountDelete = ()=>{
  var delKey = prompt("write 'Y' and Press OK")
  if(delKey === 'Y'){



  var accountTitle = document.getElementById('selected_save4').value
  var reqObj = this.state.partyObjects.find(  (obj)=>{return obj.partyName === accountTitle}  )
  var key = reqObj.key
  firebase.database().ref('partyList').child(key).remove()

  this.setState({accountDeleteRefresh:true, partyObjects:[]})



}else{alert('you have entered wrong key')}

}




accountDelRfrsh = ()=>{
this.setState({accountDeleteRefresh:false, sum:[]})
}




cancelDelRfrsh = ()=>{
  this.setState({cancelDelete:false, sum:[]})
}


render(){

return (


<div>

<div className={this.state.deleteRefresh === false ? '' : 'display'}>
<div className={this.state.editRefresh === false ? '' : 'display'}>
<div className={this.state.accountDeleteRefresh === false ? '' : 'display'}>
<div className={this.state.cancelDelete === false ? '' : 'display'}>


<br/>
<h5>Account Statement</h5>
<button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'30%'}}>Account Title</button> <br/>
<div className='selectWidth'> <select className='browser-default' id='selected_save4'>  {this.state.partyObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.partyName}</option>}  )}   </select> </div> <br/>


{/* this below button is for to get last 30-transactions */}
<button className="browser-default btnControl" onClick={this.partyLedgerTwo} style={{width:'30%'}}>30-Trans.</button>
{/* this below button is for to get all transactions in the ledger */}
<button className="browser-default btnControl" onClick={this.partyLedger} style={{width:'30%'}}>All</button> 
{/* className="waves-effect waves-dark btn" */}



{/* in case of data found */}
<div className={this.state.renderLedgerData === true ? '' : 'display'}>
<table><thead><tr><th>Sr#</th><th>Date</th><th>Remarks</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td>{index+1}</td><td>{item.date}</td><td>{item.narration}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit >=0 ? item.debit : ''}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit <0 ? item.debit : ''}</td><td className={this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0) >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}><b>{this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0)}</b></td><td><a href='#' className="material-icons" onClick={()=>this.deleteLedgerEntry(index)}>delete</a><a href='#' className="material-icons" onClick={()=> this.editEntry(index)}>edit</a></td></tr>}).slice(this.state.ledgerFor30Days)    }</tbody></table>  {/*the Slice method is applied on map array to get only last 30 transactions as on your need*/ }

{/* sum of amounts in ledger */}
{this.state.ledger.map(  (itm,indx)=>{ return <span key={indx} style={{color:'white'}}>{this.state.sum.push(itm.debit)}</span>}  )} <br/>
<b style={{fontSize:'18px'}}>Closing Balance = </b>
<b className={this.state.sum.reduce( (total,num)=>{return total+num},0) >=0 ? 'closingBalPostiv' : 'closingBalNegatve'}>  {this.state.sum.reduce( (total,num)=>{return total+num},0)  }      {this.state.sum.reduce( (total,num)=>{return total+num},0) >=0 ? ' Receivable' : ' Payable'} </b>


<br/><hr/><br/><br/><button className="waves-effect waves-dark btn red" onClick={this.accountDelete}>Delete Account Ledger</button>
  <p className="red-text">It will delete the whole Ledger as well as all its stored Entries</p>


</div>

{/* in case of no data found */}
<div className={this.state.noData === null ? 'display' : ''}>
     <h4>
        {this.state.noData}
     </h4>
     
<br/><hr/><br/><br/><button className="waves-effect waves-dark btn red" onClick={this.accountDelete}>Delete Account Ledger</button>
  <p className="red-text">It will delete the whole Ledger as well as all its stored Entries</p>

</div>
</div>
</div>
</div>
</div>





<div className={this.state.deleteRefresh === false ? 'display' : ''} style={{textAlign:'center'}}>
  <br/><br/><br/><br/>
  <h4 style={{color:'red'}}>Entry Deleted successfully</h4>
  <Link to='/Ledger' onClick={this.deleteRfsh}> <button className="waves-effect waves-dark btn"> OK </button></Link>
</div>





<div className={this.state.editRefresh === false ? 'display' : ''} style={{textAlign:'center'}}>
  <br/><br/><br/><br/>
  <h4 style={{color:'red'}}>Entry Edited successfully</h4>
  <Link to='/Ledger' onClick={this.editRfsh}> <button className="waves-effect waves-dark btn"> OK </button></Link>
</div>




<div className={this.state.accountDeleteRefresh === false ? 'display' : ''} style={{textAlign:'center'}}>
  <br/><br/><br/><br/>
  <h4 style={{color:'red'}}>Account Ledger Deleted successfully</h4>
  <Link to='/Trial' onClick={this.accountDelRfrsh}> <button className="waves-effect waves-dark btn"> OK </button></Link>
</div>




<div className={this.state.cancelDelete === false ? 'display' : ''} style={{textAlign:'center'}}>
  <br/><br/><br/><br/>
  <h4 style={{color:'green'}}>Not Deleted</h4>
  <Link to='/Ledger' onClick={this.cancelDelRfrsh}> <button className="waves-effect waves-dark btn"> OK </button></Link>
</div>





</div>
);
}
}

export default Ledger







{/* <td>{(this.state.ledgerBalance.map((val,i)=>{return <b key={i}>{val}</b>})).slice(0).reduce( (total,num)=>{return total+num},0)}</td> */}