// 1. Medidor Interativo de Blindagem do WhatsApp
const checkboxesBlindagem = document.querySelectorAll('.check-blindagem');
const barraProgresso = document.getElementById('barra-progresso');
const statusBlindagem = document.getElementById('status-blindagem');

checkboxesBlindagem.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const total = checkboxesBlindagem.length;
    const marcados = document.querySelectorAll('.check-blindagem:checked').length;
    const porcentagem = Math.round((marcados / total) * 100);

    barraProgresso.style.width = porcentagem + '%';
    barraProgresso.textContent = porcentagem + '%';

    if (porcentagem === 0) {
      barraProgresso.style.backgroundColor = '#9f1239';
      statusBlindagem.textContent = 'Risco Alto: Sua conta está exposta! Ative as proteções acima.';
    } else if (porcentagem < 60) {
      barraProgresso.style.backgroundColor = '#d97706';
      statusBlindagem.textContent = 'Proteção Inicial: Continue ativando os recursos para evitar clonagem de perfil.';
    } else if (porcentagem < 100) {
      barraProgresso.style.backgroundColor = '#7f1d3a';
      statusBlindagem.textContent = 'Quase lá! Falta apenas um passo para blindar totalmente sua conta.';
    } else {
      barraProgresso.style.backgroundColor = '#15803d';
      statusBlindagem.textContent = 'Blindagem Máxima (100%): Seu WhatsApp está protegido contra invasões e perfis falsos!';
    }
  });
});

// 2. Quiz Interativo com Destaque Visual e Gabarito Comentado
const btnCorrigir = document.getElementById('btn-corrigir');
const btnLimpar = document.getElementById('btn-limpar');
const resultadoQuiz = document.getElementById('resultado-quiz');

const gabarito = {
  q1: 'b',
  q2: 'c',
  q3: 'a',
  q4: 'b',
  q5: 'b'
};

const explicacoes = [
  '1. Resposta correta (B): Os criminosos criaram 8 contas falsas com a foto e dados do advogado para cobrar taxas de um falso alvará.',
  '2. Resposta correta (C): Restringir a foto de perfil para "Meus contatos" impede que estranhos baixem sua imagem.',
  '3. Resposta correta (A): A confirmação em duas etapas exige um PIN de 6 dígitos mesmo se o código SMS for interceptado.',
  '4. Resposta correta (B): Sempre faça logout e encerre a sessão ao terminar de usar um computador compartilhado.',
  '5. Resposta correta (B): Ajustar cadeira e monitor e manter líquidos longe dos equipamentos evita acidentes e lesões.'
];

btnCorrigir.addEventListener('click', () => {
  let acertos = 0;
  let todasRespondidas = true;

  for (let pergunta in gabarito) {
    const selecionada = document.querySelector(`input[name="${pergunta}"]:checked`);
    if (!selecionada) {
      todasRespondidas = false;
      break;
    }
  }

  if (!todasRespondidas) {
    alert('Por favor, responda todas as 5 perguntas antes de verificar o resultado!');
    return;
  }

  for (let pergunta in gabarito) {
    const box = document.getElementById(`box-${pergunta}`);
    const selecionada = document.querySelector(`input[name="${pergunta}"]:checked`);
    box.classList.remove('correta', 'incorreta');

    if (selecionada.value === gabarito[pergunta]) {
      acertos++;
      box.classList.add('correta');
    } else {
      box.classList.add('incorreta');
    }
  }

  let html = `<h3>Resultado: Você acertou ${acertos} de 5 perguntas!</h3><ul>`;
  explicacoes.forEach((item) => {
    html += `<li>${item}</li>`;
  });
  html += '</ul>';

  resultadoQuiz.innerHTML = html;
  resultadoQuiz.classList.remove('oculto');
  resultadoQuiz.scrollIntoView({ behavior: 'smooth' });
});

btnLimpar.addEventListener('click', () => {
  document.getElementById('form-quiz').reset();
  resultadoQuiz.classList.add('oculto');
  for (let pergunta in gabarito) {
    document.getElementById(`box-${pergunta}`).classList.remove('correta', 'incorreta');
  }
});