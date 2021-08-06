import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link, Route, BrowserRouter} from 'react-router-dom'




  class AccountsRecord extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null,
      }

  }


 async componentDidMount(){
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    
    this.setState({user:userId,userEmail:userEmail})
  }



  

    render(){
        return(
          <div>
        <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
<br/> <br/>
          <div>
           <MainBar />
          <Route exact path='/AccountsRecord' component={DataEntry} />
          <Route path='/AccountsRecord/Content' component={Content}/>
          <Route path='/AccountsRecord/Ledger' component={Ledger}/>
          <Route path='/AccountsRecord/Trial' component={Trial}/>
          <Route path='/AccountsRecord/Vouchers' component={Vouchers}/>
          </div>

          </div>
        )
    }


  }

export default AccountsRecord;



//Links Component
class MainBar extends Component{
    constructor(){
      super();
      this.state = {
       
      }
    }
  
  
  
  
      render(){
        return(
          <div className='container' style={{border:'1px solid lemonchiffon', textAlign:'center', backgroundColor:'lemonchiffon'}}>
    
          <Link to='/AccountsRecord/Content' style={{textDecoration:'none', marginRight:'22px'}}> Create Account</Link>
          <Link to='/AccountsRecord' style={{textDecoration:'none', marginRight:'22px'}}> Data Entry </Link>
          <Link to='/AccountsRecord/Vouchers' style={{textDecoration:'none', marginRight:'22px'}} > Vouchers </Link>
          <Link to='/AccountsRecord/Ledger' style={{textDecoration:'none', marginRight:'22px'}} > Account Statement </Link>
          <Link to='/AccountsRecord/Trial' style={{textDecoration:'none', marginRight:'22px'}} > Summary </Link>
          
          </div>
  
        );
      }
    
  }





  //Content Component - to create new account
  class Content extends Component{
    constructor(){
        super();
        this.state = {
          address:'',
          partyName:'',
          partyObjects:[],
          getListStatus:false,
          // togleList:false,
          user:null,
          userEmail:null
        }
        
    }


    async componentDidMount(){
      var dataPushPromise = new Promise( (res,rej)=>{
      var userId = firebase.auth().currentUser.uid;
      var userEmail = firebase.auth().currentUser.email

      this.setState({user:userId,userEmail:userEmail})
      
      res()
      rej('Operation Failed: Data From Firebase does not push in the state successfully')
    } )
    dataPushPromise.then(()=>{

      var pushPromise = new Promise((res,rej)=>{
        var obj = [];
        firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
          obj.push(data.val())
        }  )
        res(obj);
        rej('Operation Failed');
      })
      pushPromise.then((ob)=>{
        this.setState({partyObjects:ob})
      },(er)=>{
        alert(er)
      })



    },(err)=>{
      alert(err)
    })

  }






  //  async componentDidMount(){
  //       var dataPushPromise = new Promise( (res,rej)=>{
  //       var userId = firebase.auth().currentUser.uid;
  //       var userEmail = firebase.auth().currentUser.email

  //       this.setState({user:userId,userEmail:userEmail})
        
  //       res()
  //       rej('Operation Failed: Data From Firebase does not push in the state successfully')
  //     } )
  //     dataPushPromise.then(()=>{
  //       firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
  //         this.state.partyObjects.push(data.val())
  //       }  )
        
  //     },(err)=>{
  //       alert(err)
  //     })

  //   }


   


  // var pushPromise = new Promise((res,rej)=>{

  //   res();
  //   rej('Operation Failed');
  // })
  // pushPromise.then((ob)=>{},(er)=>{})








changeHandler = (e) => {
this.setState({ 
[e.target.name]: e.target.value
})

}



saveParty = ()=> {
if(this.state.partyName === '' || this.state.address === ''){alert('you must fill all the fields')}else{

  

let partyObj = {};
partyObj.partyName = this.state.partyName.replace(/  +/g, ' ').trim();    // replace() method is used to remove more than onve space in string & trim() method is used to remove space between first and last.
partyObj.address = this.state.address;
partyObj.sum = [0]


var key = firebase.database().ref('partyList'+this.state.user).push().key
partyObj.key = key
firebase.database().ref('partyList'+this.state.user).child(key).set(partyObj)
alert('saved successfully')
this.setState({partyName:'', address:''}) 


}
}




getList = () =>{
this.setState({getListStatus:true})
}



editAccount =(i)=>{
var reqObj = this.state.partyObjects[i]
var key = this.state.partyObjects[i].key
var editAccount = prompt('Please edit Account Title',reqObj.partyName)
var editAddress = prompt('Please edit Address/Contact..etc',reqObj.address)

reqObj.partyName = editAccount.replace(/  +/g, ' ').trim();
reqObj.address = editAddress.replace(/  +/g, ' ').trim()


firebase.database().ref('partyList'+this.state.user).child(reqObj.key).set(reqObj)


this.state.partyObjects.splice(i,1,reqObj)


}




render(){

  return (
  <div>
  
  <div className='container'>
  
    <br/>
 
  <br/><br/><br/>
 
{/* Create Account */}
  <h2 className='headings'>Create Account</h2>
  <input type='text'  value={this.state.partyName} name='partyName' onChange={this.changeHandler} placeholder='Account Title' />  <br/>
  <input type='text' value={this.state.address} name='address' onChange={this.changeHandler} placeholder='Address, Contact, ..etc' /> <br/>
  <button className="waves-effect waves-dark btn" onClick={this.saveParty}>Save</button>
  <br/><br/><br/><br/>


  <h2 className='headings'>List of Accounts Opened</h2>
  <button className="waves-effect waves-dark btn" onClick={this.getList}>Get List</button>

<div className={this.state.getListStatus === false ? 'display' : ''}>
  <table><thead><tr><th>Account Title</th><th>Address/Contact..etc</th></tr></thead><tbody>{this.state.partyObjects.map(  (item,index)=>{return <tr key={index}><td>{(index+1) + '- ' + item.partyName}</td><td>{item.address}</td><td><a href='#' className="material-icons" onClick={()=> this.editAccount(index)}>edit</a></td></tr>})    }</tbody></table> 
{/* </div> */}
</div>


  </div>
  </div>
);
}
}




//Data Entry Component start
class DataEntry extends Component{
    constructor(){
        super();
        this.state = {
          debit:'',
          date:'',
          narration:'',
          // objects:[],
          partyObjects:[],
          status:false,         //this only for some changes in state, so that render function can run again
          renderMstStatus:false,
          noData:null,
          user:null,
          voucherNumber:null
          
        }
    }




    async componentDidMount(){
      var dataPushPromise = new Promise( (res,rej)=>{
      var userId = firebase.auth().currentUser.uid;
      var userEmail = firebase.auth().currentUser.email

      this.setState({user:userId,userEmail:userEmail})
      
      res()
      rej('Operation Failed: Data From Firebase does not push in state successfully')
    } )
    dataPushPromise.then(()=>{
      var pushPromise = new Promise((res,rej)=>{
        var obj = [];
        firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
          obj.push(data.val())
        }  )
  
        firebase.database().ref('VoucherNumber'+this.state.user).on('child_added' , (data)=> {
          this.setState({voucherNumber:data.val()})
        }  )
        res(obj);
        rej('Operation Failed');
      })
      pushPromise.then((ob)=>{
        this.setState({partyObjects:ob})
      },(er)=>{
        alert(er)
      })



    },(err)=>{
      alert(err)
    })

  }





  // async componentDidMount(){
  //     var dataPushPromise = new Promise( (res,rej)=>{
  //     var userId = firebase.auth().currentUser.uid;
  //     var userEmail = firebase.auth().currentUser.email

  //     this.setState({user:userId,userEmail:userEmail})
      
  //     res()
  //     rej('Operation Failed: Data From Firebase does not push in state successfully')
  //   } )
  //   dataPushPromise.then(()=>{
  //     firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
  //       this.state.partyObjects.push(data.val())
  //     }  )


  //     firebase.database().ref('VoucherNumber'+this.state.user).on('child_added' , (data)=> {
  //       this.setState({voucherNumber:data.val()})
  //     }  )


  //   },(err)=>{
  //     alert(err)
  //   })

  // }







changeHandler = (e) => {

this.setState({ 
[e.target.name]: e.target.value
})

}



getData = ()=>{
this.setState({status:true})        //As status true, the render function will run again
}



saveValue = ()=>{
//  if(navigator.onLine){    //it is only to check either your connected to the internet or not 

if(this.state.date === '' || this.state.narration === '' || this.state.debit === ''){alert('you must fill all the fields')}else{

if(document.getElementById('selected_save2').value){


var partyObjIndex = document.getElementById('selected_save2').selectedIndex
var reqPartyObj = this.state.partyObjects[partyObjIndex]
var partyLedgerObj = {}
partyLedgerObj.debit = Number(this.state.debit);
partyLedgerObj.date = this.state.date;
// partyLedgerObj.voucherNum = vouchNum;  //for voucher Test

var nrr = this.state.narration
partyLedgerObj.narration = nrr
var vouNum = this.state.voucherNumber+1;
partyLedgerObj.voucherNumber = vouNum;

//This code is for creation of Party Ledger in partyList
if('ledger' in reqPartyObj){
reqPartyObj.ledger.push(partyLedgerObj)
firebase.database().ref('partyList'+this.state.user).child(reqPartyObj.key).set(reqPartyObj)

}else{
reqPartyObj.ledger = []
reqPartyObj.ledger.push(partyLedgerObj)
firebase.database().ref('partyList'+this.state.user).child(reqPartyObj.key).set(reqPartyObj)
}


// For searching of array of sum in party object
if('sum' in reqPartyObj){
reqPartyObj.sum.push(Number(this.state.debit))

firebase.database().ref('partyList'+this.state.user).child(reqPartyObj.key).set(reqPartyObj)

}else{
reqPartyObj.sum = []
reqPartyObj.sum.push(Number(this.state.debit))
firebase.database().ref('partyList'+this.state.user).child(reqPartyObj.key).set(reqPartyObj)
}



alert('Entry successfully saved..!')
this.setState({debit:'',date:'',narration:'',voucherNumber:vouNum})
firebase.database().ref('VoucherNumber'+this.state.user).child('VoucherNumber').set(vouNum)
}else{alert('Please select the Account First')}

}


//  }else{this.setState({netDisconnect:false})}

}





render(){

  return (
    <div>
      
  
  <div className='container'>
  <br/>

  <h2 style={{textAlign:'center'}} className='headings'>Data Entry</h2>
  <div  style={{textAlign:'center', marginBottom:'0px'}}><button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'80%'}}>Select Account</button> <br/>
  <div style={{width:'80%', margin:'auto'}}> <select className='browser-default' id='selected_save2'>  {this.state.partyObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.partyName}</option>}  )}   </select> </div> <br/>
  </div>
  <input type='date' value={this.state.date} name='date' onChange={this.changeHandler} placeholder='Date (01-Jan-2021)' /> <br/>
  <input type='text' value={this.state.narration} name='narration' onChange={this.changeHandler} placeholder='Remarks/Narration' /> <br/>
  <input type='number' value={this.state.debit} name='debit' onChange={this.changeHandler} placeholder='Amount +Debit / -Credit' /> <br/>
  <button className="waves-effect waves-dark btn" onClick={this.saveValue}>Save</button>

</div>

{/* <button onClick={this.testPromise}>Test Promise</button> */}
</div>
);
}
}




//start of Ledger Component
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
          test:[],
          accountTitle:''
          
          
        }
    }
  

      async componentDidMount(){
      var dataPushPromise = new Promise( (res,rej)=>{
      var userId = firebase.auth().currentUser.uid;
      var userEmail = firebase.auth().currentUser.email
      this.setState({user:userId,userEmail:userEmail})
      res()
      rej('Operation Failed: Data From Firebase does not push in state successfully')
    } )
    dataPushPromise.then(()=>{

      var pushPromise = new Promise((resolve,reject)=>{
        var obj = [];
        firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
          obj.push(data.val())
        }  )
        resolve(obj)
        reject('Operation failed')
      })
      pushPromise.then((ob)=>{
        this.setState({partyObjects:ob})
      },(er)=>{
        alert(er)
      })


    },(err)=>{
      alert(err)
    })
  
      
  }





  //   async componentWillMount(){
  //     var dataPushPromise = new Promise( (res,rej)=>{
  //     var userId = firebase.auth().currentUser.uid;
  //     var userEmail = firebase.auth().currentUser.email
  //     this.setState({user:userId,userEmail:userEmail})
  //     res()
  //     rej('Operation Failed: Data From Firebase does not push in state successfully')
  //   } )
  //   dataPushPromise.then(()=>{
  //     firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
  //       this.state.partyObjects.push(data.val())
  //     }  )
  //   },(err)=>{
  //     alert(err)
  //   })
  
      
  // } 
    
  
  
  getData = ()=>{
      this.setState({status:true})        //As status true, the render function will run again - because of change in state
      this.setState({sum:[]})  //As the render method will run again, so the array of sum and sumQty in state should be zero
    }
  
  

  // This function will run to get all transactions in the ledger
      partyLedger = ()=> {
        this.setState({ledgerFor30Days:0}) // because we want to see all transaction in the ledger
  
  if(document.getElementById('selected_save4').value){
  
  this.setState({accountTitle:document.getElementById('selected_save4').value})
  
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
  
  
  

  // printStm = (stmDiv)=>{
  //   // //Method-1 to print the specific Div
  //   // var wholeBody = document.body.innerHTML;
  //   // var printContent = document.getElementById(stmDiv).innerHTML;
  //   // document.body.innerHTML = printContent;
  //   // window.print()
  //   // document.body.innerHTML = wholeBody
  
  
  //   // Method-1 to print the specific Div
  //   var content = document.getElementById(stmDiv);
  //   var pri = document.getElementById("ifmcontentstoprint").contentWindow;
  //   pri.document.open();
  //   pri.document.write(content.innerHTML);
  //   pri.document.close();
  //   pri.focus();
  //   pri.print();
  
  
  // }
  
  
  
  render(){
  
  return (
  
  
  <div id='up'>
  
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
    
    <div id='printldgr'>
  <span>Account Title: <b>{this.state.accountTitle} </b></span>
  <table style={{maxWidth:'950px',margin:'auto'}}><thead><tr><th>Vouch#</th><th>Date</th><th>Remarks</th><th>Debit</th><th>Credit</th><th>Balance</th><td><a href='#down' style={{color:'blue'}} className="tiny material-icons">arrow_downward</a></td></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td>{item.voucherNumber}</td><td>{item.date}</td><td style={{maxWidth:'135px'}}>{item.narration}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit >=0 ? item.debit : ''}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit <0 ? item.debit : ''}</td><td className={this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0) >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}><b>{this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0)}</b></td><td><a href='#' style={{fontSize:'16px'}} className="material-icons" onClick={()=>this.deleteLedgerEntry(index)}>delete</a><a href='#' style={{fontSize:'16px'}} className="small material-icons" onClick={()=> this.editEntry(index)}>edit</a></td></tr>}).slice(this.state.ledgerFor30Days)  }<tr><td></td><td></td><td><b>TOTAL</b></td><td><b>{this.state.debitTotal}</b></td><td><b>{this.state.creditTotal}</b></td><td style={{fontSize:'12px',color:'blue'}}><b>CL. BAL <i className="tiny material-icons">arrow_upward</i></b></td><td><a href='#up' style={{color:'blue'}} className="tiny material-icons">arrow_upward</a></td></tr></tbody></table>  {/*the Slice method is applied on map array to get only last 30 transactions as on your need*/ }
    </div>
  {/* <button className="waves-effect waves-dark btn blue" onClick={()=>{this.printStm('printldgr')}}>Print Statement</button> */}
  
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
  
  
  {/* <iframe id="ifmcontentstoprint" style={{height:'0px', width: '0px', position: 'absolute'}}></iframe> */}
  
  </div>
  );
  }
  }



  //Trial Component start
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
        ledgerFor30Days:-50,
        user:null
      }
    }
  
  


    async componentDidMount(){
      //first promise function starting
      var dataPushPromise = new Promise( (res,rej)=>{
      var userId = firebase.auth().currentUser.uid;
      var userEmail = firebase.auth().currentUser.email
  
      this.setState({user:userId,userEmail:userEmail})
      
      res()
      rej('Operation Failed: Data From Firebase does not push in state successfully')
    } )
    dataPushPromise.then(()=>{
      //second promise function is starting
      var pushPromise = new Promise((res,rej)=>{
        var obj = [];
        firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
          obj.push(data.val())
        }  )
        res(obj);
        rej('Operation Failed');
      })
      pushPromise.then((ob)=>{
        this.setState({partyObjects:ob})
      },(er)=>{
        alert(er)
      })


    },(err)=>{
      alert(err)
    })
  
    
  }


  
  // async componentDidMount(){
  //     var dataPushPromise = new Promise( (res,rej)=>{
  //     var userId = firebase.auth().currentUser.uid;
  //     var userEmail = firebase.auth().currentUser.email
  
  //     this.setState({user:userId,userEmail:userEmail})
      
  //     res()
  //     rej('Operation Failed: Data From Firebase does not push in state successfully')
  //   } )
  //   dataPushPromise.then(()=>{
  //     firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
  //       this.state.partyObjects.push(data.val())
  //     }  )
  //   },(err)=>{
  //     alert(err)
  //   })
  
    
  // }
  
  
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
    
  
  
  }
  
  
  backToTrial = ()=>{
    this.setState({ledgerDisplay:false})
  }
  
  

  
    getData = ()=>{
      this.setState({status:true})        //As status true, the render function will run again - because of change in state
      // this.setState({sum:[]}) 
    }
  

    // printStm = (stmDiv)=>{
    //   // // Method-1 to print the specific div
    //   // var wholeBody = document.body.innerHTML;
    //   // var printContent = document.getElementById(stmDiv).innerHTML;
    //   // document.body.innerHTML = printContent;
    //   // window.print()
    //   // document.body.innerHTML = wholeBody
  
  
  
    //   // Method-2 to print the specific div
    //   var content = document.getElementById(stmDiv);
    //   var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    //   pri.document.open();
    //   pri.document.write(content.innerHTML);
    //   pri.document.close();
    //   pri.focus();
    //   pri.print();
  
    
    // }
  

      render(){
        return(
          <div>
            
          <div className='container'>
            <br/>
    {/* <div style={{color:'green'}}><b> {this.state.userEmail}</b></div> */}
            {/* the below div is in case of trial display */}
            <br/><br/>
            <div id='trialPrint' className={this.state.ledgerDisplay === false ? '' : 'display'}> 
  
          <br/>
          
          <button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'30%'}}>Get Summary</button> <br/>
          
          <div className={this.state.status === true ? '' : 'display'}>
          
          <table style={{maxWidth:'700px',margin:'auto'}}><thead><tr><th>Account Title</th><th>Receivable</th><th>Payable</th></tr></thead><tbody>{this.state.partyObjects.map(  (name,ind)=>{return <tr key={ind} className={name.sum.reduce( (total,num)=>{return total+num},0)===0 ? 'display' : ''}><td style={{maxWidth:'125px'}}><a href='#' onClick={()=>this.displayLedger(ind)}>{(ind+1) + '- ' + name.partyName}</a></td><td className={name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? 'trialPositiveAmt' : 'trialNegativeAmt'}><b>{name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? name.sum.reduce( (total,num)=>{return total+num},0) : '-'}</b></td><td className={name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? 'trialPositiveAmt' : 'trialNegativeAmt'}><b>{name.sum.reduce( (total,num)=>{return total+num},0) < 0 ? name.sum.reduce( (total,num)=>{return total+num},0) : '-'}</b></td></tr>}  )}</tbody></table>
          {/* <button className="waves-effect waves-dark btn blue" onClick={()=>{this.printStm('trialPrint')}}>Print this page</button> */}
          
          </div>
          
        
          </div>
          
          
          {/* the following div is in case of ledger display */}
          <div className={this.state.ledgerDisplay === true ? '' : 'display'}>
            <br/><br/>
          <p><b>ACCOUNT TITLE:</b> <span style={{color:'green'}}>{this.state.accountTitle} </span><br/>
          <span style={{color:'red',fontSize:'20px'}}>Last 50-Transactions</span></p>
          <table style={{maxWidth:'700px',margin:'auto'}}><thead><tr><th>Vouch#</th><th>Date</th><th>Remarks</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td>{item.voucherNumber}</td><td>{item.date}</td><td style={{maxWidth:'150px'}}>{item.narration}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit >=0 ? item.debit : ''}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit <0 ? item.debit : ''}</td><td className={this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0) >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}><b>{this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0)}</b></td></tr>}).slice(this.state.ledgerFor30Days)    }</tbody></table>  {/*the Slice method is applied on map array to get only last 30 transactions as on your need*/ }
          <button className="waves-effect waves-dark btn" onClick={this.backToTrial}>Back to summary</button>
          
          </div>
        <br/>
          <div className={this.state.status === true ? '' : 'display'}>
          
          </div>
          
          </div>
  
          {/* <iframe id="ifmcontentstoprint" style={{height:'0px', width: '0px', position: 'absolute'}}></iframe> */}
          </div>
  
        );
      }
    
  }
  








  
  class Vouchers extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null,
              partyObjects:[]
      }

  }


  async componentDidMount(){
    var dataPushPromise = new Promise( (res,rej)=>{
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    this.setState({user:userId,userEmail:userEmail})
    res()
    rej('Operation Failed: Data From Firebase does not push in state successfully')
  } )
  dataPushPromise.then(()=>{

    var pushPromise = new Promise((resolve,reject)=>{
      var obj = [];
      firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
        obj.push(data.val())
      }  )
      resolve(obj)
      reject('Operation failed')
    })
    pushPromise.then((ob)=>{
      this.setState({partyObjects:ob})
    },(er)=>{
      alert(er)
    })


  },(err)=>{
    alert(err)
  })

    
}



show = ()=>{
  console.log(this.state.partyObjects.map((itm)=>{ return itm.ledger}))
}

  

    render(){
        return(
          <div>
       
          <button onClick={this.show}>Show</button>
          
          </div>
        )
    }


  }
