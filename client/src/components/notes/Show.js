import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class ShowNote extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            note: {}
        }
        this.handleRemove = this.handleRemove.bind(this)
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/notes/${id}`)
            .then(response => {
                this.setState(() => ({
                    note: response.data
                }))
            })
    }
    handleRemove(e){
        const id = this.props.match.params.id
        const confirmRemove = window.confirm("Are You Sure?")
        if(confirmRemove){
            axios.delete(`/notes/${id}`)
            .then(() => {
                this.props.history.push('/notes')
            })
        }
    }
    render(){
        return(
            <div>            
                <h2>{this.state.note.title}</h2>
                <p>{this.state.note.body}</p>
                <p>{this.state.note.category && this.state.note.category.name}</p>

                <Link to="/notes">Back</Link>
                <Link to={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>
                <button onClick = {this.handleRemove}>Delete</button>
            </div>
        )        
    }
}

export default ShowNote