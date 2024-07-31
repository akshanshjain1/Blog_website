import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Authlayout,Login} from './components/index.js'

import Signup from './Pages/Signup.jsx'
import Allposts from './Pages/Allposts.jsx'
import Addpost from './Pages/Addpost.jsx'
import Editpost from './Pages/Editpost.jsx'
import Post from './Pages/Post.jsx'
import Home from './Pages/Home.jsx'


const router =createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/',
      element:<Home/>,

    },
    {
      path:'/login',
      element:(
        <Authlayout authentication={false}>
        <Login/>
        </Authlayout>
      )
    },
    {
      path:'/signup',
      element:(
        <Authlayout authentication={false}>
        <Signup/>
        </Authlayout>
      )
    },
    {
      path:'/all-posts',
      element:(
        <Authlayout authentication={true}>
        {" "}
        <Allposts/>
        </Authlayout>
      )
    },
    {
      path:'/add-post',
      element:(
        <Authlayout authentication={true}>
          {" "}
        <Addpost/>
        </Authlayout>
      )
    },
    {
      path:'/edit-post/:slug',
      element:(
        <Authlayout authentication={true}>
          {" "}
        <Editpost/>
        </Authlayout>
      )
    },
    {
      path:'/post/:slug',
      element:<Post/>
    }
  ]

}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
