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
        this.handleRemoveTag=this.handleRemoveTag.bind(this)
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

    handleRemoveTag(tag){
        const id=this.props.match.params.id
        axios.delete(`/notes/removeTag?noteId=${id}&tagId=${tag._id}`,{ 
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
                }
            })
        .then(response=>{
            this.setState(()=>({
                note:response.data
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
                this.props.history.push('/notes')
            })
        }
    }
    render(){
        return(
            <div style={{width:"18rem", marginTop:"10px"}} className="container card-body col-md-6 border border-dark">            
                <h2 className="card-body">{this.state.note && this.state.note.title}</h2>
                <p className="card-subtitle mb-2 text-muted">{this.state.note.category && this.state.note.category.name}</p>
                <p className="card-text">{this.state.note && this.state.note.body}</p>
                {this.props.location.pathname !== "/notes/new" && (
                    <>
                        <h5 className="list-group-item">tags: 
                            {this.state.note.tags && (
                            <ol>
                                {this.state.note.tags.map((tagItem=>{
                                    return <li key={tagItem._id}>{tagItem.tag.name}<button onClick={()=>{this.handleRemoveTag(tagItem)}}>x</button></li>
                                }))}
                            </ol>
                            )}
                        </h5>
                        <Link className="btn btn-danger card-link" to="/notes">Back</Link>
                        <Link className="btn btn-primary card-link" to={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>
                        <button className="btn btn-danger card-link" onClick = {this.handleRemove}>Delete</button>
                    </>
                )}
            </div>
        )        
    }
}

export default ShowNote