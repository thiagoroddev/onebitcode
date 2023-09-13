let metros = parseFloat(prompt("Digite um valor em metros"));
let opcao = prompt("Para qual medida deseja converter?(mm, cm, dm, dam, hm, km)");


switch (opcao) {
    case "mm" :
        document.write(`Metros em mm: ${metros * 1000}`);
        break
    case "cm" :
        conversao = metros * 100;
        document.write(`Metros em cm: ${metros * 100}`);
        break
    case "dm":
        document.write(`Metros em dm: ${metros * 10}`);
        break
    case "dam":
        document.write(`Metros em dam: ${metros * 0.1}`);
        break
    case "hm":
        document.write(`Metros em hm: ${metros * 0.01}`);
        break
    case "km":
        document.write(`Metros em km: ${metros * 0.001}`);
        break
    default :
    document.write(`Metros em mm: ${metros}`);
    }  

    