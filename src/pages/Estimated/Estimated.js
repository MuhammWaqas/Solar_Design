import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import { AppContext } from '../StateManagement/Context';

export default function Estimated() {
    const navigate = useNavigate();
    const { setData } = useContext(AppContext);
    const [isAddressSelected, setIsAddressSelected] = useState(false);
    const [address, setAddress] = useState('');
    const apiKey = "AIzaSyAz5z8de2mOowIGRREyHc3gT1GgmJ3whDg"; // Replace with your actual API key

    const [resultPanelCount, setResultPanelCount] = useState('');
    const [resultYearlyEnergy, setResultYearlyEnergy] = useState('');
    const [resultMaxPanel, setResultMaxPanel] = useState('');
    const [resultRoofArea, setResultRoofArea] = useState('');
    const [resultCO2, setResultCO2] = useState('');
    const [resultSunshine, setResultSunshine] = useState('');
    const [sqrFeet, setSqrFeet] = useState('');

    const handlePlaceSelected = async (place) => {
        const addressComponents = place.address_components;
        const locationData = {
            geo: [place.geometry.location.lat(), place.geometry.location.lng()],
            country: addressComponents.find(component => component.types.includes("country"))?.long_name || null,
            state: addressComponents.find(component => component.types.includes("administrative_area_level_1"))?.long_name || null,
            city: addressComponents.find(component => component.types.includes("locality"))?.long_name || null,
            postalCode: addressComponents.find(component => component.types.includes("postal_code"))?.long_name || null,
            street: addressComponents.find(component => component.types.includes("route"))?.long_name || null,
            streetNumber: addressComponents.find(component => component.types.includes("street_number"))?.long_name || null,
        };

        setAddress(`${locationData.street} ${locationData.streetNumber}, ${locationData.city}, ${locationData.state} ${locationData.postalCode}, ${locationData.country}`);
        setIsAddressSelected(true);

        setData(prevData => ({
            ...prevData,
            locationInfo: locationData,
        }));

        try {
            const insights = await findClosestBuilding(locationData, apiKey);
            console.log("Building Insights:", insights);
            setData(prevData => ({
                ...prevData,
                buildingInsights: insights,
            }));

            // Update userInfo based on building insights
            updateResults(insights);
        } catch (error) {
            console.error("Error fetching building insights:", error);
        }
    };

    const findClosestBuilding = async (location, apiKey) => {
        const args = {
            'location.latitude': location.geo[0].toFixed(5),
            'location.longitude': location.geo[1].toFixed(5),
        };
        const params = new URLSearchParams({ ...args, key: apiKey });
        const response = await fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?${params}`);
        const content = await response.json();
        if (response.status !== 200) {
            console.error('findClosestBuilding\n', content);
            throw content;
        }
        return content;
    };

    // const updateResults = (buildingInsights) => {
    //     let panelCapacityWattsInput = 250;
    //     let dcToAcDerateInput = 0.85;
    //     let monthlyAverageEnergyBillInput = 300;
    //     let energyCostPerKwhInput = 0.31;
    //     let yearlyKwhEnergyConsumption = (monthlyAverageEnergyBillInput / energyCostPerKwhInput) * 12;
    //     const solarPotential = buildingInsights.solarPotential;
    //     const defaultPanelCapacity = buildingInsights.solarPotential.panelCapacityWatts;
    //     const panelCapacityRatio = panelCapacityWattsInput / defaultPanelCapacity;
    //     const haji = panelCapacityRatio * dcToAcDerateInput;
    //     const yearlymax = yearlyKwhEnergyConsumption / haji;
    //     let config;

    //     function findPanelsCount(buildingInsights, yearlymax) {
    //         const solarPanelConfigs = buildingInsights.solarPotential.solarPanelConfigs;
    //         for (let i = 0; i < solarPanelConfigs.length; i++) {
    //             config = solarPanelConfigs[i];
    //             if (config.yearlyEnergyDcKwh >= yearlymax) { return config.panelsCount; }
    //         }
    //     }

    //     const panelsCount = findPanelsCount(buildingInsights, yearlymax);

    //     // Calculate total yearly energy and other metrics
    //     const totalYearlyEnergy = solarPotential.solarPanelConfigs.reduce((acc, config) => acc + config.yearlyEnergyDcKwh, 0);
    //     const maxPanelCount = solarPotential.solarPanels.length;

    //     // Update state variables
    //     setResultPanelCount(panelsCount);
    //     setResultYearlyEnergy(config ? (config.yearlyEnergyDcKwh * panelCapacityRatio) + ' KWh' : 'N/A');
    //     setResultMaxPanel(maxPanelCount);
    //     setResultRoofArea(solarPotential.wholeRoofStats.areaMeters2 + ' m²');
    //     setResultCO2(solarPotential.carbonOffsetFactorKgPerMwh + ' Kg/MWh');
    //     setResultSunshine(solarPotential.maxSunshineHoursPerYear);
    //     setSqrFeet(solarPotential.wholeRoofStats.areaMeters2);

    //     // Additional data updates
    //     setData(prevData => ({
    //         ...prevData,
    //         postalCode: buildingInsights.postalCode,
    //         administrativeArea: buildingInsights.administrativeArea,
    //         regionCode: buildingInsights.regionCode,
    //         city: buildingInsights.administrativeArea,
    //         latitude: buildingInsights.center.latitude,
    //         longitude: buildingInsights.center.longitude,
    //     }));

    //     if (maxPanelCount > 0) {
    //         document.getElementById('gform_submit_button_1').disabled = false;
    //     } else {
    //         alert('No insight available for this address, please enter a valid address');
    //     }
    // };


    const updateResults = (buildingInsights) => {
        const solarPotential = buildingInsights.solarPotential;

        let panelCapacityWattsInput = 250;
        let dcToAcDerateInput = 0.85;
        let monthlyAverageEnergyBillInput = 300;
        let energyCostPerKwhInput = 0.31;
        let yearlyKwhEnergyConsumption = (monthlyAverageEnergyBillInput / energyCostPerKwhInput) * 12;
        const defaultPanelCapacity = buildingInsights.solarPotential.panelCapacityWatts;
        const panelCapacityRatio = panelCapacityWattsInput / defaultPanelCapacity;
        const haji = panelCapacityRatio * dcToAcDerateInput;
        const yearlymax = yearlyKwhEnergyConsumption / haji;
        let config;

        function findPanelsCount(buildingInsights, yearlymax) {
            const solarPanelConfigs = buildingInsights.solarPotential.solarPanelConfigs;
            for (let i = 0; i < solarPanelConfigs.length; i++) {
                config = solarPanelConfigs[i];
                if (config.yearlyEnergyDcKwh >= yearlymax) { return config.panelsCount; }
            }
        }

        const panelsCount = findPanelsCount(buildingInsights, yearlymax);

        // Calculate total yearly energy and other metrics
        const totalYearlyEnergy = solarPotential.solarPanelConfigs.reduce((acc, config) => acc + config.yearlyEnergyDcKwh, 0);
        const maxPanelCount = solarPotential.solarPanels.length;

        // Log results to console
        console.log("Panels Count:", panelsCount);
        console.log("Total Yearly Energy:", totalYearlyEnergy);
        console.log("Max Panel Count:", maxPanelCount);
        console.log("Roof Area:", solarPotential.wholeRoofStats.areaMeters2 + ' m²');
        console.log("CO2 Offset:", solarPotential.carbonOffsetFactorKgPerMwh + ' Kg/MWh');
        console.log("Sunshine Hours:", solarPotential.maxSunshineHoursPerYear);

        const percentageUse = (solarPotential.yearlyEnergyDcKwh / yearlyKwhEnergyConsumption) * 100;

        console.log("System Details:");
        console.log("Size (KW):", solarPotential.panelCapacityWatts / 1000);
        console.log("Panels:", solarPotential.solarPanelConfigs.map(config => `${config.panelsCount} panels, ${config.panelMake}, ${config.panelCapacityWatts}W, ${config.panelEfficiency * 100}% efficiency`));
        console.log("Annual generation (KWh):", solarPotential.solarPanelConfigs.map(config => config.yearlyEnergyDcKwh));
        console.log("Inverter: Example - Tesla Inverter, 97% efficiency"); // Static or user-defined
        console.log("Percentage of Annual Electricity Use:", percentageUse.toFixed(2) + "%");

        // Incentives
        console.log("Federal Incentive (FTC):", "Details here"); // Placeholder for federal incentives
        console.log("State Incentives (over 10 years):", "Details here"); // Placeholder for state incentives

        // Savings
        console.log("Total Avoided electric utility costs:", "Details here"); // Placeholder for savings
        console.log("Net savings:", "Details here"); // Placeholder for net savings

        // Costs
        console.log("Price Per Watt (PPW):", "Details here"); // Placeholder for price per watt
        console.log("Install Cost, Solar Home System:", "Details here"); // Placeholder for install cost
        console.log("EV Charger:", "Details here"); // Placeholder for EV charger cost
        console.log("Total: Solar + EV Charger:", "Details here"); // Placeholder for total cost

        // Financing
        console.log("Loan APR:", "Details here"); // Placeholder for loan APR
        console.log("Monthly Payment (by 10, 15, and 20 yr term):", "Details here"); // Placeholder for monthly payments

        // Environmental Benefit
        console.log("CO2 savings, over 20 years:", "Details here"); // Placeholder for CO2 savings
        console.log("Reduction in average household carbon footprint (%):", "Details here"); // Placeholder for carbon footprint reduction

        // Total Electricity Cost
        console.log("Total Electricity Cost Without Solar:", "Details here"); // Placeholder for total electricity cost without solar


        // Update state variables
        setResultPanelCount(panelsCount);
        setResultYearlyEnergy(config ? (config.yearlyEnergyDcKwh * panelCapacityRatio) + ' KWh' : 'N/A');
        setResultMaxPanel(maxPanelCount);
        setResultRoofArea(solarPotential.wholeRoofStats.areaMeters2 + ' m²');
        setResultCO2(solarPotential.carbonOffsetFactorKgPerMwh + ' Kg/MWh');
        setResultSunshine(solarPotential.maxSunshineHoursPerYear);
        setSqrFeet(solarPotential.wholeRoofStats.areaMeters2);

        // Additional data updates
        setData(prevData => ({
            ...prevData,
            userInfo: {
                ...prevData.userInfo,
                inputaddress: prevData.locationInfo.street,
                lati: buildingInsights.center.latitude,
                longi: buildingInsights.center.longitude,
                panelcount: solarPotential.solarPanelConfigs.reduce((total, config) => total + config.panelsCount, 0),
                roofarea: solarPotential.wholeRoofStats.areaMeters2,
                sunshine: solarPotential.maxSunshineHoursPerYear,
                system_cost: solarPotential.systemCost,
                // country_iso: locationInfo.country,
                tax_incentive: solarPotential.taxIncentives,
                without_solar: solarPotential.totalElectricityCostWithoutSolar,
                yenergy: solarPotential.yearlyEnergyDcKwh,
                // zip: locationInfo.postalCode
            }
        }));

        if (maxPanelCount > 0) {
            document.getElementById('gform_submit_button_1').disabled = false;
        } else {
            alert('No insight available for this address, please enter a valid address');
        }
    };



    const handleSubmit = () => {
        if (isAddressSelected) {
            navigate('/estimatedaddress', {
                state: { address }
            });
        } else {
            alert('Please select a valid address.');
        }
    };

    return (
        <>
            <div
                style={{
                    height: "120vh",
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
                    <h1 className="mb-4 mt-2 font-weight-bold text-center"
                        style={{ fontWeight: '900', fontSize: '40px', boxShadow: 'rgba(0, 0, 0, 0.29)' }}>
                        Explore Solar Options <br />
                        Without Sharing Personal Info
                    </h1>
                    <div className="text-center mt-4">
                        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Autocomplete
                                apiKey={apiKey}
                                onPlaceSelected={handlePlaceSelected}
                                style={{ flex: '1', marginBottom: '10px' }}
                                placeholder="Enter a valid address"
                                options={{ types: ['address'] }}
                                type="text"
                                className="form-control mb-2 mb-sm-0 me-sm-2"
                            />
                            <a
                                onClick={handleSubmit}
                                className="button-elemented"
                                style={{ opacity: isAddressSelected ? 1 : 0.5, pointerEvents: isAddressSelected ? 'auto' : 'none' }}
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}