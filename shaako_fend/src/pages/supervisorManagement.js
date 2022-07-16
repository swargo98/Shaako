import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const SupervisorManagement = () => {
    return (

        <main className="page landing-page">
            {!localStorage.getItem('logged') && <Navigate to="/login" replace={true} />}
            <br/>
            <br/>
            <section className="clean-block features" style={{background: "#a6f9d6", height: "700px"}}>
                <div className="container">
                    <div className="block-heading" style={{padding: "24px 0px 0px"}}>
                        <h2 className="text-info"><br/><span
                            style={{color: "rgba(var(--bs-info-rgb), var(--bs-text-opacity))" , backgroundColor: "rgb(246, 246, 246)"}}>সুপারভাইজার ম্যানেজমেন্ট</span><br/>
                        </h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-5 col-lg-8 feature-box"><i className="icon-star icon"></i>
                            <a href="/supervisor_list"><h4>সুপারভাইজার তালিকা</h4></a>
                            <h6>সকল সুপারভাইজারের ডিটেইলড তালিকা দেখতে এখনে ক্লিক করুন</h6>
                        </div>
                        <br/>
                        <div className="col-md-5 col-lg-8 feature-box"><i className="icon-pencil icon"></i>
                            <a href='/new_supervisor'><h4>সুপারভাইজার নিয়োগ</h4></a>
                            <h6>নতুন সুপারভাইজার নিয়োগ করতে এখনে ক্লিক করুন</h6>
                        </div>
                        <br/>
                        <div className="col-md-5 col-lg-8 feature-box"><i className="icon-refresh icon"></i>
                            <a href='/update_supervisor'><h4>সুপারভাইজার আপডেট</h4></a>
                            <h6>সুপারভাইজারের কর্মরত এলাকা পরিবর্তন অথবা ডিলিট করতে এখনে ক্লিক করুন</h6>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default SupervisorManagement;
