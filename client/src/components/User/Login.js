import React from 'react'
import axios from '../../config/axios'



class NotesLogin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange(e){
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit(e){
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        axios.post(`/user/login`,formData)
        .then(response=>{
            if(response.data.errors){
                alert(response.data.errors)
            }else{
                const token=response.data.token
                if(token){
                    localStorage.setItem('userAuthToken',token)
                    this.props.handleAuth(true)
                    this.props.history.push = ('/notes')
                }
            }
        })
        .catch(err =>{
            alert(err)
        })

    }
    render(){
        return(
            <form className="container" onSubmit={this.handleSubmit}>
                <h2 className="text-dark">LOGIN</h2>
                <label>
                    <input className = "form-control" type="text" name="email" value={this.state.email}  onChange={this.handleChange} placeholder="Email"/>
                </label><br/>               
                <label>                               
                    <input className = "form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                </label><br />
                <input className = "btn btn-success" type="submit"/><br />
            </form>
        )
    }
}

export default NotesLogin