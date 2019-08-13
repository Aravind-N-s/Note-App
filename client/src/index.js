import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)


ReactDOM.render(jsx, document.getElementById('root'));
