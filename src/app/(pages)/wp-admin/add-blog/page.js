
"use client"
import { useState, useEffect } from 'react';

import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Loading from "@/component/wp-admin/Loading";
import Link from 'next/link';
import Blog from '@/component/wp-admin/Blog';
const page = () => {
  const [loading, setLoading] = useState(true);

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
    <div className='addblogspage'>
      <div className="flex titledashboard flex-sb">
        <div>
          <h2>Add <span>Blog</span></h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="breadcrumb">
          <MdOutlineAddPhotoAlternate /> <span>/</span> <span>Add Blog</span>
        </div>
      </div>

      <div className="blogsadd">
        <Blog  
//         existingTitle="Blog title"
//  existingSlug="blog-slug"
//  existingCategory="nextjs"
//  existingDescription="content"
//  existingTags=""
//  existingStatus="pendiing"
 />
      </div>
    </div>
  )
}

export default page