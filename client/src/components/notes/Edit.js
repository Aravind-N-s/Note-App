import React from 'react'
import NoteForm from './Form'
import axios from '../../config/axios';

class NoteEdit extends React.Component{
    constructor(props){
        console.log('notes constructor')
        super(props)
        this.state = {
            note: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/notes/${id}`)
        .then(response=>{
            this.setState(() => ({
                note: response.data
            }))
        })
    }
    handleSubmit(formData){
        axios.put(`/notes/${this.state.note._id}`,formData)
            .then(response =>{
                if(response.data.hasOwnProperty('errors')){
                    console.log(response.data.errors)
                }
                else {
                    this.props.history.push(`/notes/${response.data._id}`)
                }
            })
    }
    render(){
        console.log('notes render')
        return(
            <div>
                <h2>Edit Here</h2>
                <NoteForm handleSubmit={this.handleSubmit} note={this.state.note}/>
            </div>
        )
    }
}

export default NoteEdit