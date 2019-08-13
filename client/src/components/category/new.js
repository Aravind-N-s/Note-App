import React from './node_modules/react'
import CategoryForm from './Form'
import axios from '../../Config/axios';

class CategoryNew extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(formData){
        axios.post('/categories',formData ,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')){
                alert.log(response.data.errors)
            }
            else {
                this.props.history.push(`/category`)
            }
        })
        .catch((err) => {
            alert(err)
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