import React from 'react'
import ReactDOM from 'react-dom'
import Popup from 'reactjs-popup'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import NotesList from './components/Notes/List'
import ShowNote from './components/Notes/Show'
import NoteNew from  './components/Notes/New'
import NoteEdit from './components/Notes/Edit'

import CategoryList from './components/Category/list'
import CategoryNew from './components/Category/new'

import NotesLogin from './components/User/Login'
import NotesRegister from './components/User/Register';
import NotesAccount from './components/User/Account';
import NotesLogout from './components/User/Logout'
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

    handleShowAuth = (props) =>{
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
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1 className="navbar font-italic font-weight-bold shadow-lg p-3 mb-5 bg-warning rounded" >
                        <Link className ="text-dark" to="/" >My Notes App</Link>{this.handleShowAuth()}</h1>
                    <Switch>
                        { this.state.isAuthenticated && (
                            <div className ="container" >
                                <div  className="container" >
                                    <Link className=" btn btn-primary btn-lg  col-md-4"  to ="/notes"><h3>List Notes</h3></Link>
                                    <Link style={{marginLeft:10}}className=" btn btn-secondary btn-lg  col-md-4"  to ="/category"><h3>List Category</h3></Link><br />
                                </div>
                                <Route path="/logout" render = {(props) => {
                                    return <NotesLogout {...props} handleAuth={this.handleAuth} />
                                }}/>
                                <Route path="/notes" component={NotesList} exact={true}/>
                                <Route path="/notes/new" component={NoteNew} />
                                <Route path="/notes/edit/:id" component={NoteEdit} exact={true} />
                                <Route path="/notes/:id" component={ShowNote} />
                                <Route path="/category" component={CategoryList} exact={true}/>
                                <Route path="/category/new" component={CategoryNew} />  
                            </div>
                        )}   
                        <Route render={() => {
                            return <h2>path not exist</h2>
                        }} exact={true}/>                                           
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))