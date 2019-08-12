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
            <ul>
                {this.state.notes.map(note => {
                    return <li key={note._id}><Link to={`/notes/${note._id}`}>{<h3>{note.title}</h3>}</Link></li>
                })}
            </ul> 
        )
    }
}

export default NotesList