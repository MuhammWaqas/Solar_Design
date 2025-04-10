import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../StateManagement/Context';

export default function EstimatedAddress() {
    const navigate = useNavigate();
    const { data } = useContext(AppContext); // Use context to get data

    // Extracting data from context
    const address = data.locationInfo ?
        `${data.locationInfo.street} ${data.locationInfo.streetNumber}, ${data.locationInfo.city}, ${data.locationInfo.state} ${data.locationInfo.postalCode}, USA` :
        "Address not provided";

    console.log("Address Data:", data.locationInfo); // Log address data

    return (
        <div>
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
                    style={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                    <div className='d-flex justify-content-center align-items-center text-center mt-4'>
                        <div className="card" style={{ width: '90%', height: 'auto', padding: '10px' }}>
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
                            <div className="row g-0 mt-4">
                                <div className="col-md-6 d-flex justify-content-center align-items-center text-center">
                                    <div className="sqs-html-content">
                                        <h3 style={{ whiteSpace: 'pre-wrap', fontSize: '36px', fontWeight: '600' }}>
                                            <strong>YOUR ADDRESS</strong>
                                        </h3>
                                        <p style={{ textAlign: 'center', marginTop: '15%' }}>
                                            {address.split(',').map((line, index) => (
                                                <span key={index}>
                                                    {line}<br />
                                                </span>
                                            ))}
                                        </p>

                                        <div className="mt-5">
                                            <a
                                                onClick={() => navigate('/estimatedbill')}
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

                                <div className="col-md-6 d-flex justify-content-center align-items-center text-center mt-4">
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
            <style jsx>{`
                @media (max-width: 768px) {
                    .card {
                        width: 90% !important; /* Use !important to ensure it overrides other styles */
                        height: auto !important;
                        padding: 20px !important;
                    }
                }
            `}</style>
        </div>
    );
}