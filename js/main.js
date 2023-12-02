let resultEl = document.querySelector(".results"),
  searchBtn = document.querySelector("#search"),
  zodiac = document.querySelector("#zodiac");

searchBtn.addEventListener("click", getData);

//Keyboard Enter Button
zodiac.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    getData();
  }
  //Remove fade-in class on backspace click
  if (e.key === "Backspace") {
    resultEl.classList.remove("fade-in");
  }
});

function getData() {
  const zodiacVal = zodiac.value;
  fetch("js/data.json")
    .then((response) => response.json())
    .then((data) => {
      const result = data.filter(
        (zodiac) => zodiac.name == zodiacVal.toLowerCase()
      );
      if (result.length != 0) {
        clear();
        resultEl.classList.add("fade-in");
        resultEl.innerHTML += `
        <div class="image">
        <img src="img/${result[0].name}.png" alt="${result[0].name}" />
      </div>
      <div class="text">
        <div class="title">
          <h2>${result[0].name}</h2>
          <span>(${result[0].start_date} - ${result[0].end_date})</span>
        </div>
        <p>
          ${result[0].desc}
        </p>
      </div>
        `;
      } else {
        resultEl.innerHTML = `<h1>Zodiac Not Exist</h1>`;
      }
    });
}

function clear() {
  resultEl.innerHTML = "";
}
