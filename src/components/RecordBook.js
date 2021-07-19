import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'


  


class RecordBook extends Component{
  constructor(){
    super();
    this.state = {
     
    }
  }




    render(){
      return(
        <div className='container'>
  
        <br/><br/>
        <MainBar/>
        <Route exact path='/RecordBook' component={AddSegment} />
         <Route path='/RecordBook/SaveData' component={SaveData}/>
        
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
          <div className='container'>
    
    <Link to='/RecordBook' style={{textDecoration:'none', marginRight:'22px'}}> Add Segment</Link>
     <Link to='/RecordBook/SaveData' style={{textDecoration:'none', marginRight:'22px'}}> Save Data </Link>
          
          </div>
  
        );
      }
    
  }






class AddSegment extends Component{
    constructor(){
      super();
      this.state = {
        firstName:'',
        address:'',
        user:'',
        userEmail:''
      }
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
            let obj = {};
            obj.firstName = this.state.firstName;
            obj.address = this.state.address;
            var key = firebase.database().ref('RecordBook'+this.state.user).push().key
            obj.key = key
            firebase.database().ref('RecordBook'+this.state.user).child(key).set(obj)
            alert('saved successfully')
           this.setState({firstName:'', address:''}) 
           
          }


      render(){
        return(
          <div className='container'>
    
           {/* Add new Account */}
    <br/><br/><br/>
    <h2 className='headings'>Segment Name</h2>
    <input type='text'  value={this.state.firstName} name='firstName' onChange={this.changeHandler} placeholder='Please Add your Segment Name' />  <br/>
    <input type='text'  value={this.state.address} name='address' onChange={this.changeHandler} placeholder='Address/Contact..etc' />  <br/>
    <button className="waves-effect waves-dark btn" onClick={this.save}>Save</button>
          
          </div>
  
        );
      }
    
  }
  
  
  




  class SaveData extends Component{
    constructor(){
      super();
      this.state = {
       
      }
    }
  
  
  
  
      render(){
        return(
          <div className='container'>
    
          This is Save Data
          
          </div>
  
        );
      }
    
  }