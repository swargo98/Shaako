const NewSupervisor = () => {
    return (
        <main className="page landing-page" style={{padding: "76px 0px 0px"}}>
            <section className="clean-block features" style={{background: "#a6f9d6"}}>
                <div className="container">
                    <div className="block-heading" style={{padding: "24px 0px 0px"}}>
                        <h2 className="text-info"><br /><span
                            style={{color: "rgba(var(--bs-info-rgb), var(--bs-text-opacity))" , backgroundColor: "rgb(246, 246, 246)"}}>সুপারভাইজার নিয়োগ</span><br />
                        </h2>
                    </div>
                </div>
                <section className="clean-block clean-form dark" style={{background: "#a6f9d6"}}>
                    <div className="container" style={{margin: "0px 10px", padding: "0px 200px"}}>
                        <form style={{width: "1000px", transform: "translate(270px)"}}>
                            <div className="mb-3"><label className="form-label" htmlFor="name">নাম</label><input
                                className="form-control" type="text" id="name" name="name"/></div>
                            <div className="mb-3"><label className="form-label" htmlFor="subject">ফোন
                                নম্বর</label><input className="form-control" type="text" id="subject" name="subject"/>
                            </div>
                            <div className="mb-3"><label className="form-label" htmlFor="email">ইমেইল</label><input
                                className="form-control" type="email" id="email-1" name="email"/></div>
                            <div className="mb-3"><label className="form-label" htmlFor="email">এলাকা</label><input
                                className="form-control" type="email" id="email" name="email"/></div>
                            <div className="mb-3"><label className="form-label" htmlFor="email">সনদপত্র</label><input
                                className="form-control" type="file"/></div>
                            <div className="mb-3"><label className="form-label" htmlFor="email">ছবি</label><input
                                className="form-control" type="file"/></div>
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

export default NewSupervisor;
