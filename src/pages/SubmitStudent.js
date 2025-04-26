import {useState} from "react";
import {Link} from "react-router-dom";
import OutputContainer from "../components/OutputContainer";
import {PostCall} from "../api/ApiCalls";

function SubmitStudent() {
    const [output, setOutput] = useState({ID: "", Username: "", Subjects: "", Sections: ""});
    const [student, setStudent] = useState({ID: "", Username: "", Subjects: "", Sections: ""});
    const [errMessage, setErrMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    function handleChange(event) {
        const {name, value} = event.target;
        setResponseMessage("");
        setErrMessage("");
        setStudent((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleCheckOut() {
        setErrMessage("");
        setResponseMessage("");
        if (!/^\d+$/.test(student.ID)) {
            setErrMessage("Student ID is empty or invalid. It must be a number.");
            document.getElementById("ID").focus();
            return;
        } else if (!/^[A-Za-z][A-Za-z ]+$/.test(student.Username)) {
            setErrMessage("Student name is empty or invalid");
            document.getElementById("Username").focus();
            return;
        } else if (!/^[A-Za-z\d][A-Za-z\d-|/# ,.:;\\]+$/.test(student.Subjects)) {
            setErrMessage("Student Subjects is empty or invalid");
            document.getElementById("Subjects").focus();
            return;
        } else if (!/^[A-Za-z\d][A-Za-z\d-|/# ,.:;\\]+$/.test(student.Sections)) {
            setErrMessage("Student Subjects is empty or invalid");
            document.getElementById("Sections").focus();
            return;    
        }
        setOutput({ID: student.ID, Username: student.Username, Subjects: student.Subjects, Sections: student.Sections});
        setStudent({ID: "", Username: "", Subjects: "", Sections: ""});
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrMessage("");
        setResponseMessage("");
        if (!output.ID || !output.Username || !output.Subjects || !output.Sections) {
            setErrMessage("Inputs didn't checked out");
            return;
        }
        try {
            await PostCall(output);
            setResponseMessage("Student successfully submitted to the database");
        }
        catch (err) {
            if (err.response) {
                setResponseMessage(err.response.data.message);
            } else {
                setResponseMessage(`Error: ${err.message}`);
            }
        }
        finally {
            setOutput({ID: "", Username: "", Subjects: "", Sections: ""});
        }
    }

    return (
        <div className={"centered-element"}>
            <img className="student-img" src={"https://cdn-icons-png.flaticon.com/512/5349/5349022.png"} width={"120px"} alt={"user-logo"}/>
            <div className="student-container">
                <h1>Submit Student</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={student.ID} id="ID" name="ID" placeholder="Enter ID Number" />
                    <input onChange={handleChange} value={student.Username} id="Username" name="Username" placeholder="Enter Name" />
                    <input onChange={handleChange} value={student.Subjects} id="Subjects" name="Subjects" placeholder="Enter Subjects" />
                    <input onChange={handleChange} value={student.Sections} id="Sections" name="Sections" placeholder="Enter Sections" />
                    <h5>{errMessage}&nbsp;</h5>
                    <br/>
                    <button onClick={handleCheckOut} type={"button"}>Check Out</button>
                    <button type={"submit"}>Submit Student</button>
                    <Link className={"back-link"} to='/dashboard'>Back</Link>
                </form>
                <br/>
                <OutputContainer
                    ID={output.ID}
                    Username={output.Username}
                    Subjects={output.Subjects}
                    Sections={output.Sections}
                />
                <br/>
                <h4>{responseMessage}</h4>
            </div>
        </div>
    );
}

export default SubmitStudent;