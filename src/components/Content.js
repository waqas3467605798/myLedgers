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





saveParty = ()=> {
  let partyObj = {};
  partyObj.partyName = this.state.partyName;
  partyObj.sum = [0]
  
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
