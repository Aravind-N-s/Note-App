import React from 'react'
import TagsForm from './Form'
import axios from '../../Config/axios';

class TagsNew extends React.Component{

    handleSubmit=(formData)=>{
        axios.post('/tags', formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }else{
                this.props.history.push(`/tags/${response.data._id}`)
            }
        })
    }
    render(){
        return(
            <div style={{marginTop: 10}} className="container">
                <TagsForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default TagsNew