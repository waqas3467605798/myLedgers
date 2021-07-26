import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'





class MyDocs extends Component{
  constructor(){
      super();
      this.state = {
      userEmail:null,
      user:null,
      image:null,
      url:''
      }
  }

  componentWillMount(){
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    
    this.setState({user:userId,userEmail:userEmail})
  }
  


  handleChange = (e)=>{
// console.log(e.target.files[0])

if(e.target.files[0]){
  this.setState({image:e.target.files[0]})
}

  } 


  upLoadImg =()=>{
// console.log(this.state.image.name)
const upLoadTask = firebase.storage().ref(`myImages/${this.state.image.name}`).put(this.state.image)
 
upLoadTask.on('state_changed' ,
 (snapshot)=>{} ,
  (error)=>{} , 
  ()=>{
    firebase.storage().ref(`myImages/${this.state.image.name}`).getDownloadURL().then( (url) =>{console.log(url)})
  }
  );


}


render(){

return (


<div>
<span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
<br/>

<input type='file' onChange={this.handleChange} />
<button onClick={this.upLoadImg}>Up Load Image</button>

</div>
);
}
}

export default MyDocs