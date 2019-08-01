import React from 'react'
import ReactDOM from 'react-dom'
import Popup from 'reactjs-popup'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import NotesList from './components/notes/List'
import ShowNote from './components/notes/Show'
import NoteNew from  './components/notes/New'
import NoteEdit from './components/notes/Edit'

import CategoryList from './components/category/list'
import CategoryNew from './components/category/new'

import NotesLogin from './components/User/Login'
import NotesRegister from './components/User/Register';


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h2 className="navbar font-italic font-weight-bold shadow-lg p-3 mb-5 bg-warning rounded" >My Notes App
                        <Popup trigger={<h2 className="btn btn-success">Login</h2>} position="left top" on="hover">
                            <Link className="btn btn-success" to="/Login"><NotesLogin /></Link>
                            <center className="bg bg-success"><Popup style={{marginBottom:'10px'}}trigger={<h2 className="btn btn-success ">Register</h2>} position="top bottom" on="click">
                                <Link className="btn btn-success" to="/Register"><NotesRegister/></Link>
                            </Popup></center>
                        </Popup>
                    </h2>
                    <Link className="container btn btn-primary btn-lg btn-block"  to ="/notes"><h3>List Notes</h3></Link><br />
                    <Link className="container btn btn-secondary btn-lg btn-block"  to ="/category"><h3>List Category</h3></Link><br />
                    <Switch>
                        <Route path="/notes" component={NotesList} exact={true}/>
                        <Route path="/notes/new" component={NoteNew} />
                        <Route path="/notes/edit/:id" component={NoteEdit} exact={true} />
                        <Route path="/notes/:id" component={ShowNote} />
                        <Route path="/category" component={CategoryList} exact={true}/>
                        <Route path="/category/new" component={CategoryNew} />                        
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))