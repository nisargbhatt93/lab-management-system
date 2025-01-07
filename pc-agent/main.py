import psutil
import socket
import requests
import time

# Configuration
SERVER_URL = "http://localhost:5000/update_status"  # Replace <central-server-ip> with the server's IP
PC_NAME = socket.gethostname()  # Get the PC's hostname

def get_metrics():
    return {
        "pc_name": PC_NAME,
        "online": True,
        "cpu_usage": psutil.cpu_percent(interval=1),
        "ram_usage": psutil.virtual_memory().percent,
        "disk_usage": psutil.disk_usage('/').percent,
    }

while True:
    try:
        metrics = get_metrics()
        requests.post(SERVER_URL, json=metrics)  # Send data to the server
        print(f"Metrics sent: {metrics}")
    except Exception as e:
        print(f"Error: {e}")
    time.sleep(1)  # Send data every 5 seconds
