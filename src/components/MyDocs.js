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


  componentDidMount(){
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    
    this.setState({user:userId,userEmail:userEmail})
  }




    render(){
      return(
        <div>
          <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
        <div className='container'>
  
        <br/>
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
        <div style={{border:'1px solid lemonchiffon', textAlign:'center', backgroundColor:'lemonchiffon'}}>
  
  <Link to='/MyDocs' style={{textDecoration:'none', marginRight:'22px', color:'red'}}> Up-Load Documents</Link>
  <Link to='/MyDocs/GetDocs' style={{textDecoration:'none', marginRight:'22px', color:'red'}}> Get Documents </Link>
   
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
      savedImgObjects: [],
      plzWait:false
      }
  }


 async componentDidMount(){
    var dataPushPromise = new Promise( (res,rej)=>{
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email

    this.setState({user:userId,userEmail:userEmail})
    
    res()
    rej('Operation Failed: Data From Firebase does not push in state successfully')
  } )
  dataPushPromise.then(()=>{
    var pushPromise = new Promise((res,rej)=>{
      var obj = [];
      firebase.database().ref('myImages'+this.state.user).on('child_added' , (data)=> { 
        obj.push(data.val())
      }  )
      res(obj);
      rej('Operation Failed');
    })
    pushPromise.then((ob)=>{
      this.setState({savedImgObjects:ob})
    },(er)=>{
      alert(er)
    })


  },(err)=>{
    alert(err)
  })

}



// componentDidMount(){
//   var dataPushPromise = new Promise( (res,rej)=>{
//   var userId = firebase.auth().currentUser.uid;
//   var userEmail = firebase.auth().currentUser.email

//   this.setState({user:userId,userEmail:userEmail})
  
//   res()
//   rej('Operation Failed: Data From Firebase does not push in state successfully')
// } )
// dataPushPromise.then(()=>{
//   firebase.database().ref('myImages'+this.state.user).on('child_added' , (data)=> { 
//     this.state.savedImgObjects.push(data.val())
//   }  )
// },(err)=>{
//   alert(err)
// })

// }





  // componentWillMount(){
  //   var userId = firebase.auth().currentUser.uid;
  //   var userEmail = firebase.auth().currentUser.email
    
  //   this.setState({user:userId,userEmail:userEmail})
  // }
  

  // componentDidMount(){

  //   firebase.database().ref('myImages'+this.state.user).on('child_added' , (data)=> { 
  //     this.state.savedImgObjects.push(data.val())
  //   }  )


  // }





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

    if(this.state.image === null){
      alert('No File choose')
    }else{

    if(this.state.savedImgObjects.find(  (itm)=>{return itm.imageName === this.state.image.name}  ) ){ 
     alert('This image already exisit in Database, Please change your image Name')
    this.setState({imageTitle:''})
    }else{

if(this.state.imageTitle ===''){
  alert('Input Filed Cannot be emptpy')
}else{

const upLoadTask = firebase.storage().ref(`myImages${this.state.user}/${this.state.image.name}`).put(this.state.image)
 
upLoadTask.on('state_changed' ,
 (snapshot)=>{this.setState({plzWait:true})} ,
  (error)=>{ alert(error)} , 
  ()=>{
    
    firebase.storage().ref(`myImages${this.state.user}/${this.state.image.name}`).getDownloadURL().then(
   
      (url) =>{

        
      // console.log(url)
      var obj ={}
      obj.imageTitle = this.state.imageTitle.replace(/  +/g, ' ').trim();
      obj.imgUrl = url;
      obj.imageName = this.state.image.name
      var key = firebase.database().ref('myImages'+this.state.user).push().key
      obj.key = key;
      firebase.database().ref('myImages'+this.state.user).child(key).set(obj)
      this.state.savedImgObjects.push(obj)
      
      
      alert('successfully saved')
      this.setState({plzWait:false})
      this.setState({imageTitle:''})
      // console.log(this.state.savedImgObjects)
        
      }
       )
  }
  );
    }

    }
}

  }






render(){

return (


<div>
{/* <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span> */}
<br/><br/>

<input type='file' onChange={this.handleChange} /> <br/>
<input type='text' onChange={this.imgTitleChangeHandle} value={this.state.imageTitle} name ='imageTitle' placeholder='Image/File Title Name'/> <br/>

<button className="waves-effect waves-dark btn" onClick={this.upLoadImg}>Up Load File</button>

<p><b style={{color:'red', fontSize:'20px'}}> {this.state.plzWait === true ? 'Please wait, File is being Uploaded' : ''} </b> </p>




</div>
);
}
}








class GetDocs extends Component{
  constructor(){
    super();
    this.state = {
      status:false,
      user:'',
      userEmail:'',
      fileObjects:[],
      url:'',
      loadWait:false,
      delRefresh:false
    
     
    }
  }



 async componentDidMount(){
    var dataPushPromise = new Promise( (res,rej)=>{
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email

    this.setState({user:userId,userEmail:userEmail})
    
    res()
    rej('Operation Failed: Data From Firebase does not push in state successfully')
  } )
  dataPushPromise.then(()=>{
    var pushPromise = new Promise((res,rej)=>{
      var obj = [];
      firebase.database().ref('myImages'+this.state.user).on('child_added' , (data)=> { 
        obj.push(data.val())
      }  )
      res(obj);
      rej('Operation Failed');
    })
    pushPromise.then((ob)=>{
      this.setState({fileObjects:ob})
    },(er)=>{
      alert(er)
    })




  },(err)=>{
    alert(err)
  })

}



// componentDidMount(){
//   var dataPushPromise = new Promise( (res,rej)=>{
//   var userId = firebase.auth().currentUser.uid;
//   var userEmail = firebase.auth().currentUser.email

//   this.setState({user:userId,userEmail:userEmail})
  
//   res()
//   rej('Operation Failed: Data From Firebase does not push in state successfully')
// } )
// dataPushPromise.then(()=>{
//   firebase.database().ref('myImages'+this.state.user).on('child_added' , (data)=> { 
//     this.state.fileObjects.push(data.val())
//   }  )
// },(err)=>{
//   alert(err)
// })

// }



  // componentDidMount(){

  //   firebase.database().ref('myImages'+this.state.user).on('child_added' , (data)=> { 
  //     this.state.fileObjects.push(data.val())
  //   }  )



  // }
  


  // componentDidMount(){
  //   var userId = firebase.auth().currentUser.uid;
  //   var userEmail = firebase.auth().currentUser.email
    
  //   this.setState({user:userId,userEmail:userEmail})
  // }





  getData = ()=>{
    this.setState({status:true})        //As status true, the render function will run again - because of change in state
    
  }


  getFile =()=>{
    if(document.getElementById('selected_file').value){

    var objIndex = document.getElementById('selected_file').selectedIndex
    var reqObject = this.state.fileObjects[objIndex]
    var url = reqObject.imgUrl
    this.setState({url:url})


    }
    else{alert('Must select the File Name')}
  }




deleteFile =()=>{
var delKey = 'Y'
var clintKey = prompt("Write 'Y' and Press OK")
if(delKey === clintKey){


var objIndex = document.getElementById('selected_file').selectedIndex
var reqObject = this.state.fileObjects[objIndex]
var key = reqObject.key;
var imageName = reqObject.imageName
firebase.database().ref('myImages'+this.state.user).child(key).remove();

firebase.storage().ref(`myImages${this.state.user}`).child(imageName).delete();

this.state.fileObjects.splice(objIndex,1)

this.setState({delRefresh:true})

}else{
  alert('You have entered Wrong key')
}

}


delRfsh = () => {
  this.setState({delRefresh:false})
}



    render(){
      return(
        <div>
  <div className={this.state.delRefresh === false ? '' : 'display'}>

  <br/><br/>
<button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'80%'}}>Select File</button> <br/>
<div  style={{width:'80%'}}> <select className='browser-default' id='selected_file'>  {this.state.fileObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.imageTitle}</option>}  )}   </select> </div> <br/>
<button className="waves-effect waves-dark btn" onClick={this.getFile} style={{width:'30%',minWidth:'200px'}}>Get File</button> <br/>


  <div className={this.state.url === '' ? 'display' : ''}>
   <p> <a href={this.state.url} target='_blank'> {this.state.url} </a></p>
   <div style={{border:'1px solid black'}}>
   <img src={this.state.url} alt='image not available' width='95%' height='90%'/>
   </div>
<br/>
  <button onClick={this.deleteFile} className="waves-effect waves-dark btn"> Delete </button>      
  </div>


</div>






<div className={this.state.delRefresh === true ? '' : 'display'} style={{textAlign:'center'}}>
<br/><br/><br/><br/>
<b style={{color:'red',fontSize:'22px'}}>File Deleted Successfully</b> <br/>
<Link to='/MyDocs' >  <button onClick={this.delRfsh} className="waves-effect waves-dark btn">  OK </button>  </Link>
</div>



  </div>

      );
    }
  
}