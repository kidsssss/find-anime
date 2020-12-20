const findBtn = document.getElementById("find-btn");
const animeUrlInput = document.getElementById("anime-url");
const resultAll = document.getElementById("result-container");
const imgContainer = document.getElementById("img-container");
const animeUrl = document.getElementById("anime-url");
const waitingDiv = document.getElementById("waiting");

const moeUrl = "https://trace.moe/api/search?url=";

findBtn.addEventListener("click", findAnime);

async function getAnime(animeUrl) {
  prepareForResult();
  const res = await fetch(`${moeUrl}${animeUrl}`);
  const animeData = await res.json();
  showData(animeData);
}

function findAnime() {
  if (animeUrlInput.value.trim() !== "") {
    getAnime(animeUrlInput.value.trim());
  }
}

function showData(animeData) {
  waitingDiv.className = "hide";
  //console.log(animeData);
  resultAll.innerHTML = "<h2>Here is what we found</h2>";
  if ("docs" in animeData) {
    animeData.docs.forEach((anime) => {
      const resultEl = `<div class="result">
      <div class="left">
        <h2><a href="https://myanimelist.net/anime/${
          anime.mal_id
        }" target="_blank">${anime.title_english}</a></h2>
        <h4>${anime.title_romaji}</h4>
        <p>Airing: ${anime.season}, Epsiode: ${anime.episode}</p>
        <p>${getTimestamp(anime.at)}</p>
        <img src="https://trace.moe/thumbnail.php?anilist_id=${
          anime.anilist_id
        }&file=${encodeURIComponent(anime.filename)}&t=${anime.at}&token=${
        anime.tokenthumb
      }
        " alt="Anime Pic">
      </div>
      <div class="right"><h4>Similarity: ${Math.round(
        anime.similarity * 100
      )}%</h4></div>
    </div>`;

      resultAll.innerHTML += resultEl;
    });
  } else {
    resultAll.innerText = "No Record Found";
  }
}

function getTimestamp(num) {
  num = Number(num);
  var h = Math.floor(num / 3600);
  var m = Math.floor((num % 3600) / 60);
  var s = Math.floor((num % 3600) % 60);

  var hDisplay = h < 10 ? `0${h}` : `${h}`;
  var mDisplay = m < 10 ? `0${m}` : `${m}`;
  var sDisplay = s < 10 ? `0${s}` : `${s}`;
  return `Timestamp: ${hDisplay}:${mDisplay}:${sDisplay}`;
}

function prepareForResult() {
  const url = animeUrl.value;
  imgContainer.innerHTML = `<img src="${url}">`;
  waitingDiv.className = "show";
  resultAll.innerHTML = "";
}
