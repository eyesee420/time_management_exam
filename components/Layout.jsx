import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
const Layout = ({children}) => {
    return ( 
        <>
        <Navbar></Navbar>
        <div className="content">
            <div className="content_1">
                <div className="con_1">
                <Sidebar></Sidebar>
                </div>

                <div className="con_2">
                {children}
                </div>
          
            </div>

        </div>
        </>
     );
}
 
export default Layout;