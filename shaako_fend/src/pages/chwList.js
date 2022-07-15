import man1 from './assets/img/avatars/avatar1.jpg'
import man2 from './assets/img/avatars/avatar2.jpg'
import man3 from './assets/img/avatars/avatar3.jpg'

const CHWList = () => {
    return (
        <div className="container-fluid">
            <br/>
            <br/>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">স্বাস্থ্যকর্মী তালিকা</p>
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
                                <th>সুপারভাইজার</th>
                                <th>বয়স</th>
                                <th>নিয়োগ তারিখ</th>
                                <th>রোগী</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man1} alt="man"/>Airi Satou</td>
                                <td>Union Lorem Ipsum</td>
                                <td>John Doe</td>
                                <td>33</td>
                                <td>2008/11/28</td>
                                <td>2,700</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man2} alt="man"/>Angelica Ramos</td>
                                <td>Union Lorem Ipsum<br/></td>
                                <td>John Doe</td>
                                <td>47</td>
                                <td>2009/10/09<br/></td>
                                <td>200</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man3} alt="man"/>Ashton Cox</td>
                                <td>Union Lorem Ipsum<br/></td>
                                <td>John Doe</td>
                                <td>66</td>
                                <td>2009/01/12<br/></td>
                                <td>6,000</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man1} alt="man"/>Bradley Greer</td>
                                <td>Union Lorem Ipsum<br/></td>
                                <td>John Doe</td>
                                <td>41</td>
                                <td>2012/10/13<br/></td>
                                <td>2,000</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man2} alt="man"/>Brenden Wagner</td>
                                <td>Union Lorem Ipsum<br/></td>
                                <td>John Doe</td>
                                <td>28</td>
                                <td>2011/06/07<br/></td>
                                <td>6,850</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man1} alt="man"/>Brielle Williamson</td>
                                <td>Union Lorem Ipsum<br/></td>
                                <td>John Doe</td>
                                <td>61</td>
                                <td>2012/12/02<br/></td>
                                <td>3720</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man3} alt="man"/>Bruno Nash<br/></td>
                                <td>Union Lorem Ipsum<br/></td>
                                <td>John Doe</td>
                                <td>38</td>
                                <td>2011/05/03<br/></td>
                                <td>3,500</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man2} alt="man"/>Caesar Vance</td>
                                <td>Union Lorem Ipsum<br/></td>
                                <td>John Doe</td>
                                <td>21</td>
                                <td>2011/12/12<br/></td>
                                <td>6,450</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man1} alt="man"/>Cara Stevens</td>
                                <td>Union Lorem Ipsum<br/></td>
                                <td>John Doe</td>
                                <td>46</td>
                                <td>2011/12/06<br/></td>
                                <td>5,600</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man3} alt="man"/>Cedric Kelly</td>
                                <td>Union Lorem Ipsum<br/></td>
                                <td>John Doe</td>
                                <td>22</td>
                                <td>2012/03/29<br/></td>
                                <td>3,060</td>
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

export default CHWList;
