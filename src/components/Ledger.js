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
        ledgerBalance:[],
        debitTotal:0,
        creditTotal:0,
        user:null,
        test:[]
        
        
      }
  }


  componentDidMount(){

    firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
      this.state.partyObjects.push(data.val())
    }  )


  }
  


  

  componentWillMount(){
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    
    this.setState({user:userId,userEmail:userEmail})
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


//to get total sum of debit side and credit side
this.setState({debitTotal:reqObj.sum.filter((nm,indx)=>{return nm>0}).reduce( (total,num)=>{return total+num},0)}) // for test base only
this.setState({creditTotal:reqObj.sum.filter((nm,indx)=>{return nm<0}).reduce( (total,num)=>{return total+num},0)}) // for test base only
//sum of debit and credit side is ended



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
  

  //to get total sum of debit side and credit side
  this.setState({debitTotal:reqObj.sum.filter((nm,indx)=>{return nm>0}).reduce( (total,num)=>{return total+num},0)})   //for test base only
  this.setState({creditTotal:reqObj.sum.filter((nm,indx)=>{return nm<0}).reduce( (total,num)=>{return total+num},0)}) // for test base only
//sum of debit and credit side is ended

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
  var reqObjIndex = document.getElementById('selected_save4').selectedIndex // for test delete
  var accountTitleName = document.getElementById('selected_save4').value
  var reqObj = this.state.partyObjects.find(  (obj)=>{return obj.partyName === accountTitleName}  )
  reqObj.ledger.splice(i,1)
  reqObj.sum.splice(i+1,1)


  //for delete in firebase
  firebase.database().ref('partyList'+this.state.user).child(reqObj.key).set(reqObj)
  //code ended


  //for delete updation in state
  this.state.partyObjects.splice(reqObjIndex,1,reqObj) //for test delete
  //Code ended


  // this.setState({ledgerDeleteUpdate:true, sum:[], deleteRefresh:true})
    alert('Entry Deleted successfully')
  }else{this.setState({cancelDelete:true})
      alert('You have entered Wrong key') 
    }


}




// deleteRfsh = ()=>{
//   this.setState({deleteRefresh:false, sum:[]})
  
// }





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


//For edited in firebase database
  firebase.database().ref('partyList'+this.state.user).child(reqObj.key).set(reqObj)
//code ended


//for edit updation in state
this.state.partyObjects.splice(objIndx,1,reqObj) //for test delete
//Code ended

alert('Entry Edited Successfully')
  // this.setState({editRefresh:true,sum:[]})
}


// editRfsh = ()=>{
//   this.setState({editRefresh:false, sum:[]})
// }



accountDelete = ()=>{
  var delKey = prompt("write 'Y' and Press OK")
  if(delKey === 'Y'){


  var reqObjIndex = document.getElementById('selected_save4').selectedIndex
  var accountTitle = document.getElementById('selected_save4').value
  var reqObj = this.state.partyObjects.find(  (obj)=>{return obj.partyName === accountTitle}  )
  var key = reqObj.key

  //for delete in Firebase database
  firebase.database().ref('partyList'+this.state.user).child(key).remove()
  //code ended

//for delete updation in state
this.state.partyObjects.splice(reqObjIndex,1) //for test delete
//Code ended
  this.setState({accountDeleteRefresh:true, partyObjects:[]})
alert('Account deleted successfully, now plz refresh the page')

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


<div id='up'>
<span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
<br/>
 
<div className={this.state.accountDeleteRefresh === false ? '' : 'display'}>
<div className={this.state.cancelDelete === false ? '' : 'display'}>

<div style={{textAlign:'center'}} className='container'>
<br/>
<h5>Account Statement</h5>
<button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'80%'}}>Select Account</button> <br/>
<div style={{width:'80%',margin:'auto'}}> <select className='browser-default' id='selected_save4'>  {this.state.partyObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.partyName}</option>}  )}   </select> </div> <br/>



{/* this below button is for to get all transactions in the ledger */}
<button className="browser-default btnControl" onClick={this.partyLedger} style={{width:'30%'}}>All</button> 
{/* this below button is for to get last 30-transactions */}
<button className="browser-default btnControl" onClick={this.partyLedgerTwo} style={{width:'30%'}}>Last-30</button>

{/* className="waves-effect waves-dark btn" */}
</div>




{/* in case of data found */}
<div className={this.state.renderLedgerData === true ? '' : 'display'}>
<table style={{maxWidth:'950px',margin:'auto'}}><thead><tr><th>Sr#</th><th>Date</th><th>Remarks</th><th>Debit</th><th>Credit</th><th>Balance</th><td><a href='#down' style={{color:'blue'}} className="tiny material-icons">arrow_downward</a></td></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td>{index+1}</td><td>{item.date}</td><td style={{maxWidth:'135px'}}>{item.narration}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit >=0 ? item.debit : ''}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit <0 ? item.debit : ''}</td><td className={this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0) >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}><b>{this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0)}</b></td><td><a href='#' style={{fontSize:'16px'}} className="material-icons" onClick={()=>this.deleteLedgerEntry(index)}>delete</a><a href='#' style={{fontSize:'16px'}} className="small material-icons" onClick={()=> this.editEntry(index)}>edit</a></td></tr>}).slice(this.state.ledgerFor30Days)  }<tr><td></td><td></td><td><b>TOTAL</b></td><td><b>{this.state.debitTotal}</b></td><td><b>{this.state.creditTotal}</b></td><td style={{fontSize:'12px',color:'blue'}}><b>CL. BAL <i className="tiny material-icons">arrow_upward</i></b></td><td><a href='#up' style={{color:'blue'}} className="tiny material-icons">arrow_upward</a></td></tr></tbody></table>  {/*the Slice method is applied on map array to get only last 30 transactions as on your need*/ }


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
{/* </div> */}
 {/* </div> */}





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


<span id='down'></span>




</div>
);
}
}

export default Ledger







{/* <td>{(this.state.ledgerBalance.map((val,i)=>{return <b key={i}>{val}</b>})).slice(0).reduce( (total,num)=>{return total+num},0)}</td> */}