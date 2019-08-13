import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class NotesList extends React.Component {
    constructor(){
        super()
        this.state = {
            notes: []
        }
    }
    componentDidMount(){
        axios.get('/notes',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            this.setState(() => ({
                notes: response.data
            }))
        })
    }


    render(){
        return(
            <ul style ={{marginTop: "10px", width: "18rem"}} className = "list-group list-group-flush border border-dark">
                {this.state.notes.map(note => {
                    return <li className="list-group-item" key={note._id}><Link to={`/notes/${note._id}`}>{<h3>{note.title}</h3>}</Link></li>
                })}
            </ul> 
        )
    }
}

export default NotesList