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
<Route exact path='/GetData/' component={PartyLedgers}/>
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
        
        <table className="striped grey"><thead><tr><th>Account Title</th><th>Balance</th></tr></thead><tbody>{this.state.partyObjects.map(  (name,ind)=>{return <tr key={ind} className={name.sum.reduce( (total,num)=>{return total+num},0)===0 ? 'display' : ''}><td>{name.partyName}</td><td>{name.sum.reduce( (total,num)=>{return total+num},0)}</td></tr>}  )}</tbody></table>
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

<table className="striped grey"><thead><tr><th>Date</th><th>Remarks</th><th>Amount</th></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td>{item.date}</td><td>{item.narration}</td><td>{item.debit}</td></tr>})}</tbody></table>

{/* sum of Quantity of item */}

{this.state.ledger.map(  (itm,indx)=>{ return <span key={indx} style={{color:'white'}}>{this.state.sum.push(itm.debit)}</span>}  )}
<b style={{color:'red'}}>Closing Balance = </b>
<b style={{color:'red'}}>  {this.state.sum.reduce( (total,num)=>{return total+num}, 0 )  }  </b>



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












