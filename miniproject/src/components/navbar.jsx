import { BsAndroid2, BsBrowserChrome, BsDiscord } from "react-icons/bs";
import { FaPoo } from "react-icons/fa";


const Navbar = () => {
    return (
        <div className='fixed top-0 left-0 h-full w-24 m-0 p-0
                        flex flex-col
                        bg-gray-900 text-white shadow-lg'>

            <SideBarIcon icon={<BsAndroid2 size="40"/>} text="Home" />
            <SideBarIcon icon={<BsDiscord size="40" />} text="About Us" />
            <SideBarIcon icon={<FaPoo size="40" />} text="Contact" />
            <SideBarIcon icon={<BsBrowserChrome size="40" />}text="Download"  />
        </div>
    );
};

const SideBarIcon = ({ icon, text = "TOOLTIP" }) => (
    <div className='sidebar-icon group'>
        {icon}

        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
    
)
export default Navbar;