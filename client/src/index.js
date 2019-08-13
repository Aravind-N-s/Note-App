import React from 'react'
import ReactDOM from 'react-dom'
import Popup from 'reactjs-popup'
import {BrowserRouter, Switch, Link, Route, Redirect} from 'react-router-dom'

import NotesLogin from './Component/User/Login'
import NotesRegister from './Component/User/Register'
import NotesAccount from './Component/User/Account'
import NotesLogout from './Component/User/Logout'

import CategoryList from './Component/Category/List'
import CategoryNew from './Component/Category/New'
import CategoryForm from './Component/Category/Form'

import NoteNew from  './Component/Note/New'
import NoteEdit from './Component/Note/Edit'
import ShowNote from './Component/Note/Show'
import NotesList from './Component/Note/List'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isAuthenticated: false
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
                        <Popup trigger={<Link className="btn btn-success" to="/users/account">Account</Link>}position="left top"on="click">
                           <NotesAccount />                          
                        </Popup>
                    </div>
                )}
                { !this.state.isAuthenticated && (
                    <div className ="container">
                        <Popup trigger={<Link className="btn btn-success" to="/users/register">Register</Link>} position="left top"on="hover">
                            <div>
                                <NotesRegister />
                            </div>
                        </Popup> <br/>
                        <Popup trigger={<Link className="btn btn-success" to='/users/login'>Login</Link>} position="left top"on="hover">
                            <div>
                                <NotesLogin handleAuth={this.handleAuth}/>
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
    }

    render() {
        return (
            <BrowserRouter >
                <div>
                    <h1 className="navbar font-italic font-weight-bold shadow-lg p-3 mb-5 rounded" >
                        <Link className ="text-dark" to="/" >My Notes App</Link>{this.handleShowAuth()}</h1>
                    {!this.state.isAuthenticated &&(
                        <Switch>
                            <>
                                <Route exact strict path="/users/login" render={() => (<Redirect to="/"/>)} />
                                <Route exact strict path="/users/register" render={() => (<Redirect to="/" />)} />
                                <img src="/images/Ravanasura.jpg" className="rounded mx-auto d-block"></img>
                            </>
                        </Switch>
                    )}
                    { this.state.isAuthenticated && (
                        <div className ="container" >
                                <Popup trigger={<Link className=" btn btn-primary btn-lg  col-md-4"  to ="/notes/new"><h3> New Notes</h3></Link>} position = "right top" on="click">
                                    <div>
                                        <NoteNew />                                            
                                    </div>
                                </Popup>
                                <Link style={{marginLeft:10}} className=" btn btn-secondary btn-lg  col-md-4"  to ="/category"><h3>List Category</h3></Link>
                            <Switch>
                            <>
                                <Route exact strict path="/users/account"/>
                                <Route path="/users/logout" render = {(props) => {
                                    return <>
                                        <NotesLogout {...props} handleAuth={this.handleAuth} />
                                        <Redirect to="/"/>                     
                                        </>
                                }}/>
                                <Route exact strict path="/" component={NotesList}/>
                                <Route exact strict path="/notes/new"/>
                                <Route path="/notes/show/:id" exact strict render = {(props) => {
                                    return <ShowNote {...props} handleAuth={this.handleAuth} />
                                }}/>
                                <Route path="/notes/edit/:id" exact strict component={NoteEdit} render={() => (<Redirect to="/notes/:id"/>)}  />
                                <Route path="/category" exact strict component={CategoryList}/>
                                <Route path="/category/new" exact strict component={CategoryNew} />  
                                <Route path="/category/edit/:id" exact strict component={CategoryForm}/>
                            </>
                            </Switch>
                        </div>
                    )}                                           
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))