//tela:
let screen = document.querySelector(".screen");
let userHaveQuizz = false;

const urlAPI =("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
let respostasEmbaralhadas;
let respostasArray = [];
let questions;
let escolhida;
let answerArray=[];
let answersBox="";


let tituloQuizz = "";
let URLimgQuizz = "";
let qtdPerguntas = "";
let qtdNiveis = "";


let títulosnível = [];
let porcentagens = [];
let URLsnível = [];
let descsnível = [];

renderizarPagina1();

function renderizarPagina1(){
    screen.innerHTML = "";
    screen.innerHTML = `<div class="tela tela-1"> </div>`;
    
    renderizarUserSpace();
    renderizarListQuizzes();
}

function renderizarUserSpace(){
    let tela1 = document.querySelector(".tela-1");
    if(userHaveQuizz){
        tela1.innerHTML = `<div class="user-full">
                <div class="full">
                    <div class="userTitle">
                        <h3>Seus Quizzes</h3>
                        <h3 class="plus" onclick="RenderizarPagina3a()">+</h3>
                    </div>
                </div>
            </div>`
    } else {tela1.innerHTML = `<div class="user-empty">
             <div>
                 <div class="content">
                     <div class="advise">
                         <h3>Você não criou nenhum quizz ainda :(</h3>
                     </div>
                     <button class=" create" onclick="RenderizarPagina3a()">
                         <p>Criar Quizz</p>
                     </button>
                 </div>
             </div>
         </div >`
    }
}

function renderizarListQuizzes(){
    screen.innerHTML += 
    `<div class="listquizzes ">
        <div class="listTitle">
        <span>Todos os Quizzes</span>
        </div>
        <div class="quizzes">
        </div>
    </div>`
    pegarQuizzesAxios();
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
        listadeTodosOsQuizzes.innerHTML += `<div class="quizz" onclick="renderizarTela2(${todosOsQuizzes[i].id})">
                                            <div class="black-gradient"></div> 
                                            <img src="${todosOsQuizzes[i].image}">
                                            <h1>${todosOsQuizzes[i].title}</h1>
                                        </div>`
    }
}

function renderizarTela2(quizzClicado){
    screen.innerHTML = "";

    screen.innerHTML = `<div class="tela tela-2">
    <div class="banner"> </div>
 <div class="levelContainer content"> </div>          
</div>`;
    playQuizz(quizzClicado)
}

pegarQuizzesAxios();

// função get API QUIZZ ID e muda da tela 1 para 2 // 
function playQuizz(id){
    const promise = axios.get(`${urlAPI}/${id}`);
    promise.then(playQuizzId);

    const tela1 = document.querySelector(".tela-1");
    const tela3 = document.querySelector(".tela-3");
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

    
    for(let i=0; i<questions.length; i++ ){
        //embaralhar respostas //
        answerArray = questions[i].answers;
        console.log(answerArray);
        let answerArrayEmbaralhado = answerArray.sort(random);
        // colocar respostas ja embaralhadas//
        for(let j=0 ;j <questions[i].answers.length; j++ ){
            if(questions[i].answers[j].isCorrectAnswer === true){
                answersBox +=`<div class="answerBox green scroll${i}" onclick = "guardarRespostas(this, ${i})"}>
                <div class="overlay none"></div>                            
                <img src=${questions[i].answers[j].image}" alt="imagem da pergunta">
                <div class="answer">${questions[i].answers[j].text}</div>
            </div>`

            } else {
                answersBox +=`<div class="answerBox red scroll${i}" onclick = "guardarRespostas(this, ${i})"}>
                <div class="overlay none"></div>                            
                <img src=${questions[i].answers[j].image}" alt="imagem da pergunta">
                <div class="answer">${questions[i].answers[j].text}</div>
            </div>`
            }
  
        }
        // colocar quantidade de questoes//
        quizzQuestions.innerHTML += `<div class="questionBox2 content">
        <div class="question content" style="background-color:${questions[i].color}">${questions[i].title}</div>
        <div class="answersContainer">${answersBox}</div>`
        
        answersBox="";
    }
}
function random() {
    return Math.random() - 0.5;
  }

  // função selecionar as respostas  //
  function guardarRespostas(clicou,x){

    console.log(clicou);
    let option = clicou.parentNode;
    console.log(option);
    let alternative = option.querySelectorAll(".answerBox .overlay");
    let alternativeColor = option.querySelectorAll(".answerBox");
    console.log(alternativeColor);

   // colocando overlay//
    for( let i=0 ; alternative.length > i ; i++){
        alternative[i].classList.remove("none");
        clicou.classList.add("overNone");
    }
   //colocanod cor da letra//
   for(let i =0 ; alternativeColor.length > i; i++){
    alternativeColor[i].classList.add("selecionado");
   }
   if(clicou.classList.contains("red")){
    respostasArray.push("red");
   } else if(clicou.classList.contains("green")){
    respostasArray.push("green");
   }

   console.log(respostasArray);


  setTimeout(scroll(x), 2000);
}
function scroll(x){
    let rolar = document.querySelector(`.scroll${x+1}`);
    rolar.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
}


function createQuizz(){
    RenderizarPagina3a();
}

function RenderizarPagina3a(){
    screen.innerHTML = `<div class="tela tela-3-1">
            <div>
                <h2>Comece pelo começo</h2>
            </div>
            <div class="questions ">
                <input class="tituloQuizz" type="text" value="" placeholder="Título do seu quizz">
                <input class="URLimgQuizz" type="text" value="" placeholder="URL da imagem do seu quizz">
                <input class="qtdPerguntas" type="text" value="" placeholder="Quantidade de perguntas do quizz">
                <input class="qtdNiveis" type="text" value="" placeholder="Quantidade de níveis do quizz">
            </div>
            <button onclick="verificaValoresPagina3a()">Prosseguir pra criar perguntas</button>
        </div>`
    
}
function verificaValoresPagina3a(){
    tituloQuizz = document.querySelector(".tituloQuizz")
    URLimgQuizz = document.querySelector(".URLimgQuizz")
    qtdPerguntas = document.querySelector(".qtdPerguntas")
    qtdNiveis = document.querySelector(".qtdNiveis")
    tituloQuizz = tituloQuizz.value;
    URLimgQuizz = URLimgQuizz.value;
    qtdPerguntas = Number(qtdPerguntas.value);
    qtdNiveis = Number(qtdNiveis.value);
    let tituloQuizzOK = tituloQuizz.length >= 20 && tituloQuizz.length <= 65;
    let URLimgQuizzOK = isValidHttpUrl(URLimgQuizz);
    let qtdPerguntasOK = qtdPerguntas > 2 && qtdPerguntas != NaN;
    let qtdNiveisOK = qtdNiveis >= 2  && qtdNiveis != NaN;
    
    if(tituloQuizzOK){
        if(URLimgQuizzOK){
            if(qtdPerguntasOK ){
                if(qtdNiveisOK){
                    RenderizarPagina3b()
                }else{
                    alert("A quantidade de niveis não pode ser menor que 2")
                }
            }else{
                alert("A quantidade de perguntas deve ser de pelo menos 3")
            }
        }else{
            alert("o link da imagem deve estar em formato URL devendo comear com 'http' (dica, abra a imagem numa nova guia e copie o link da pagina)")
        }
    }else{
    alert("O nome do quizz deve ter entre 20 e 65 caracteres");
    }
}

function RenderizarPagina3b(){
    screen.innerHTML = 
    `<div class="tela tela-3-2">
        <h2>Crie suas perguntas</h2>
        <div class="questions">
            <h2>Pergunta 1</h2>
            <input class="textPergunta1" type="text" value="" placeholder="Texto da pergunta">
            <input class="corPergunta1" type="text" value="" placeholder="Cor de fundo da pergunta">
            <h2>Resposta correta</h2>
            <input class="respostaCorreta1" type="text" value="" placeholder="Resposta correta">
            <input class="urlImgCorreta1" type="text" value="" placeholder="URL da imagem">
            <h2>Respostas incorretas</h2>
            <input class="respostaIncorretaA1" type="text" value="" placeholder="Resposta incorreta 1">
            <input class="urlImgIncorretaA1" type="text" value="" placeholder="URL da imagem 1">
            <input class="respostaIncorretaB1" type="text" value="" placeholder="Resposta incorreta 2">
            <input class="urlImgIncorretaB1" type="text" value="" placeholder="URL da imagem 2">
            <input class="respostaIncorretaC1" type="text" value="" placeholder="Resposta incorreta 3">
            <input class="urlImgIncorretaC1" type="text" value="" placeholder="URL da imagem 3">
        </div>
        <div class="otherQuestions">
        </div>
       
        <button onclick="verificaValoresPagina3b()">Prosseguir pra criar níveis</button>
    </div>`;
    renderizarPerguntas();
}

function renderizarPerguntas() {
    let otherQuestions = document.querySelector(".otherQuestions");
    otherQuestions.innerHTML = "";
    for(let i=2; i <= qtdPerguntas; i++){
        otherQuestions.innerHTML +=  
            `<div class="questions insert${i}">
                <div class="quest">
                    <h2>Pergunta ${i}</h2><ion-icon onclick="pergunta(${i})" name="create-outline"></ion-icon>
                </div>    
            </div>`
    }
}

function pergunta(x){
    let div = document.querySelector(`.insert${x}`);
    div.innerHTML = "";
    div.innerHTML += 
    `<div class="questions">
            <h2>Pergunta ${x}</h2>
            <input class="textPergunta${x}" type="text" value="" placeholder="Texto da pergunta">
            <input class="corPergunta${x}" type="text" value="" placeholder="Cor de fundo da pergunta">
            <h2>Resposta correta</h2>
            <input class="respostaCorreta${x}" type="text" value="" placeholder="Resposta correta">
            <input class="urlImgCorreta${x}" type="text" value="" placeholder="URL da imagem">
            <h2>Respostas incorretas</h2>
            <input class="respostaIncorretaA${x}" type="text" value="" placeholder="Resposta incorreta 1">
            <input class="urlImgIncorretaA${x}" type="text" value="" placeholder="URL da imagem 1">
            <input class="respostaIncorretaB${x}" type="text" value="" placeholder="Resposta incorreta 2">
            <input class="urlImgIncorretaB${x}" type="text" value="" placeholder="URL da imagem 2">
            <input class="respostaIncorretaC${x}" type="text" value="" placeholder="Resposta incorreta 3">
            <input class="urlImgIncorretaC${x}" type="text" value="" placeholder="URL da imagem 3">
    </div>`
}

function verificaValoresPagina3b(){
    for(let i = 1; i <= qtdPerguntas; i++){
        let textPergunta =document.querySelector(`.textPergunta${i}`);
        textPergunta  = textPergunta.value;
        let corPergunta = document.querySelector(`.corPergunta${i}`);
        corPergunta = corPergunta.value;
        let respostaCorreta = document.querySelector(`.respostaCorreta${i}`);
        respostaCorreta = respostaCorreta.value;
        let urlImgCorreta = document.querySelector(`.urlImgCorreta${i}`);
        urlImgCorreta = urlImgCorreta.value;
        let respostaIncorretaA = document.querySelector(`.respostaIncorretaA${i}`);
        respostaIncorretaA = respostaIncorretaA.value;
        let urlImgIncorretaA = document.querySelector(`.urlImgIncorretaA${i}`);
        urlImgIncorretaA = urlImgIncorretaA.value;
        let respostaIncorretaB = document.querySelector(`.respostaIncorretaB${i}`);
        respostaIncorretaB = respostaIncorretaB.value;
        let urlImgIncorretaB = document.querySelector(`.urlImgIncorretaB${i}`);
        urlImgIncorretaB = urlImgIncorretaB.value;
        let respostaIncorretaC = document.querySelector(`.respostaIncorretaC${i}`);
        respostaIncorretaC = respostaIncorretaC.value;
        let urlImgIncorretaC = document.querySelector(`.urlImgIncorretaC${i}`);
        urlImgIncorretaC = urlImgIncorretaC.value;
        //condição de verificação de cada item
        let textPerguntaOK = textPergunta.length >= 20;
        let corPerguntaOK = corPergunta.includes("#") && isHexColor(corPergunta.replace("#",""));
        let respostaCorretaOK = respostaCorreta != "";
        let urlImgCorretaOK =  isValidHttpUrl(urlImgCorreta);
        let respostaIncorretaAOK = respostaIncorretaA != "";
        let urlImgIncorretaAOK =  isValidHttpUrl(urlImgIncorretaA);
        let urlImgIncorretaBOK = urlImgIncorretaB == "" || isValidHttpUrl(urlImgIncorretaB);
        let urlImgIncorretaCOK = urlImgIncorretaC == "" || isValidHttpUrl(urlImgIncorretaC);
        let verificadorDePerguntas = document.querySelectorAll("ion-icon").length;

        if(textPerguntaOK){
            if(corPerguntaOK){
                if(respostaCorretaOK){
                    if(urlImgCorretaOK){
                        if(respostaIncorretaAOK){
                            if(urlImgIncorretaAOK){
                                if(urlImgIncorretaBOK){
                                    if(urlImgIncorretaCOK){
                                        if(verificadorDePerguntas === 0 && i === qtdPerguntas){
                                            RenderizarPagina3c();
                                        }else{
                                            if(verificadorDePerguntas+i === qtdPerguntas)
                                            alert(`preencha a pergunta ${qtdPerguntas + 1 - verificadorDePerguntas}`)
                                        }
                                    }else{
                                        alert(`insira uma url valida para a imagem da resposta incorreta 3  da pergunta ${i}`)
                                    }
                                }else{
                                    alert(`insira uma url valida para a imagem da resposta incorreta 2  da pergunta ${i}`)
                                }
                            }else{
                                alert(`insira uma url valida para a imagem da resposta incorreta 1  da pergunta ${i}`)
                            }
                        }else{
                            alert(`resposta incorreta 1  da pergunta ${i} deve ser preenchida`)
                        }
                    }else{
                        alert("insira uma url valida para a imagem da resposta correta")
                    } 
                }else{
                    alert("Textos da resposta correta não pode estar vazio")
                }
            }else{
                alert(`Cor de fundo da pergunta ${i} deve ser uma cor em hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)`)
            }
        }else{
            alert(`Texto da pergunta ${i} deve ter 20 caracteres ou mais de`)
        }
    }
}

function isHexColor (hex) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
}

function isValidHttpUrl(string) {
    let url;   
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function RenderizarPagina3c(){
    screen.innerHTML = 
        `<div class="tela tela-3-3">
            <h2>Agora, decida os níveis</h2>
            <div class="level-box level">
                <p>Nível 1</p>
                <input class="títulonível" type="text" value="" placeholder="Título do nível">
                <input class="porcentagem" type="text" value="" placeholder="% de acerto mínima">
                <input class="URLnível" type="text" value="" placeholder="URL da imagem do nível">
                <input class="descnível" type="text" value="" placeholder="Descrição do nível">
            </div>
            <div class="inserir">

            </div>
            
            <button onclick="validarníveis()">Finalizar Quizz</button>
        </div>`;
        renderizarLevelBox();
}

function renderizarLevelBox(){
    let inserir = document.querySelector(".inserir");
    for(let i=2; i <= qtdNiveis; i++){
        inserir.innerHTML +=
                `<div class="level-box level level${i}">
                    <div class="quest">
                        <p>Nível ${i}</p>
                        <ion-icon onclick="renderizarCriaçãoDeNivel(${i})" name="create-outline"></ion-icon>
                    </div>
                </div>`;
    }
                
}

function renderizarCriaçãoDeNivel(x){
    let level = document.querySelector(`.level${x}`);
    level.innerHTML = 
        `<div class="level-box level">
            <p>Nível ${x}</p>
            <input class="títulonível" type="text" value="" placeholder="Título do nível">
            <input class="porcentagem" type="text" value="" placeholder="% de acerto mínima">
            <input class="URLnível" type="text" value="" placeholder="URL da imagem do nível">
            <input class="descnível" type="text" value="" placeholder="Descrição do nível">
        </div>`
}   

function RenderizarPagina3d(){
    screen.innerHTML = `<div class="tela tela-3-4"> 
            <h2>Seu quizz está pronto!</h2>
            
            
            <button>Acessar Quizz</button>
            <button onclick="renderizarPagina1()" class="voltar">voltar para home</button>
        </div>` 
}

//tela-3-3
function validarníveis(){
    títulosnível = document.querySelectorAll(".títulonível");
    porcentagens = document.querySelectorAll(".porcentagem");
    URLsnível = document.querySelectorAll(".URLnível");
    descsnível = document.querySelectorAll(".descnível");
    let achei0 = false;
    let count = 0;
    let errosníveis = `Verifique os seguintes campos: \n`;
    for (let i = 0; i < qtdNiveis ; i++){
        const títulonível = títulosnível[i].value
        const porcentagem = porcentagens[i].value
        let URLnível = URLsnível[i].value
        const descnível = descsnível[i].value
        if (títulonível.length >= 10){
            if (porcentagem !== NaN && porcentagem >= 0 && porcentagem <= 100 && porcentagem !== ""){
                console.log(porcentagem)
                if (isValidHttpUrl(URLnível)){
                    if (descnível.length >= 30){
                        count++
                    } else {
                        errosníveis += `Descrição do Nivel ${i+1} (No minímio 30 caracteres)\n`
                    }
                } else {
                    errosníveis += `URL da imagem do Nivel ${i+1} (Verifique se está no formato URL)\n`
                }
            } else {
                errosníveis += `Pocentagem do Nivel ${i+1} (Verifique se é um número entre 1 a 100)\n`
            }
        } else {
            errosníveis += `Título do Nivel ${i+1} (No minímio 10 caracteres)\n`
        }
        if (porcentagem == 0){
            achei0 = true;
        }
    }
    console.log(achei0)
    if (count !== qtdNiveis || !achei0){
        if (!achei0){
            errosníveis += `Pelo menos uma porcentagem deve ser 0`
        }
        alert(errosníveis)
    } else {
        RenderizarPagina3d()
    }
}
