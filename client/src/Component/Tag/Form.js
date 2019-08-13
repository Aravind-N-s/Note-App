import React from 'react'
import {Link} from 'react-router-dom'

class TagsForm extends React.Component{
    constructor(){
        super()
        this.state={
            name:""
        }
    }
    handleChange=(e)=>{
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name
        }
        console.log(formData)
        this.props.handleSubmit(formData)
    }
    render(){
        return(
            <form className="container col-md-5 bg-dark text-white" onSubmit={this.handleSubmit}>
                <label><span className="input-group-text">Tagname:</span>
                    <input type="text" value={this.state.value}
                    onChange={this.handleChange} name="name"/>
                </label> <br/>
                <Link className="btn btn-info" to="/category">Back</Link>
                <input className ="btn btn-primary"  type = "submit" />
            </form>
        )
    }
}

export default TagsForm