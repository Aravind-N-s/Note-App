import React from 'react'
import _ from 'lodash'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import CategoryForm from './Form'

class CategoryList extends React.Component{
    constructor(){
        super()
        this.state = {
            category: [],
            selectCategory: {}
        }
        this.handleRemove = this.handleRemove.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
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

    handleEdit(e){
        const id = e
        axios.get(`/categories/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            this.setState(() => ({
                selectCategory: response.data
            }))
        })
    }

    handleRemove(e){
        const id = e
        const confirmRemove = window.confirm("Are You Sure?")
        if(confirmRemove){
            axios.delete(`/categories/${id}`,{
                headers:{
                    'x-auth':localStorage.getItem('userAuthToken')
                }
            })
            .then(() => {
                this.props.history.push('/category')
            })
        }
    }

    componentDidMount(){
        axios.get('/categories',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
            .then(response => {
                this.setState(() => ({
                    category: response.data
                }))
            })
    }
    render(){
        console.log(this.state.selectCategory.category)
        return(
            <div className = "container">   
                {_.isEmpty(this.state.selectCategory) ? (
                    <>
                    <ul style={{textTransform: "capitalize"}} className = "list-group">
                        {this.state.category.map(categories => {
                            return <li className = "list-group-item col-sm-4" key={categories._id}>{categories.name}
                                <Link className="btn btn-primary" to={`/category/edit/${categories._id}`}>+</Link>
                                <button className="btn btn-danger"onClick = {() => this.handleRemove(categories._id)}>X</button>
                        </li>
                    })}
                </ul><br />
                    </>
                ) : (
                    <>
                        <CategoryForm handleSubmit={this.handleSubmit} selectCategory={this.state.selectCategory}/>
                    </>
                ) }
                
                <Link className = "btn btn-secondary" to={'/category/new'}>New Categories</Link>
            </div>
        )
    }
}

export default CategoryList