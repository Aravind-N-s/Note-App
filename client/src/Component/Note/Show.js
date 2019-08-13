import React from 'react'
import axios from '../../Config/axios'
import {Link} from 'react-router-dom'

class ShowNote extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            note: {}
        }
        this.handleRemove = this.handleRemove.bind(this)
    }

    componentDidMount(props){
        const id = this.props.match.params.id
        axios.get(`/notes/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
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
            axios.delete(`/notes/${id}`,{
                headers:{
                    'x-auth':localStorage.getItem('userAuthToken')
                }
            })
            .then(() => {
                this.props.history.push('/')
            })
        }
    }
    render(){
        return(
            <div style={{width:"18rem", marginTop:"10px"}} className="container card-body col-md-6 border border-dark bg-primary text-white">            
                <h2 className="card-body">{this.state.note && this.state.note.title}</h2>
                <p className="card-subtitle">{this.state.note.category && this.state.note.category.name}</p>
                <p className="card-text">{this.state.note && this.state.note.body}</p>
                <h5 className="list-group-item bg-primary">Tags: 
                    {this.state.note.tags && (
                    <ol>
                        {this.state.note.tags.map((tagItem=>{
                            return <li key={tagItem._id}>{tagItem.tag.name}</li>
                        }))}
                    </ol>
                    )}
                </h5>
                <Link className="btn btn-dark card-link" to="/">Back</Link>
                <Link className="btn btn-secondary card-link" to={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>
                <button className="btn btn-danger card-link" onClick = {this.handleRemove}>Delete</button>
            </div>
        )        
    }
}

export default ShowNote