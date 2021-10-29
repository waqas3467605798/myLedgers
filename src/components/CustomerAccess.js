import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'
import App from '../App'



//This Component is made to show the all App you made
class CustomerAccess extends Component{
    constructor(){
        super();
        this.state ={
            customerAccessList:[]
        }

    }


    async componentDidMount(){
        var dataPushPromise = new Promise( (res,rej)=>{
            var obj = [];
            firebase.database().ref('customerAccess').on('child_added' , (data)=> { 
              obj.push(data.val())
            }  )
            res(obj);
            rej('Operation Failed');        
        
      } )
      dataPushPromise.then((ob)=>{
  this.setState({customerAccessList:ob})
      },(err)=>{
        alert(err)
      })
  
    }












    showStmnt=()=>{



    }
    






    render(){
        return(
        <div>

<input type='text' name='keyWords' placeholder='write key words here' />
<button className="waves-effect waves-dark btn" onClick={this.showStmnt} >Show Statement</button>



        </div>
        )
    }
}

export default CustomerAccess;


