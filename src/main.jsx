import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import {RouterProvider}  from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './store/store.js'
import HomePage from './pages/HomePage.jsx'
import SigninPage from './pages/SigninPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import {Protected as AuthLayout } from './components/index.js'
import AddPost from './pages/AddPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router=createBrowserRouter(
  [
    {
      path:"/",
      element:<App/>,
      children:[
        {
          path:"/",
          element:<HomePage/>


        },
        {
          path:"/SigninPage",
          element:(
            <AuthLayout authentication={false}>
              <SigninPage/>
            </AuthLayout>
          ),
        
        },
        {
          path:"/signupPage",
          element:(
          <AuthLayout authentication={false}>
          <SignupPage/>
          </AuthLayout>
          ),
 
        },
        {
          path:"/AllPosts",
          element:(
            <AuthLayout>
              {" "}
              <AllPosts />
            </AuthLayout>
          )
        },
        {
          path:"/AddPost",
          element:(
            <AuthLayout>
              {" "}
              <AddPost/>
            </AuthLayout>
          )
        },
        {
          path:"/edit-post/:slug",
          element:(
            <AuthLayout>
                 {" "} 
                 <EditPost/>
            </AuthLayout>
          )
        },
        {
          path:"/post/:slug",
          element:<Post/>
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
   <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
