document.getElementById("hello-message").innerHTML =  "Merhaba, <strong>" + prompt("Adınız nedir?") + "</strong>! Hoş geldin!";

const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

function refreshDate() {
    var date = new Date()
    var hour = date.toLocaleTimeString('tr-TR');
    var day = days[date.getDay()];
    document.getElementById("date").textContent = `${hour} ${day}`
    return setTimeout(refreshDate,1000)
}
refreshDate()

