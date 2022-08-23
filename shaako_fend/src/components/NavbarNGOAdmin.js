import logo from './assets/img/Capture.png'
import './assets/fonts/simple-line-icons.min.css'

let handleSubmit = async () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('organization');
    localStorage.removeItem('admin_id');
    localStorage.removeItem('token');
}

const NavbarNGOAdmin = () => {
    return (
        <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container"><img src={logo} alt="logo" style={{ width: '40px' }} /><a
                className="navbar-brand logo" href="/"
                style={{ width: '67.25px', padding: '3px 0px', margin: '0px' }}><strong><span
                    style={{ color: 'rgba(4, 40, 228, 0.9)' }}>&nbsp; সাঁকো</span></strong></a>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span
                    className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="/home">হোম</a></li>
                        <li className="nav-item"><a className="nav-link" href="/supervisor_management">সুপারভাইজার</a></li>
                        <li className="nav-item"><a className="nav-link" href="/chw_management">স্বাস্থ্যকর্মী</a></li>
                        <li className="nav-item"><a className="nav-link" href="/campaign_list">ক্যাম্পেইন</a></li>
                        <li className="nav-item"><a className="nav-link" href="/statistics">পরিসংখ্যান</a></li>
                        {/* <li className="nav-item"><a className="nav-link active" href="/login" onClick={handleSubmit}>লগআউট</a></li> */}
                        <li className="nav-item">
                            <div className="nav-item dropdown" style={{ margin: "5px" }}><a className="dropdown-toggle"
                                aria-expanded="false"
                                data-bs-toggle="dropdown"
                                href="/"
                                style={{ color: 'rgb(0,0,0)' }}></a>
                                <div className="dropdown-menu"><a className="dropdown-item" href="/profile">প্রোফাইল</a><a
                                    className="dropdown-item" href="/login" onClick={handleSubmit}>লগ আউট</a></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarNGOAdmin;
