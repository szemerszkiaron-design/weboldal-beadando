document.addEventListener('DOMContentLoaded', function() {

    // --- 1. RÉSZ: KAPCSOLAT ŰRLAP VALIDÁCIÓ ---
    // Csak akkor fut, ha megtalálja a "contactForm"-ot az oldalon
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ne küldje el azonnal
            
            let hibas = false;

            // Név ellenőrzése
            let nev = document.getElementById('nev').value;
            let errorNev = document.getElementById('error-nev');
            if (nev.trim() === "") {
                errorNev.textContent = "A név megadása kötelező!";
                hibas = true;
            } else {
                errorNev.textContent = "";
            }

            // Email ellenőrzése
            let email = document.getElementById('email').value;
            let errorEmail = document.getElementById('error-email');
            if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
                errorEmail.textContent = "Érvénytelen e-mail cím!";
                hibas = true;
            } else {
                errorEmail.textContent = "";
            }

            // Méret ellenőrzése
            let nm = document.getElementById('nm').value;
            let errorNm = document.getElementById('error-nm');
            if (nm === "" || nm < 10) {
                errorNm.textContent = "Adjon meg legalább 10 m²-t!";
                hibas = true;
            } else {
                errorNm.textContent = "";
            }

            // Típus ellenőrzése
            let tipus = document.getElementById('tipus').value;
            let errorTipus = document.getElementById('error-tipus');
            if (tipus === "") {
                errorTipus.textContent = "Válasszon ingatlan típust!";
                hibas = true;
            } else {
                errorTipus.textContent = "";
            }

            // Adatvédelem ellenőrzése
            let adatvedelem = document.getElementById('adatvedelem').checked;
            let errorAdat = document.getElementById('error-adatvedelem');
            if (!adatvedelem) {
                errorAdat.textContent = "A nyilatkozat elfogadása kötelező!";
                hibas = true;
            } else {
                errorAdat.textContent = "";
            }

            // Eredmény
            if (!hibas) {
                document.getElementById('successMessage').style.display = 'block';
            } else {
                document.getElementById('successMessage').style.display = 'none';
            }
        });
    }

    // --- 2. RÉSZ: KALKULÁTOR LOGIKA ---
    // Csak akkor fut, ha megtalálja a "calcBtn"-t az oldalon
    const calcBtn = document.getElementById('calcBtn');
    
    if (calcBtn) {
        
        // Csúszka értékének frissítése élőben
        const rangeInput = document.getElementById('wattRegi');
        const rangeOutput = document.getElementById('wattOutput');
        
        if(rangeInput && rangeOutput) {
            rangeInput.addEventListener('input', function() {
                rangeOutput.textContent = this.value;
            });
        }

        // Számítás gombnyomásra
        calcBtn.addEventListener('click', function() {
            let db = document.getElementById('izzoDb').value;
            let regiWatt = document.getElementById('wattRegi').value;
            let ora = document.getElementById('napiOra').value;
            
            // Számítás: 1 LED izzó kb. tizedannyit fogyaszt
            let ujWatt = regiWatt / 10; 
            let sporolasWatt = regiWatt - ujWatt;
            
            // Éves spórolás kWh-ban
            let evesKWh = (sporolasWatt * db * ora * 365) / 1000;
            
            // 1 kWh ára kb. 70 Ft
            let penz = Math.round(evesKWh * 70);

            // Kiírás
            let eredmenyDiv = document.getElementById('eredmeny');
            eredmenyDiv.style.backgroundColor = "#e8f5e9";
            eredmenyDiv.style.color = "#2e7d32";
            eredmenyDiv.style.border = "1px solid #4CAF50";
            eredmenyDiv.innerHTML = "Éves várható megtakarítás: " + penz + " Ft";
        });
    }
});