import React from 'react'
import axios from '../../Config/axios'
import NotesForm from './Form'
import {Redirect} from 'react-router-dom'

class NotesNew extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            serverErrors: '',
            submit: false
        }
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
				alert(response.data.errors)
				this.setState(() => ({
					serverErrors: response.data.errors
				}))
            }else {
                this.setState(() => ({
                    submit : true
                }))
            }
        })
        .catch((err) => {
            alert(err, "errors")
        })
    }
    render(props){
        if(this.state.submit){
            return <Redirect to="/" />
        }
        return(
            <div>
                <NotesForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default NotesNew