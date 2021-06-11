import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'


  class Content extends Component{
      constructor(){
          super();
          this.state = {
            // itemName:'',
            // costPrice:'',
            partyName:'',
            // partyContact:'',
            // ownerName:'',
            // message:'',    
          }
      }



changeHandler = (e) => {
this.setState({ 
  [e.target.name]: e.target.value
})

}





// saveItem = ()=> {
//   let obj = {};
//   obj.itemName = this.state.itemName;
//   // obj.costPrice = Number(this.state.costPrice);     Commented Now
  


//   var key = firebase.database().ref('itemList').push().key
//   obj.key = key
//   firebase.database().ref('itemList').child(key).set(obj)
//   alert('saved successfully')
//  this.setState({itemName:'', costPrice:'',age:''}) 

//  console.log(obj)

// }







saveParty = ()=> {
  let partyObj = {};
  partyObj.partyName = this.state.partyName;
  partyObj.sum = [0]
  // partyObj.partyContact = this.state.partyContact;
  // partyObj.ownerName = this.state.ownerName;
  // obj.costPrice = Number(this.state.costPrice);
  // obj.age = this.state.age;
  // Temporily coment
  // var msg = ['below are your messages'];
  // obj.msg = msg;
  var key = firebase.database().ref('partyList').push().key
  partyObj.key = key
  firebase.database().ref('partyList').child(key).set(partyObj)
  alert('saved successfully')
 this.setState({partyName:''}) 

 console.log(partyObj)

}













  render(){
    
    return (
    
    
    <div className='container'>
    {/* Add Item Name */}
    <br/><br/><br/>
    {/* <h2 className='headings'>Add Item Name</h2> */}
    {/* <input type='text'  value={this.state.itemName} name='itemName' onChange={this.changeHandler} placeholder='Add Your Item Name with Brand' />  <br/> */}
    {/* <input type='text' value={this.state.costPrice} name='costPrice' onChange={this.changeHandler} placeholder='cost Price' /> <br/>    Commented Now */}
    {/* <input type='text' value={this.state.age} name='age' onChange={this.changeHandler} placeholder='Age' /><br/>  */}
    {/* <button onClick={this.save}>Save</button> */}
    {/* <button className="waves-effect waves-dark btn" onClick={this.saveItem}>Save</button> */}








{/* Add Party */}
<br/><br/><br/>
    <h2 className='headings'>Create Account</h2>
    <input type='text'  value={this.state.partyName} name='partyName' onChange={this.changeHandler} placeholder='Account Title' />  <br/>
    {/* <input type='text' value={this.state.partyContact} name='partyContact' onChange={this.changeHandler} placeholder='Contact Details' /> <br/> */}
    {/* <input type='text' value={this.state.ownerName} name='ownerName' onChange={this.changeHandler} placeholder='ownerName' /><br/>  */}
    {/* <button onClick={this.save}>Save</button> */}
    <button className="waves-effect waves-dark btn" onClick={this.saveParty}>Save</button>







    </div>
  );
}
}

export default Content;
