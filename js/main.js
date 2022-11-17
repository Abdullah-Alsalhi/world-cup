// API INFORMATION
const baseUrl = "https://api.football-data.org/v4/competitions/WC/";
const aptToken = "321d42def7934e019575f79b9b90442d";
// HTML ELEMENTS
const standingsDiv = document.getElementById("standings");
const btns = document.querySelectorAll(".btn");

// standings row

const standingsContainer = document.createElement("div");
standingsContainer.classList.add("row");

// FUNCTION TO GET STANDINGS
function getStandings() {
  const STANDINGS = "standings";
  standingsDiv.firstElementChild.innerHTML = "";

  axios
    .get(`${baseUrl}${STANDINGS}`, {
      headers: {
        "X-Auth-Token": "321d42def7934e019575f79b9b90442d",
      },
    })
    .then((res) => {
      const standings = res.data.standings;
      for (let standing of standings) {
        let content = `
            <div class="col-sm-6 my-1">
              <div class="card">
                <div
                class="card-header bg-primary p-3 d-flex justify-content-center align-items-center"
                >
                  <b>${standing.group}</b>
                </div>
              <div class="row bg-secondary p-2">
                <div class="col-sm-1">#</div>
                  <div
                    class="col-sm-3 d-flex justify-content-center align-items-center"
                  >
                    teams
                  </div>
                  <div
                  class="col-sm-2 d-flex justify-content-center align-items-center"
                  >
                    W
                  </div>
                <div
                  class="col-sm-2 d-flex justify-content-center align-items-center"
                  >
                    D
                </div>
                <div
                  class="col-sm-2 d-flex justify-content-center align-items-center"
                  >
                    L
                </div>
                <div
                  class="col-sm-2 d-flex justify-content-center align-items-center"
                >
                  Pts
                </div>
              </div>
        `;
        standingsDiv.firstElementChild.innerHTML += content;
        for (let team of standing.table) {
          content = `
          <div id="teamOrder${team.position}" class="order-${team.position}">
              <div class="row bg-success  team-row"">
                <div
                  class="col-sm-1 p-1 d-flex justify-content-center align-items-center"
                >
                ${team.position}
                </div>
                <div
                  class="col-sm-3 p-1 d-flex justify-content-center align-items-center"
                >
                  <div
                    id="teamCrest"
                    class="mx-1"
                    style="
                      background-image: url('${team.team.crest}');
                    "
                  ></div>
                  <div id="teamTla" data-id='${team.team.id}'>${team.team.tla}</div>
                </div>
                <div
                  class="col-sm-2 p-1 d-flex justify-content-center align-items-center"
                >
                  ${team.won}
                </div>
                <div
                  class="col-sm-2 p-1 d-flex justify-content-center align-items-center"
                >
                  ${team.draw}
                </div>
                <div
                  class="col-sm-2 p-1 d-flex justify-content-center align-items-center"
                >
                  ${team.lost}
                </div>
                <div
                  class="col-sm-2 p-1 d-flex justify-content-center align-items-center"
                >
                  ${team.points}
                </div>
              </div>
          `;
          standingsDiv.firstElementChild.lastElementChild.innerHTML += content;
        }
      }
    })
    .catch((err) => console.log(err.name));
}
// ADD EVENT TO EACH BTN
btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (this.classList.contains("active")) return;
    btns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    if (this.innerText === "المجموعات") getStandings();
  })
);

window.onload = getStandings;
