// import react, {Component} from 'react'
// import '../App.css';
// import {Link, Route,BrowserRouter} from 'react-router-dom'
// import firebase from './Fire'


  


// class Trial extends Component{
//   constructor(){
//     super();
//     this.state = {
//       partyObjects:[],
//       arrayForSum:[],
//       status:false,
//       ledgerDisplay:false,
//       ledger:[],
//       ledgerBalance:[],
//       sum:[],
//       accountTitle:'',
//       ledgerFor30Days:-50,
//       user:null
//     }
//   }



//   componentDidMount(){
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

//   //   firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
//   //   this.state.partyObjects.push(data.val())
//   // }  )

// }





//   // componentDidMount(){

//   //   firebase.database().ref('partyList'+this.state.user).on('child_added' , (data)=> { 
//   //     this.state.partyObjects.push(data.val())
//   //   }  )


//   // }


//   // componentWillMount(){
//   //   var userId = firebase.auth().currentUser.uid;
//   //   var userEmail = firebase.auth().currentUser.email
    
//   //   this.setState({user:userId,userEmail:userEmail})
//   // }






//   displayLedger = (i)=> {

// this.setState({ledgerDisplay:true})
// var reqObj = this.state.partyObjects[i]
// this.setState({accountTitle:reqObj.partyName})
// if('ledger' in reqObj){
// var ledgerData = reqObj.ledger;
// var ledgerBalance = reqObj.sum
// this.setState({ledger: ledgerData, renderLedgerData:true, noData:null, ledgerBalance:ledgerBalance})

// }
// else{
 
//  var noDataFound = 'No data found'
//  this.setState({noData: noDataFound, renderLedgerData:false})
//  console.log(noDataFound)
 
// }

// this.setState({sum:[]}) //As the render method will run again, so the array of sum and sumQty in state should be zero
  


// }


// backToTrial = ()=>{
//   this.setState({ledgerDisplay:false})
// }






//   getData = ()=>{
//     this.setState({status:true})        //As status true, the render function will run again - because of change in state
//     // this.setState({sum:[]}) 
//   }





//   // printStm = (stmDiv)=>{
//   //   // // Method-1 to print the specific div
//   //   // var wholeBody = document.body.innerHTML;
//   //   // var printContent = document.getElementById(stmDiv).innerHTML;
//   //   // document.body.innerHTML = printContent;
//   //   // window.print()
//   //   // document.body.innerHTML = wholeBody



//   //   // Method-2 to print the specific div
//   //   var content = document.getElementById(stmDiv);
//   //   var pri = document.getElementById("ifmcontentstoprint").contentWindow;
//   //   pri.document.open();
//   //   pri.document.write(content.innerHTML);
//   //   pri.document.close();
//   //   pri.focus();
//   //   pri.print();

  
//   // }









//     render(){
//       return(
//         <div>
//           <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
//         <div className='container'>
//           <br/>
//   {/* <div style={{color:'green'}}><b> {this.state.userEmail}</b></div> */}
//           {/* the below div is in case of trial display */}
//           <br/><br/>
//           <div id='trialPrint' className={this.state.ledgerDisplay === false ? '' : 'display'}> 

//         <br/>
        
//         <button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'30%'}}>Get Summary</button> <br/>
        
//         <div className={this.state.status === true ? '' : 'display'}>
        
//         <table style={{maxWidth:'700px',margin:'auto'}}><thead><tr><th>Account Title</th><th>Receivable</th><th>Payable</th></tr></thead><tbody>{this.state.partyObjects.map(  (name,ind)=>{return <tr key={ind} className={name.sum.reduce( (total,num)=>{return total+num},0)===0 ? 'display' : ''}><td style={{maxWidth:'125px'}}><a href='#' onClick={()=>this.displayLedger(ind)}>{(ind+1) + '- ' + name.partyName}</a></td><td className={name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? 'trialPositiveAmt' : 'trialNegativeAmt'}><b>{name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? name.sum.reduce( (total,num)=>{return total+num},0) : '-'}</b></td><td className={name.sum.reduce( (total,num)=>{return total+num},0) > 0 ? 'trialPositiveAmt' : 'trialNegativeAmt'}><b>{name.sum.reduce( (total,num)=>{return total+num},0) < 0 ? name.sum.reduce( (total,num)=>{return total+num},0) : '-'}</b></td></tr>}  )}</tbody></table>
//         {/* <button className="waves-effect waves-dark btn blue" onClick={()=>{this.printStm('trialPrint')}}>Print this page</button> */}
        
//         </div>
        
      
//         </div>
        
        
        

//         {/* the following div is in case of ledger display */}
//         <div className={this.state.ledgerDisplay === true ? '' : 'display'}>
//           <br/><br/>
//         <p><b>ACCOUNT TITLE:</b> <span style={{color:'green'}}>{this.state.accountTitle} </span><br/>
//         <span style={{color:'red',fontSize:'20px'}}>Last 50-Transactions</span></p>
//         <table style={{maxWidth:'700px',margin:'auto'}}><thead><tr><th>Vouch#</th><th>Date</th><th>Remarks</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td>{item.voucherNumber}</td><td>{item.date}</td><td style={{maxWidth:'150px'}}>{item.narration}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit >=0 ? item.debit : ''}</td><td className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}>{item.debit <0 ? item.debit : ''}</td><td className={this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0) >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}><b>{this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0)}</b></td></tr>}).slice(this.state.ledgerFor30Days)    }</tbody></table>  {/*the Slice method is applied on map array to get only last 30 transactions as on your need*/ }
//         <button className="waves-effect waves-dark btn" onClick={this.backToTrial}>Back to summary</button>
        
//         </div>
//       <br/>
//         <div className={this.state.status === true ? '' : 'display'}>
        
//         </div>
        
//         </div>

//         {/* <iframe id="ifmcontentstoprint" style={{height:'0px', width: '0px', position: 'absolute'}}></iframe> */}
//         </div>

//       );
//     }
  
// }


// export default Trial;