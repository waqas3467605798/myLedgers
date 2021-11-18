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
            ledgers:[],
            ledgerBalance:[],
            ourObj:'',
            ledgerFor500trans:-500,
            showstm:false,
            partyObjects:[],
            showBtn:false,
            accountTitle:''
            
        }

    }


    componentDidMount(){

        var dataPushPromise = new Promise( (res,rej)=>{
            var objj = [];
            firebase.database().ref('customerAccess').on('child_added' , (data)=> { 
              objj.push(data.val())
            }  )
            res(objj);
      } )
      dataPushPromise.then((ob)=>{
  this.setState({customerAccessList:ob})

      })
  
    }



    changeHandler= (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }







// showStmnt=()=>{

// var newPromise = new Promise((res,rej)=>{

// var objects =[]
// var reqObjs = this.state.customerAccessList.find( (o)=>{return o.keyWords === this.state.keyWords}  )
// firebase.database().ref('partyList'+reqObjs.uid).on('child_added' , (data)=> { 
// objects.push(data.val())
//          }  )
         
// res(objects)



// })


// newPromise.then((obs)=>{
    

//     var ourObs = obs.find( (oo)=>{return oo.keyWords === this.state.keyWords} )    
    
//     if(ourObs){
//         return ourObs
//     }else{
//         alert('object not found')
//     }
// })
// .then((mainObj)=>{
// this.setState({ledgers:mainObj.ledger, ledgerBalance:mainObj.sum})
// })

// }


clickMe=()=>{

    var keyExist = this.state.customerAccessList.find( (o)=>{return o.keyWords === this.state.keyWords}  )
    
    if(keyExist){
    this.setState({accountTitle:keyExist.partyName})
    var newPromise = new Promise((res,rej)=>{
    var objects =[]
    var reqObjs = this.state.customerAccessList.find( (o)=>{return o.keyWords === this.state.keyWords}  )
    firebase.database().ref('partyList'+reqObjs.uid).on('child_added' , (data)=> { 
    objects.push(data.val())
             }  )
             
    res(objects)
    
    })
    
    
    newPromise.then((obs)=>{
        
    this.setState({partyObjects:obs})
       
    })
    .then(()=>{
        this.setState({showBtn:true})
    })
     



    }else{
        alert('Your Entered Password not exist')
    }



    }



    showFullStm=()=>{



this.setState({showstm:true})
        // this.setState({ledgerFor30Days:0}) // because we want to see all transaction in the ledger
  
        // if(document.getElementById('selected_save4').value){
        
        // this.setState({accountTitle:document.getElementById('selected_save4').value})
        
        
        
        // var accountTitle = document.getElementById('selected_save4').value
        var reqObj = this.state.partyObjects.find(  (obj)=>{return obj.keyWords === this.state.keyWords}  )
      
        //to get total sum of debit side and credit side
        // this.setState({debitTotal:reqObj.sum.filter((nm,indx)=>{return nm>0}).reduce( (total,num)=>{return total+num},0)}) // for test base only
        // this.setState({creditTotal:reqObj.sum.filter((nm,indx)=>{return nm<0}).reduce( (total,num)=>{return total+num},0)}) // for test base only
        //sum of debit and credit side is ended
        
        
        
        if('ledger' in reqObj){
          var ledgerData = reqObj.ledger;
          var ledgerBalance = reqObj.sum
          this.setState({ledgers: ledgerData, renderLedgerData:true, noData:null, ledgerBalance:ledgerBalance})
         
         }
         else{
           
           var noDataFound = 'No data found'
           this.setState({noData: noDataFound, renderLedgerData:false})
           console.log(noDataFound)
           
         }
        
        this.setState({sum:[]}) //As the render method will run again, so the array of sum and sumQty in state should be zero
            
        // }else{alert('Please select the Account First')}

    }









    render(){
        return(
        <div id='up'>
<div className={this.state.showBtn === false ? '' : 'display'}>
<input type='text' name='keyWords' onChange={this.changeHandler} placeholder='write key words here' />
<button className="waves-effect waves-dark btn" onClick={this.clickMe} >Click me</button> <br/>
</div>


<div className={this.state.showBtn === false ? 'display' : ''}>
<span>Welcome...{this.state.accountTitle}</span> <br/>
<span>Please Click on Following Button to view your statement</span> <br/>
<button className="waves-effect waves-dark btn" onClick={this.showFullStm} >Show Statement</button>
</div>

<div className={this.state.showstm===false ? 'display' : ''}>
<p style={{color:'red'}}>
   Account Title: <span style={{color:'green'}}> {this.state.accountTitle} </span> <br/>
   Last 500-Transactions 
   </p>
<table style={{maxWidth:'950px',margin:'auto'}}><thead><tr><th style={{textAlign:'center'}}>V#</th><th>Date</th><th>Remarks</th><th>Debit</th><th>Credit</th><th>Balance</th><td><a href='#down' style={{color:'blue'}} className="tiny material-icons">arrow_downward</a></td></tr></thead><tbody>{this.state.ledgers.map(  (item,index)=>{return <tr key={index}><td style={{color:'blue', textAlign:'center'}}>{item.voucherNumber}</td><td>{item.date}</td><td style={{maxWidth:'135px',color:'blue'}}>{item.narration}</td><td>{item.debit >=0 ? item.debit : ''}</td><td style={{color:'blue'}}>{item.debit <0 ? item.debit : ''}</td><td className={this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0) >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}><b>{this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0)}</b></td></tr>}).slice(this.state.ledgerFor500trans)  }<tr><td></td><td></td><td><b>TOTAL</b></td><td><b>{this.state.debitTotal}</b></td><td><b>{this.state.creditTotal}</b></td><td style={{fontSize:'12px',color:'blue'}}><b>CL. BAL <i className="tiny material-icons">arrow_upward</i></b></td><td><a href='#up' style={{color:'blue'}} className="tiny material-icons">arrow_upward</a></td></tr></tbody></table>
</div>

<p id='down'></p>
        </div>
        )
    }
}

export default CustomerAccess;


