import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const fetchPCStatus = async () => {
    const response = await axios.get(`${API_BASE}/get_status`);
    console.log(response.data);
    console.log("Hello");
    
    return response.data;
};
