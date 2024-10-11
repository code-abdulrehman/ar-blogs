"use client"
import { useState, useEffect } from 'react';
import CreativeDots from "@/component/wp-admin/CreativeDots";
import Loading from "@/component/wp-admin/Loading";
import { LuLayoutDashboard } from "react-icons/lu";
export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    // Simulate a data fetch with a delay
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after data has "loaded"
    }, 2000); // 2 seconds delay for demonstration

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner if data is still loading
  if (loading) {
    return <div className="loadingBox"><Loading /></div>;
  }

  // Once data is loaded, show the dashboard
  return (
    <>
      <div className="dashboard">
        {/* titledashboard */}
        <div className="flex titledashboard flex-sb">
          <div>
            <h2>Blogs <span>Dashboard</span></h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <LuLayoutDashboard /> <span>/</span> <span>Dashboard</span>
          </div>
        </div>
        
        {/* dashboard four cards */}
        <div className="flex topfourcards flex-sb">
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>12</span>
          </div>
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>12</span>
          </div>
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>12</span>
          </div>
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>12</span>
          </div>
        </div>

        {/* year overview */}
        <div className="flex year_overview flex-sb">
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <CreativeDots />
              <h3 className="text-right">10 / 365 <br /> <span>Total Published</span></h3>
            </div>
          </div>

          {/* chart pending */}
          <div className="right_salescont">
            <div>
              <h3>Blogs By Category</h3>
              <CreativeDots />
            </div>
            <div className="flex blogscategory flex-center">
              <br />
              <table>
                <thead>
                  <tr></tr>
                  <tr>
                    <td>Topics</td>
                    <td>Data</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Html, Css & Js</td>
                    <td>07</td>
                  </tr>
                  {/* Repeat table rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
