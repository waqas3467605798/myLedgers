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
        accountDeleteRefresh:false
        
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





    partyLedger = ()=> {

if(document.getElementById('selected_save4').value){




var objIndex = document.getElementById('selected_save4').selectedIndex
var reqObj = this.state.partyObjects[objIndex]

if('ledger' in reqObj){
  var ledgerData = reqObj.ledger;
  this.setState({ledger: ledgerData, renderLedgerData:true, noData:null})
 
 }
 else{
   
   var noDataFound = 'No data found'
   this.setState({noData: noDataFound, renderLedgerData:false})
   console.log(noDataFound)
   
 }

this.setState({sum:[]}) //As the render method will run again, so the array of sum and sumQty in state should be zero
    


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

  }
  else{alert('You have entered Wrong key')}

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



render(){

return (


<div className='container'>

<div className={this.state.deleteRefresh === false ? '' : 'display'}>
<div className={this.state.editRefresh === false ? '' : 'display'}>
<div className={this.state.accountDeleteRefresh === false ? '' : 'display'}>


<br/>
<h5>Account Statement</h5>
<button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'30%'}}>Account Title</button> <br/>
<div className='selectWidth'> <select className='browser-default' id='selected_save4'>  {this.state.partyObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.partyName}</option>}  )}   </select> </div> <br/>
<button className="waves-effect waves-dark btn" onClick={this.partyLedger} style={{width:'30%'}}>Get Data</button> <br/>


{/* in case of purchase data found */}
<div className={this.state.renderLedgerData === true ? '' : 'display'}>
<table><thead><tr><th>Date</th><th>Remarks</th><th>Amount</th></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td>{item.date}</td><td>{item.narration}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit}</td><td><a href='#' class="material-icons" onClick={()=>this.deleteLedgerEntry(index)}>delete</a><a href='#' class="material-icons" onClick={()=> this.editEntry(index)}>edit</a></td></tr>})}</tbody></table>

{/* sum of Quantity of item */}
{this.state.ledger.map(  (itm,indx)=>{ return <span key={indx} style={{color:'white'}}>{this.state.sum.push(itm.debit)}</span>}  )}
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





</div>
);
}
}

export default Ledger