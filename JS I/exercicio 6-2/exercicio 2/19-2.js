let personagemUm = prompt('Personagem 1');
        let poderPersonagemUm = prompt('Poder de ataque dele');
        let personagemDois = prompt('Personagem 2');
        let vidaPersonagemDois = prompt('Vida do personagem 2');
        let escudoPersonagemDOis = true;

        let danoPersonagemDois = vidaPersonagemDois - poderPersonagemUm
        
        if (danoPersonagemDois <= 0 && escudoPersonagemDOis) {
            danoPersonagemDois = danoPersonagemDois + danoPersonagemDois;
        }

        console.log(danoPersonagemDois);

