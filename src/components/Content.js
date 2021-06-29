import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link, Route,BrowserRouter} from 'react-router-dom'

  class Content extends Component{
      constructor(){
          super();
          this.state = {
            // itemName:'',
            address:'',
            partyName:'',
            partyObjects:[],
            getListStatus:false,
            editRefresh:false,
            user:null
          }
      }




      componentDidMount(){

        firebase.database().ref('partyList').on('child_added' , (data)=> { 
          this.state.partyObjects.push(data.val())
        }  )
    
        this.authListener();
      }






      authListener = ()=>{
        firebase.auth().onAuthStateChanged( (user)=>{
            if(user){
                this.setState({user:user.uid})
                // console.log(user.uid)
        
        
            } else {
                this.setState({user:null})
            }
        })
        }











changeHandler = (e) => {
this.setState({ 
  [e.target.name]: e.target.value
})

}





saveParty = ()=> {
  let partyObj = {};
  partyObj.partyName = this.state.partyName;
  partyObj.address = this.state.address;
  partyObj.sum = [0]
  
  
  var key = firebase.database().ref('partyList').push().key
  partyObj.key = key
  firebase.database().ref('partyList').child(key).set(partyObj)
  alert('saved successfully')
 this.setState({partyName:'', address:''}) 

 console.log(partyObj)

}




getList = () =>{
this.setState({getListStatus:true})
}



editAccount =(i)=>{
  var reqObj = this.state.partyObjects[i]
  var key = this.state.partyObjects[i].key
  var editAccount = prompt('Please edit Account Title',reqObj.partyName)
  var editAddress = prompt('Please edit Address/Contact..etc',reqObj.address)

  reqObj.partyName = editAccount
  reqObj.address = editAddress


  firebase.database().ref('partyList').child(reqObj.key).set(reqObj)
  this.setState({editRefresh:true})
}



editRefresh = ()=>{
this.setState({editRefresh:false})
}



  render(){
    
    return (
    
    
    <div className='container'>
    <div className={this.state.editRefresh === false ? '' : 'display'}>
  
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
</div>
</div>



<div className={this.state.editRefresh === false ? 'display' : ''} style={{textAlign:'center'}}>
  <br/><br/><br/><br/>
  <h4 style={{color:'red'}}>Account Edited successfully</h4>
  <Link to='/Content' onClick={this.editRefresh}> <button className="waves-effect waves-dark btn"> OK </button></Link>
</div>




{this.state.user}
    </div>
  );
}
}

export default Content;
