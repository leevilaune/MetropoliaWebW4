import React from 'react'
import PropTypes from 'prop-types'
import { Link, Outlet } from 'react-router'

const Layout = props => {
  return (
 <div>
   <nav>
     <ul>
       <li>
         <Link to="/">Home</Link>
       </li>
       <li>
         <Link to="/profile">Profile</Link>
       </li>
       <li>
         <Link to="/upload">Upload</Link>
       </li>
     </ul>
   </nav>
   <main>
     <Outlet />
   </main>
 </div>  )
}

Layout.propTypes = {}

export default Layout
