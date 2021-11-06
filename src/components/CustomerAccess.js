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
            partiesObjects:[],
            keyWords:'',
            ledgers:[],
            ledgerBalance:[],
            ourObj:'',
            ledgerFor500trans:-500,
            showstm:false
            
        }

    }


    componentDidMount(){

        var dataPushPromise = new Promise( (res,rej)=>{
            var obj = [];
            firebase.database().ref('customerAccess').on('child_added' , (data)=> { 
              obj.push(data.val())
            }  )
            res(obj);
      } )
      dataPushPromise.then((ob)=>{
  this.setState({customerAccessList:ob})

      })
  
    }



    changeHandler= (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }








    


 showStmnt=()=>{


    var reqObjs = this.state.customerAccessList.find( (o)=>{return o.keyWords === this.state.keyWords}  )

    if(reqObjs){

        
 var myPromise = new Promise(  (res,rej)=>{  
    var reqObj = this.state.customerAccessList.find( (obbb)=>{return obbb.keyWords === this.state.keyWords}  )
     res(reqObj)
     rej('Operation faild')


 
     })
 
myPromise
//first then
.then( (obj)=>{  

    firebase.database().ref('partyList'+obj.uid).on('child_added' , (data)=> { 
        this.state.partiesObjects.push(data.val())
        }  ) 



 } )
 //second then
.then( ()=>{  


    var statePromise = new Promise((resv,rejt)=>{
        var ourOb = this.state.partiesObjects.find( (ob)=>{return ob.keyWords === this.state.keyWords}  )
        resv(ourOb)
    })

             statePromise.then((object)=>{
                this.setState({ledgers:object.ledger, ledgerBalance:object.sum, ourObj:object})
            console.log(object)
            })


} )

    }else{
        alert('Your Entered Key Words is not Correct')
    }

}





// showStmnt=()=>{


//     var reqObjs = this.state.customerAccessList.find( (o)=>{return o.keyWords === this.state.keyWords}  )

//     if(reqObjs){

        
//  var myPromise = new Promise(  (res,rej)=>{  
//     var reqObj = this.state.customerAccessList.find( (obbb)=>{return obbb.keyWords === this.state.keyWords}  )
//      res(reqObj)
//      rej('Operation faild')


 
//      })
 
// myPromise
// //first then
// .then( (obj)=>{  


//     var ledgerPromise = new Promise((res,rej)=>{
//         var allPartyObj = []
//         firebase.database().ref('partyList'+obj.uid).on('child_added' , (data)=> { 
//             this.state.partiesObjects.push(data.val())
//             }  ) 
//             res(allPartyObj)
//             rej('failed')
//     })


//     ledgerPromise.then((allPobj)=>{
//         var statePromise = new Promise((resv,rejt)=>{
//             var ourOb = allPobj.find( (ob)=>{return ob.keyWords === this.state.keyWords}  )
//             resv(ourOb)
//             rejt('failed')
//         })
    
//                  statePromise.then((object)=>{
//                     this.setState({ledger:object.ledger, ledgerBalance:obj.sum, ourObj:object})
                
//                 },(err)=>{alert(err)})

//     },(e)=>{alert(e)})

//  } )
//  //second then
// .then(()=>{
// this.setState({showstm:true})
// })

//     }else{
//         alert('Your Entered Key Words is not Correct')
//     }

// }

















    render(){
        return(
        <div id='up'>

<input type='text' name='keyWords' onChange={this.changeHandler} placeholder='write key words here' />
<button className="waves-effect waves-dark btn" onClick={this.showStmnt} >Show Statement</button>


{/* <div className={this.state.showstm===false ? 'display' : ''}> */}
<p style={{color:'red',fontSize:'20px'}}>Last 500-Transactions <br/>
   Account Title: <span style={{color:'green'}}> {this.state.ourObj.partyName} </span></p>
<table style={{maxWidth:'950px',margin:'auto'}}><thead><tr><th style={{textAlign:'center'}}>V#</th><th>Date</th><th>Remarks</th><th>Debit</th><th>Credit</th><th>Balance</th><td><a href='#down' style={{color:'blue'}} className="tiny material-icons">arrow_downward</a></td></tr></thead><tbody>{this.state.ledgers.map(  (item,index)=>{return <tr key={index}><td style={{color:'blue', textAlign:'center'}}>{item.voucherNumber}</td><td>{item.date}</td><td style={{maxWidth:'135px',color:'blue'}}>{item.narration}</td><td>{item.debit >=0 ? item.debit : ''}</td><td style={{color:'blue'}}>{item.debit <0 ? item.debit : ''}</td><td className={this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0) >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}><b>{this.state.ledgerBalance.slice(0,index+2).reduce( (total,num)=>{return total+num},0)}</b></td></tr>}).slice(this.state.ledgerFor500trans)  }<tr><td></td><td></td><td><b>TOTAL</b></td><td><b>{this.state.debitTotal}</b></td><td><b>{this.state.creditTotal}</b></td><td style={{fontSize:'12px',color:'blue'}}><b>CL. BAL <i className="tiny material-icons">arrow_upward</i></b></td><td><a href='#up' style={{color:'blue'}} className="tiny material-icons">arrow_upward</a></td></tr></tbody></table>
{/* </div> */}

<p id='down'></p>
        </div>
        )
    }
}

export default CustomerAccess;


