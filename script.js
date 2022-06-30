//tela:
let screen = document.querySelector(".screen");
let userHaveQuizz = false;

let tituloQuizz = "";
let URLimgQuizz = "";
let qtdPerguntas = "";
let qtdNiveis = "";


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
    qtdPerguntas = qtdPerguntas.value;
    qtdNiveis = qtdNiveis.value;
    let tituloQuizzOK = tituloQuizz.length >= 20 && tituloQuizz.length <= 65;
    let URLimgQuizzOK = URLimgQuizz.includes("http");
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
            <input type="text" value="" placeholder="Texto da pergunta">
            <input type="text" value="" placeholder="Cor de fundo da pergunta">
            <h2>Resposta correta</h2>
            <input type="text" value="" placeholder="Resposta correta">
            <input type="text" value="" placeholder="URL da imagem">
            <h2>Respostas incorretas</h2>
            <input type="text" value="" placeholder="Resposta incorreta 1">
            <input type="text" value="" placeholder="URL da imagem 1">
            <input type="text" value="" placeholder="Resposta incorreta 2">
            <input type="text" value="" placeholder="URL da imagem 2">
            <input type="text" value="" placeholder="Resposta incorreta 3">
            <input type="text" value="" placeholder="URL da imagem 3">
        </div>
        <div class="questions ">
            <h2>Pergunta 2</h2>
        </div>
        <div class="questions ">
            <h2>Pergunta 3</h2>
        </div>
        <button onclick="RenderizarPagina3c()">Prosseguir pra criar níveis</button>
    </div>`
}

function RenderizarPagina3c(){
    screen.innerHTML = 
        `<div class="tela tela-3-3">
            <h2>Agora, decida os níveis</h2>
            <div class="level-box level">
                <p>Nível 1</p>
                <input type="text" value="" placeholder="Título do nível">
                <input type="text" value="" placeholder="% de acerto mínima">
                <input type="text" value="" placeholder="URL da imagem do nível">
                <input type="text" value="" placeholder="Descrição do nível">
            </div>
            <div class="criarlevel level">
                <p>Nível 2</p>
            </div>
            <div class="criarlevel level">
                <p>Nível 3</p>
            </div>
            <button onclick="RenderizarPagina3d()">Finalizar Quizz</button>
        </div>`
}

function informacoesBasicas(){
    
}

function RenderizarPagina3d(){
    screen.innerHTML = `<div class="tela tela-3-4"> 
            <h2>Seu quizz está pronto!</h2>
            
            
            <button>Acessar Quizz</button>
            <button onclick="renderizarPagina1()" class="voltar">voltar para home</button>
        </div>` 
}




