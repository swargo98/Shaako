import man1 from './assets/img/avatars/avatar1.jpg'
import man2 from './assets/img/avatars/avatar2.jpg'
import man3 from './assets/img/avatars/avatar3.jpg'

import ContainerCHW from "../popupCHW/Container";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Swal from 'sweetalert2'

// // CommonJS
// const Swal = require('sweetalert2')

const submit = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
};

const UpdateCHW = () => {
    return (
        <div className="container-fluid">
            {!localStorage.getItem('logged') && <Navigate to="/login" replace={true} />}
            <br/>
            <br/>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">স্বাস্থ্যকর্মী আপডেটঃ সুপারভাইজার পরিবর্তন এবং অব্যহতি</p>
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
                                <th>সুপারভাইজার</th>
                                <th>পরিবর্তন</th>
                                <th>নিয়োগ তারিখ</th>
                                <th>অব্যহতি</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30"
                                         src={man2} alt="man"/>Airi Satou</td>
                                <td>John Doe
                                </td>
                                <td>
                                    {/*<button className="btn btn-primary" type="button"*/}
                                    {/*        style={{background: "rgb(233,254,0)"}}>সুপারভাইজার পরিবর্তন*/}
                                    {/*</button>*/}
                                    <ContainerCHW triggerText={"সুপারভাইজার পরিবর্তন"} />
                                </td>
                                <td>2008/11/28</td>
                                <td>
                                    <button className="btn btn-primary" type="button"
                                            style={{background: "rgb(247,22,22)"}} onClick={submit}>অব্যহতি প্রদান
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

export default UpdateCHW;
