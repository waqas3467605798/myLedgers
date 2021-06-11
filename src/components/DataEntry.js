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
            noData:null
            
          }
      }



      componentDidMount(){

          firebase.database().ref('partyList').on('child_added' , (data)=> { 
          this.state.partyObjects.push(data.val())
        }  )



      }
      



changeHandler = (e) => {
this.setState({ 
  [e.target.name]: e.target.value
})

}




getData = ()=>{
this.setState({status:true})        //As status true, the render function will run again
}





saveValue = ()=>{


var partyObjIndex = document.getElementById('selected_save2').selectedIndex
var reqPartyObj = this.state.partyObjects[partyObjIndex]
var partyLedgerObj = {}
partyLedgerObj.debit = Number(this.state.debit);
partyLedgerObj.date = this.state.date;
var nrr = this.state.narration
partyLedgerObj.narration = nrr



// reqPartyObj.sum = []
// reqPartyObj.sum.push()









//This code is for creation of Party Ledger in partyList
if('ledger' in reqPartyObj){
  reqPartyObj.ledger.push(partyLedgerObj)
  firebase.database().ref('partyList').child(reqPartyObj.key).set(reqPartyObj)
  
}else{
  reqPartyObj.ledger = []
  reqPartyObj.ledger.push(partyLedgerObj)
  firebase.database().ref('partyList').child(reqPartyObj.key).set(reqPartyObj)
}




// For creating of array for sum in party object
if('sum' in reqPartyObj){
  reqPartyObj.sum.push(Number(this.state.debit))
  firebase.database().ref('partyList').child(reqPartyObj.key).set(reqPartyObj)
  
}else{
  reqPartyObj.sum = []
  reqPartyObj.sum.push(Number(this.state.debit))
  firebase.database().ref('partyList').child(reqPartyObj.key).set(reqPartyObj)
}





alert('Your message successfully saved..!')
this.setState({debit:'',date:'',narration:''})


}







  render(){
    // var {objects} = this.state
    return (
    
    
    <div className='container'>
    
    <h2 className='headings'>Make an Entry</h2>

    <button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select Account</button> <br/>
    <div className='selectWidth'> <select className='browser-default' id='selected_save2'>  {this.state.partyObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.partyName}</option>}  )}   </select> </div> <br/>
    
    <input type='text' value={this.state.date} name='date' onChange={this.changeHandler} placeholder='Date (01-Jan-2021)'/> <br/>
    <input type='text' value={this.state.narration} name='narration' onChange={this.changeHandler} placeholder='Remarks/Narration'/> <br/>
    <input type='text' value={this.state.debit} name='debit' onChange={this.changeHandler} placeholder='Amount +Debit / -Credit'/> <br/>
    <button className="waves-effect waves-light btn" onClick={this.saveValue}>Save</button>






  </div>
  );
}
}

export default DataEntry;
