import React from 'react'
import axios from '../../config/axios'
import NotesForm from './Form'

class NotesNew extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(formData){
        axios.post('/notes', formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            console.log(this.props)
            // console.log(response.data._id, 'handleSubmit')
            // change to another component - show
            // this.props.history.push(`/notes/${response.data._id}`)
            
        })
        .catch((err) => {
            alert(err, "errors")
        })
    }
    render(){
        return(
            <div>
                <NotesForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default NotesNew