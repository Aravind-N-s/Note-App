import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../Config/axios';


class TagsList extends React.Component{
    constructor(){
        super()
        this.state={
            tags:[]
        }
    }
    componentDidMount(){
        axios.get(`/tags`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
           this.setState(()=>({
              tags:response.data 
           }))
        })
    }
    handleRemove=(tag)=>{
        const confirmRemove=window.confirm('Are You sure..?')
        if(confirmRemove){
            axios.delete(`/tags/${tag._id}`,{
                headers:{
                    'x-auth':localStorage.getItem('userAuthToken')
                }
            })
            .then(()=>{
                this.setState((prevState)=>({
                    tags:prevState.tags.filter(tagItem=>{
                        return tagItem._id!==tag._id
                    })
                }))
            })
        }
    }

    render(){
        return(
            <div style={{marginTop:10}} className="container col-md-4 bg-dark text-white">
            <ul className = "list-group">
                {this.state.tags.map(tag=>{
                    return (
                    <li  className = "list-group-item bg-dark text-white h3" key={tag._id}>
                        {tag.name} 
                        <button style={{position: "absolute", top: 10, right: 10}} className="btn btn-danger"onClick={()=>{this.handleRemove(tag)}}>
                        X</button>
                    </li>)
                })}
            </ul>
            <Link style={{marginBottom:5}} className ="btn btn-light" to="/tags/new">Add Tag</Link>
            </div>
        )
    }
}

export default TagsList