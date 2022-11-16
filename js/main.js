// API INFORMATION
const baseUrl = "https://api.football-data.org/v4/";
const aptToken = "321d42def7934e019575f79b9b90442d";
// HTML ELEMENTS 
const dataSection = document.getElementById("groups");
const btns = document.querySelectorAll(".btn");
// FUNCTION TO GET STANDINGS
function getStandings() {
  const WC_STANDINGS = "competitions/WC/standings";
  dataSection.innerHTML = "";
  axios
    .get(`${baseUrl}${WC_STANDINGS}`, {
      headers: {
        "X-Auth-Token": "321d42def7934e019575f79b9b90442d",
      },
    })
    .then((res) => console.log(res));
}
// ADD EVENT TO EACH BTN
btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    btns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    getStandings();
  })
);
