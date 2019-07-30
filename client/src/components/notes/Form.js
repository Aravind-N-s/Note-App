import React from 'react'
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
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTagSelection = this.handleTagSelection.bind(this)
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
            title: this.state.title,
            body: this.state.body,
            category: this.state.category,
            tags: this.state.selectedTags.map(tag => {
                return {
                    tag: tag._id
                }
            })
        }
        this.props.handleSubmit(formData)
    }
    handleTagSelection(tag){
        this.setState((prevState) => ({
            selectedTags: [...prevState.selectedTags, tag]
        }))
    }
    componentWillReceiveProps(nextProps){
        this.setState(() => ({
            title: nextProps.note.title,
            body: nextProps.note.body,
            category: nextProps.note.category._id
        }))
    }
    componentDidMount() {
        axios.get('categories')
            .then((response) => {
                this.setState(() => ({
                    categories: response.data
                }))
            })
        axios.get('tags')
        .then((response) => {
            this.setState(() => ({
                tags: response.data
            }))
        })
    }

    render() {
        return (
            <div className="container form-group offset-md-2 col-md-4 border border-primary">
                <form onSubmit={this.handleSubmit}>
                        <label>
                            <select className = "form-control" value={this.state.category} name="category" onChange={this.handleChange}>
                                <option value="">Categories</option>
                                {this.state.categories.map((category) => {
                                    return <option key={category._id}value={category._id} >{category.name}</option>
                                })}
                            </select>                    
                        </label>
                        <label >
                            <input className="form-control form-control-lg" type="text" placeholder = "Title" value={this.state.title} onChange={this.handleChange} name="title" />
                        </label>
                        <label>
                        <textarea className="form-control" placeholder = "Body" value= {this.state.body} onChange = {this.handleChange} name="body"  rows="3"/>
                        </label><br />
                        <label>
                            {this.state.tags.map(tag => {
                                return <label key = {tag._id}> 
                                <input className = "font-weight-bold text-uppercase  form-check-inline" type = 'checkbox' onClick={() => {
                                    this.handleTagSelection(tag)
                                }}/> {tag.name}
                                </label>
                            })}
                        </label><br />
                        <input className="btn btn-outline-danger" type='submit' />
                </form>
            </div>
        )
    }
}

export default NotesForm