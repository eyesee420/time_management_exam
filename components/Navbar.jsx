import Link from 'next/link'
const Navbar = () => {
    return ( <>
    <div className="my_navs">
    
    <div className="con_nav">
    <Link href="/">Home</Link>
    {/* <Link href="/user">Employee Login</Link> */}
    <Link href="/employee_logs">Employee Logs</Link>
    <Link href="/logs">Approved Logs</Link>
    {/* <Link href="/admin_login"> Admin Login</Link> */}
    <Link href="/admin"> Admin</Link>
    {/* <a href="/user">user form</a>
    <a href="/admin">admin form </a>
    <a href="/logs">Logs</a> */}
    </div>

    </div>

    </> );
}
 
export default Navbar;