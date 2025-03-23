import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function EstimatedAddress() {
    const navigate = useNavigate();

    return (
        <div>
            <div
                style={{
                    height: "120vh",
                    backgroundImage:
                        "url(assets/img/hero-section.png)",
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
                        // backgroundColor: "rgba(0, 0, 0, 0.44)"
                    }}
                >


                    <div className="d-flex justify-content-center align-items-center">
                        <div className="card" style={{ width: '100%', height: '110vh' }}>
                            <div className="container-fluid">
                                <div className="row d-flex justify-content-center align-items-center h-100">
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
                            <div className="row g-0 h-100 mt-4">
                                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
                                    <div className="sqs-html-content">
                                        <h3 style={{ whiteSpace: 'pre-wrap', fontSize: '36px', fontWeight: '600' }}>
                                            <strong>YOUR ADDRESS</strong>
                                        </h3>
                                        <p className="mt-4">
                                            Northeast Thames Drive 604 <br />
                                            Lee's Summit <br />
                                            Missouri 64086 <br />
                                            USA
                                        </p>

                                        <div className="mt-5">
                                            <a
                                                onClick={() => navigate('/estimatedownlease')}
                                                className="button-element"
                                            >
                                                That’s Right
                                                <i className="fas fa-long-arrow-alt-right ms-2" style={{ fontSize: '30px' }}></i>
                                            </a>
                                        </div>

                                        <div className="mt-3">
                                            <a
                                                onClick={() => navigate('/')}
                                                className="buttons-elemented d-flex align-items-center text-decoration-none fw-bold"
                                            >
                                                <i className="fas fa-long-arrow-alt-left me-2" style={{ fontSize: '30px' }}></i>
                                                That’s Not Right
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                                    <img
                                        src='assets/img/estimatd_add.png'
                                        alt=''
                                        className="img-fluid"
                                        style={{ maxHeight: '95%', maxWidth: '100%', borderRadius: '35% 2% 2% 2%', border: '1px solid rgba(255, 166, 0, 1)', objectFit: 'contain' }} // Use 'contain' to maintain aspect ratio
                                    />
                                </div>

                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
