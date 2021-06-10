import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'

import firebase from './Fire'


  






class GetData extends Component{
  constructor(){
      super();
      this.state = {
        objects:[],
        partyObjects:[]
        
      }
  }


render(){

return (


<div>
  <br/> <br/>


<div>
<Link to='/GetData/Stock' style={{textDecoration:'none', marginRight:'50px'}}> Stocks </Link>
<Link to='/GetData/Ledger' style={{textDecoration:'none', marginRight:'50px'}}> Ledger </Link>
</div>

<br/>

<div>      
<Route path='/GetData/Stock' component={Stock}/>
<Route path='/GetData/Ledger' component={partyLedgers}/>
</div>




</div>

);
}
}


export default GetData;







//the Stock component
class Stock extends Component{
  constructor(){
      super();
      this.state = {
        objects:[],
        partyObjects:[],
        status:false,
        itemLedger: [],
        purchases:[],
        qtyTotal:[],
        renderPurchaseData:false,
        noData:null,
        sum:[],
        sumQty:[]
        
      }
  }



  componentDidMount(){

    
    firebase.database().ref('itemList').on('child_added' , (data)=> { 
      this.state.objects.push(data.val())
      
      // this.state.sum.push(data.val().purchaseData)
    }  )
    
    
    firebase.database().ref('partyList').on('child_added' , (data)=> { 
      this.state.partyObjects.push(data.val())
    }  )




  }
  


  
  getData = ()=>{
    this.setState({status:true})        //As status true, the render function will run again - because of change in state
    this.setState({sum:[], sumQty:[]})  //As the render method will run again, so the array of sum and sumQty in state should be zero
  }


    itemLedger = ()=> {
var objIndex = document.getElementById('selected_save3').selectedIndex
var reqObj = this.state.objects[objIndex]



if('purchaseData' in reqObj){
  var purchasesData = reqObj.purchaseData;
  this.setState({purchases: purchasesData, renderPurchaseData:true, noData:null})
 

 }
 else{
   
   var noDataFound = 'No data found'
   this.setState({noData: noDataFound, renderPurchaseData:false})
   console.log(noDataFound)
   
 }


this.setState({sum:[], sumQty:[]}) //As the render method will run again, so the array of sum and sumQty in state should be zero
    }



render(){

return (


<div>

<button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select item</button> <br/>
<div className='selectWidth'> <select className='browser-default' id='selected_save3'>  {this.state.objects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.itemName}</option>}  )}   </select> </div> <br/>
<button className="waves-effect waves-light btn" onClick={this.itemLedger} style={{width:'30%'}}>Get Data</button> <br/>


{/* in case of purchase data found */}
<div className={this.state.renderPurchaseData === true ? '' : 'display'}>

<table><thead><tr><th>Date</th><th>Qty</th><th>Rate</th><th>Total Cost</th><th>Party Name</th></tr></thead><tbody>{this.state.purchases.map(  (item,index)=>{return <tr key={index}><td>{item.date}</td><td>{item.qty}</td><td>{item.costPrice}</td><td>{item.totalBill}</td><td>{item.partyName}</td></tr>})}</tbody></table>

{/* sum of Quantity of item */}

{this.state.purchases.map(  (itm,indx)=>{ return <span key={indx} style={{color:'white'}}>{this.state.sumQty.push(itm.qty)}</span>}  )}
<b style={{color:'red'}}>Balance Quantity (Stock) = </b>
<b style={{color:'red'}}>  {this.state.sumQty.reduce( (total,num)=>{return total+num}, 0 )  }  </b>


<br/>

{/* Sum of stock value in Rs. */}
{this.state.purchases.map(  (itm,indx)=>{ return <span key={indx} style={{color:'white'}}>{this.state.sum.push(itm.totalBill)}</span>}  )}
<b style={{color:'red'}}>Stock value in Rs. = </b>
<b style={{color:'red'}}>  {this.state.sum.reduce( (total,num)=>{return total+num}, 0 )  }  </b>





</div>


{/* in case of no data found of purchases */}
<div className={this.state.noData === null ? 'display' : ''}>
     <h4>
        {this.state.noData}
     </h4>
     {/* <br/><hr/><button className="waves-effect waves-dark btn red" onClick={this.segmentDelete}>Delete this segment</button>
     <p className="red-text">It will delete the Segment as well as all its stored messages/data</p> */}
</div>






</div>
);
}
}











//Another Component of Party Ledgers
class partyLedgers extends Component{
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

    
    firebase.database().ref('itemList').on('child_added' , (data)=> { 
      this.state.objects.push(data.val())
    }  )
    
    
    firebase.database().ref('partyList').on('child_added' , (data)=> { 
      this.state.partyObjects.push(data.val())
    }  )



  }
  


  
getData = ()=>{
    this.setState({status:true})        //As status true, the render function will run again - because of change in state
    this.setState({sum:[]})  //As the render method will run again, so the array of sum and sumQty in state should be zero
  }


    partyLedger = ()=> {
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
    }



render(){

return (


<div>

<button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select Party</button> <br/>
<div className='selectWidth'> <select className='browser-default' id='selected_save4'>  {this.state.partyObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.partyName}</option>}  )}   </select> </div> <br/>
<button className="waves-effect waves-light btn" onClick={this.partyLedger} style={{width:'30%'}}>Get Data</button> <br/>


{/* in case of purchase data found */}
<div className={this.state.renderLedgerData === true ? '' : 'display'}>

<table><thead><tr><th>Date</th><th>Remarks</th><th>Amount</th></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td>{item.date}</td><td>{`${item.itemName} Qty: ${item.qty} @ ${item.perUnitCost}  ${item.narration}`}</td><td>{item.debit}</td></tr>})}</tbody></table>

{/* sum of Quantity of item */}

{this.state.ledger.map(  (itm,indx)=>{ return <span key={indx} style={{color:'white'}}>{this.state.sum.push(itm.debit)}</span>}  )}
<b style={{color:'red'}}>Closing Balance = </b>
<b style={{color:'red'}}>  {this.state.sum.reduce( (total,num)=>{return total+num}, 0 )  }  </b>



</div>


{/* in case of no data found of purchases */}
<div className={this.state.noData === null ? 'display' : ''}>
     <h4>
        {this.state.noData}
     </h4>
     
</div>






</div>
);
}
}






























// import react, {Component} from 'react'
// import '../App.css';
// import firebase from './Fire'


//   class GetData extends Component{
//       constructor(){
//           super();
//           this.state = {
//             firstName:'',
//             // secondName:'',
//             // age:'',
//             message:'',
//             objects:[],
//             status:false,
//             renderMsg:[],
//             renderMstStatus:false,
//             noData:null,
//             closingStatus:false
            
//           }
//       }



//       componentDidMount(){
//         firebase.database().ref('bioData').on('child_added' , (data)=> { 
//           this.state.objects.push(data.val())

      
//         }  ) 

//         // setTimeout(()=>{ this.setState({status:!this.state.status})},1000)
//       }
      



// changeHandler = (e) => {
// this.setState({ 
//   [e.target.name]: e.target.value
// })

// }



// getData = ()=>{
//   // firebase.database().ref('bioData').on('child_added' , (data)=> { console.log(data.val())}  )

//   this.setState({status:true})        //As status true, the render function will run again
// }


// getMessages = ()=>{
//   // var val = document.getElementById('selectMsg').value
//   // var reqOjb = this.state.objects.find( (x)=>{return x.firstName === val}  )

  
//   var objIndex = document.getElementById('selectMsg').selectedIndex
//   var reqOjb = this.state.objects[objIndex]

//   if('msg' in reqOjb){
//    var savedMsg = reqOjb.msg;
//    this.setState({renderMsg: savedMsg, renderMstStatus:true, noData:null})
  

//   }
//   else{
    
//     var noDataFound = 'No data found'
//     this.setState({noData: noDataFound, renderMstStatus:false})
//     console.log(noDataFound)
    
//   }



//   this.setState({closingStatus:true})

// }





// deleteReminder = (index)=> {
// var segName = document.getElementById('selectMsg').value

// var reqObj = this.state.objects.find(  (obj)=>{return obj.firstName === segName}  )
// reqObj.msg.splice(index,1)



// firebase.database().ref('bioData').child(reqObj.key).set(reqObj)

// document.getElementById(`toDelete${index}`).style.color = 'red'

// alert('Deleted Successfully')

// // window.location.reload(false)

// }





//   render(){
    
//     return (
    
    
//     <div>
    
  
//     {/* Get Messages */}
//     <br/><br/><br/> 
//     <h2 className='headings'>Select Account and get your data</h2>
//     <button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select Account</button> <br/>
//     <div className='selectWidth'><select className='browser-default' id='selectMsg'>  {this.state.objects.map(  (item,i)=>{ return <option key={i} value={item.firstName} className='browser-default'>{item.firstName}</option>}  )}   </select> </div> <br/>
//     {/* <button onClick={this.getMessages}>Get Messages</button> */}
//     <button className="waves-effect waves-light btn" onClick={this.getMessages}>Get Messages</button>


//     <div className={this.state.renderMstStatus === true ? '' : 'display'}>
//      <table><tbody><tr><th>Description</th><th>Delet/edit</th></tr>{this.state.renderMsg.map(  (item,i)=>{return <tr key={i}><td id={`toDelete${i}`}><b>{i} - </b> {item}</td><td><button onClick={()=> this.deleteReminder(i)}> Delete </button><button> Edit </button></td></tr>}  )}</tbody></table>
//     </div>

//      <h4 className={this.state.noData === null ? 'display' : ''}>
//         {this.state.noData}
//      </h4>
     



// {/* Botom end design */}
// <div className={this.state.closingStatus === false ? 'display' : ''} style={{backgroundColor:'lawngreen'}}>
// <hr/>
// <p style={{textAlign:'center'}}> <b>End</b></p>
// <hr/>
// </div>






//     </div>
//   );
// }
// }

// export default GetData;












