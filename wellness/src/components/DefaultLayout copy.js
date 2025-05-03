import React from 'react'
import AppSidebar from './AppSidebar'
import AppHeader from './AppHeader'
import AppContent from './AppContent'
import AppFooter from './AppFooter'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
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
