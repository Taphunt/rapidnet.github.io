async function startSpeedTest() {
    document.getElementById("download-speed").textContent = "Testing...";
    document.getElementById("upload-speed").textContent = "Testing...";
    document.getElementById("ping-speed").textContent = "Testing...";

    try {
        let downloadSpeed = await testDownloadSpeed();
        let uploadSpeed = await testUploadSpeed();
        let ping = await testPing();

        document.getElementById("download-speed").textContent = downloadSpeed + " Mbps";
        document.getElementById("upload-speed").textContent = uploadSpeed + " Mbps";
        document.getElementById("ping-speed").textContent = ping + " ms";

        getISPAndLocation();
    } catch (error) {
        console.error("Speed test failed", error);
        alert("Error running speed test");
    }
}

// Test download speed
async function testDownloadSpeed() {
    let startTime = performance.now();
    let testFile = "https://speed.hetzner.de/10MB.bin"; // Test file for speed
    await fetch(testFile);
    let endTime = performance.now();

    let duration = (endTime - startTime) / 1000; // Convert to seconds
    let fileSizeMB = 10; // File size in MB
    let speedMbps = (fileSizeMB / duration) * 8; // Convert MB/s to Mbps
    return speedMbps.toFixed(2);
}

// Test upload speed
async function testUploadSpeed() {
    let startTime = performance.now();
    let data = new Uint8Array(1e6); // 1MB dummy data
    await fetch("https://speed.hetzner.de/upload.php", {
        method: "POST",
        body: data
    });
    let endTime = performance.now();

    let duration = (endTime - startTime) / 1000;
    let fileSizeMB = 1;
    let speedMbps = (fileSizeMB / duration) * 8;
    return speedMbps.toFixed(2);
}

// Test ping
async function testPing() {
    let startTime = performance.now();
    await fetch("https://speed.hetzner.de/1MB.bin", { cache: "no-store" });
    let endTime = performance.now();
    return (endTime - startTime).toFixed(2);
}

// Get ISP & Location
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
