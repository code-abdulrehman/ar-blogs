
"use client"
import { useState, useEffect } from 'react';
import Loading from "@/component/wp-admin/Loading";
import { BsPostcard } from "react-icons/bs";
import Link from 'next/link';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


const page = () => {
  const [loading, setLoading] = useState(true);
  const [searhQuery, setSearhQuery] = useState('');

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
  return (
    <div className='blogpage'>
      <div className="flex titledashboard flex-sb">
        <div>
          <h2>All Published <span>Blogs</span></h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="breadcrumb">
          <BsPostcard /> <span>/</span> <span>Blogs</span>
        </div>
      </div>

      <div className="blogstable">
        <div className="flex gap-2 mb-1">
          <h2>Search Blogs:</h2>
          <input 
          type="text" 
          placeholder='search by title . . .'
          value={searhQuery}
          onChange={(e)=>setSearhQuery(e.target.value)} />
        </div>
        
        <table className="table table-styling">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>title of blog</td>
              <td>slug-of-blog</td>
              <td>
                <div className="flex gap-2 flex-center">
                  <Link href="/wp-admin/blogs/edit/id"><button className='edit' title='edit'><FaEdit/></button></Link>
                  <Link href="/wp-admin/blogs/delete/id"><button 
                  className="delete" title='delete'><MdDeleteForever /></button></Link>
                  </div>                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page