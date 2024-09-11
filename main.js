const result = document.querySelector('.result');
var value = null;
var title_count = 0
var currently_showing = 10;
var current_page = 1;

const searchMovie = (e) =>{
    if(e)
        e.preventDefault();
    if(!value)
        value = e.target.querySelector('input').value;
    //http://www.omdbapi.com/?i=tt3896198&apikey=7717a820
    fetch('https://www.omdbapi.com/?s='+value+'&page=1&apikey=7717a820')
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.Search.map(data => `
            <div class="" onclick="">
                <div class="image">
                    <img class="thumbnail" src="${data.Poster}" onclick="searchById('${data.imdbID}')">
                </div>
                <p class="thumbnail-title">${data.Title}</p>
            </div>
        `);
        title_count = resp.totalResults;
        result.innerHTML = `<div class="thumbnails">${data.join('')}</div>`;
        console.log(title_count);
        loadPages();
    });
}

const searchById = (movie_id) =>{
    hideButtons();
    fetch(`https://www.omdbapi.com/?i=${movie_id}&page=1&apikey=7717a820`)
    .then(resp => resp.json())
    .then(resp => {
        result.innerHTML = `
        <div class="movie-info">
            <div class="title-area">
                <h3>${resp.Title}</h3>
                <img src="${resp.Poster}">
            </div>
            <div class="text-area">
                <span class="plot">${resp.Plot}<span>
                <br>
                <span class="actors">${resp.Actors}<span>
            </div>                    
        </div>
        `;
        console.log(resp)
    });
}

const loadPages = () =>{
    showButtons();
    console.log("Load pages")
    var pages = document.querySelector('.pages-container');
    pages.innerHTML = '';
    console.log(pages)
    var pages_count = title_count / 10;
    for(var i = 1; i <= pages_count; i++){
        if(i <= currently_showing)
            pages.innerHTML += `<p onclick="">${i}</p>`
    }
    pages.innerHTML += "<br>";
}

const pageUp = () => {
    var pages_count = title_count / 10;
    if(current_page != pages_count - 1)
        current_page++;
    fetch('https://www.omdbapi.com/?s='+value+`&page=${current_page}&apikey=7717a820`)
    .then(resp => resp.json())
    .then(resp => {
        const data = resp.Search.map(data => `
            <div class="" onclick="">
                <div class="image">
                    <img class="thumbnail" src="${data.Poster}" onclick="searchById('${data.imdbID}')">
                </div>
                <p class="thumbnail-title">${data.Title}</p>
            </div>
        `);
        title_count = resp.totalResults;
        result.innerHTML = `<div class="thumbnails">${data.join('')}</div>`;
        console.log(title_count);
    });
}
const pageDown = () => {
    if(current_page > 1)
        current_page--;
    fetch('https://www.omdbapi.com/?s='+value+`&page=${current_page}&apikey=7717a820`)
    .then(resp => resp.json())
    .then(resp => {
        const data = resp.Search.map(data => `
            <div class="" onclick="">
                <div class="image">
                    <img class="thumbnail" src="${data.Poster}" onclick="searchById('${data.imdbID}')">
                </div>
                <p class="thumbnail-title">${data.Title}</p>
            </div>
        `);
        title_count = resp.totalResults;
        result.innerHTML = `<div class="thumbnails">${data.join('')}</div>`;
        console.log(title_count);
    });
}

const loadPage = (page_number) =>{
    fetch('https://www.omdbapi.com/?s='+value+`&page=${page_number}&apikey=7717a820`)
    .then(resp => resp.json())
    .then(resp => {
        const data = resp.Search.map(data => `
            <div class="" onclick="">
                <div class="image">
                    <img class="thumbnail" src="${data.Poster}" onclick="searchById('${data.imdbID}')">
                </div>
                <p class="thumbnail-title">${data.Title}</p>
            </div>
        `);
        title_count = resp.totalResults;
        result.innerHTML = `<div class="thumbnails">${data.join('')}</div>`;
        console.log(title_count);
        if(page_number === currently_showing){
            currently_showing += 10;
        }
    });
}

const hideButtons = () =>{
    document.querySelector(".pages").style.display = "none";
}

const showButtons = () =>{
    document.querySelector(".pages").style.display = "";
}
hideButtons();