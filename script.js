var quantidade = document.getElementById('quantidade');
var btnPegar = document.getElementById('pegar');

btnPegar.addEventListener('click', () => {
    pegaPokemon(quantidade.value);
})

function pegaPokemon(quantidade) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=" + quantidade)
        .then(response => response.json())
        .then(allpokemon => {

            var pokemons = [];

            allpokemon.results.map((val) => {

                fetch(val.url)
                    .then(response => response.json())
                    .then(pokemonSingle => {
                        console.log(pokemonSingle);
                        pokemons.push({ nome: val.name, imagem: pokemonSingle.sprites.front_default });


                        if (pokemons.length == quantidade) {

                            var pokemonBoxes = document.querySelector('.pokemon-boxes');
                            pokemonBoxes.innerHTML = '';

                            pokemons.map(function (val) {
                                pokemonBoxes.innerHTML += `
                            <div class="pokemon-box">
                                <img src="${val.imagem}" alt="">
                                <p>${val.nome}</p>
                            </div><!--Pokemon-box-->
                            `
                                VanillaTilt.init(document.querySelectorAll(".pokemon-box"), {
                                    max: 25,
                                    speed: 400,
                                    glare: true,
                                    "max-glare": 0.5,
                                });
                            })
                        }
                    })
            })
        })
}

pegaPokemon(9);