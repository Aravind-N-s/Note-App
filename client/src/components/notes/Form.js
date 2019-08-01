import React from './node_modules/react'
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
            <div style={{maxWidth:"500px"}}className="container form-group nav justify-content-center border border-primary">
                <form style = {{marginTop:"10px",marginBottom:"10px"}}  onSubmit={this.handleSubmit}>
                        <label>
                            <select className = "form-control" value={this.state.category} name="category" onChange={this.handleChange}>
                                <option value="">Categories</option>
                                {this.state.categories.map((category) => {
                                    return <option key={category._id}value={category._id} >{category.name}</option>
                                })}
                            </select>                    
                        </label><br/>
                        <label >
                            <input className="form-control form-control-lg" type="text" placeholder = "Title" value={this.state.title} onChange={this.handleChange} name="title" />
                        </label><br/>
                        <label>
                        <textarea className="form-control" placeholder = "Body" value= {this.state.body} onChange = {this.handleChange} name="body"  rows="3"/>
                        </label><br />
                        <label>
                            {this.state.tags.map(tag => {
                                return <label className="checkbox-inline nav nav-pills" key = {tag._id}> 
                                <input type = 'checkbox' onClick={() => {
                                    this.handleTagSelection(tag)
                                }}/> <h6>{tag.name}</h6>
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