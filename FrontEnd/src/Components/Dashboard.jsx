import React from 'react'
import MainNavbar from '../NavBar/MainNavbar'
import MainDashboard from '../Pages/MainDashboard'

const Dashboard = () => {
  
  return (
    <div>
      <div className="relative w-full md:px-10 md:py-8">
        <MainNavbar />
        <MainDashboard/>
      </div>
      

    </div>
  )
}

export default Dashboard