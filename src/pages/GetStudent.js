import { useState } from "react";
import { Link } from "react-router-dom";
import OutputContainer from "../components/OutputContainer";
import { GetCall } from "../api/ApiCalls";

function GetStudent() {
    const [output, setOutput] = useState({ ID: "", Username: "", Subjects: "", Sections: "" });
    const [ID, setID] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    function handleChange(event) {
        setOutput({ ID: "", Username: "", Subjects: "", Sections: "" });
        setResponseMessage("");
        setErrMessage("");
        const newID = event.target.value;
        setID(newID);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrMessage("");
        setResponseMessage("");

        // Validate ID format (adjust the regex if necessary for your ID structure)
        if (!/^\d{9}[Vv]$/.test(ID)) {
            setErrMessage("Student ID number is empty or invalid");
            document.getElementById("ID").focus();
            return;
        }

        try {
            const response = await GetCall(ID); // Call to GetCall to fetch student data
            setResponseMessage("Student successfully retrieved from the database");
            
            // Ensure you correctly update the output with the data returned
            setOutput({
                ID: response.data.ID,
                Username: response.data.Username,
                Subjects: response.data.Subjects,
                Sections: response.data.Sections
            });
        } catch (err) {
            if (err.response) {
                setResponseMessage(err.response.data.message || "Error fetching student");
            } else {
                setResponseMessage(`Error: ${err.message}`);
            }
        } finally {
            setID(""); // Reset ID after submit
        }
    }

    return (
        <div className={"centered-element"}>
            <img className="student-img" src={"https://cdn-icons-png.flaticon.com/512/5349/5349022.png"} width={"100px"} alt={"student-logo"}/>
            <div className="student-container">
                <h1>Get Student Details</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        value={ID}
                        id="ID"
                        name="ID"
                        placeholder="Enter ID Number"
                    />
                    <h5>{errMessage}&nbsp;</h5>
                    <br />
                    <button type={"submit"}>Get Student Details</button>
                    <Link className={"back-link"} to="/dashboard">Back</Link>
                </form>

                {/* Display fetched data */}
                <OutputContainer
                    ID={output.ID}
                    Username={output.Username}
                    Subjects={output.Subjects}
                    Sections={output.Sections}
                />
                <br />
                <h4>{responseMessage}</h4>
            </div>
        </div>
    );
}

export default GetStudent;
