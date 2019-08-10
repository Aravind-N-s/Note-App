import React from 'react'
import ReactDOM from 'react-dom'
import axios from './config/axios'
import Popup from 'reactjs-popup'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import ShowNote from './components/Notes/Show'
import NoteNew from  './components/Notes/New'
import NoteEdit from './components/Notes/Edit'

import CategoryList from './components/Category/List'
import CategoryNew from './components/Category/New'
import CategoryForm from './components/Category/Form'

import NotesLogin from './components/User/Login'
import NotesRegister from './components/User/Register'
import NotesAccount from './components/User/Account'
import NotesLogout from './components/User/Logout'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isAuthenticated: false,
            notes: []
        }
        this.handleAuth=this.handleAuth.bind(this)
        this.handleShowAuth=this.handleShowAuth.bind(this)
    }

    handleAuth = (bool) => {
        this.setState({isAuthenticated:bool})
    }

    handleShowAuth = () =>{
        return(
            <div>
                { this.state.isAuthenticated && (
                    <div className ="container">
                        <Popup trigger={<Link className="btn btn-success" to="/account">Account</Link>}position="left top"on="hover">
                           <NotesAccount />                          
                        </Popup>
                    </div>
                )}
                { !this.state.isAuthenticated && (
                    <div className ="container">
                        <Popup trigger={<Link className="btn btn-success" to="/login">Login</Link>} position="left top"on="hover">
                            <div>
                                <NotesLogin handleAuth={this.handleAuth}/>
                            </div>
                        </Popup><br />
                        <Popup trigger={<Link className="btn btn-success" to="/register">Register</Link>} position="left top"on="hover">
                            <div>
                                <NotesRegister />
                            </div>
                        </Popup>
                    </div>
                )}
            </div>
        )
    }

    componentDidMount(){
        if(localStorage.getItem('userAuthToken')){
            this.setState({isAuthenticated: true})
        }
        axios.get('/notes',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            console.log(response)
            this.setState(() => ({
                notes: response.data
            }))
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1 className="navbar font-italic font-weight-bold shadow-lg p-3 mb-5 rounded" >
                        <Link className ="text-dark" to="/" >My Notes App</Link>{this.handleShowAuth()}</h1>
                    <Switch>
                        { this.state.isAuthenticated && (
                            <div className ="container" >
                                <div  className="container" >
                                    <Popup trigger={<Link className=" btn btn-primary btn-lg  col-md-4"  to ="/notes/new"><h3> New Notes</h3></Link>} position = "right top" on="click">
                                        <div>
                                            <NoteNew />
                                        </div>
                                    </Popup>
                                    <Link style={{marginLeft:10}} className=" btn btn-secondary btn-lg  col-md-4"  to ="/category"><h3>List Category</h3></Link>                                  
                                    <ul>
                                        {this.state.notes.map(note => {
                                            return <li key={note._id}><Link to={`/notes/${note._id}`}>{<h3>{note.title}</h3>}</Link></li>
                                        })}
                                    </ul> 
                                </div>
                                <>
                                    <Route path="/logout" render = {(props) => {
                                        return <NotesLogout {...props} handleAuth={this.handleAuth} />
                                    }}/>
                                    {/* <Route path="/notes/new" exact={true}/> */}
                                    <Route path="/notes" exact={true}/>
                                    <Route path="/notes/edit/:id" exact component={NoteEdit}  />
                                    <Route path="/notes/:id" exact strict render = {(props) => {
                                        return <ShowNote {...props} handleAuth={this.handleAuth} />
                                    }} exact={true}/>
                                    <Route path="/category" component={CategoryList} exact={true}/>
                                    <Route path="/category/new" component={CategoryNew} />  
                                    <Route path="/category/edit/:id" render = {(props) => {
                                        return <CategoryForm {...props} selectedCategory={'hello'}/>
                                    }} exact={true}/>
                                </>
                            </div>
                        )}                                             
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))