import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CButton } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilArrowCircleRight } from '@coreui/icons';
import images from './importimag';
import { namePrice,organNames } from './getlist';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const DiagnosticTests = () => {
  const [showLetters, setShowLetters] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [rates, setRates] = useState({});
  const [presentfilter,setpresentfilter] = useState(false);
  const [checkedTests, setCheckedTests] = useState({});
  const [filteredTests, setFilteredTests] = useState([]);
  const [unenteredTests, setUnenteredTests] = useState([]);
  const [availableTests, setAvailableTests] = useState({});

  const allTestNames = Object.keys(namePrice).map((key) => key.toUpperCase());

  const organTests = organNames.map((organ) => ({
    ...organ, 
    testNames: organ.testNames.map((testName) => testName.toUpperCase()) 
  }));

  

  const diagnosticTests = [
    { name: 'Brain', image: 'brain-1.png' },
    { name: 'Lungs', image: 'lungs-2.png' },
    { name: 'Liver', image: 'liver-1.png' },
    { name: 'Kidney', image: 'kidney-1.png' },
    { name: 'Heart', image: 'heart-1.png' },
    { name: 'Bone', image: 'bone.png' },
    { name: 'Spinal Cord', image: 'spinal-cord.png' },
    { name: 'Small Intestine', image: 'small-intestine.png' },
    { name: 'Thyroid', image: 'thyroid.png' },
    { name: 'Thymus Gland', image: 'thymus-gland.png' },
  ];

  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

 
 const getHospitalIdFromToken = () => {
    const token = localStorage.getItem('token'); 
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id; 
    }
    return null;
  };

  
  const fetchAvailableTests = async () => {
    const hospitalId = getHospitalIdFromToken();
    if (hospitalId) {
      try {
        const response = await fetch(`https://prowellness-eight.vercel.app/api/hospitalavailableTests?hospitalId=${hospitalId}`);
        const data = await response.json();
        console.log(data)
        setAvailableTests(data); 
        initializeCheckedTests(data);
      } catch (error) {
        console.error('Error fetching available tests:', error);
      }
    }
  };


  const initializeCheckedTests = (availableTests) => {
    const initialCheckedTests = {};
    const initialRates = {};

    allTestNames.forEach((testName) => {
      if (availableTests[testName]) {
        
        initialCheckedTests[testName] = true;
        initialRates[testName] = availableTests[testName];
      } else {
        
        initialCheckedTests[testName] = false;
        initialRates[testName] = 0;
      }
    });

    setCheckedTests(initialCheckedTests);
    setRates(initialRates);
  };

  useEffect(() => {
    fetchAvailableTests();
  }, []);

  const handleSort = () => {
    setShowLetters(!showLetters);
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setSelectedOrgan(null)
    console.log("letter is cliked");
  };

  const handleorganclicked = (name)=>{
    setSelectedOrgan(name)
     setSelectedLetter(null)
    console.log("its clicked");

  }

  const filterByStartingLetter = (letter) => {
    return allTestNames.filter(testName => {
      const firstLetterMatch = testName.match(/[A-Za-z]/);
      if (firstLetterMatch) {
        const firstLetter = firstLetterMatch[0];
        return firstLetter.toLowerCase() === letter.toLowerCase();
      }
      return false;
    });
  };

  const getTestNamesByOrgan = (organName) => {
    const organ = organTests.find(org => org.name.toLowerCase() === organName.toLowerCase());
    return organ ? organ.testNames : []; 
  };


  useEffect(() => {
    console.log("filter in litter")
 
    if (selectedLetter) {
      const filtered = filterByStartingLetter(selectedLetter);
      setFilteredTests(filtered);
    }
  }, [selectedLetter]);

  useEffect(() => {
    console.log("filter in organ")
    if (selectedOrgan) {
      const filtered = getTestNamesByOrgan(selectedOrgan);
      setFilteredTests(filtered);
    }
  }, [selectedOrgan]);

  const handleRateChange = (testName, value) => {
    setRates((prevRates) => ({
      ...prevRates,
      [testName]: value,
    }));
  };

  const handleCheckboxChange =  (testName) => {
    setCheckedTests((prev) => ({
      ...prev,
      [testName]: !prev[testName],
    }));
  };

  const handleOkClick = async () => {
    const selectedTests = {};
    const unenteredRates = [];

    Object.keys(checkedTests).forEach((testName) => {
      if (checkedTests[testName]) {
        if (!rates[testName] || rates[testName] <= 0) {
          unenteredRates.push(testName);
        } else {
          selectedTests[testName] = rates[testName];
        }
      }
    });
    

    if (unenteredRates.length > 0) {
      setUnenteredTests(unenteredRates); // Update state with unentered tests
      return; // Prevent sending to server if rates are not entered
    }

    console.log(selectedTests);
    setUnenteredTests([]);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const hospitalId = decoded.id;
    try{
        const response = await axios.post(`https://prowellness-eight.vercel.app/api/hospitalupdatetest?hospitalid=${hospitalId}`, {selectedTests});
    }catch (error) {
        console.error('Error sending selected tests:', error);
    }
    fetchAvailableTests();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ margin: 0 }}>Diagnostic Tests</h3>
        <CButton color="primary" onClick={handleSort} style={{ marginLeft: '1rem', fontSize: '1.3rem' }}>
          {showLetters?"sort by oragans":"sort by letter"}
        </CButton>
      </div>

      <CCard
        style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '12px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <CCardBody
          style={{
            display: 'grid',
            gridTemplateColumns: showLetters ? 'repeat(13, 1fr)' : 'repeat(5, 1fr)',
            gap: '10px',
          }}
        >
          {showLetters ? (
            letters.map((letter, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #007bff',
                  borderRadius: '50%',
                  textAlign: 'center',
                  backgroundColor: '#e7f3ff',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '80px',
                  fontSize: '24px',
                  color: '#007bff',
                  cursor: 'pointer',
                }}
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </div>
            ))
          ) : (
            diagnosticTests.map((organ, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  padding: '10px',
                  height: '160px',
                  cursor:"pointer"
                }}
                onClick={() => handleorganclicked(organ.name)}

                
              >
                <img
                  src={images[organ.image]}
                  alt={organ.name}
                  style={{ width: '80px', marginBottom: '10px' }}
                />
                <p style={{ margin: '0', fontWeight: 'bold' }}>{organ.name}</p>
                <CIcon icon={cilArrowCircleRight} size="lg" />
              </div>
            ))
          )}
        </CCardBody>
      </CCard>

      {showLetters && selectedLetter && (
        <CCard
          style={{
            marginTop: '2rem',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <CCardBody
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            {filteredTests.map((test, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  textAlign: 'left',
                  backgroundColor: '#fff',
                  padding: '10px',
                  height: '60px',
                  maxWidth: "375px"
                }}
              >
                <div style={{ alignSelf: "flex-start", marginTop: "1.2rem" }}>
                  <input
                    type="checkbox"
                    checked={checkedTests[test] || false}
                    onChange={() => handleCheckboxChange(test)}
                  />
                </div>
                <span style={{ paddingLeft: '5px', textWrap: "nowrap", overflow: "auto", maxWidth: "250px", scrollbarWidth: "thin" }}>
                  {test}
                </span>
                {checkedTests[test] && (
                  <input
                    type="number"
                    value={rates[test] || ''}
                    onChange={(e) => handleRateChange(test, Number(e.target.value))}
                    placeholder="Enter rate"
                    style={{ marginLeft: '10px', width: '80px' }}
                  />
                )}
              </div>
            ))}
          </CCardBody>
        </CCard>
      )}





{!showLetters && selectedOrgan && (
        <CCard
          style={{
            marginTop: '2rem',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <CCardBody
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            {filteredTests.map((test, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  textAlign: 'left',
                  backgroundColor: '#fff',
                  padding: '10px',
                  height: '60px',
                  maxWidth: "375px"
                }}
              >
                <div style={{ alignSelf: "flex-start", marginTop: "1.2rem" }}>
                  <input
                    type="checkbox"
                    checked={checkedTests[test] || false}
                    onChange={() => handleCheckboxChange(test)}
                  />
                </div>
                <span style={{ paddingLeft: '5px', textWrap: "nowrap", overflow: "auto", maxWidth: "250px", scrollbarWidth: "thin" }}>
                  {test}
                </span>
                {checkedTests[test] && (
                  <input
                    type="number"
                    value={rates[test] || ''}
                    onChange={(e) => handleRateChange(test, Number(e.target.value))}
                    placeholder="Enter rate"
                    style={{ marginLeft: '10px', width: '80px' }}
                  />
                )}
              </div>
            ))}
          </CCardBody>
        </CCard>
      )}



      {/* Box to display unentered tests */}
      {unenteredTests.length > 0 && (
        <CCard
          style={{
            marginTop: '2rem',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <CCardBody>
            <h5 style={{ margin: '0' }}>Unentered Rates for:</h5>
            <ul>
              {unenteredTests.map((test, index) => (
                <li key={index} style={{display:"inline"}}>{`${test},`}</li>
              ))}
            </ul>
          </CCardBody>
        </CCard>
      )}

      <div style={{ marginTop: '20px' }}>
        <CButton color="success" onClick={handleOkClick} size='lg'>
          Save Changes
        </CButton>
      </div>
    </div>
  );
};

export default DiagnosticTests;
