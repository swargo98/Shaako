import logo from './assets/img/Capture.png'
import './assets/fonts/simple-line-icons.min.css'
import './assets/fonts/fontawesome-all.min.css'

const NavbarSupervisor = () => {
    return (
        <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container"><img src={logo} alt="logo" style={{width: '40px'}}/><a
                className="navbar-brand logo" href="/"
                style={{width: '67.25px', padding: '3px 0px', margin: '0px'}}><strong><span
                style={{color: 'rgba(4, 40, 228, 0.9)'}}>&nbsp; সাঁকো</span></strong></a>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span
                    className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link active" href="/">হোম</a></li>
                        <li className="nav-item" style={{margin: "0px", padding: "0px 1px 0px 0px"}}>
                            <div className="nav-item dropdown" style={{margin: "5px"}}><a className="dropdown-toggle"
                                                                                       aria-expanded="false"
                                                                                       data-bs-toggle="dropdown"
                                                                                       href="/"
                                                                                       style={{color: "rgb(0,0,0)", margin: "-27px", padding: "24px"}}><span
                                style={{color: 'rgb(0, 0, 0)'}}>পাঠসমূহ</span></a>
                                <div className="dropdown-menu"><a className="dropdown-item" href="/new_lesson">কন্টেন্ট</a><a
                                    className="dropdown-item" href="/">কুইজ</a></div>
                            </div>
                        </li>
                        <li className="nav-item"><a className="nav-link" href="/"
                                                    style={{margin: "0px"}}>স্বাস্থ্যকর্মী</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">ক্যাম্পেইন</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">পরিসংখ্যান</a></li>
                        <li className="nav-item"><a className="nav-link active" href="/"><i className="far fa-bell"
                                                                                            style={{fontSize: "17px"}}></i></a>
                        </li>
                        <li className="nav-item">
                            <div className="nav-item dropdown" style={{margin: "5px"}}><a className="dropdown-toggle"
                                                                                       aria-expanded="false"
                                                                                       data-bs-toggle="dropdown"
                                                                                       href="/"
                                                                                       style={{color: 'rgb(0,0,0)'}}></a>
                                <div className="dropdown-menu"><a className="dropdown-item" href="/">প্রোফাইল</a><a
                                    className="dropdown-item" href="/">লগ আউট</a></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarSupervisor;
