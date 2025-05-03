import React from 'react'
import AppSidebar from './AppSidebar'
import AppHeader from './AppHeader'
import AppContent from './AppContent'
import AppFooter from './AppFooter'
import { useSelector } from 'react-redux'

const DefaultLayout = () => {

  const sidebarShow = useSelector((state) => state.ui.sidebarShow);

  // Determine the padding based on sidebar visibility
  const wrapperStyle = {
    paddingLeft: sidebarShow ? '250px' : '0',  // Adjust the padding here based on your sidebar width
    transition: 'padding-left 0.15s ease-in-out',
  };
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100" style={wrapperStyle} >
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
