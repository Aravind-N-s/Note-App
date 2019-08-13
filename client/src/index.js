import React from 'react'
import ReactDOM from 'react-dom'
import Popup from 'reactjs-popup'
import {BrowserRouter, Switch, Link, Route, Redirect} from 'react-router-dom'

import NotesLogin from './components/User/Login'
import NotesRegister from './components/User/Register'
import NotesAccount from './components/User/Account'
import NotesLogout from './components/User/Logout'

// import NoteNew from  './components/Notes/New'
// import NoteEdit from './components/Notes/Edit'
// import ShowNote from './components/Notes/Show'
// import NotesList from './components/Notes/List'

// import CategoryList from './components/Category/List'
// import CategoryNew from './components/Category/New'
// import CategoryForm from './components/Category/Form'


class App extends React.Component {
    render(){
        return(
            <h1>Hello</h1>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('root'))