import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'

import firebase from './Fire'


  






class GetData extends Component{
  constructor(){
      super();
      this.state = {
        // objects:[],
        partyObjects:[]
        
      }
  }






render(){

return (


<div>
  <br/> <br/>


<div className='container'>

<Link to='/GetData/' style={{textDecoration:'none', marginRight:'50px'}}> Ledger </Link>
<Link to='/GetData/Trial' style={{textDecoration:'none', marginRight:'50px'}}> Trial Balance </Link>
</div>

<br/>

<div>      
<Route exact path='/GetData/' component={PartyLedgers} />
<Route path='/GetData/Trial' component={Trial}/>

</div>




</div>

);
}
}


export default GetData;









// The Trail Component
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
        
        <button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'30%'}}>Get Trial Balance</button> <br/>
        
        <div className={this.state.status === true ? '' : 'display'}>
        
        <table className="striped"><thead><tr><th>Account Title</th><th>Balance</th></tr></thead><tbody>{this.state.partyObjects.map(  (name,ind)=>{return <tr key={ind} className={name.sum.reduce( (total,num)=>{return total+num},0)===0 ? 'display' : ''}><td>{name.partyName}</td><td className={name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? 'trialPositiveAmt' : 'trialNegativeAmt'}>{name.sum.reduce( (total,num)=>{return total+num},0)}</td></tr>}  )}</tbody></table>
        </div>
        </div>

      );
    }
  
}












{/* //Another Component of Party Ledgers */}
class PartyLedgers extends Component{
  constructor(){
      super();
      this.state = {
        objects:[],
        partyObjects:[],
        sum:[],
        ledger:[],
        renderLedgerData:false,
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




  



render(){

return (


<div className='container'>

<button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'30%'}}>Account Title</button> <br/>
<div className='selectWidth'> <select className='browser-default' id='selected_save4'>  {this.state.partyObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.partyName}</option>}  )}   </select> </div> <br/>
<button className="waves-effect waves-dark btn" onClick={this.partyLedger} style={{width:'30%'}}>Get Data</button> <br/>


{/* in case of purchase data found */}
<div className={this.state.renderLedgerData === true ? '' : 'display'}>

<table className="striped"><thead><tr><th>Date</th><th>Remarks</th><th>Amount</th></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td>{item.date}</td><td>{item.narration}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit}</td></tr>})}</tbody></table>

{/* sum of Quantity of item */}

{this.state.ledger.map(  (itm,indx)=>{ return <span key={indx} style={{color:'white'}}>{this.state.sum.push(itm.debit)}</span>}  )}
<b style={{fontSize:'18px'}}>Closing Balance = </b>
<b className={this.state.sum.reduce( (total,num)=>{return total+num},0) >=0 ? 'closingBalPostiv' : 'closingBalNegatve'}>  {this.state.sum.reduce( (total,num)=>{return total+num},0)  }      {this.state.sum.reduce( (total,num)=>{return total+num},0) >=0 ? ' Receivable' : ' Payable'} </b>



</div>


{/* in case of no data found */}
<div className={this.state.noData === null ? 'display' : ''}>
     <h4>
        {this.state.noData}
     </h4>
     
</div>






</div>
);
}
}

