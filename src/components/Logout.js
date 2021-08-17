import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
// import {Link} from 'react-router-dom'


  class Logout extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null
      }

  }



  componentDidMount(){
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    
    this.setState({user:userId,userEmail:userEmail})
  }




    Logout= ()=>{
        firebase.auth().signOut();
    }

    render(){
        return(
          <div>
         <br/>
         <div className='container' style={{textAlign:'right'}}> <button className="waves-effect waves-dark btn red" onClick={this.Logout}>Logout</button> </div> 
         
         
            <div className="center">
              <br/>


              <div className='container'>
 


                
               <span style={{color:'blue', fontSize:'20px'}}><b>Welcome... </b> <span><b style={{color:'blue',marginLeft:'30px'}}>{this.state.userEmail}</b></span></span>
              </div>






  {/* card code from materialize css */}
  
   <div className="row container" style={{margin:'auto'}}>
    {/* <div className="col s12 m6"> */}
      <div className="card pink lighten-4">
        <div className="card-content">
          <span className="card-title"> <b>Introduction</b></span>
          <p style={{textAlign:'left', color:'blue'}}>This online web based saftware is Prepared for small businesses. This mini software have three features; 
            <span><b><br/>1-Can Easily Manage Accounts Payables and Receivables and get one page summary on one click. 
            {/* <br/>2-Text Record other than Financial Transactions  */}
            <br/>2-UpLoad Your important Business Documents and get on demand.</b> </span>
            <br/>You can recored your business transactions relating to vendors and sellers and can get their account statements at any time, any where in all over the world.
            <br/>You can Save your important business or personal documents (images,PDF etc) and can veiw/download on need at any where in all over the world. </p>
        </div>
      </div>
    {/* </div> */}
  </div>
  


<div className='container'>
  <h2 style={{textAlign:'left'}} className='headings'>Guidance to Run this Software</h2>
  <h2 style={{textAlign:'left'}} className='headings'>Accounts-Record</h2>
  <p style={{textAlign:'left'}}>Go to the top of the screen and click on <b>Accounts-Record</b> you will see further menue of five features of accounts;
  <br/> 1-Create Account
  <br/> 2-Data entry
  <br/> 3-Vouchers
  <br/> 4-Account statement
  <br/> 5-Summary
  <br/> Let discuss and understand all of above features one by one.
  <br/> <b>1-Create Account</b>
  <br/> In this section, you will create/open the account of the person to whom you want to record your business transaction. There will be three input fields, on first field you will write the name of the person/Account title, on second field you will pass any remarks relating to your account, and in third input field you will select the category of the account (e.g either it is relating to debtors/creditors or expense or assets etc.). On last, Press the button <b>Save</b> Now your account has been opened successfully. You can get the List of all opened Accounts by pressing the button of <b>Get List</b>
  <br/><b>2-Data Entry</b>
  <br/>Go to the section of Data Entry. you will have a list of all opened Accounts. First of all select the account to whom you want to record the transaction. There are three input fields, First is for date. Type here date in you own formate. Secord input field is for Remarks/Narration relating to the nature of entry. Third input field is for amount of the transaction.
  <br/><b style={{color:'red'}}>Guidance about 'Amount' input field</b>
  <br/><span style={{color:'red'}}>If you are given any thing (either it is cash or material) to your client/debtor/creditor, you have to write the amount in positive.</span>
  <br/><span style={{color:'red'}}> But If you are receving any thing (either it is cash or material) from your client/debtor/creditor, you have to write the amount in negative.</span>
  <br/><b>3-Vouchers</b>
  <br/> Each and every entry will generate the voucher, go to the voucher section, you will see the generated voucher, get print out, sign it for record purpose. 
  <br/><b>4-Account Statement</b>
  <br/> Go to the section of <b>Account Statement</b>, Select the Account and get the Ledger/Statement having all history of transactions.
  <br/> <b>5-Summary</b>
  <br/> It is the one page summary of All opened Accounts (if they have balances). You can get Quick last 50-Transaction detail by clicking on the relevant account. 
  </p>



  <h2 style={{textAlign:'left'}} className='headings'>My Documents</h2>
  <p style={{textAlign:'left'}}> The next feature of this software is <b>My documents</b>.Go to the top of the screen and click on <b>My Documents</b> you will see further menue of two features;
  <br/> 1-Up-Load Document
  <br/> 2-Get Document

  <br/><b>1-Up-Load Document</b>
  <br/>Here you can up load document. First of all select the image/file from your device and write the description of the document in input field here.
<br/><b>1-Get Document</b>
<br/> Go to get Document, select your description and click on <b>Get File </b> button. you will get URL of the image/file and view of the file. 
  </p>


</div>


            </div>
            </div>
        )
    }


  }

export default Logout;