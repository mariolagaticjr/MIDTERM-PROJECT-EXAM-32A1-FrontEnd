import {useState} from "react";
import {Link} from "react-router-dom";
import OutputContainer from "../components/OutputContainer";
import {PatchCall} from "../api/ApiCalls";

function UpdateStudent() {
    const [output, setOutput] = useState({ID: "", name: "", Subjects: "", Sections: ""});
    const [student, setStudent] = useState({ID: "", name: "", Subjects: "", Sections: ""});
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
        })
    }

    function handleCheckOut() {
        setResponseMessage("");
        setErrMessage("");
        if (!/^\d{9}[Vv]$/.test(student.ID)) {
            setErrMessage("Student ID number is empty or invalid");
            document.getElementById("ID").focus();
            return;
        } else if (!/^[A-Za-z][A-Za-z ]+$/.test(student.name)) {
            setErrMessage("Student name is empty or invalid");
            document.getElementById("name").focus();
            return;
        } else if (!/^[A-Za-z\d][A-Za-z\d-|/# ,.:;\\]+$/.test(student.Subjects)) {
            setErrMessage("Student Subjects is empty or invalid");
            document.getElementById("Subjects").focus();
            return;
        } else if (!/^\d{3}-\d{7}$/.test(student.Sections)) {
            setErrMessage("Student Sections is empty or invalid");
            document.getElementById("Sections").focus();
            return;
        }
        setOutput({ID: student.ID, name: student.name, Subjects: student.Subjects, Sections: student.Sections});
        setStudent({ID: "", name: "", Subjects: "", Sections: ""});
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrMessage("");
        setResponseMessage("");
        if (!output.ID || !output.name || !output.Subjects || !output.Sections) {
            setErrMessage("Inputs didn'at checked out");
            return;
        }
        try {
            await PatchCall(output.ID, output);
            setResponseMessage("Student successfully updated in the database");
        }
        catch (err) {
            if (err.response) {
                setResponseMessage(err.response.data.message);
            } else {
                setResponseMessage(`Error: ${err.message}`);
            }
        }
        finally {
            setOutput({ID: "", name: "", Subjects: "", Sections: ""});
        }
    }

    return (
        <div className={"centered-element"}>
            <img className="student-img" src={"https://cdn-icons-png.flaticon.com/512/5349/5349022.png"} width={"120px"} alt={"user-logo"}/>
            <div className="student-container">
                <h1>Update Student Details</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={student.ID} id="ID" name="ID" placeholder="Enter ID Number" />
                    <input onChange={handleChange} value={student.name} id="name" name="name" placeholder="Enter Name" />
                    <input onChange={handleChange} value={student.Subjects} id="Subjects" name="Subjects" placeholder="Enter Subjects" />
                    <input onChange={handleChange} value={student.Sections} id="Sections" name="Sections" placeholder="Enter Sections" />
                    <h5>{errMessage}&nbsp;</h5>
                    <br/>
                    <button onClick={handleCheckOut} type={"button"}>Check Out</button>
                    <button type={"submit"}>Update Student Details</button>
                    <Link className={"back-link"} to='/dashboard'>Back</Link>
                </form>
                <br/>
                <OutputContainer
                    ID={output.ID}
                    name={output.name}
                    Subjects={output.Subjects}
                    Sections={output.Sections}
                />
                <br/>
                <h4>{responseMessage}</h4>
            </div>
        </div>
    );
}

export default UpdateStudent;