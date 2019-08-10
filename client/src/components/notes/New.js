import React from 'react'
import {Redirect} from 'react-router-dom'
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
            if(response.data.hasOwnProperty('errors')) {
				console.log(response.data.errors)
				this.setState(() => ({
					serverErrors: response.data.errors
				}))
			} else {
				console.log(response.data)
				this.props.history.push(`/notes/${response.data._id}`)
			}
            
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