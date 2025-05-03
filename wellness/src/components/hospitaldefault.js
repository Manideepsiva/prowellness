import React from 'react'
import Hospitadminsidebar from './hospitadminsidebar'
import Hospitalheader from './Hospitaladminheader'
import Hospitalcontent from './hospitaladmincontent'
import Hospitaladminfooter from './hospitaladminfooter.js'
import { useSelector } from 'react-redux'

const Hospitaldefault = () => {

  const sidebarShow = useSelector((state) => state.ui.sidebarShow);

  
  const wrapperStyle = {
    paddingLeft: sidebarShow ? '250px' : '0',  
    transition: 'padding-left 0.15s ease-in-out',
  };
  return (
    <div>
          <Hospitadminsidebar />
      <div className="wrapper d-flex flex-column min-vh-100" style={wrapperStyle}>
         <Hospitalheader/>
        <div className="body flex-grow-1">
          <Hospitalcontent/>
        </div>
      <Hospitaladminfooter/>
      </div>
    </div>
  )
}

export default Hospitaldefault
