const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const simboloPausePlay = document.querySelector('.app__card-primary-button-icon')
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFoco = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('sons/luna-rise-part-one.mp3'); //ou readfile('sons/luna-rise-part-one.mp3'); [não recomendado]
const somPlay = new Audio('sons/play.wav');
const somPause = new Audio('sons/pause.mp3');
const somEndTime = new Audio('sons/beep.mp3');


musica.loop = true;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFoco.addEventListener('change', () => {
    if (musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove ('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br> 
                <strong class="app__title-strong"> mergulhe no que importa. </strong>
            `
            break;

            case "descanso-curto":
            titulo.innerHTML = `Que tal dar<br>uma respirada?<br> 
            <strong class="app__title-strong"> Faça uma<br>pausa curta! </strong>
            `
            break;

            case "descanso-longo":
            titulo.innerHTML = `Hora de voltar<br>à superficie.<br> 
            <strong class="app__title-strong"> Faça uma<br>pausa longa. </strong>
            `
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        somEndTime.play();
        alert('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
        }
        somEndTime.pause();
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        somPause.play();
        simboloPausePlay.setAttribute('src', `imagens/play_arrow.png`);
        zerar()
        return;
    } else {
        somPlay.play();
        simboloPausePlay.setAttribute('src', `imagens/pause.png`);
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
}

function zerar() {
    clearInterval(intervaloId);
    simboloPausePlay.setAttribute('src', `imagens/play_arrow.png`);
    iniciarOuPausarBt.textContent = "Começar";
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos *1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}


mostrarTempo();