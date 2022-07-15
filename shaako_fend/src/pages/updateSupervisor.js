import man1 from './assets/img/avatars/avatar1.jpg'
import man2 from './assets/img/avatars/avatar2.jpg'
import man3 from './assets/img/avatars/avatar3.jpg'

const UpdateSupervisor = () => {
    return (
        <div className="container-fluid">
            <br/>
            <br/>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">সুপারভাইজার আপডেটঃ এলাকা পরিবর্তন এবং অব্যহতি</p>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 text-nowrap">
                            <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label
                                className="form-label">Show&nbsp;<select
                                className="d-inline-block form-select form-select-sm">
                                <option value="10" selected="">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>&nbsp;</label></div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-end dataTables_filter" id="dataTable_filter"><label
                                className="form-label"><input type="search" className="form-control form-control-sm"
                                                              aria-controls="dataTable" placeholder="Search"/></label>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive table mt-2" id="dataTable" role="grid"
                         aria-describedby="dataTable_info">
                        <table className="table my-0" id="dataTable">
                            <thead>
                            <tr>
                                <th>নাম</th>
                                <th>এলাকা</th>
                                <th>জেলা</th>
                                <th>পরিবর্তন</th>
                                <th>নিয়োগ তারিখ</th>
                                <th>অব্যহতি</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man2} alt="man"/>Airi Satou</td>
                                <td>Union Lorem Ipsum
                                    <div className="dropdown">
                                        <button className="btn btn-primary dropdown-toggle" aria-expanded="false"
                                                data-bs-toggle="dropdown" type="button">এলাকা নির্বাচন
                                        </button>
                                        <div className="dropdown-menu"><a className="dropdown-item" href="/">First
                                            Item</a><a className="dropdown-item" href="/">Second Item</a><a
                                            className="dropdown-item" href="/">Third Item</a></div>
                                    </div>
                                </td>
                                <td>Tokyo
                                    <div className="dropdown">
                                        <button className="btn btn-primary dropdown-toggle" aria-expanded="false"
                                                data-bs-toggle="dropdown" type="button">জেলা নির্বাচন
                                        </button>
                                        <div className="dropdown-menu"><a className="dropdown-item" href="/">First Item</a><a
                                            className="dropdown-item" href="/">Second Item</a><a
                                            className="dropdown-item" href="/">Third Item</a></div>
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(233,254,0)"}}>এলাকা পরিবর্তন
                                    </button>
                                </td>
                                <td>2008/11/28</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}}>অব্যহতি প্রদান
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man1} alt="man"/>Angelica Ramos</td>
                                <td>Union Lorem Ipsum<br /></td>
                                <td>London</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(54,247,22)"}}>এলাকা পরিবর্তন
                                    </button>
                                </td>
                                <td>2009/10/09<br /></td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}}>অব্যহতি প্রদান
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man3} alt="man"/>Ashton Cox</td>
                                <td>Union Lorem Ipsum<br /></td>
                                <td>San Francisco</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(54,247,22)"}}>এলাকা পরিবর্তন
                                    </button>
                                </td>
                                <td>2009/01/12<br /></td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}}>অব্যহতি প্রদান
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man1} alt="man"/>Bradley Greer</td>
                                <td>Union Lorem Ipsum<br /></td>
                                <td>London</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(54,247,22)"}}>এলাকা পরিবর্তন
                                    </button>
                                </td>
                                <td>2012/10/13<br /></td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}}>অব্যহতি প্রদান
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man2} alt="man"/>Brenden Wagner</td>
                                <td>Union Lorem Ipsum<br /></td>
                                <td>San Francisco</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(54,247,22)"}}>এলাকা পরিবর্তন
                                    </button>
                                </td>
                                <td>2011/06/07<br /></td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}}>অব্যহতি প্রদান
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man2} alt="man"/>Brielle Williamson</td>
                                <td>Union Lorem Ipsum<br /></td>
                                <td>New York</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(54,247,22)"}}>এলাকা পরিবর্তন
                                    </button>
                                </td>
                                <td>2012/12/02<br /></td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}}>অব্যহতি প্রদান
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man1} alt="man"/>Bruno Nash<br /></td>
                                <td>Union Lorem Ipsum<br /></td>
                                <td>London</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(54,247,22)"}}>এলাকা পরিবর্তন
                                    </button>
                                </td>
                                <td>2011/05/03<br /></td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}}>অব্যহতি প্রদান
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man3} alt="man"/>Caesar Vance</td>
                                <td>Union Lorem Ipsum<br /></td>
                                <td>New York</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(54,247,22)"}}>এলাকা পরিবর্তন
                                    </button>
                                </td>
                                <td>2011/12/12<br /></td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}}>অব্যহতি প্রদান
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man1} alt="man"/>Cara Stevens</td>
                                <td>Union Lorem Ipsum<br /></td>
                                <td>New York</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(54,247,22)"}}>এলাকা পরিবর্তন
                                    </button>
                                </td>
                                <td>2011/12/06<br /></td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}}>অব্যহতি প্রদান
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man2} alt="man"/>Cedric Kelly</td>
                                <td>Union Lorem Ipsum<br /></td>
                                <td>Edinburgh</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(54,247,22)"}}>এলাকা পরিবর্তন
                                    </button>
                                </td>
                                <td>2012/03/29<br /></td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}}>অব্যহতি প্রদান
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr></tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-md-6 align-self-center">
                            <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Showing
                                1 to 10 of 2700</p>
                        </div>
                        <div className="col-md-6">
                            <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                <ul className="pagination">
                                    <li className="page-item disabled"><a className="page-link" aria-label="Previous"
                                                                          href="/"><span aria-hidden="true">«</span></a>
                                    </li>
                                    <li className="page-item active"><a className="page-link" href="/">1</a></li>
                                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                                    <li className="page-item"><a className="page-link" aria-label="Next" href="/"><span
                                        aria-hidden="true">»</span></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
        </div>
    );
}

export default UpdateSupervisor;
