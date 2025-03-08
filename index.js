<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jadwal Sholat</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Amiri&display=swap');

        body {
            font-family: 'Amiri', serif;
            background-color: #eafbea;
            text-align: center;
            padding: 20px;
            color: #2d572c;
            position: relative;
            overflow: hidden;
        }

        h2 {
            font-size: 28px;
            margin-bottom: 10px;
        }

        .container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
            display: inline-block;
            max-width: 400px;
            margin-top: 20px;
        }

        p {
            font-size: 20px;
            margin: 8px 0;
        }

        .time {
            font-weight: bold;
            color: #228B22;
        }

        /* Efek Ketupat */
        .ketupat {
            position: absolute;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #2d572c, #79c879);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            opacity: 0.8;
            animation: floating 5s infinite linear;
        }

        @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(20px); }
            100% { transform: translateY(0px); }
        }

        /* Posisi acak ketupat */
        .ketupat:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; }
        .ketupat:nth-child(2) { top: 20%; left: 80%; animation-delay: 1s; }
        .ketupat:nth-child(3) { top: 50%; left: 10%; animation-delay: 2s; }
        .ketupat:nth-child(4) { top: 70%; left: 70%; animation-delay: 3s; }
        .ketupat:nth-child(5) { top: 85%; left: 30%; animation-delay: 4s; }

    </style>
    <script>
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                alert("Geolocation tidak didukung oleh browser ini.");
            }
        }

        function showPosition(position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            // Panggil API Jadwal Sholat
            fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`)
                .then(response => response.json())
                .then(data => {
                    let jadwal = data.data.timings;
                    document.getElementById("imsak").innerText = jadwal.Imsak;
                    document.getElementById("subuh").innerText = jadwal.Fajr;
                    document.getElementById("dzuhur").innerText = jadwal.Dhuhr;
                    document.getElementById("ashar").innerText = jadwal.Asr;
                    document.getElementById("maghrib").innerText = jadwal.Maghrib;
                    document.getElementById("isya").innerText = jadwal.Isha;
                })
                .catch(error => console.error("Gagal mengambil data:", error));
        }

        function showError(error) {
            alert("Gagal mendapatkan lokasi: " + error.message);
        }
    </script>
</head>
<body onload="getLocation()">
    <!-- Efek Ketupat -->
    <div class="ketupat"></div>
    <div class="ketupat"></div>
    <div class="ketupat"></div>
    <div class="ketupat"></div>
    <div class="ketupat"></div>

    <h2>🕌 Jadwal Sholat 🕌</h2>
    
    <div class="container">
        <p>Imsak: <span class="time" id="imsak">Loading...</span></p>
        <p>Subuh: <span class="time" id="subuh">Loading...</span></p>
        <p>Dzuhur: <span class="time" id="dzuhur">Loading...</span></p>
        <p>Ashar: <span class="time" id="ashar">Loading...</span></p>
        <p>Maghrib: <span class="time" id="maghrib">Loading...</span></p>
        <p>Isya: <span class="time" id="isya">Loading...</span></p>
    </div>
</body>
</html>
