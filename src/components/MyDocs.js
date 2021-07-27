import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'




class MyDocs extends Component{
  constructor(){
    super();
    this.state = {
      userEmail:null
     
    }
  }


  componentWillMount(){
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    
    this.setState({user:userId,userEmail:userEmail})
  }




    render(){
      return(
        <div>
          <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
        <div className='container'>
  
        
        <MainBarDocs/>
        <Route exact path='/MyDocs' component={DocumentsToBeUpload} />
        <Route path='/MyDocs/GetDocs' component={GetDocs}/>
        
        
        </div>
</div>
      );
    }
  
}

export default MyDocs






class MainBarDocs extends Component{
  constructor(){
    super();
    this.state = {
     
    }
  }




    render(){
      return(
        <div className='container' style={{border:'1px solid lemonchiffon', textAlign:'center', backgroundColor:'lemonchiffon'}}>
  
  <Link to='/MyDocs' style={{textDecoration:'none', marginRight:'22px'}}> Up-Load Documents</Link>
  <Link to='/MyDocs/GetDocs' style={{textDecoration:'none', marginRight:'22px'}}> Get Documents </Link>
   
        </div>

      );
    }
  
}







class DocumentsToBeUpload extends Component{
  constructor(){
      super();
      this.state = {
      userEmail:null,
      user:null,
      image:null,
      url:'',
      imageTitle:'',
      savedImgObjects: []
      }
  }

  componentWillMount(){
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    
    this.setState({user:userId,userEmail:userEmail})
  }
  

  componentDidMount(){

    firebase.database().ref('myImages'+this.state.user).on('child_added' , (data)=> { 
      this.state.savedImgObjects.push(data.val())
    }  )


  }





  handleChange = (e)=>{
// console.log(e.target.files[0])

if(e.target.files[0]){
  this.setState({image:e.target.files[0]})
}

  } 


  imgTitleChangeHandle = (e)=>{
this.setState({[e.target.name]: e.target.value})
  }



  upLoadImg =()=>{
    if(this.state.savedImgObjects.find(  (itm)=>{return itm.imageName === this.state.image.name}  ) ){ 
     alert('This image already exisit in Database, Please change your image Name')
    this.setState({imageTitle:''})
    }else{


const upLoadTask = firebase.storage().ref(`myImages/${this.state.image.name}`).put(this.state.image)
 
upLoadTask.on('state_changed' ,
 (snapshot)=>{} ,
  (error)=>{ alert(error)} , 
  ()=>{
    
    firebase.storage().ref(`myImages/${this.state.image.name}`).getDownloadURL().then(
   
      (url) =>{

        
      


      console.log(url)
      var obj ={}
      obj.imageTitle = this.state.imageTitle;
      obj.imgUrl = url;
      obj.imageName = this.state.image.name
      var key = firebase.database().ref('myImages'+this.state.user).push().key
      obj.key = key;
      firebase.database().ref('myImages'+this.state.user).child(key).set(obj)
      alert('successfully saved')
      this.setState({imageTitle:''})
        
      }
       
       
       )
  }
  );



    }
}





render(){

return (


<div>
{/* <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span> */}
<br/><br/>

<input type='file' onChange={this.handleChange} /> <br/>
<input type='text' onChange={this.imgTitleChangeHandle} value={this.state.imageTitle} name ='imageTitle' placeholder='Image Title Name'/> <br/>

<button onClick={this.upLoadImg}>Up Load Image</button>



{/* <img src="https://firebasestorage.googleapis.com/v0/b/myledgers-5c8bc.appspot.com/o/myImages%2F0001.jpg?alt=media&token=6a2e76c3-e6bc-433f-aa33-287df4424856" alt='Pic here'/> */}

</div>
);
}
}








class GetDocs extends Component{
  constructor(){
    super();
    this.state = {
     
    }
  }




    render(){
      return(
        <div>
  
  Get Documents 
        
        </div>

      );
    }
  
}