export function showSnackbar(message, type = "success") {
    const snackbar = document.getElementById("snackbar");
    if (!snackbar) {
        console.error("Snackbar elementi bulunamadı!");
        return;
    }

    const validTypes = ["success", "error"];
    const snackbarType = validTypes.includes(type) ? type : "success";

    snackbar.textContent = message;
    snackbar.className = `show ${snackbarType}`;

    setTimeout(() => {
        snackbar.className = "";
    }, 3000);
}