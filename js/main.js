// API INFORMATION
const baseUrl = "https://api.football-data.org/v4/competitions/WC/";
const apiToken = "321d42def7934e019575f79b9b90442d";
// HTML ELEMENTS
const dataDiv = document.getElementById("data");
const btns = document.querySelectorAll(".btn");
const matchDetails = document.getElementById("matchDetails");
// object of days

days = {
  0: "الأحد",
  1: "الاثنين",
  2: "الثلاثاء",
  3: "الأربعاء",
  4: "الخميس",
  5: "الجمعة",
  6: "السبت",
};

function utcDateFormate(utcDate) {
  let date = new Date(utcDate);
  return {
    day: date.getUTCDay(),
    dayInMonth: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    hour: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
  };
}

// FUNCTION TO GET data
function getStandings() {
  const standings = "standings";
  dataDiv.firstElementChild.innerHTML = "";

  axios
    .get(`${baseUrl}${standings}`, {
      headers: {
        "X-Auth-Token": apiToken,
      },
    })
    .then((res) => {
      const standings = res.data.standings;
      for (let standing of standings) {
        let content = `
            <div class="col-sm-6 col-12 my-2">
              <div class="card">
                <div
                class="card-header bg-primary p-3 d-flex justify-content-center align-items-center"
                >
                  <b>${standing.group}</b>
                </div>
              <div class="row bg-secondary p-2">
                <div class="col col-sm-1">#</div>
                  <div
                    class="col col-sm-3 d-flex justify-content-center align-items-center"
                  >
                    teams
                  </div>
                  <div
                  class="col col-sm-2 d-flex justify-content-center align-items-center"
                  >
                    W
                  </div>
                <div
                  class="col col-sm-2 d-flex justify-content-center align-items-center"
                  >
                    D
                </div>
                <div
                  class="col col-sm-2 d-flex justify-content-center align-items-center"
                  >
                    L
                </div>
                <div
                  class="col col-sm-2 d-flex justify-content-center align-items-center"
                >
                  Pts
                </div>
              </div>
        `;
        dataDiv.firstElementChild.innerHTML += content;
        for (let team of standing.table) {
          content = `
          <div id="teamOrder${team.position}" class="order-${team.position}">
              <div class="row bg-success  team-row"">
                <div
                  class="col col-sm-1 p-1 d-flex justify-content-center align-items-center win-${team.position}"
                >
                ${team.position}
                </div>
                <div
                  class="col col-sm-3 p-1 d-flex justify-content-center align-items-center"
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
                  class="col col-sm-2 p-1 d-flex justify-content-center align-items-center"
                >
                  ${team.won}
                </div>
                <div
                  class="col col-sm-2 p-1 d-flex justify-content-center align-items-center"
                >
                  ${team.draw}
                </div>
                <div
                  class="col col-sm-2 p-1 d-flex justify-content-center align-items-center"
                >
                  ${team.lost}
                </div>
                <div
                  class="col col-sm-2 p-1 d-flex justify-content-center align-items-center"
                >
                  ${team.points}
                </div>
              </div>
          `;
          dataDiv.firstElementChild.lastElementChild.innerHTML += content;
        }
      }
    })
    .catch((err) => console.log(err.name));
}

// FUNCTION TO GET MATCHES
function getMatches() {
  const matches = "matches";
  dataDiv.firstElementChild.innerHTML = "";

  axios
    .get(`${baseUrl}${matches}`, {
      headers: {
        "X-Auth-Token": apiToken,
      },
    })
    .then((res) => {
      const matches = res.data.matches;
      let content = ``;
      for (let match of matches) {
        if (match.homeTeam.name === null) continue;
        let matchDate = utcDateFormate(match.utcDate);
        content += `
        <div class="card text-center border-0 rounded-1">
          <div class="card-header bg-success">
            <ul class="nav">
              <li class="nav-item ">
                <div class="nav-link badge p-2 text-bg-info" >
                  <span>${days[matchDate.day]}</span>
                  <span>${matchDate.dayInMonth} - ${matchDate.month} - 2022 | ${
          matchDate.hour
        }:${matchDate.minutes == "0" ? "00" : matchDate.minutes}</span>
                </div>
            </ul>
          </div>
          <div class="card-body">
            <h5 class="card-title">
            ${
              match.stage === "GROUP_STAGE"
                ? "مرحلة المجموعات"
                : resposne.data.stage
            }
            </h5>
            <div class="w-100 bg-success text-white row">
              <div class="team-home col-3 bg-primary rounded-1">
                  <div class="teamCrest mt-1 matchCrest mx-2 d-inline-block" style="background-image: url('${
                    match.homeTeam.crest
                  }');"></div>
                  <div class="tla text-white d-block">${
                    match.homeTeam.tla
                  }</div>
              </div>
              <div class="col-6">
                <div class="d-flex justify-content-between align-items-center h-100">
                  <div class="result ms-5 fw-bolder fs-3">${
                    match.score.fullTime.home ?? "x"
                  }</div>
                  <div class="against fw-bold fs-1">-</div>
                  <div class="result me-5 fw-bolder fs-3">${
                    match.score.fullTime.away ?? "x"
                  }</div>
                </div>
              </div>
              <div class="team-home col-3 bg-primary rounded-1">
                  <div class="teamCrest mt-1 mx-2 d-inline-block" style="background-image: url('${
                    match.awayTeam.crest
                  }');"></div>
                  <div class="tla text-white d-block">${
                    match.awayTeam.tla
                  }</div>
              </div>
            </div>
            <div class="accordion accordion-flush my-4" id="matchDetails">
            <div class="accordion-item" data-matchId="${match.id}">
              <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed fw-semibold fs-1 text-center text-bg-info" data-matchId=${
                  match.id
                } type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${
          match.id
        }" aria-expanded="false" aria-controls="flush-collapseOne">
                  <h6 class="w-100 text-center d-inline-block" data-matchId=${
                    match.id
                  }>تفاصيل المباراة</h6>
                </button>
              </h2>
              <div id="flush-collapse${
                match.id
              }" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#matchDetails">
                <div class="accordion-body">
                  <div class="d-flex justify-content-between">
                    <h5>Qatar</h5>
                    <h5>Belgim</h5>
                  </div>
                  <div class="d-flex flex-column justify-content-center align-items-center">
                    <h5>الأحد 20-20-2022 | 19:00</h5>
                    <h4>منتهية</h4>
                    <h6>ملعب المباراة <span>ومبلي بران</span></h6>
                    <h6>المرحلة</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
        `;
      }
      dataDiv.lastElementChild.innerHTML = content;
    })
    .catch((err) => console.log(err.name));
}

// FUNCTION TO GET MORE INFORMATION ABOUT PARTICULAR MATCH
function getMatchInfo(matchId) {
  document.getElementById(`flush-collapse${matchId}`).innerHTML = "";
  const matches = "matches";
  axios
    .get(`http://api.football-data.org/v4/matches/${matchId}`, {
      headers: {
        "X-Auth-Token": apiToken,
      },
    })
    .then((resposne) => {
      let matchDate = utcDateFormate(resposne.data.utcDate);
      let content = `
      <div class="accordion-body">
        <div class="d-flex justify-content-between">
          <h5 class='fs-1'>${resposne.data.homeTeam.name}</h5>
          <h5 class='fs-1'>${resposne.data.awayTeam.name}</h5>
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <h5 style="direction: rtl;">
            <span>${days[matchDate.day]}<br></span>
            <span>${matchDate.dayInMonth} - ${
        matchDate.month === 11 ? "نوفمبر" : "ديسمبر"
      } | ${matchDate.hour}:${
        matchDate.minutes == "0" ? "00" : matchDate.minutes
      }</span></h5>
          <h4>${resposne.data.status}</h4>
          <h6>ملعب المباراة <br><b>${resposne.data.venue}</b></h6>
          <h6>${
            resposne.data.stage === "GROUP_STAGE"
              ? "مرحلة المجموعات"
              : resposne.data.stage
          }</h6>
        
      </div>
      `;
      document.getElementById(`flush-collapse${matchId}`).innerHTML = content;
    })
    .catch((err) => console.log(err.name));
}

// FUNCTION GET TOP 10 SCORER
function getScorer() {
  document.getElementById("data").innerHTML = "";
  axios
    .get(`${baseUrl}scorers`, {
      headers: {
        "X-Auth-Token": apiToken,
      },
    })
    .then((response) => {
      let scorers = response.data.scorers;
      let rank = 0;
      let content = `
      <div class="row">
          <div class="card p-0">
            <div class="card-header d-flex flex-column bg-primary">
              <h5 class="d-flex justify-content-center align-items-center">scorer leadership</h5>
            </div>
            <div class="row bg-secondary">
              <div class="rank col-sm-2 col-1 d-flex justify-content-center align-items-center">R</div>
              <div class="col-sm-6 col-8 d-flex justify-content-center align-items-center">player</div>
              <div class="col-sm-4 col-2 d-flex justify-content-center align-items-center">goals</div>
            </div>
    `;
      scorers.forEach((scorer) => {
        content += `
          <div class="row">
            <div class="rank col-sm-2 col-1 ms-1 d-flex justify-content-center align-items-center">${++rank}</div>
            <div class="col-sm-6 col-8 row justify-content-center align-items-center">
              <div class="teamCrest col-2 score-crest" style="background-image: url('${
                scorer.team.crest
              }');"></div>
              <div class="player-name col-sm-4 col-6">${
                scorer.player.name
              }</div>
            </div>
            <div class="col-sm-4 col-2 d-flex justify-content-center align-items-center">${
              scorer.goals
            }</div>
          </div>
          <hr>
      `;
      });
      content += `
      </div>
    </div>
    `;
      document.getElementById("data").innerHTML = content;
    });
}

document.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("opend")) return;
  if (e.target.hasAttribute("data-matchId")) {
    e.target.classList.add("opend");
    getMatchInfo(e.target.dataset.matchid);
  }
});

// ADD EVENT TO EACH BTN
btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (this.classList.contains("active")) return;
    btns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    if (this.innerText === "المجموعات") getStandings();
    else if (this.innerText === "المباريات") getMatches();
    else if (this.innerText === "الهدافون") getScorer();
  })
);

window.onload = getStandings;
