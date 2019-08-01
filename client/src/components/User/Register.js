import React from 'react'
import axios from '../../config/axios';


class NotesRegister extends React.Component{
        constructor(){
            super()
            this.state={
                username:'',
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
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        // console.log(formData)
        axios.post(`/user/register`,formData)
        .then(response=>{
            if(response.data.errors){
                alert(response.data.message)
            }else{
                this.props.history.push('/User/Login')
            }
        })
        .catch(err=> {
            console.log(err)
        })
    }

    render(){
        return(
            <form className="form-group" onSubmit={this.handleSubmit}>
                <fieldset>  
                    <h2 className="text-dark">REGISTER</h2>
                    <label>
                       
                        <input className = "form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username"/>
                    </label><br/>
                    <label>
                        <input className = "form-control" type="text" name="email" value={this.state.email}  onChange={this.handleChange} placeholder="Email"/>
                    </label><br/>                       
                    <label>                                
                        <input className = "form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                    </label><br/>
                    <input className="btn btn-dark" type="submit" value="submit"/>
                </fieldset>
            </form>
        )
    }
}

export default NotesRegister