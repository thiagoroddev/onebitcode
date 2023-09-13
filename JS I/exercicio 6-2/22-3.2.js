let metros = parseFloat(prompt("Digite um valor em metros"));
let opcao = prompt("Para qual medida deseja converter?(mm, cm, dm, dam, hm, km)");
let conversao = 0;

switch (opcao) {
    case "mm" :
        conversao = metros * 1000;
        document.write(`Metros em mm: ${conversao}`);
        break
    case "cm" :
        conversao = metros * 100;
        document.write(`Metros em cm: ${conversao}`);
        break
    case "dm":
        conversao = metros * 10;
        document.write(`Metros em dm: ${conversao}`);
        break
    case "dam":
        conversao = metros * 0.01;
        document.write(`Metros em dam: ${conversao}`);
        break
    case "hm":
        conversao = metros * 0.001;
        document.write(`Metros em hm: ${conversao}`);
        break
    case "km":
        conversao = metros * 0.0001;
        document.write(`Metros em km: ${conversao}`);
        break
    default :
    document.write(`Metros em mm: ${conversao}`);
    }  
