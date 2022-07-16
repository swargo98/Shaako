import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const NewCampaign = () => {
    return (
        <main className="page landing-page" style={{padding: "76px 0px 0px"}}>
            {!localStorage.getItem('logged') && <Navigate to="/login" replace={true} />}
            <section className="clean-block features" style={{background: "#a6f9d6"}}>
                <div className="container">
                    <div className="block-heading" style={{padding: "24px 0px 0px"}}>
                        <h2 className="text-info"><br /><span
                            style={{color: "rgba(var(--bs-info-rgb), var(--bs-text-opacity))" , backgroundColor: "rgb(246, 246, 246)"}}>নতুন ক্যাম্পেইন</span><br />
                        </h2>
                    </div>
                </div>
                <section className="clean-block clean-form dark" style={{background: "#a6f9d6"}}>
                    <div className="container" style={{margin: "0px 10px", padding: "0px 200px"}}>
                        <form style={{width: "1000px", transform: "translate(270px)"}}>
                            <div className="mb-3"><label className="form-label" htmlFor="name">নাম</label><input
                                className="form-control" type="text" id="name" name="name"/></div>
                            <div className="mb-3"><label className="form-label" htmlFor="subject">ক্যাম্পেইন
                                শুরু</label><input className="form-control" type="date"/></div>
                            <div className="mb-3"><label className="form-label" htmlFor="email">ক্যম্পেইন
                                শেষ</label><input className="form-control" type="date"/></div>
                            <div className="mb-3"><label className="form-label" htmlFor="email">সুপারভাইজার(গণ)</label>
                            </div>
                            <input className="form-control" type="search"/>
                                <div className="mb-3" style={{padding: "2px"}}><label className="form-label"
                                                                                   htmlFor="email">বিবরণ</label><input
                                    className="form-control" type="text"/></div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" type="submit">সংরক্ষণ করুন</button>
                                </div>
                        </form>
                    </div>
                </section>
            </section>
        </main>
    );
}

export default NewCampaign;
