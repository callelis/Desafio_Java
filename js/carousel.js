document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            // Captura os valores dos campos do formulário
            const contato = {
                nome: document.getElementById("nome")?.value || document.querySelector("input[type='text']")?.value,
                email: document.getElementById("email")?.value || document.querySelector("input[type='email']")?.value,
                telefone: document.getElementById("telefone")?.value || "",
                tipoContato: document.getElementById("tipo_contato")?.value || document.querySelector("select")?.value,
                mensagem: document.getElementById("mensagem")?.value || document.querySelector("textarea")?.value,
                dataEnvio: new Date().toLocaleString()
            };

            // Passo 10: Imprimir o objeto no console do navegador
            console.log("Dados do Formulário Enviados:", contato);

            alert("Mensagem enviada com sucesso! Verifique o console do navegador.");
            form.reset();
        });
    }
});

// Array para armazenar no máximo 2 veículos selecionados
let carArr = [];

class Car {
    constructor(model, height, freeGroundHeight, loadCapacity, engine, power, volume, wheel, price) {
        this.model = model;
        this.height = height;
        this.freeGroundHeight = freeGroundHeight;
        this.loadCapacity = loadCapacity;
        this.engine = engine;
        this.power = power;
        this.volume = volume;
        this.wheel = wheel;
        this.price = price;
    }
}

// Retorna a posição do objeto no array ou -1 se não encontrar
function GetCarArrPosition(car) {
    return carArr.findIndex(c => c.model === car.model);
}

// Passo 7: Inserir/remover carro do array com limite máximo de 2
function SetCarToCompare(el, car) {
    if (el.checked) {
        if (carArr.length < 2) {
            carArr.push(car);
        } else {
            el.checked = false;
            alert("Você só pode selecionar no máximo 2 veículos para comparação.");
        }
    } else {
        const index = GetCarArrPosition(car);
        if (index !== -1) {
            carArr.splice(index, 1);
        }
    }
}

// Passo 7: Atualizar os elementos HTML da tabela dentro da <div id="compare">
function UpdateCompareTable() {
    if (carArr.length < 2) return;

    const car1 = carArr[0];
    const car2 = carArr[1];

    // Mapeamento dos IDs da tabela HTML com as propriedades do objeto
    const fields = [
        "model", "height", "freeGroundHeight", "loadCapacity", 
        "engine", "power", "volume", "wheel", "price"
    ];

    fields.forEach(field => {
        const el1 = document.getElementById(`compare_1_${field}`);
        const el2 = document.getElementById(`compare_2_${field}`);

        if (el1) el1.innerText = car1[field] || "";
        if (el2) el2.innerText = car2[field] || "";
    });
}

class Carousel {
    constructor(items) {
        // Array de objetos contendo imagem, título e link do veículo
        this.items = items || [
            {
                image: "img/imagem_1.jpg",
                title: "Conheça a Nova Ford Ranger",
                url: "lancamento.html"
            },
            {
                image: "img/imagem_2.jpg",
                title: "Ford Mustang - Desempenho e Tecnologia",
                url: "lancamento.html"
            },
            {
                image: "img/imagem_3.jpg",
                title: "Nova Ford Bronco Sport 2022",
                url: "lancamento.html"
            }
        ];
        this.currentIndex = 0;
        this.intervalId = null;
        this.intervalTime = 2000;
    }

    // Inicializa o carrossel automotivo (troca a cada 2 segundos)
    start() {
        this.showCurrent();
        this.startAuto();
    }

    startAuto() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.intervalId = setInterval(() => {
            this.next();
        }, this.intervalTime);
    }

    stopAuto() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // Avança para o próximo item
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.showCurrent();
    }

    // Retorna para o item anterior (Passo 6)
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.showCurrent();
    }

    // Renderiza a imagem e o texto/link atual na tela
    showCurrent() {
        const item = this.items[this.currentIndex];

        // Elemento da div principal do carrossel
        const carouselDiv = document.getElementById("carousel");
        if (carouselDiv) {
            carouselDiv.style.backgroundImage = `url('${item.image}')`;
            carouselDiv.style.backgroundSize = "cover";
            carouselDiv.style.backgroundPosition = "center";
        }

        // Elemento da div com o título e link
        const carouselTitleDiv = document.getElementById("carousel-title");
        if (carouselTitleDiv) {
            carouselTitleDiv.innerHTML = `<a href="${item.url}" target="_blank">${item.title}</a>`;
        }
    }
}

// Instanciação e execução automática
const myCarousel = new Carousel();

document.addEventListener("DOMContentLoaded", () => {
    myCarousel.start();

    const btnNext = document.getElementById("direito");
    const btnPrev = document.getElementById("esquerdo");

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            myCarousel.stopAuto();
            myCarousel.next();
            myCarousel.startAuto();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            myCarousel.stopAuto();
            myCarousel.prev();
            myCarousel.startAuto();
        });
    }
});