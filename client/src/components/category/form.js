import React from 'react'
import _ from 'lodash'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(props){
        // {_.isEmpty(this.props.selectCategory.category) ? (
        //     <> 
        //         {this.setState(() => ({
        //             name: ''
        //         }))}         
        //     </>
        // ) : (
        //     <>
        //         {this.setState(() => ({
        //             name: this.props.selectCategory.category.name
        //         }))} 
        //     </>
        // ) }          
    }

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
        console.log(this.state)
        return(
            <div className = "container input-group input-group-lg border border-secondary">
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        <span className="input-group-text">Category Name</span>
                        <input type="text" name='name' onChange={this.handleChange} value={this.state.name} />
                    </label><br />
                    <input className ="btn btn-dark"  type = "submit" />
                </form>
            </div>
        )
    }
}

export default CategoryForm