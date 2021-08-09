/*jslint browser:true */
document.addEventListener("DOMContentLoaded", function start() {
        build();
        launch();
    }
);

let url_base = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
let categories = [  "7 films les mieux notés",
                    "romance",
                    "biography",
                    "western"
                ];
let list_urls = [[url_base]];
function build() {
    let wrapper = document.getElementById("containers_wrapper");
    categories.sort().reverse();
    for (let i in categories) {
        let div = document.createElement("div");
        div.classList.add("container_for_seven");
        div_title = document.createElement("div");
        div_title.classList.add("container__title");
        let p_title = document.createElement("p");
        p_title.innerText = categories[i][0].toUpperCase() +
                            categories[i].slice(1);
        div_title.appendChild(p_title);
        div.appendChild(div_title);
        let div_movies = document.createElement("div");
        div_movies.classList.add("container__movies");
        div_movies.id = "div_container_movies_" + categories[i];
        div.appendChild(div_movies);
        div.id = "div_"+ categories[i];
        wrapper.appendChild(div);
    }
}

function launch() {
    for (let i in categories.slice(1)) {
        list_urls.push([url_base.slice(0, 36)+"?genre=" +
                        categories[i] +
                        "&" +
                        url_base.slice(-19), categories[i]]);
    }
    for (let i in list_urls) {
        getData(list_urls[i][0], list_urls[i][1]);
    }
}

function getData(url, cat) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => manage(data.results, data.next, cat));
}

function manage(results, dataNext, cat) {
    if (cat == undefined) {
        getBest(results[0]);
        res = results.slice(1);
        fetch(dataNext)
            .then((response) => response.json())
            .then((data) => data.results.slice(0,3)
                            .forEach((movie) => res.push(movie)))
            .then(dispatch(res, cat));
    } else {
        fetch(dataNext)
            .then((response) => response.json())
            .then((data) => data.results.slice(0, 2)
                            .forEach((movie) => results.push(movie)))
            .then(dispatch(results, cat));
    }
}

function getBest(data) {
    fetch(data.url)
        .then((response) => response.json())
        .then((data) => dispatch_best(data));
}

function dispatch_best(data) {
    let title = document.getElementById("best_movie_all_cat_title");
    let img = document.getElementById("img_best");
    let container = document
                        .getElementsByClassName
                            ("container__bestMovie__title")[0];
    let short_description = document.createElement("p");
    img.id = data.id;
    img.src = data.image_url;
    img.classList.add("a_bit_bigger");
    title.textContent = data.title;
    short_description.innerText = "Résumé: " + data.description;
    short_description.style.fontStyle = "italic";
    container.appendChild(short_description);
    listen_click(img.id);
}

function dispatch(results, cat) {
    if (cat == undefined) {
        cat = categories.sort()[0];
    }
    let present_div = document.getElementById("div_container_movies_" +
                      cat.toLowerCase());
    if (present_div.children.length > 0) {
        for (i=1; i<5; i+=1) {
            present_div.children[1].remove();
        }
        for (i in results.slice(0, 4)) {
            let picture = document.createElement("img");
            picture.id = results[i].id;
            picture.src = results[i].image_url;
            present_div.insertBefore(picture,
                present_div.childNodes[present_div.childNodes.length -1]);
            listen_click(picture.id);
        }
    } else {
        let div = document.getElementById("div_container_movies_" +
                  cat.toLowerCase());
        let arrow_left = document.createElement("button");
        arrow_left.id = "arrow_left_" + cat;
        arrow_left.innerHTML = "<i class='fas fa-arrow-left'></i>";
        div.appendChild(arrow_left);
        for (i in results.slice(0, 4)) {
            let picture = document.createElement("img");
            picture.id = results[i].id;
            picture.src = results[i].image_url;
            div.appendChild(picture);
            listen_click(picture.id);
        }
        let arrow_right = document.createElement("button");
        arrow_right.id = "arrow_right_" + cat;
        arrow_right.innerHTML = "<i class='fas fa-arrow-right'></i>";
        div.appendChild(arrow_right);
        listen_arrows(results, cat);
    }
}

function listen_arrows(movies, cat) {
    let btn_left = document.getElementById("arrow_left_" + cat);
    btn_left.addEventListener("click", () => {
        setTimeout( () => {btn_left.classList.add("background_red")}, 50);
        btn_left.classList.remove("background_red");
        let element_to_move = movies.splice(-1);
        movies.splice(0, 0, element_to_move[0]);
        return dispatch(movies, cat);
    })
    let btn_right = document.getElementById("arrow_right_" + cat);
    btn_right.addEventListener("click", () => {
        setTimeout( () => {btn_right.classList.add("background_red")}, 50);
        btn_right.classList.remove("background_red");
        let element_to_move = movies.splice(0, 1);
        movies.push(element_to_move[0]);
        return dispatch(movies, cat);
    })
}

function listen_click(id) {
    let image_click = document.getElementById(id);
    image_click.onclick = () => {
        url = url_base.slice(0,36) + id
        fetch(url)
            .then((response) => response.json())
            .then((data) => show(data));
        }
}
function show(movie) {
    let modal_content = document.getElementById("modal_content");
    modal_content.innerHTML = "";
    let span = document.createElement("span");
    span.classList.add("close");
    span.innerHTML = "&times;";
    span.style.alignSelf = "flex-end";
    modal_content.appendChild(span);
    let picture = document.createElement("img");
    picture.src = movie.image_url;
    picture.classList.add("bigger_image");
    picture.style.alignSelf = "center";
    modal_content.appendChild(picture);
    let paragraph = document.createElement("p");
    paragraph.style.textAlign = "left";
    if (movie.usa_gross_income == null) {
        movie.usa_gross_income = "inconnu";
    }
    paragraph.innerHTML = "Titre du film : " + movie.title +
                          "<br><br>" +
                          "Genres: " + movie.genres +
                          "<br><br>" +
                          "Date de sortie: " + movie.date_published +
                          "<br><br>" +
                          "Rated: " + movie.rated +
                          "<br><br>" +
                          "Score IMDB: " + movie.imdb_score +
                          "<br><br>" +
                          "Réalisateur: " + movie.directors +
                           "<br><br>" +
                          "Liste des acteurs: " + movie.actors +
                          "<br><br>" +
                          "Durée: " + movie.duration + " minutes" +
                          "<br><br>" +
                          "Pays d'origine: " + movie.countries +
                          "<br><br>" +
                          "Résultat au Box-Office en USD: "
                            + movie.usa_gross_income +
                          "<br><br>" +
                          "Résumé du film: " + movie.long_description +
                          "<br><br>";
    modal_content.appendChild(paragraph);
    let modal = document.getElementById("modal");
    modal.style.display = "flex";
    listen_close(modal);
}

function listen_close(modal) {
    let close = document.getElementsByTagName("span")[0]
    close.onclick = () => {
        modal.style.display = "none";
    }
}
