import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const CHWManagement = () => {
    return (
        <main className="page landing-page">
            {!localStorage.getItem('logged') && <Navigate to="/login" replace={true} />}
            <br/>
            <br/>
            <section className="clean-block features" style={{background: "#a6f9d6", height: "700px"}}>
                <div className="container">
                    <div className="block-heading" style={{padding: "24px 0px 0px"}}>
                        <h2 className="text-info"><br/><span
                            style={{color: "rgba(var(--bs-info-rgb), var(--bs-text-opacity))" , backgroundColor: "rgb(246, 246, 246)"}}>স্বাস্থ্যকর্মী ম্যানেজমেন্ট</span><br/>
                        </h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-5 col-lg-8 feature-box"><i className="icon-star icon"></i>
                            <a href="/chw_list"><h4>স্বাস্থ্যকর্মী তালিকা</h4></a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec
                                auctor in, mattis vitae leo.</p>
                        </div>
                        <div className="col-md-5 col-lg-8 feature-box"><i className="icon-pencil icon"></i>
                            <a href='/new_chw'><h4>স্বাস্থ্যকর্মী নিয়োগ</h4></a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec
                                auctor in, mattis vitae leo.</p>
                        </div>
                        <div className="col-md-5 col-lg-8 feature-box"><i className="icon-refresh icon"></i>
                            <a href='/update_chw'><h4>স্বাস্থ্যকর্মী আপডেট</h4></a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec
                                auctor in, mattis vitae leo.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default CHWManagement;
