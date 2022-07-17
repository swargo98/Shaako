import man1 from './assets/img/avatars/avatar1.jpg'
import man2 from './assets/img/avatars/avatar2.jpg'
import man3 from './assets/img/avatars/avatar3.jpg'
import { Navigate } from 'react-router-dom';

const ViewContents = () => {
    return (
        
        <main className="page landing-page">
            {!localStorage.getItem('logged') && <Navigate to="/login" replace={true} />}
            <section className="clean-block features" style={{background: "#a6f9d6", margin: "-67px"}}>
                <div className="container">
                    <div className="block-heading" style={{padding: "24px 0px 0px"}}>
                    </div>
                </div>
                <div className="container py-4 py-xl-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-7 text-center mx-auto">
                            <h2>স্বাস্থ্যসেবা বিষয়ক পাঠ</h2>
                            <p className="w-lg-50">Curae hendrerit donec commodo hendrerit egestas tempus, turpis
                                facilisis nostra nunc. Vestibulum dui eget ultrices.</p>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        <div className="col">
                            <div className="p-4">
                                <h4>পোলিও টিকা</h4>
                                <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac
                                    facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
                                    metus.</p>
                                <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover"
                                                             width="50" height="50"
                                                             src={man1} alt="man"/>
                                    <div>
                                        <p className="fw-bold mb-0">John Smith</p>
                                        <p className="text-muted mb-0">Erat netus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-4">
                                <h4>কোভিড-১৯ সচেতনতা</h4>
                                <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac
                                    facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
                                    metus.</p>
                                <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover"
                                                             width="50" height="50"
                                                             src={man2} alt="man"/>
                                    <div>
                                        <p className="fw-bold mb-0">John Smith</p>
                                        <p className="text-muted mb-0">Erat netus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-4">
                                <h4>প্রাথমিক চিকিৎসা</h4>
                                <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac
                                    facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
                                    metus.</p>
                                <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover"
                                                             width="50" height="50"
                                                             src={man3} alt="man"/>
                                    <div>
                                        <p className="fw-bold mb-0">John Smith</p>
                                        <p className="text-muted mb-0">Erat netus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="button" style={{margin: "12px"}}>আরও দেখুন</button>
                    <button className="btn btn-primary" type="button"
                            style={{margin: "12px", background: "rgb(52,163,0)"}}><a style={{color: 'white', textDecoration: "none"}} href="/new_lesson">পাঠ যোগ করুন</a>
                    </button>
                </div>

                <div className="container py-4 py-xl-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-7 text-center mx-auto">
                            <h2>স্বাস্থ্যসেবা বিষয়ক কুইজ</h2>
                            <p className="w-lg-50">Curae hendrerit donec commodo hendrerit egestas tempus, turpis
                                facilisis nostra nunc. Vestibulum dui eget ultrices.</p>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        <div className="col">
                            <div className="p-4">
                                <h4>পোলিও টিকা</h4>
                                <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac
                                    facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
                                    metus.</p>
                                <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover"
                                                             width="50" height="50"
                                                             src={man1} alt="man"/>
                                    <div>
                                        <p className="fw-bold mb-0">John Smith</p>
                                        <p className="text-muted mb-0">Erat netus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-4">
                                <h4>কোভিড-১৯ সচেতনতা</h4>
                                <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac
                                    facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
                                    metus.</p>
                                <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover"
                                                             width="50" height="50"
                                                             src={man2} alt="man"/>
                                    <div>
                                        <p className="fw-bold mb-0">John Smith</p>
                                        <p className="text-muted mb-0">Erat netus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-4">
                                <h4>প্রাথমিক চিকিৎসা</h4>
                                <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac
                                    facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
                                    metus.</p>
                                <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover"
                                                             width="50" height="50"
                                                             src={man3} alt="man"/>
                                    <div>
                                        <p className="fw-bold mb-0">John Smith</p>
                                        <p className="text-muted mb-0">Erat netus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="button" style={{margin: "12px"}}>আরও দেখুন</button>
                    <button className="btn btn-primary" type="button"
                            style={{margin: "12px", background: "rgb(52,163,0)"}}><a style={{color: 'white', textDecoration: "none"}} href="/">কুইজ যোগ করুন</a>
                    </button>
                </div>
            </section>

        </main>
    );
}

export default ViewContents;
