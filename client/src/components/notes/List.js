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
        return (
            <div className = "container ">
                <h2 className = "text-primary"> Notes </h2>
                <ul>
                    {this.state.notes.map(note => {
                        return <li key={note._id}><Link to={`/notes/${note._id}`}>{<h3>{note.title}</h3>}</Link></li>
                    })}
                </ul>
            </div>
        )
    }
}

export default NotesList