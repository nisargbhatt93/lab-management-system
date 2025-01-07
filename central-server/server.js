const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const pcStatus = {}; // In-memory storage for PC statuses

app.get("/",(req,res)=>{
    res.send("Hello World");
})
// Route to update PC status
app.post('/update_status', (req, res) => {
    const { pc_name, online, cpu_usage, ram_usage, disk_usage } = req.body;
    pcStatus[pc_name] = { online, cpu_usage, ram_usage, disk_usage, last_updated: Date.now() };
    res.status(200).send({ status: 'success' });
});

// Route to get PC statuses
app.get('/get_status', (req, res) => {
    res.status(200).json(pcStatus);
});

// Mark PCs as offline if they don't send data for a certain time
setInterval(() => {
    const now = Date.now();
    for (const pcName in pcStatus) {
        if (now - pcStatus[pcName].last_updated > 10000) { // 10 seconds timeout
            pcStatus[pcName].online = false;
        }
    }
}, 5000);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
