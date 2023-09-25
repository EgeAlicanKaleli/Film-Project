const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1]; 
const clear = document.getElementById("clear-films");


eventListeners();


function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmFromStorage();
        UI.loadAllFilm(films);

    })
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",deleteAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        // Hata
        UI.displayMessages("Tüm alanları doldurun.","danger");
    }
    else{
        // Yeni Film
        const newFilm = new Film(title,director,url);
        UI.addFilmtoUI(newFilm); // Arayüze film ekleme
        Storage.addFilmtoStorage(newFilm); // Storageye film ekleme
        UI.displayMessages("Filminiz başarıyla eklendi.","success");
    }

    UI.clearInputs(titleElement,urlElement,directorElement);
    e.preventDefault();
}

function deleteFilm(e){
    if (e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("Silme işlemi başarılı.","success");
    }
}

function deleteAllFilms(){
    if (confirm("Bütün filmler silinecektir. Emin misiniz ?")){
        UI.deleteAllFilmsFromUI();
        Storage.deleteAllFilmsFromStorage();
    }
}