import axios from "axios";

// ✅ Correct backend endpoint for POST call
const postUrl = "https://localhost:7147/api/CrudOperations/CreateRecord";

export async function PostCall(output) {
    try {
        const response = await axios.post(postUrl, output, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (err) {
        if (err.response) {
            console.log("Error response data:", err.response.data);
            throw err;
        } else {
            console.log("Error message:", err.message);
            throw err;
        }
    }
}


// 🔻 Fixed GetCall endpoint for fetching a student by ID
const getUrl = "https://localhost:7147/api/CrudOperations/ReadRecord"; // This is the base for the GET endpoint

export function GetCall(ID) {
    return axios.get(`${getUrl}/${ID}`); // Append the ID to the URL to fetch a specific student
}

export function DeleteCall(ID) {
    return axios.delete(`${getUrl}/${ID}`);
}

export function PatchCall(ID, output) {
    return axios.patch(`${getUrl}/${ID}`, output);
}
