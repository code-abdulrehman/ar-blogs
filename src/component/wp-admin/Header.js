"use client"
import { RiBarChartHorizontalLine } from "react-icons/ri"; 
import { GoScreenFull, GoScreenNormal } from "react-icons/go";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function getUser() {
  // Prevent localStorage access during SSR by checking if window is available
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null; // Return null on the server
}

const Header = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Initially null until checked on client
  const router = useRouter();

  useEffect(() => {
    // On component mount, get user from localStorage
    const storedUser = getUser();
    setCurrentUser(storedUser);

    // Redirect to login if no user data
    if (!storedUser) {
      router.push("/wp-admin/login");
    }

    // Listen for localStorage changes across tabs/windows
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        const updatedUser = getUser();
        setCurrentUser(updatedUser);

        // Redirect to login if user is removed (logged out)
        if (!updatedUser) {
          router.push("/wp-admin/login");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Cleanup event listener
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  const userImage = currentUser?.image || "/img/user.png"; // Fallback image if no user image

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  };

  return (
    <header className="flex header flex-sb">
      <div className="flex gap-2 logo">
        <h1>ADMIN</h1>
        <div className="flex headerham flex-center">
          <RiBarChartHorizontalLine />
        </div>
      </div>
      <div className="flex gap-2 rightnav">
        <div onClick={toggleFullScreen}>
          {isFullScreen ? <GoScreenNormal /> : <GoScreenFull />}
        </div>
        <div className="notification">
          <img src="/img/notification.png" alt="notify" width="40" />
        </div>
        <div className="profilenav">
          <img src={userImage} alt="user" width="30" height="70" />
        </div>
      </div>
    </header>
  );
};

export default Header;
