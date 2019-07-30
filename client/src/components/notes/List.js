import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class NotesList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            notes:[]
        }
        
    }
    componentDidMount(){
        axios.get('/notes')
        .then(response => {
            this.setState(() => ({
                notes: response.data
            }))
        })
    }
    
    render(){
        return (
            <div className = "container ">
                <h2>Listing Notes - {this.state.notes.length}</h2>
                <ul>
                    {this.state.notes.map(note => {
                        return <li key={note._id}><Link to={`/notes/${note._id}`}>{note.title}</Link></li>
                    })}
                </ul>
                <Link to={'/notes/new'} className = "btn btn-primary">New Note</Link>
            </div>
        )
    }
}

export default NotesList