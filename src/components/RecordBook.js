import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'


  


class RecordBook extends Component{
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
  
        
        <MainBar/>
        <Route exact path='/RecordBook' component={AddSegment} />
         <Route path='/RecordBook/SaveData' component={SaveData}/>
         <Route path='/RecordBook/GetData' component={GetData}/>
        
        </div>
</div>
      );
    }
  
}


export default RecordBook;




class MainBar extends Component{
    constructor(){
      super();
      this.state = {
       
      }
    }
  
  
  
  
      render(){
        return(
          <div className='container' style={{border:'1px solid lemonchiffon', textAlign:'center', backgroundColor:'lemonchiffon'}}>
    
    <Link to='/RecordBook' style={{textDecoration:'none', marginRight:'22px'}}> Add Segment</Link>
     <Link to='/RecordBook/SaveData' style={{textDecoration:'none', marginRight:'22px'}}> Save Data </Link>
     <Link to='/RecordBook/GetData' style={{textDecoration:'none', marginRight:'22px'}}> Get Data </Link>
          
          </div>
  
        );
      }
    
  }






class AddSegment extends Component{
    constructor(){
      super();
      this.state = {
        objects:[],
        firstName:'',
        address:'',
        getListStatus:false,
        user:'',
        userEmail:''
      }
    }



    componentDidMount(){
      firebase.database().ref('RecordBook'+this.state.user).on('child_added' , (data)=> { 
        this.state.objects.push(data.val())

      }  ) 
    }

  
  
    componentWillMount(){
        var userId = firebase.auth().currentUser.uid;
        var userEmail = firebase.auth().currentUser.email
        
        this.setState({user:userId,userEmail:userEmail})
      }






    changeHandler = (e) => {
        this.setState({ 
          [e.target.name]: e.target.value
        })        
        }
        




        save = ()=> {
          if(this.state.firstName === '' || this.state.address === ''){alert('you must fill all the fields')}else{


            let obj = {};
            obj.firstName = this.state.firstName.replace(/  +/g, ' ').trim();
            obj.address = this.state.address.replace(/  +/g, ' ').trim();;
            var key = firebase.database().ref('RecordBook'+this.state.user).push().key
            obj.key = key
            firebase.database().ref('RecordBook'+this.state.user).child(key).set(obj)
            alert('saved successfully')
           this.setState({firstName:'', address:''}) 
           
          }
          }




          getList = () =>{
            this.setState({getListStatus:true})
            }


            editAccount =(i)=>{
              var reqObj = this.state.objects[i]
              var key = this.state.objects[i].key
              var editAccount = prompt('Please edit Account Title',reqObj.firstName)
              var editAddress = prompt('Please edit Address/Contact..etc',reqObj.address)
            
              reqObj.firstName = editAccount.replace(/  +/g, ' ').trim();
              reqObj.address = editAddress.replace(/  +/g, ' ').trim();
            
            
              firebase.database().ref('RecordBook'+this.state.user).child(reqObj.key).set(reqObj)
              
            
              this.state.objects.splice(i,1,reqObj)
              // this.setState({partyObjects:updateObj})
              
              // this.setState({editRefresh:true})
            }
            




      render(){
        return(
          <div>
    
           {/* Add new Account */}
    
    <h2 className='headings'>Create Segment</h2>
    <input type='text'  value={this.state.firstName} name='firstName' onChange={this.changeHandler} placeholder='Please Add your Segment Name' />  <br/>
    <input type='text'  value={this.state.address} name='address' onChange={this.changeHandler} placeholder='Remarks' />  <br/>
    <button className="waves-effect waves-dark btn" onClick={this.save}>Save</button>
          




<br/><br/>

    <h2 className='headings'>List of All Segments</h2>
    <button className="waves-effect waves-dark btn" onClick={this.getList}>Get List</button>

<div className={this.state.getListStatus === false ? 'display' : ''}>
    <table><thead><tr><th>Account Title</th><th>Remarks</th></tr></thead><tbody>{this.state.objects.map(  (item,index)=>{return <tr key={index}><td>{(index+1) + '- ' + item.firstName}</td><td>{item.address}</td><td><a href='#' className="material-icons" onClick={()=> this.editAccount(index)}>edit</a></td></tr>})    }</tbody></table> 
{/* </div> */}
</div>




 </div>
  
        );
      }
    
  }
  
  
  




  class SaveData extends Component{
    constructor(){
      super();
      this.state = {
       user:'',
       userEmail:'',
       objects:[],
       message:''
      }
    }
  
  
    componentWillMount(){
      var userId = firebase.auth().currentUser.uid;
      var userEmail = firebase.auth().currentUser.email
      
      this.setState({user:userId,userEmail:userEmail})
    }



    componentDidMount(){
      firebase.database().ref('RecordBook'+this.state.user).on('child_added' , (data)=> { 
        this.state.objects.push(data.val())

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
          if(document.getElementById('selected_save1').value){
            if(this.state.message === ''){alert('you must fill all the fields')}else{

           var objIndex = document.getElementById('selected_save1').selectedIndex
           var reqOjb = this.state.objects[objIndex]
           var message = this.state.message;
         
         
         if('msg' in reqOjb){
             reqOjb.msg.push(message)
         
             firebase.database().ref('RecordBook'+this.state.user).child(reqOjb.key).set(reqOjb)
         
            //for updation in state
            this.state.objects.splice(objIndex,1,reqOjb)
             alert('Your message successfully saved..!')
             this.setState({message:''})
         console.log(this.state.objects)
           }else {
             reqOjb.msg = []
           reqOjb.msg.push(message)
           firebase.database().ref('RecordBook'+this.state.user).child(reqOjb.key).set(reqOjb)
           //for updation in state
           this.state.objects.splice(objIndex,1,reqOjb)
           alert('Your message successfully saved..!')
             this.setState({message:''})
           }
         
          }
         }else{alert('please Select the Account First')}
         }



  
      render(){
        return(
      <div>
    
    
    
    <h2 className='headings'>Save your data here;</h2>
    <div><button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'80%'}}>Select Account</button> </div>
    <div style={{width:'80%',textAlign:'center'}}> <select className='browser-default' id='selected_save1'>  {this.state.objects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.firstName}</option>}  )}   </select> </div> <br/>
    <input type='text' value={this.state.message} name='message' onChange={this.changeHandler} placeholder='Write your Message here'/> <br/>

    <button className="waves-effect waves-dark btn" onClick={this.saveValue}>Save</button>

          
          </div>
  
        );
      }
    
  }





  class GetData extends Component{
    constructor(){
      super();
      this.state = {
       user:'',
       userEmail:'',
       objects:[],
       status:false,
      renderMsg:[],
      renderMstStatus:false,
      noData:null,
      // update: false,
      // edit:false,
      segDelete:false
      }
    }
  
  
    componentWillMount(){
      var userId = firebase.auth().currentUser.uid;
      var userEmail = firebase.auth().currentUser.email
      
      this.setState({user:userId,userEmail:userEmail})
    }



    componentDidMount(){
      firebase.database().ref('RecordBook'+this.state.user).on('child_added' , (data)=> { 
        this.state.objects.push(data.val())

      }  ) 
    }



    getData = ()=>{
      this.setState({status:true})        //As status true, the render function will run again
    }




    getMessages = ()=>{
  
      if(document.getElementById('selectMsg').value){
      
    
      var objIndex = document.getElementById('selectMsg').selectedIndex
      var reqOjb = this.state.objects[objIndex]
    
      if('msg' in reqOjb){
       var savedMsg = reqOjb.msg;
       this.setState({renderMsg: savedMsg, renderMstStatus:true, noData:null})
      
    
      }
      else{
        
        var noDataFound = 'No data found'
        this.setState({noData: noDataFound, renderMstStatus:false})
        console.log(noDataFound)
        
      }
    
      }else{alert('Please select the Account First')}
    
    }
    
    
    
    
    
    deleteReminder = (index)=> {
      var delKey = prompt("write 'Y' and Press OK")
    if(delKey === 'Y'){
    
      var objIndx = document.getElementById('selectMsg').selectedIndex
    var segName = document.getElementById('selectMsg').value
    var reqObj = this.state.objects.find(  (obj)=>{return obj.firstName === segName}  )
    reqObj.msg.splice(index,1)
    firebase.database().ref('RecordBook'+this.state.user).child(reqObj.key).set(reqObj)
    
    var updateObj = this.state.objects.splice(objIndx,1,reqObj)
    this.setState({objects:updateObj}) 
    
    }else{alert('you have entered wrong key')}
    
    
    
    }
    
    
  
    
    editReminder =(index)=>{
      var segName = document.getElementById('selectMsg').value
      var reqObj = this.state.objects.find(  (obj)=>{return obj.firstName === segName}  )
      var segindx = document.getElementById('selectMsg').selectedIndex
      var key = this.state.objects[segindx].key
      var msg = this.state.objects[segindx].msg
      var editAlert = prompt('Please edit your message',msg[index])
      reqObj.msg.splice(index,1,editAlert)
    
      firebase.database().ref('RecordBook'+this.state.user).child(reqObj.key).set(reqObj)
    
    var updateObj = this.state.objects.splice(segindx,1,reqObj)
    this.setState({objects:updateObj}) 
      // this.setState({edit:true})

    }
    
    
    
    
    
    segmentDelete = ()=>{
      var delKey = prompt("write 'Y' and Press OK")
      if(delKey === 'Y'){
    
    
    
      var segName = document.getElementById('selectMsg').value
      var reqObj = this.state.objects.find(  (obj)=>{return obj.firstName === segName}  )
      var key = reqObj.key
      firebase.database().ref('RecordBook'+this.state.user).child(key).remove()
    
    
    
      this.setState({segDelete:true, objects:[]})
    console.log(key)
    
    
    }else{alert('you have entered wrong key')}
    
    
    }
    
   
    
    
    
    
    
    
    segDelRefresh=()=>{
    this.setState({segDelete:false})
    
    
    
    firebase.database().ref('RecordBook'+this.state.user).on('child_added' , (data)=> { 
              this.state.objects.push(data.val())
    
            }  ) 

    
    }





  
      render(){
        return(
          <div>
    
    
      <div className={this.state.segDelete === false ? '' : 'display'}>
    {/* Get Messages */}
    
    <div>
    <h2 className='headings'>Get Your Record </h2>
    <button className="waves-effect waves-dark btn" onClick={this.getData} style={{width:'80%'}}>Select Account</button>  <br/>
    <div style={{width:'80%',textAlign:'center'}}><select className='browser-default' id='selectMsg'>  {this.state.objects.map(  (item,i)=>{ return <option key={i} value={item.firstName} className='browser-default'>{item.firstName}</option>}  )}   </select> </div> <br/>
    <button className="waves-effect waves-dark btn" onClick={this.getMessages}>Get Messages</button></div>


    <div className={this.state.renderMstStatus === true ? '' : 'display'}>
     <table><tbody><tr><th>Description</th><th>Delet/edit</th></tr>{this.state.renderMsg.map(  (item,i)=>{return <tr key={i}><td id={`toDelete${i}`}><b>{i} - </b> {item}</td><td><button onClick={()=> this.deleteReminder(i)}> Delete </button><button onClick={()=> this.editReminder(i)}> Edit </button></td></tr>}  )}</tbody></table>
     <br/><br/>
     <button className="waves-effect waves-dark btn red" onClick={this.segmentDelete}>Delete this segment</button>
    <p className="red-text">It will delete the Segment as well as all its stored messages/data</p>
    </div>

      <div className={this.state.noData === null ? 'display' : ''}>
     <h4>
        {this.state.noData}
     </h4>
     <br/><hr/><button className="waves-effect waves-dark btn red" onClick={this.segmentDelete}>Delete this segment</button>
     <p className="red-text">It will delete the Segment as well as all its stored messages/data</p>
     </div>


</div>
    





<div className={this.state.segDelete === false ? 'display' : ''} style={{textAlign:'center'}}>
  <br/><br/><br/><br/>
  <h4 style={{color:'red'}}>Segment Deleted successfully</h4>
  <Link to='/RecordBook/SaveData' onClick={this.segDelRefresh}> <button className="waves-effect waves-dark btn"> OK </button></Link>
</div>


</div>
  
        );
      }
    
  }