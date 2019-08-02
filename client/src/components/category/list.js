import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

import CategoryEdit from "./Edit";

class CategoryList extends React.Component{
    constructor(){
        super()
        this.state = {
            category: []
        }
    }

    componentDidMount(){
        axios.get('/categories')
            .then(response => {
                this.setState(() => ({
                    category: response.data
                }))
            })
    }
    render(){
        return(
            <div className = "container">   
                <ul style={{textTransform: "capitalize"}} className = "list-group">
                    {this.state.category.map(categories => {
                        return <li className = "list-group-item col-sm-4" key={categories._id}>{categories.name} <CategoryEdit/></li>
                    })}
                </ul><br />
                <Link className = "btn btn-secondary" to={'/category/new'}>New Categories</Link>
            </div>
        )
    }
}

export default CategoryList