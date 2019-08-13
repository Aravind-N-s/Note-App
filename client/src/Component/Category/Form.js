import React from 'react'
// import _ from 'lodash'
import {Link} from 'react-router-dom'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentDidMount(props){
    //     !_.isEmpty(this.props.selectCategory) && (
    //         this.setState(() => ({
    //             name: this.props.selectCategory
    //         }))          
    //     )
    // }

    handleChange(e){
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit(e){
        e.preventDefault()
        const formData = {
            name : this.state.name
        }
        this.props.handleSubmit(formData)
    }

    render(){
        return(
            <div  className = "input-group input-group-lg border border-secondary bg-secondary">
                <form onSubmit = {this.handleSubmit}>
                    <label style={{position: "relative", top: 2, right: -50}}>
                        <span className="input-group-text">Category Name</span>
                        <input type="text" name='name' onChange={this.handleChange} value={this.state.name} />
                    </label><br />
                    <Link style={{position: "relative", top: -2, right: "-45%"}} className="btn btn-info" to="/category">Back</Link>
                    <input style={{position: "relative", top: -2, right: "-50%"}} className ="btn btn-dark"  type = "submit" />
                </form>
            </div>
        )
    }
}

export default CategoryForm