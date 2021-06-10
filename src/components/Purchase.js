import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import M from "materialize-css";


  class Purchase extends Component{
      constructor(){
          super();
          this.state = {
            qty:'',
            date:'',
            narration:'',
            price:'',
            // age:'',
            // message:'',
            objects:[],
            partyObjects:[],
            status:false,         //this only for some changes in state, so that render function can run again
            // renderMsg:[],
            renderMstStatus:false,
            noData:null
            
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
      



changeHandler = (e) => {
this.setState({ 
  [e.target.name]: e.target.value
})

}




getData = ()=>{
this.setState({status:true})        //As status true, the render function will run again
}





saveValue = ()=>{

var obj = {}
obj.qty = Number(this.state.qty);
obj.costPrice = Number(this.state.price);
obj.date = this.state.date;
var itemObjIndex = document.getElementById('selected_save1').selectedIndex
var reqObj = this.state.objects[itemObjIndex]
obj.totalBill = Number(this.state.price)*Number(this.state.qty)     //multiplying by qty and price and saved in object with a property name of 'totolBill'
var party = document.getElementById('selected_save2').value
obj.partyName = party
// obj.costPrice = reqObj.costPrice



var partyObjIndex = document.getElementById('selected_save2').selectedIndex
var reqPartyObj = this.state.partyObjects[partyObjIndex]
var partyLedgerObj = {}
partyLedgerObj.qty = Number(this.state.qty);
partyLedgerObj.date = this.state.date;
partyLedgerObj.debit = -Number(this.state.price)*Number(this.state.qty)
partyLedgerObj.itemName = reqObj.itemName
partyLedgerObj.perUnitCost = Number(this.state.price)
var nrr = this.state.narration
partyLedgerObj.narration = nrr



//This code is for creation of purchaseData in itemList
if('purchaseData' in reqObj){
  reqObj.purchaseData.push(obj)
  firebase.database().ref('itemList').child(reqObj.key).set(reqObj)

}else {

reqObj.purchaseData = []
reqObj.purchaseData.push(obj)
firebase.database().ref('itemList').child(reqObj.key).set(reqObj)

}







//This code is for creation of Party Ledger in partyList
if('ledger' in reqPartyObj){
  reqPartyObj.ledger.push(partyLedgerObj)
  firebase.database().ref('partyList').child(reqPartyObj.key).set(reqPartyObj)
  
}else{
  reqPartyObj.ledger = []
  reqPartyObj.ledger.push(partyLedgerObj)
  firebase.database().ref('partyList').child(reqPartyObj.key).set(reqPartyObj)
  
}










alert('Your message successfully saved..!')
this.setState({qty:'',date:'',narration:'',price:''})


}












  render(){
    // var {objects} = this.state
    return (
    
    
    <div>
    
    <h2 className='headings'>Add Purchases</h2>

      {/* Save messages */}
      
    {/* <h2 className='headings'>Select Item From the listed below</h2> */}
    <button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select item</button> <br/>
    <div className='selectWidth'> <select className='browser-default' id='selected_save1'>  {this.state.objects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.itemName}</option>}  )}   </select> </div> <br/>
    
    
    <button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select Party</button> <br/>
    <div className='selectWidth'> <select className='browser-default' id='selected_save2'>  {this.state.partyObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.partyName}</option>}  )}   </select> </div> <br/>
    
    
    
    <input type='text' value={this.state.qty} name='qty' onChange={this.changeHandler} placeholder='Quantity'/> <br/>
    <input type='text' value={this.state.price} name='price' onChange={this.changeHandler} placeholder='Price Per Unit'/> <br/>     
    <input type='text' value={this.state.date} name='date' onChange={this.changeHandler} placeholder='Date (01-Jan-2021)'/> <br/>
    <input type='text' value={this.state.narration} name='narration' onChange={this.changeHandler} placeholder='Remarks/Narration'/> <br/>
    <button className="waves-effect waves-light btn" onClick={this.saveValue}>Save</button>






  </div>
  );
}
}

export default Purchase;
