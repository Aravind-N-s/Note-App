import React from './node_modules/react'
import axios from '../../config/axios'
import {Link} from './node_modules/react-router-dom'

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
                <h2 className = " text -primary">Listing Notes <small className = "text-muted"> - {this.state.notes.length} </small> </h2>
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