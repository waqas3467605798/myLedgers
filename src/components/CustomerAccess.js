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
            customerAccessList:[],
            uid:'',
            keyWords:'',
            ledger:[],
            ledgerBalance:[]
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



    changeHandler= (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }








    showStmnt=()=>{

    var uidPromise = new Promise((res,rej)=>{
        var reqObj = this.state.customerAccessList.find( (o)=>{return o.keyWords === this.state.keyWords}  )
    res(reqObj)
    rej('Operation faild')
    })
    uidPromise.then( (rqObj)=>{
        var objectsPromise = new Promise(  (res,rej)=>{ 
            var partyObjects=[]
            firebase.database().ref('partyList'+rqObj.uid).on('child_added' , (data)=> { 
                partyObjects.push(data.val())
              }  )
        res(partyObjects)
        rej('operation faild')
            }  )
            objectsPromise.then( (objts)=>{
                var ourObjectPromise = new Promise( (res,rej)=>{
                var displayObj = objts.find((o)=>{return o.keyWords === this.state.keyWords})
            res(displayObj)
            rej('operation failed')
            } ) //from here dot then will be run
            ourObjectPromise.then( (oo)=>{this.setState({ledger:oo.ledger, ledgerBalance:oo.sum})},(er)=>{} )
                
            }, (errr)=>{}  )
        
}, (err)=>{}  )





    }
    






    render(){
        return(
        <div>

<input type='text' name='keyWords' onChange={this.changeHandler} placeholder='write key words here' />
<button className="waves-effect waves-dark btn" onClick={this.showStmnt} >Show Statement</button>


<table style={{maxWidth:'950px',margin:'auto'}}><thead><tr><th style={{textAlign:'center'}}>V#</th><th>Date</th><th>Remarks</th><th>Debit</th><th>Credit</th><th>Balance</th><td><a href='#down' style={{color:'blue'}} className="tiny material-icons">arrow_downward</a></td></tr></thead><tbody>{this.state.ledger.map(  (item,index)=>{return <tr key={index}><td style={{color:'blue', textAlign:'center'}}>{item.voucherNumber}</td><td>{item.date}</td><td style={{maxWidth:'135px',color:'blue'}}>{item.narration}</td><td>{item.debit >=0 ? item.debit : ''}</td><td style={{color:'blue'}}>{item.debit <0 ? item.debit : ''}</td><td className={this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0) >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}><b>{this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0)}</b></td><td><a href='#' style={{fontSize:'16px', color:'red'}} className="material-icons" onClick={()=>this.deleteLedgerEntry(index)}>delete</a><a href='#' style={{fontSize:'16px', color:'green'}} className="small material-icons" onClick={()=> this.editEntry(index)}>edit</a></td></tr>}).slice(this.state.ledgerFor30Days)  }<tr><td></td><td></td><td><b>TOTAL</b></td><td><b>{this.state.debitTotal}</b></td><td><b>{this.state.creditTotal}</b></td><td style={{fontSize:'12px',color:'blue'}}><b>CL. BAL <i className="tiny material-icons">arrow_upward</i></b></td><td><a href='#up' style={{color:'blue'}} className="tiny material-icons">arrow_upward</a></td></tr></tbody></table>


        </div>
        )
    }
}

export default CustomerAccess;


