"use client"
import Link from 'next/link'
import {useState, useEffect} from 'react'
import { IoHome } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { useRouter } from 'next/navigation'
import { LuLayoutDashboard } from "react-icons/lu";
const Aside = () => {
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/wp-admin');
    const handleClick = () => {
        setClicked(!clicked);
    }
    const handleLinkClick = (link) => {
        setActiveLink(link)
        setClicked(false);
    }
    console.log("active link", activeLink)
    
    useEffect(()=>{
        //update active link
        const currentPath = router.pathname;
        setActiveLink(currentPath || '/wp-admin');
        // setActiveLink(router.pathname);
        console.log("active link", activeLink)
    },[router.pathname])
    
    return (
        <>
            <aside className="asideleft">
                <ul>
                    <Link href="/wp-admin">
                        <li className={activeLink === '/wp-admin' ? 'navactive' : ' '} onClick={()=>handleLinkClick('/wp-admin')}>
                            <LuLayoutDashboard /> 
                            <span>Dashboard</span>
                        </li>
                    </Link>

                    <Link href="/wp-admin/blogs">
                        <li className={activeLink === '/wp-admin/blogs' ? 'navactive' : ' '} onClick={()=>handleLinkClick('/wp-admin/blogs')}>
                            <BsPostcard />
                            <span>Blogs</span>
                        </li>
                    </Link>

                    <Link href="/wp-admin/add-blog">
                        <li className={activeLink === '/wp-admin/add-blog' ? 'navactive' : ' '} onClick={()=>handleLinkClick('/wp-admin/add-blog')}>
                        <MdOutlineAddPhotoAlternate />
                            <span>Add Blog</span>
                        </li>
                    </Link>

                    <Link href="/wp-admin/draft">
                        <li className={activeLink === '/wp-admin/draft' ? 'navactive' : ' '} onClick={()=>handleLinkClick('/wp-admin/draft')}>
                        <MdOutlinePending />
                            <span>Pending</span>
                        </li>
                    </Link>

                    <Link href="/wp-admin/settings">
                        <li className={activeLink === '/wp-admin/settings' ? 'navactive' : ' '} onClick={()=>handleLinkClick('/wp-admin/settings')}>
                        <IoSettingsOutline />
                            <span>Settings</span>
                        </li>
                    </Link>
                </ul>
            </aside>
        </>
    )
}

export default Aside