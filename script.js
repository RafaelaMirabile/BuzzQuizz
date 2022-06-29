function oiJonas(){
    alert("oi wesley"); 
}
function createQuizz(){
    alert("deu bom:)")
}

function pegarQuizzesAxios(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(renderizarTodosOsQuizzes);
    promise.catch(() => console.log("deu ruim"));
}

function renderizarTodosOsQuizzes(response){
    todosOsQuizzes = response.data;

    const listadeTodosOsQuizzes = document.querySelector(".quizzes");

    for( i=0; todosOsQuizzes.length > i; i++ ){
        listadeTodosOsQuizzes.innerHTML += `<div class="quizz" onclick="playQuizz(${todosOsQuizzes[i].id})">
                                            <div class="black-gradient"></div> 
                                            <img src="${todosOsQuizzes[i].image}">
                                            <h1>${todosOsQuizzes[i].title}</h1>
                                        </div>`
    }
}
pegarQuizzesAxios();
