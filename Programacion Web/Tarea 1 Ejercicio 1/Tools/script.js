canvas = document.getElementById("myCanvas");
canvasContext = canvas.getContext('2d')
dibujo = []
points = []
imagen = new Image()
imagen.src = "wey.png"
imagen.onload = function(){
    canvas.width = imagen.width;
    canvas.height = imagen.height;
    canvasContext.drawImage(imagen,0,0)
}

var loadFile = function(event) {
    console.log(URL.createObjectURL(event.target.files[0]))
	imagen.src = URL.createObjectURL(event.target.files[0]);
    canvas.width = imagen.width;
    canvas.height = imagen.height;
    canvasContext.drawImage(imagen,0,0)
};

canvas.addEventListener('mousedown', function(e) {
    puntos = getCursorPosition(canvas, e)
    x = puntos[0]
    y = puntos[1]

    if(points.length != 0){
        xAnterior = points[points.length-1][0]
        yAnterior = points[points.length-1][1]
        dibujarLinea(xAnterior,yAnterior,x,y)
        dibujarPunto(xAnterior,yAnterior,"red")
    }
    dibujarPunto(x,y,"green")
    points.push(puntos)
    regresados = 0
})


regresados = 0
function regresarPunto(){
    if(regresados == 0){
        indiceUltimoPuntoDibujado = points.length-1
    }    
    regresados = regresados + 1 
    console.log(regresados)
    ultimoPunto = points[indiceUltimoPuntoDibujado  - regresados + 1]
    puntoActualRegresado = points[indiceUltimoPuntoDibujado  - regresados]

    dibujarPunto(ultimoPunto[0],ultimoPunto[1],"red")
    dibujarPunto(puntoActualRegresado[0],puntoActualRegresado[1],"green")
    points.push(puntoActualRegresado)
}

function deshacer(){
    points.pop()
    canvasContext.restore()
    canvasContext.drawImage(imagen,0,0)
    for(i = 1; i < points.length;i++){
        dibujarLinea(points[i-1][0],points[i-1][1],points[i][0],points[i][1])
        dibujarPunto(points[i-1][0],points[i-1][1],"red")
        dibujarPunto(points[i][0],points[i][1],"green")
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.offsetX
    const y = event.offsetY
    console.log("x: " + x + " y: " + ((y - canvas.height) * -1))
    return [x,y]
}

function dibujarPunto(x,y,color){
    canvasContext.beginPath()
    canvasContext.fillStyle = color
    canvasContext.arc(x, y, 3, 0, 2 * Math.PI);
    canvasContext.fill()
    canvasContext.closePath() 
}

function dibujarLinea(xAnterior,yAnterior,x,y){
    canvasContext.beginPath()
    canvasContext.moveTo(xAnterior,yAnterior)
    canvasContext.lineTo(x,y);
    canvasContext.strokeStyle = "black"
    canvasContext.lineWidth = 2
    canvasContext.stroke();     
    canvasContext.closePath() 
}


function exportarPuntos(){
    terminarTrazo()
    string = "E = []"
    for(a = 0; a < dibujo.length;a++){
        string += "\nE.append(np.array("
        puntos = "["
        for(i = 0; i < dibujo[a].length;i++){
            puntos += "("
            puntos += dibujo[a][i][0]+","+ ( (dibujo[a][i][1]- canvas.height)* -1 ) +","+1
            if(i != dibujo[a].length-1)
                puntos +="),"
            else
                puntos += ")"
        }
        puntos += "]"
        string += puntos + "))"
    }
    console.log(string)
    document.getElementById("salida").value = string
 
    return(string)
}



function terminarTrazo(){
    dibujo.push(points)
    points = []
}
