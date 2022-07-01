const urlAPI =("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
let respostasEmbaralhadas;
let respostasNivel = [];
let questions;
let escolhida;



function createQuizz(){
    alert("deu boa:)")
}

function pegarQuizzesAxios(){
    const promise = axios.get(urlAPI);
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
// função get API QUIZZ ID e muda da tela 1 para 2 // 
function playQuizz(id){
    const promise = axios.get(`${urlAPI}/${id}`);
    promise.then(playQuizzId);

    const tela1 = document.querySelector(".tela-1");
    const tela3 = document.querySelector(".tela-3");

    tela1.classList.add("none");
    tela3.classList.add("none");

}
//Função renderizar QuizzClicado//
function playQuizzId(response){

    const bannerQuizz = document.querySelector(".banner");
    bannerQuizz.innerHTML += `<div class="black-gradient"></div> 
                              <img src="${response.data.image}" alt="imagem do quizz clicado">
                              <h2>${response.data.title}</h2>`

    let idQuizz = response.data;
    console.log(idQuizz);
    questions = response.data.questions;
    const quizzQuestions = document.querySelector(".levelContainer");
    console.log(questions);
    let answersBox="";
    
    for(let i=0; i<questions.length; i++ ){
        //embaralhar respostas //
        let answerArray = questions[i].answers;
        console.log(answerArray);
        let answerArrayEmbaralhado = answerArray.sort(random);
        // colocar respostas ja embaralhadas//
        for(let j=0 ;j <questions[i].answers.length; j++ ){

            answersBox +=`<div class="answerBox" onclick = "guardarRespostas(this,${questions[i].answers[j].isCorrectAnswer})">
                            <div class="overlay none"></div>                            
                            <img src=${questions[i].answers[j].image}" alt="imagem da pergunta">
                            <div class="answer">${questions[i].answers[j].text}</div>
                        </div>`

        }
        // colocar quantidade de questoes//
        quizzQuestions.innerHTML += `<div class="level content">
        <div class="question content" style="background-color:${questions[i].color}">${questions[i].title}</div>
        <div class="answersContainer">${answersBox}</div>`
        
        answersBox="";
    }

}
function random() {
    return Math.random() - 0.5;
  }

  // função selecionar as respostas  //
  function guardarRespostas(clicou , respostaBooleano){
    console.log(clicou);
    let option = clicou.parentNode;
    console.log(option);
    let alternative = option.querySelectorAll(".answerBox .overlay");

   // colocando overlay//
    for( let i=0 ; alternative.length > i ; i++){
        alternative[i].classList.remove("none");
        clicou.classList.add("overNone");
    }

    if(respostaBooleano === true){
        console.log("verdadeiro")
    } else if (respostaBooleano === false){
        console.log("falso")
    }







    }




    

  







  
