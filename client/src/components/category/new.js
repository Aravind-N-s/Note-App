import React from 'react'
import CategoryForm from './Form'
import axios from '../../config/axios';

class CategoryNew extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(formData){
        axios.post('/categories',formData)
        .then(response => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }
            else {
                this.props.history.push(`/category`)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <CategoryForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default CategoryNew