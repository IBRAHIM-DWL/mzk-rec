document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sarkiForm');
    const masaNoInput = document.getElementById('masa_no');
    const sarkiAdiInput = document.getElementById('sarki_adi');
    const sonuc = document.getElementById('sonuc');

    // URL'den masa_no parametresini al
    const urlParams = new URLSearchParams(window.location.search);
    const masaNo = urlParams.get('masa_no');
    masaNoInput.value = masaNo;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const masa_no = masaNoInput.value;
        const sarki_adi = sarkiAdiInput.value;

        fetch('sarki_sec.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ masa_no, sarki_adi })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sonuc.textContent = "Şarkı seçimi başarılı! Şarkınız sıraya eklendi.";
            } else if (data.error) {
                sonuc.textContent = data.error;
            } else {
                sonuc.textContent = "Bilinmeyen bir hata oluştu.";
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            sonuc.textContent = "Bir hata oluştu.";
        });
    });
});
