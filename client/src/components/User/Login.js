import React from 'react'
import axios from '../../config/axios'



class NotesLogin extends React.Component{
    constructor(){
        super()
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
        // console.log(formData)
        axios.post(`/users/login`,formData)
        .then(response=>{
            if(response.data.errors){
                alert(response.data.errors)
            }else{
                const token=response.data.token
                localStorage.setItem('userAuthToken',token)
                this.props.handleAuth(true)
                this.props.history.push('/user/account') 
            }
        })

    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input className = "form-control" type="text" name="email" value={this.state.email}  onChange={this.handleChange} placeholder="Email"/>
                </label>                  
                <label>                                
                    <input className = "form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                </label>
                <input className = "btn btn-success" type="submit"/><br />
                <h4 className="text-muted">OR</h4>
            </form>
        )
    }
}

export default NotesLogin