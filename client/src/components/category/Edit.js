import React from 'react'
import CategoryForm from './Form'
import axios from '../../config/axios';

class CategoryEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            category: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/category/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            this.setState(() => ({
                category: response.data
            }))
        })
    }
    handleSubmit(formData){
        axios.put(`/category/${this.state.category._id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
            .then(response =>{
                if(response.data.hasOwnProperty('errors')){
                    console.log(response.data.errors)
                }
                else {
                    this.props.history.push(`/category`)
                }
            })
    }
    render(){
        return(
            <div>
                <CategoryForm handleSubmit={this.handleSubmit} category={this.state.category}/>
            </div>
        )
    }
}

export default CategoryEdit