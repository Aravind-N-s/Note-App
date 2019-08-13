import React from './node_modules/react'
import axios from '../../Config/axios';

class NotesLogout extends React.Component{
    
    componentDidMount(){
        axios.delete(`/user/logout`,{
        headers:{
            'x-auth':localStorage.getItem('userAuthToken')
        }
        })
        .then(response=>{
            localStorage.removeItem('userAuthToken')
            this.props.handleAuth(false)
        })
    }
    render(){
        return(
            <p>logging out..</p>
        )
    }
}

export default NotesLogout