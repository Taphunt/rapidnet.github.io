async function startSpeedTest() {
    const apiUrl = "https://librespeed.org/api.php";

    document.getElementById("download-speed").textContent = "Testing...";
    document.getElementById("upload-speed").textContent = "Testing...";
    document.getElementById("ping-speed").textContent = "Testing...";

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        document.getElementById("download-speed").textContent = data.download + " Mbps";
        document.getElementById("upload-speed").textContent = data.upload + " Mbps";
        document.getElementById("ping-speed").textContent = data.ping + " ms";

        getISPAndLocation();
    } catch (error) {
        console.error("Speed test failed", error);
        alert("Error running speed test");
    }
}

async function getISPAndLocation() {
    try {
        let response = await fetch("https://ipapi.co/json/");
        let data = await response.json();

        document.getElementById("isp-info").textContent = `ISP: ${data.org}`;
        document.getElementById("country-info").textContent = `Country: ${data.country_name}`;
    } catch (error) {
        console.error("Failed to get ISP info", error);
    }
}

// Share button functionality
document.getElementById("shareBtn").addEventListener("click", () => {
    let download = document.getElementById("download-speed").textContent;
    let upload = document.getElementById("upload-speed").textContent;
    let ping = document.getElementById("ping-speed").textContent;

    let shareText = `🚀 Rapid Net Speed Test Results:\nDownload: ${download}\nUpload: ${upload}\nPing: ${ping}`;
    navigator.clipboard.writeText(shareText);
    alert("Results copied! Share it anywhere.");
});
