import React, { useRef } from "react";
import clientstyle from "../assets/css/style.module.css";

function Clienttest({ testName, setTestName, suggesions1, setSuggestion1, setError }) {
  // Create refs for the input field and suggestions div
  const treatmentInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  return (
    <>
      <div className={clientstyle['input-wrapper'] + ' ' + clientstyle['title-lg'] + ' ' + clientstyle['secondinput']}>
        <input
          type="text"
          ref={treatmentInputRef} // Assigning ref to input field
          name="location"
          value={testName}
          placeholder="Diagnostic test name"
          className={clientstyle['input-field']}
          autoComplete="off"
          onChange={async (e) => {
            setTestName(e.target.value);
            const value = e.target.value;
            setError('');
            
            // Accessing the suggestions div through ref
            const suggestionsElement = suggestionsRef.current;

            if (value.trim() === '') {
              setSuggestion1([]);
              suggestionsElement.classList.remove(clientstyle["active"]);
            }

            if (value.trim() !== '') {
              try {
                const response = await fetch('https://prowellness-eight.vercel.app/api/Testsuggestions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ typedtest: value }),
                });

                if (response.ok) {
                  const data = await response.json();
                  setSuggestion1(data.results);

                  if (data.results.length < 1) {
                    suggestionsElement.classList.remove(clientstyle["active"]);
                  } else {
                    suggestionsElement.classList.add(clientstyle["active"]);
                  }
                } else {
                  console.error('Error fetching suggestions:');
                }
              } catch (error) {
                console.error('Error fetching suggestions:', error);
              }
            } else {
              setSuggestion1([]);
            }
          }}
        />
        <ion-icon name="location"></ion-icon>
        <div
          className={clientstyle['suggestions']}
          ref={suggestionsRef} // Assigning ref to suggestions div
          style={{}}
        >
          {suggesions1?.map((item, index) => (
            <div
              className="suggestion"
              onClick={(e) => {
                const value = e.target.textContent;
                console.log('hello there in suggestion');
                
                // Setting input field value through ref
                treatmentInputRef.current.value = value;
                suggestionsRef.current.classList.remove(clientstyle["active"]);
                setTestName(value);
                setSuggestion1([]);
              }}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Clienttest;
