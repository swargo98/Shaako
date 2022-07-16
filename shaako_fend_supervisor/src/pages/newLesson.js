import RichTextEditor from "../components/richTextEditor";
const NewLesson = () => {
    return (
        <main className="page landing-page">
            <section className="clean-block features" style={{background: "#a6f9d6", margin: "-67px"}}>
                <div className="container">
                    <div className="block-heading" style={{padding: "24px 0px 0px"}}>
                        <p></p>
                    </div>
                </div>
                <div className="container py-4 py-xl-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-7 text-center mx-auto">
                            <h2>নতুন পাঠ যোগ করুন</h2>
                            <p className="w-lg-50">Curae hendrerit donec commodo hendrerit egestas tempus, turpis
                                facilisis nostra nunc. Vestibulum dui eget ultrices.</p>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3" style={{margin: "-31px -12px 0px"}}>
                        <div className="col-xl-1">
                            <p style={{width: "400px"}}>শিরোনামঃ&nbsp;</p>
                        </div>
                        <div className="col"><input type="text" style={{width: "500px"}}/></div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3"
                         style={{margin: "-2px -12px 0px", height: "77px"}}>
                        <div className="col-xl-1">
                            <p style={{width: "400px"}}>লেখকঃ</p>
                        </div>
                        <div className="col"><input type="text" style={{width: "500px"}}/></div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-1 row-cols-xl-1"
                         style={{padding: "0px", margin: "22px -12px 0px"}}>
                        <RichTextEditor />
                    </div>
                    <button className="btn btn-primary" type="button"
                            style={{margin: "12px", background: "rgb(52,163,0)"}}>পাঠ যোগ করুন
                    </button>
                </div>


            </section>
        </main>
    );
}

export default NewLesson;
