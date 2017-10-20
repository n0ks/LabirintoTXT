//Setando variaveis necessárias
var meunome = "Rodrigo Martins - 7316989";
var arq;
var tIMG = 50; //Tamanho / espaçamento da imagem usada para as paredes
var canvas = document.getElementById("canvas")
var tela = canvas.getContext("2d");
tela.font = "26px Consolas"; //Tamanho e fonte do texto	
tela.fillStyle = "#fff"; //Cor do texto na tela
tela.textAlign = "center";
tela.textBaseline = "middle";
var paredeImg = new Image();
paredeImg.src = "img/parede.png";
var array = [];
var x = 0;
var y = 0;
var filesInput = document.getElementById("file");

//Esperando carregar um arquivo
filesInput.addEventListener("change", function (event) {

	var files = event.target.files;
	var file = files[0];
	var reader = new FileReader();

	//Quando o arquivo for carregado chamar o evendo load
	reader.addEventListener("load", function (event) {
		var textFile = event.target;
		/*	pegando a string de texto do arquivo, e convertendo para um array utilizando
			expressão regular para eliminar espaços, tabs e outras coisas */
		arq = textFile.result.split(/\s*\W/);
		for (var i = 0; i < arq.length; i++) {
			//Colocando dados de coordenada X e Y no objeto array, juntamente com a leitura do arquivo de 0's e 1's
			array.push({
				"x": x,
				"y": y,
				"lerEstado": arq[i]
			});
			// se X for == 7 retorna a 0 e passando para a próxima linha
			if (x == 7) {
				x = 0;
				y++;
			} else {
				x++;
			}
		}
		//Após ler as posições e o objeto array preenchido desengar o labirinto
		desenhaLab();
	});
	reader.readAsText(file);
});

//Função para colocar as imagens nos X e Y correspondentes
function desenhaLab() {
	for (var i = 0; i < array.length; i++) {
		if (array[i].lerEstado == 1 || array[i].lerEstado == "1")
			tela.drawImage(paredeImg, array[i].x * tIMG, array[i].y * tIMG, tIMG, tIMG);
	}
	//Exibe meu nome na tela
	tela.fillText(meunome, 200, 200);
}
