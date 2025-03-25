import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlanPurchase() {
    const navigate = useNavigate();

    return (
        <>
            <div
                style={{
                    height: "110vh",
                    backgroundImage: "url(assets/img/hero-section.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
                className="position-relative w-100"
            >
                <div
                    className="position-absolute text-white d-flex flex-column align-items-center justify-content-center"
                    style={{
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                >

                    <div className="card" style={{ width: '50%', height: 'auto', padding: '10px' }}>
                        <div className="container-fluid">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-md-12 text-center">
                                    <img
                                        src='assets/img/hero-sun.png'
                                        alt='Logo'
                                        className="img-fluid"
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 style={{ textAlign: 'center', marginTop: '2%', fontSize: '20px', fontWeight: '600' }}>
                            When do you plan to purchase a solar system?</h2>
                        <div className="row g-0  mt-4">


                            <div className="col-md-12 d-flex flex-column justify-content-center align-items-center text-center">
                                <div className="radio-container">
                                    <input type="radio" id="radio1" name="option" className="custom-radio" />
                                    <label htmlFor="radio1" className="radio-label">Within the next few months</label>
                                </div>
                                <div className="radio-container mt-2">
                                    <input type="radio" id="radio2" name="option" className="custom-radio" />
                                    <label htmlFor="radio2" className="radio-label">Within the next year</label>
                                </div>
                                <div className="radio-container mt-2">
                                    <input type="radio" id="radio3" name="option" className="custom-radio" />
                                    <label htmlFor="radio3" className="radio-label">I am not sure </label>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center text-muted small mt-2" style={{ marginLeft: '6%' }}>
                            <i className="fa fa-info-circle me-2"></i>
                            <span>Your information will remain confidential</span>
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center text-center">
                            <a
                                onClick={() => navigate('/companyname')}
                                className="button-elementd"
                            >
                                NEXT
                            </a>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center text-center mt-2">
                            <a
                                onClick={() => navigate('/estimatedbill')}
                                style={{ color: 'rgba(255, 166, 0, 1)', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                back
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .card {
                        width: 90% !important; /* Use !important to ensure it overrides other styles */
                        height: auto !important;
                        padding: 20px !important;
                    }
                }
            `}</style>
        </>
    )
}
