document.addEventListener('DOMContentLoaded', (event) => {
    build()
    launch()
  })

let url_base = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
let categories = [  '7 meilleurs films toutes catégories confondues',
                    'western',
                    'family',
                    'adventure'
                ]
let list_urls = [[url_base]]


function build() {
    let wrapper = document.getElementById('containers_wrapper')
    categories.sort().reverse()
    for (let i in categories) {
        div = document.createElement('div')
        div.classList.add('container_for_seven')
        div_title = document.createElement('div')
        div_title.classList.add('container__title')
        p_title = document.createElement('p')
        p_title.innerText = categories[i][0].toUpperCase() + categories[i].slice(1)
        div_title.appendChild(p_title)
        div.appendChild(div_title)
        div_movies = document.createElement('div')
        div_movies.classList.add('container__movies')
        div_movies.id = 'div_container_movies_' + categories[i]
        div.appendChild(div_movies)
        div.id = 'div_'+ categories[i]
        wrapper.appendChild(div)
    }
}

function launch() {
    for (let i in categories.slice(1)) {
        list_urls.push([url_base.slice(0, 36)+'?genre='+categories[i]+'&'+url_base.slice(-19), categories[i]])
    }
    for (let i in list_urls) {
        getData(list_urls[i][0], list_urls[i][1])
    }
}

function getData(url, cat) {
    fetch(url)
        .then(response => response.json())
        .then(data => manage(data.results, data.next, cat))
}

function manage(results, dataNext, cat) {
    if (cat == undefined) {
        getBest(results)
    }
    fetch(dataNext)
        .then(response => response.json())
        .then(data => data.results.slice(0, 2).forEach(movie => results.push(movie)))
        .then(dispatch(results, cat))
}

function getBest(data) {
    best_movie = data[0]
    best_movie_title = best_movie.title
    best_movie_image = best_movie.image_url
    let title = document.getElementById("best_movie_all_cat_title")
    let img = document.getElementById("img_best")
    img.src = best_movie_image
    title.textContent = best_movie_title
}

function dispatch(results, cat) {
    if (cat == undefined) {
        cat = categories.sort()[0]
    } 
    let present_div = document.getElementById('div_container_movies_' + cat.toLowerCase())
    if (present_div.children.length > 0) {
        for (let i=1; i<5; i++) {
            present_div.children[1].remove()
        }
        for (let i in results.slice(0, 4)) {
            let image = document.createElement('img')
            image.id = results[i].id
            image.src = results[i].image_url
            present_div.insertBefore(image, present_div.childNodes[1])
        }
    } else {

        let div = document.getElementById('div_container_movies_' + cat.toLowerCase())
        arrow_left = document.createElement('button')
        arrow_left.id = "arrow_left_" + cat
        arrow_left.innerHTML = '<i class="fas fa-arrow-left"></i>'
        div.appendChild(arrow_left)
        for (let i in results.slice(0, 4)) {
            let image = document.createElement('img')
            image.id = results[i].id
            image.src = results[i].image_url
            div.appendChild(image)
        }
        arrow_right = document.createElement('button')
        arrow_right.id = "arrow_right_" + cat
        arrow_right.innerHTML = '<i class="fas fa-arrow-right"></i>'
        div.appendChild(arrow_right)
        listen_arrows(results, cat)
    }
}

function listen_arrows(movies, cat) {
    let btn_left = document.getElementById('arrow_left_' + cat);
    btn_left.addEventListener('click', () => {
        let element_to_move = movies.splice(-1)
        movies.splice(0, 0, element_to_move[0])
        return dispatch(movies, cat)
    })
    let btn_right = document.getElementById('arrow_right_' + cat);
    btn_right.addEventListener('click', () => {
        let element_to_move = movies.splice(0, 1)
        movies.push(element_to_move[0])
        return dispatch(movies, cat)
    })
}
