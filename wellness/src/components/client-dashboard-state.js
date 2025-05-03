import React, { useRef } from "react";
import clientstyle from "../assets/css/style.module.css";

function Clientstate({
  state,
  setStatefield,
  district,
  setDistrict,
  suggestions2,
  setSuggestion2,
  setError,
  suggestions3,
  setSuggestion3,
}) {
  // Create refs for state and district input fields and suggestion divs
  const stateInputRef = useRef(null);
  const suggestions1Ref = useRef(null);
  const districtInputRef = useRef(null);
  const suggestions2Ref = useRef(null);

  return (
    <>
      <div
        className={
          clientstyle["input-wrapper"] +
          " " +
          clientstyle["title-lg"] +
          " " +
          clientstyle["firstinput"]
        }
      >
        <input
          type="text"
          ref={stateInputRef} // Assigning ref to state input field
          name="statefield"
          placeholder="State name"
          value={state}
          className={clientstyle["input-field"]}
          autoComplete="off"
          onChange={async (e) => {
            setStatefield(e.target.value);
            const value = e.target.value;
            setError("");

            const ele = suggestions1Ref.current; // Access suggestions div via ref

            if (value.trim() === "") {
              setSuggestion2([]);
              ele.classList.remove(clientstyle["suggestions-active"]);
            }

            if (value.trim() !== "") {
              try {
                const response = await fetch(
                  "https://prowellness-liart.vercel.app/api/Statesuggestions",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ typedstate: value }),
                  }
                );

                if (response.ok) {
                  const data = await response.json();
                  setSuggestion2(data.results);
                  if (data.results.length < 1) {
                    ele.classList.remove(clientstyle["suggestions-active"]);
                  } else {
                    ele.classList.add(clientstyle["suggestions-active"]);
                  }
                } else {
                  console.error("Error fetching suggestions:");
                }
              } catch (error) {
                console.error("Error fetching suggestions:", error);
              }
            } else {
              setSuggestion2([]);
            }
          }}
        />
        <ion-icon name="location"></ion-icon>
        <div
          className={clientstyle["suggestions"]}
          ref={suggestions1Ref} // Assigning ref to suggestions div
        >
          {suggestions2?.map((item, index) => (
            <div
              className="suggestion"
              onClick={(e) => {
                const value = e.target.textContent;
                console.log("hello there in suggestion");

                // Setting state input field value using ref
                stateInputRef.current.value = value;
                suggestions1Ref.current.classList.remove(
                  clientstyle["suggestions-active"]
                );
                setStatefield(value);
                setSuggestion2([]);
              }}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div
        className={
          clientstyle["input-wrapper"] +
          " " +
          clientstyle["title-lg"] +
          " " +
          clientstyle["treatment-search"] +
          " " +
          clientstyle["firstinput"]
        }
      >
        <input
          type="text"
          ref={districtInputRef} // Assigning ref to district input field
          name="distfield"
          placeholder="District name"
          value={district}
          className={clientstyle["input-field"]}
          autoComplete="off"
          onChange={async (e) => {
            setDistrict(e.target.value);

            const value = e.target.value;
            setError("");

            const ele = suggestions2Ref.current; // Access suggestions div via ref

            if (value.trim() === "") {
              setSuggestion3([]);
              ele.classList.remove(clientstyle["suggestions-active"]);
            }

            if (value.trim() !== "") {
              try {
                const response = await fetch(
                  "https://prowellness-liart.vercel.app/api/Districtsuggestions",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ typeddist: value, state: state }),
                  }
                );

                if (response.ok) {
                  const data = await response.json();
                  setSuggestion3(data.state);
                  if (data.state.length < 1) {
                    ele.classList.remove(clientstyle["suggestions-active"]);
                  } else {
                    ele.classList.add(clientstyle["suggestions-active"]);
                  }
                } else {
                  console.error("Error fetching suggestions:");
                }
              } catch (error) {
                console.error("Error fetching suggestions:", error);
              }
            } else {
              setSuggestion3([]);
            }
          }}
        />
        <ion-icon name="location"></ion-icon>
        <div
          className={clientstyle["suggestions"]}
          ref={suggestions2Ref} // Assigning ref to suggestions div
        >
          {suggestions3?.map((item, index) => (
            <div
              className="suggestion"
              onClick={(e) => {
                const value = e.target.textContent;
                console.log("hello there in suggestion");

                // Setting district input field value using ref
                districtInputRef.current.value = value;
                suggestions2Ref.current.classList.remove(
                  clientstyle["suggestions-active"]
                );
                setDistrict(value);
                setSuggestion3([]);
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

export default Clientstate;
