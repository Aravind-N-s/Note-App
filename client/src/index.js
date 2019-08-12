import React from 'react'
import ReactDOM from 'react-dom'
import Popup from 'reactjs-popup'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

import NotesLogin from './components/User/Login'
import NotesRegister from './components/User/Register'
import NotesAccount from './components/User/Account'
import NotesLogout from './components/User/Logout'

import ShowNote from '../src/components/Notes/Show'
import NoteNew from  './components/Notes/New'
import NoteEdit from './components/Notes/Edit'
import NotesList from './components/Notes/List'

import CategoryList from './components/Category/List'
import CategoryNew from './components/Category/New'
import CategoryForm from './components/Category/Form'

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
                        <Popup trigger={<Link className="btn btn-success" to="/users/account">Account</Link>}position="left top"on="hover">
                           <NotesAccount />                          
                        </Popup>
                    </div>
                )}
                { !this.state.isAuthenticated && (
                    <div className ="container">
                        <Popup trigger={<Link className="btn btn-success" to='/users/login'>Login</Link>} position="left top"on="hover">
                            <div>
                                <NotesLogin handleAuth={this.handleAuth}/>
                            </div>
                        </Popup><br />
                        <Popup trigger={<Link className="btn btn-success" to="/users/register">Register</Link>} position="left top"on="hover">
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
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1 className="navbar font-italic font-weight-bold shadow-lg p-3 mb-5 rounded" >
                        <Link className ="text-dark" to="/notes" >My Notes App</Link>{this.handleShowAuth()}</h1>
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
                                    <Route path="/users/logout" render = {(props) => {
                                        return <>
                                            <NotesLogout {...props} handleAuth={this.handleAuth} />
                                            <Redirect to="/"/>
                                            </>
                                    }}/>
                                    <Route exact path="/notes" component={NotesList}/>
                                    <Route exact strict path="/users/login" render={() => (<Redirect to="/notes"/>)} />
                                    <Route exact strict path="/users/register" render={() => (<Redirect to="/notes"/>)} />
                                    <Route exact strict path="/users/account" render={() => (<Redirect to="/notes"/>)} />
                                    <Route exact strict path="/notes/new"/>
                                    <Route path="/notes/edit/:id" exact component={NoteEdit} render={() => (<Redirect to="/notes/:id"/>)}  />
                                    <Route path="/notes/:id" exact strict render = {(props) => {
                                        return <ShowNote {...props} handleAuth={this.handleAuth} />
                                    }}/>
                                    <Route path="/category" component={CategoryList} exact={true}/>
                                    <Route path="/category/new" component={CategoryNew} />  
                                    <Route path="/category/edit/:id" render = {(props) => {
                                        return <CategoryForm {...props} selectedCategory={'hello'}/>
                                    }} exact={true}/>
                                </>
                                </Switch>
                            </div>
                        )}
                        {!this.state.isAuthenticated &&(
                            <Switch>
                                <>
                                    <Route exact path="/users/login" render={() => (<Redirect to="/" />)} />
                                    <Route exact path="/users/register" render={() => (<Redirect to="/" />)} />
                                    {/* <Route exact path="/" render={() => (<Redirect to="/error" />)} /> */}
                                </>
                            </Switch>
                        )}                                             
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))