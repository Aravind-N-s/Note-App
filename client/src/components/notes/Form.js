import React from 'react'
import Select from 'react-select'
import axios from '../../config/axios'

class NotesForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            body: '',
            category: '',
            categories: [],
            tags: [],
            selectedTags: []
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleTagSelect = this.handleTagSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    
    handleSelect(e){
        this.setState(() => ({
            [e.name]: e.value
        }))
    }
    
    handleTagSelect(e){
        this.setState(() => ({
            selectedTags : e
        }))
    }

    handleSubmit(e){
        e.preventDefault()
        const formData = {
            title: this.state.title,
            body: this.state.body,
            category: this.state.category,
            tags: this.state.selectedTags.map(tag => {
                return {
                    tag: tag.value
                }
            })
        }
        this.props.handleSubmit(formData)
    }

    componentWillReceiveProps(nextProps){
        this.setState(() => ({
            title: nextProps.note.title,
            body: nextProps.note.body,
            category: nextProps.note.category._id,
            tags: nextProps.note.tags._id
        }))
    }

    componentDidMount() {
        axios.get('/categories',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then((response) => {
            this.setState(() => ({
                categories: response.data
            }))
        })
        axios.get('/tags',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then((response) => {
            this.setState(() => ({
                tags: response.data
            }))
        })
    }
    

    render() {  
        return (
            <form onSubmit={this.handleSubmit}>
                <Select 
                    isSearchable = "true"
                    isClearable = "true"
                    placeholder = "Category"
                    onChange = {this.handleSelect}
                    options={
                        this.state.category && (
                            this.state.categories.map((category) => {
                                return{
                                    value : category._id,
                                    label : category.name,
                                    name : 'category'
                                }
                            })
                        )
                    }
                /><br/>
                <label >
                    <input className="form-control form-control-lg" type="text" placeholder = "Title" value={this.state.title} onChange={this.handleChange} name="title" />
                </label><br/>
                <label>
                <textarea className="form-control" placeholder = "Body" value= {this.state.body} onChange = {this.handleChange} name="body"  rows="3"/>
                </label><br />
                <Select
                    isMulti = "true"
                    placeholder = 'Tags'
                    isSearchable = "true"
                    isClearable = "true"
                    onChange={this.handleTagSelect}
                    options={
                        this.state.tags && (
                            this.state.tags.map((tag) => {
                                return {
                                    value : tag._id,
                                    label : tag.name,
                                    name : 'tag'
                                }
                            })
                        )
                    }
                />
                <br />
                <center><input className="btn btn-outline-danger" type='submit' /></center>
            </form>
           
        )
    }
}

export default NotesForm