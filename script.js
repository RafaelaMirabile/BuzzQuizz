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
let idQuizz;
let porcentdojogador;
let porcentagemDeAcerto = " ";
let porcentagemTexto =" ";
let imagemFinalização =" ";
let tituloFinalização=" ";
let quizzQuestions;

let quizzCriado = {};

let tituloQuizz = "";
let URLimgQuizz = "";
let qtdPerguntas = "";
let qtdNiveis = "";

let títulosnível = [];
let porcentagens = [];
let URLsnível = [];
let descsnível = [];

let arrayIDs = [];

renderizarPagina1();

function renderizarPagina1(){
    
    screen.innerHTML = "";
    screen.innerHTML = `<div class="tela tela-1"> </div>`;
    
    renderizarUserSpace();
    renderizarListQuizzes();
}

function renderizarUserSpace(){
    let tela1 = document.querySelector(".tela-1");

    let meusIDsSerializados= "";
    meusIDsSerializados = window.localStorage.getItem("array");
    const meusIDsDeserializados = JSON.parse(meusIDsSerializados);
    if (meusIDsDeserializados !== null){
        userHaveQuizz = true;
    }

    if(userHaveQuizz){
        tela1.innerHTML = `<div class="user-full">
                                <div class="full">
                                    <div class="userTitle">
                                        <h3>Seus Quizzes</h3>
                                        <h3 class="plus" onclick="RenderizarPagina3a()">+</h3>
                                    </div>
                                    <div class="inserirusuario">    </div>
                                </div>
                            </div>`
        pegarquizzesusuario();
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
}

//Função renderizar QuizzClicado//
function playQuizzId(response){
    const bannerQuizz = document.querySelector(".banner");
    bannerQuizz.innerHTML += `<div class="black-gradient"></div> 
                              <img src="${response.data.image}" alt="imagem do quizz clicado">
                              <h2>${response.data.title}</h2>`

    idQuizz = response.data;
    questions = response.data.questions;
    quizzQuestions = document.querySelector(".levelContainer");

    
    for(let i=0; i<questions.length; i++ ){
        //embaralhar respostas //
        answerArray = questions[i].answers;
        let answerArrayEmbaralhado = answerArray.sort(random);
        // colocar respostas ja embaralhadas//
        for(let j=0 ;j <questions[i].answers.length; j++ ){
            if(questions[i].answers[j].isCorrectAnswer === true){
                answersBox +=`<div class="answerBox green scroll${i}" onclick = "guardarRespostas(this, ${i})"}>
                <div class="overlay none"></div>                            
                <img src=${questions[i].answers[j].image} alt="imagem da pergunta">
                <div class="answer">${questions[i].answers[j].text}</div>
            </div>`

            } else {
                answersBox +=`<div class="answerBox red scroll${i}" onclick = "guardarRespostas(this, ${i})"}>
                <div class="overlay none"></div>                            
                <img src=${questions[i].answers[j].image} alt="imagem da pergunta">
                <div class="answer">${questions[i].answers[j].text}</div>
            </div>`
            }
  
        }
        // colocar quantidade de questoes//
        quizzQuestions.innerHTML += `<div class="questionBox2 content" style="color: #FFFFFF">
        <div class="question content" style="background-color:${questions[i].color}"><p>${questions[i].title}</p></div>
        <div class="answersContainer">${answersBox}</div>`
        
        answersBox="";
    }
}

function random() {
    return Math.random() - 0.5;
  }

  // função selecionar as respostas  //
  function guardarRespostas(clicou,x){
    let option = clicou.parentNode;
    let alternative = option.querySelectorAll(".answerBox .overlay");
    let alternativeColor = option.querySelectorAll(".answerBox");

   // colocando overlay//
    for( let i=0 ; alternative.length > i ; i++){
        alternative[i].classList.remove("none");
        clicou.classList.add("overNone");
    }
   //colocando cor da letra//
   for(let i =0 ; alternativeColor.length > i; i++){
    alternativeColor[i].classList.add("selecionado");
   }
   if(clicou.classList.contains("red")){
    respostasArray.push("red");
   } else if(clicou.classList.contains("green")){
    respostasArray.push("green");
   }


  if(questions.length === respostasArray.length){
    calcularNivel();
}
   setTimeout(scroll, 2000,x);

}
function scroll(x){
    if(questions.length === respostasArray.length){
        setTimeout(scrollFinal, 2000);
    }else{
        let rolar = document.querySelector(`.scroll${x+1}`);
        rolar.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }
}

function scrollFinal(){
    let scrollFinal = document.querySelector(".scrollFinal")
        scrollFinal.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    respostasArray =[];   
}

function calcularNivel(){
    let count = 0;
    for(let i=0 ; respostasArray.length > i ; i++){
        if(respostasArray[i] === "green"){
            count ++
        }
    } 
    porcentdojogador = Math.round((count/ respostasArray.length)*100);
    finalizaçãoDeQuizz();
}

function finalizaçãoDeQuizz(){
let arrayLevels = idQuizz.levels;
let minValueArray =[];
for (let i = 0 ; arrayLevels.length > i ; i++){
    let transform = Number(arrayLevels[i].minValue);
    minValueArray.push(transform);
}

minValueArray= minValueArray.sort(function(a,b){
    if (a>b) return 1;
    if (a<b) return -1;
    return 0
});


for (let i=0 ; minValueArray.length > i; i++){
    if(porcentdojogador >= minValueArray[i]){
        porcentagemDeAcerto = minValueArray[i];
    }
}
for( let i= 0; arrayLevels.length > i ; i++ ){
    if (porcentagemDeAcerto == arrayLevels[i].minValue){
        porcentagemTexto = arrayLevels[i].text;
        imagemFinalização = arrayLevels[i].image;
        tituloFinalização = arrayLevels[i].title;
    }
}
exibiçãoDoNivel();
}

function exibiçãoDoNivel(){
    let exibição = document.querySelector(".levelContainer");
    exibição.innerHTML += `<div class= exibição>
                            <div class=tituloExibição><p>${porcentdojogador}% de acerto : 
                            ${tituloFinalização} </p></div>
                            <div class = textoFinalização>
                            <img class="scrollFinal"src= "${imagemFinalização}">
                            <div class = "porcentagemTxt"><h4>${porcentagemTexto}<h4></div>
                            </div>
                            <div class = "reiniciarQuizz">
                            <button onclick="renderizarTela2(idQuizz.id)">Reiniciar Quizz</button>
                            <h5 onclick="renderizarPagina1()"> Voltar para Home</h5>
                            <div/>
                        </div>`                 
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
    quizzCriado = {title: tituloQuizz, image: URLimgQuizz, questions:[], levels:[]};  
    let chave = 0
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

         // criação do objeto 'quizzCriado'

        let resposta = []

        let obj1 = { text: respostaCorreta, image: urlImgCorreta, isCorrectAnswer: true };
        resposta.push(obj1);

        let obj2 = { text: respostaIncorretaA, image: urlImgIncorretaA, isCorrectAnswer: false };
        resposta.push(obj2);

        if (respostaIncorretaB != "" && urlImgIncorretaB != "") {

            let obj3 = { text: respostaIncorretaB, image: urlImgIncorretaB, isCorrectAnswer: false };
            resposta.push(obj3);
            if (respostaIncorretaC != "" && urlImgIncorretaC != "") {

                let obj4 = { text: respostaIncorretaC, image: urlImgIncorretaC, isCorrectAnswer: false };
                resposta.push(obj4);
            }
        }   

        quizzCriado.questions.push({title: textPergunta, color: corPergunta, answers: resposta})          

        //verificação de cada item
        if(textPerguntaOK){
            if(corPerguntaOK){
                if(respostaCorretaOK){
                    if(urlImgCorretaOK){
                        if(respostaIncorretaAOK){
                            if(urlImgIncorretaAOK){
                                if(urlImgIncorretaBOK){
                                    if(urlImgIncorretaCOK){
                                        chave++
                                        if(verificadorDePerguntas === 0 && i === qtdPerguntas && chave === qtdPerguntas){

                                            RenderizarPagina3c();                           
                                            
                                        }else{
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
                        alert(`insira uma url valida para a imagem da resposta correta da pergunta ${i}`)
                    } 
                }else{
                    alert(`Textos da resposta correta da pergunta ${i} não pode estar vazio`)
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

function RenderizarPagina3d(id){
    screen.innerHTML = `<div class="tela tela-3-4"> 
            <div class="pai">
                    <div>
                        <img src="${URLimgQuizz}" alt="">
                        <div class="black-gradient ZZZ"> 
                            <p class="tituloQuizCriado"> ${tituloQuizz}</p> 
                        </div>
                    </div> 
            <div>
            <div class="botoesQuizz">
                <h2>Seu quizz está pronto!</h2>
                <button onclick="renderizarTela2(${id})">Acessar Quizz</button>
                <button onclick="renderizarPagina1()" class="voltar">voltar para home</button>
            <div>
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
    if (count !== qtdNiveis || !achei0){
        if (!achei0){
            errosníveis += `Pelo menos uma porcentagem deve ser 0`
        }
        alert(errosníveis)
    } else {
        for(let j = 0; j <= qtdNiveis - 1; j++){
            quizzCriado.levels.push({title: títulosnível[j].value , image: URLsnível[j].value , text: descsnível[j].value, minValue: porcentagens[j].value})
        }
        postQuizz() 
    }
}

function postQuizz(){
    let promise = axios.post(urlAPI, quizzCriado);
    promise.then(pegarIdQuizzCriado);
    promise.catch(tratarErrorPost);
}
function pegarIdQuizzCriado(resposta){
    id = resposta.data.id;
    RenderizarPagina3d(id);
    local(id)
}

function tratarErrorPost(){
    alert("Quizz não enviado")
    renderizarPagina1();
}

function local(id){
    if(window.localStorage.array){
        const meusIDsSerializados = window.localStorage.getItem("array");
        const meusIDsDeserializados = JSON.parse(meusIDsSerializados);
        meusIDsDeserializados.push(id);
        let arraySerializada = JSON.stringify(meusIDsDeserializados);
        localStorage.setItem("array" , arraySerializada);

    }else {
        arrayIDs.push(id);
        let arraySerializada = JSON.stringify(arrayIDs);
        localStorage.setItem("array", arraySerializada);
    };
}

function pegarquizzesusuario(){
    let meusIDsSerializados= "";
    meusIDsSerializados = window.localStorage.getItem("array");
    const meusIDsDeserializados = JSON.parse(meusIDsSerializados);
    if (meusIDsDeserializados !== null){
        userHaveQuizz = true;
        percorrerarray(meusIDsDeserializados);
    }
}

function percorrerarray(array){
    for (let i = 0; i < array.length; i++){
        const id = array[i];
        axiosusuario(id);
    }
}

function axiosusuario(id){
    const promise = axios.get(`${urlAPI}/${id}`);
    promise.then(renderizarquizzusuaario);
}

function renderizarquizzusuaario(response){
    response = response.data;
   let quizzUsuario = `<div class="quizz" onclick="renderizarTela2(${response.id})">
                            <div class="black-gradient">   </div> 
                            <img src="${response.image}">
                            <h1>${response.title}</h1>
                        </div>`

let inserir = document.querySelector(".inserirusuario");
inserir.innerHTML += quizzUsuario;

}
