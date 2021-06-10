import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'


  class ShowAll extends Component{
      constructor(){
          super();
          this.state = {
            firstName:'',
            // secondName:'',
            // age:'',
            message:'',
            objects:[],
            status:false,
            renderMsg:[],
            renderMstStatus:false,
            noData:null,
            closingStatus:false
            
          }
      }



      componentDidMount(){
        firebase.database().ref('bioData').on('child_added' , (data)=> { 

          if(data.val().msg){
          this.state.objects.push(data.val())
        }
      


        }  ) 

        // setTimeout(()=>{ this.setState({status:!this.state.status})},1000)
      }
      


getData = ()=>{
  // firebase.database().ref('bioData').on('child_added' , (data)=> { console.log(data.val())}  )

  this.setState({status:true})        //As status true, the render function will run again
}




  render(){
    
    return (
    
    
    <div style={{textAlign:'center'}}>
    
  <br/><br/><br/>
    <button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Show All</button> <br/>

    
    <div className={this.state.status === false ? 'display' : ''}>
    {this.state.objects.map((item,i)=>{return <div key={i}> <h4><hr/>{item.firstName} </h4>    {item.msg.map((it,ind)=>{ return <p key={ind}>{it}</p>})}     </div>          })}
    </div>


    </div>
  );
}
}

export default ShowAll;
