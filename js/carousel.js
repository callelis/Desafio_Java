// Array global onde os objetos serão inseridos
let carouselArr = [];

class Carousel {
  constructor(image, title, url) {
    this.image = image;
    this.title = title;
    this.url = url;
  }

  // Atributos estáticos para controlar o estado global do carrossel
  static currentIndex = 0;
  static items = [];
  static intervalId = null;

  // Método chamado no HTML: Carousel.Start(carouselArr)
  static Start(arr) {
    this.items = arr;
    if (this.items.length === 0) return;

    // Mapeamento dos elementos HTML da sua página
    const slideContainer = document.querySelector('.slideCarrossel');
    const titleContainer = document.querySelector('#carousel-title p');
    const btnEsquerdo = document.querySelector('.Esquerdo');
    const btnDireito = document.querySelector('.Direito');

    // Configuração dos eventos nos botões prev/next
    if (btnEsquerdo) {
      btnEsquerdo.addEventListener('click', () => {
        Carousel.Prev();
        Carousel.ResetAutoPlay();
      });
    }

    if (btnDireito) {
      btnDireito.addEventListener('click', () => {
        Carousel.Next();
        Carousel.ResetAutoPlay();
      });
    }

    // Inicializa a exibição e o loop automático
    Carousel.Update();
    Carousel.StartAutoPlay();
  }

  // Avança para o próximo slide
  static Next() {
    Carousel.currentIndex = (Carousel.currentIndex + 1) % Carousel.items.length;
    Carousel.Update();
  }

  // Volta para o slide anterior
  static Prev() {
    Carousel.currentIndex = (Carousel.currentIndex - 1 + Carousel.items.length) % Carousel.items.length;
    Carousel.Update();
  }

  // Atualiza as imagens, links e texto na tela
  static Update() {
    const slideContainer = document.querySelector('.slideCarrossel');
    const titleContainer = document.querySelector('#carousel-title p');
    const item = Carousel.items[Carousel.currentIndex];

    if (slideContainer && item) {
      // Cria a estrutura do slide atual apontando para a pasta img/
      slideContainer.innerHTML = `
        <a href="${item.url}">
          <img src="img/${item.image}" alt="${item.title}" style="width: 100%; display: block;">
        </a>
      `;
    }

    if (titleContainer && item) {
      titleContainer.innerHTML = `<a href="${item.url}">${item.title}</a>`;
    }
  }

  // Inicia a transição automática a cada 4 segundos
  static StartAutoPlay() {
    Carousel.intervalId = setInterval(() => {
      Carousel.Next();
    }, 4000);
  }

  // Reinicia o tempo ao clicar nos botões de navegação
  static ResetAutoPlay() {
    clearInterval(Carousel.intervalId);
    Carousel.StartAutoPlay();
  }
}