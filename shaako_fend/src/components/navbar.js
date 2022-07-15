import logo from './assets/img/Capture.png'
import './assets/fonts/simple-line-icons.min.css'

const Navbar = () => {
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
                        <li className="nav-item"><a className="nav-link" href="/">সুপারভাইজার</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">স্বাস্থ্যকর্মী</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">ক্যাম্পেইন</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">পরিসংখ্যান</a></li>
                        <li className="nav-item"><a className="nav-link active" href="/">লগআউট</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
