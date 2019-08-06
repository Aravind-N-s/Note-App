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

    componentDidMount(){
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
            console.log(response.data)
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
            <div className="container">            
                <h2>{this.state.note.title}</h2>
                <p>{this.state.note.body}</p>
                <p>{this.state.note.category && this.state.note.category.name}</p>
                <h5 className="list-group-item">tags: </h5>
                    {this.state.note.tags && (
                        <ol className="list-group-item">
                            {this.state.note.tags.map((tagItem=>{
                                return <li className="list-inline-item" key={tagItem._id}>{tagItem.tag}<button onClick={()=>{this.handleRemoveTag(tagItem)}}>x</button></li>
                            }))}
                        </ol>
                    )}
                    {this.props.location.pathname !== "/notes/new" && (
                        <>
                            <Link className="btn btn-danger" to="/notes">Back</Link>
                            <Link className="btn btn-primary"to={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>
                            <button className="btn btn-danger"onClick = {this.handleRemove}>Delete</button>
                        </>
                    )}
            </div>
        )        
    }
}

export default ShowNote