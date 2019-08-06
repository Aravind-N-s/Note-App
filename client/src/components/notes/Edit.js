import React from 'react'
import NoteForm from './Form'
import axios from '../../config/axios';

class NoteEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            note: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/notes/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            this.setState(() => ({
                note: response.data
            }))
        })
    }
    handleSubmit(formData){
        axios.put(`/notes/${this.state.note._id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
            .then(response =>{
                console.log(response)
                if(response.data.hasOwnProperty('errors')){
                    console.log(response.data.errors)
                }
                else {
                    this.props.history.push(`/notes`)
                }
            })
    }
    render(){
        return(
            <div>
                <h2>Edit Here</h2>
                <NoteForm handleSubmit={this.handleSubmit} note={this.state.note}/>
            </div>
        )
    }
}

export default NoteEdit