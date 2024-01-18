let metros =prompt("Digite um valor em metros");
let opcao = prompt("Para qual medida deseja converter?" + 
"\n1. milímetros (mm)" + 
"\n2. centímetros (cm)" + 
"\n3. decímetros (dm)" + 
"\n4. decâmetros (dam)" + 
"\n5. hectômetros (hm)" + 
"\n6. quilômetros (km)"
);



switch (metros) {
    case "1":
        alert("Resultado: " + metros + "m = " + metros * 1000 + "mm");
        break
    case "2" :
        alert("Resultado: " + metros + "m = " + metros * 100 + "cm");
        break
    case "3":
        alert("Resultado: " + metros + "m = " + metros * 10 + "dm");
        break
    case "4":
        alert("Resultado: " + metros + "m = " + metros * 0.01 + "dam");
        break
    case "5":
        alert("Resultado: " + metros + "m = " + metros * 0.001 + "hm");
        break
    case "6":
        alert("Resultado: " + metros + "m = " + metros * 0.0001 + "km");
        break
    default :
    document.write(`Metros em mm: ${conversao}`);
    }  