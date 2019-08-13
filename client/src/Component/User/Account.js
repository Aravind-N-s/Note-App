import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../Config/axios';

class NotesAccount extends React.Component{
    constructor(){
        super()
        this.state={
            user:{},
        }
    }
    // tokens are sending to server
    componentDidMount(){
        axios.get(`/user/account`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        }) 
        .then (response=>{
            const user=response.data
            this.setState({user}) 
            //when our current value doesn't depend on previous value, that time 
            //else use () =>{}
        })
    }
    render(){
        return(
            <div className = "bg-white" >
                <h6 className="text-weight-bold">User Account</h6>
                    <h4 className="container bg-white text-dark text-weight-bold text-capitalize">
                        {this.state.user.username}
                    </h4>
                    
               <Link className="btn btn-success" to="/users/logout">Logout</Link> 
            </div>
        )
    }
}
export default NotesAccount