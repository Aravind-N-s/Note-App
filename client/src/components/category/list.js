import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

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
                <ul className = "list-group">
                    {this.state.category.map(categories => {
                        return <li className = "list-group-item col px-md-5" key={categories._id}>{categories.name}</li>
                    })}
                </ul><br />
                <Link className = "btn btn-secondary" to={'/category/new'}>New Categories</Link>
            </div>
        )
    }
}

export default CategoryList