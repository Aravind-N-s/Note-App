import React from 'react'
import axios from '../../config/axios'
import NotesForm from './Form'

class NotesNew extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(formData){
        axios.post('/notes', formData)
            .then(response => {
                console.log(response)
                //change to another component - show
                if(response.data.hasOwnProperty('errors')){
                    console.log(response.data.errors)
                }
                else {
                    this.props.history.push(`/notes/${response.data._id}`)
                }
            })
            .catch((err) => {
                console.log(err)
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