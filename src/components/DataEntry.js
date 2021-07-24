import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import M from "materialize-css";


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
            netDisconnect:true
            
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

      // setUser = ()=>{
      //   firebase.auth().onAuthStateChanged( (user)=>{
      //       if(user){
      //           this.setState({user:user.uid})
      //           // console.log(user.email)
        
        
      //       } else {
      //           this.setState({user:null})
      //       }
      //   })
      //   }









changeHandler = (e) => {

this.setState({ 
  [e.target.name]: e.target.value
})


}




getData = ()=>{
this.setState({status:true})        //As status true, the render function will run again
}





saveValue = ()=>{
 if(navigator.onLine){    //it is only to check either your connected to the internet or not 

if(this.state.date === '' || this.state.narration === '' || this.state.debit === ''){alert('you must fill all the fields')}else{

if(document.getElementById('selected_save2').value){

var partyObjIndex = document.getElementById('selected_save2').selectedIndex
var reqPartyObj = this.state.partyObjects[partyObjIndex]
var partyLedgerObj = {}
partyLedgerObj.debit = Number(this.state.debit);
partyLedgerObj.date = this.state.date;
var nrr = this.state.narration
partyLedgerObj.narration = nrr


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
this.setState({debit:'',date:'',narration:''})

}else{alert('Please select the Account First')}

}


 }else{this.setState({netDisconnect:false})}

}







  render(){
    // var {objects} = this.state
    return (
    
    <div className='container' style={{textAlign:'center'}}>
    <br/>
  {/* <div style={{color:'green'}}><b> {this.state.userEmail}</b></div> */}
{/* <div className={this.state.netDisconnect === true ? '' : 'display'} */}
<div className={this.state.netDisconnect === true ? '' : 'display'}>

    <h2 className='headings'>Data Entry</h2>
    <button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'30%',minWidth:'200px'}}>Select Account</button> <br/>
    <div className='selectWidth'> <select className='browser-default' id='selected_save2'>  {this.state.partyObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.partyName}</option>}  )}   </select> </div> <br/>
    
    <input type='date' value={this.state.date} name='date' onChange={this.changeHandler} placeholder='Date (01-Jan-2021)' /> <br/>
    <input type='text' value={this.state.narration} name='narration' onChange={this.changeHandler} placeholder='Remarks/Narration' /> <br/>
    <input type='number' value={this.state.debit} name='debit' onChange={this.changeHandler} placeholder='Amount +Debit / -Credit' /> <br/>
    <button className="waves-effect waves-dark btn" onClick={this.saveValue}>Save</button>



    </div>


    <div className={this.state.netDisconnect === true ? 'display' : ''}>
      <br/><br/><br/>
      <h4 className='container red-text'>Something Went Wrong, <br/> Plz check you internet connectione</h4>
     
      </div>



  </div>
  );
}
}

export default DataEntry;
