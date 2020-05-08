var x,y;
var ax,ay;
var w,h;
var numDiv,getDiv;
var resultado;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w=windowWidth/2
  h=windowHeight/2
}

function draw() {  
  
  //EPP
  ellipse(200,100,200,200)
  //DDA
  ellipse(w, 100, 200, 200)
  //Bresenham
  ellipse(windowWidth-200,100,200,200)
  noLoop()
 
}

//botón dividir
function dividir(){
  getDiv=document.getElementById("input-number").value;
  numDiv = parseInt(getDiv);

  if(numDiv>1)
  {
    //el radio debe ser la mitad del tamaño del circulo
    let radio=100;
    let grados=360/numDiv
    let aux=grados;

    let xCentro1 = 200
    let xCentro2= w
    let xCentro3 = windowWidth-200

    let yCentro = 100

    draw()

    while(grados<=360){
     
        
      let x2=radio*Math.cos(grados* Math.PI / 180)
      let y2=radio*Math.sin(grados * Math.PI / 180)


      let x2P1=xCentro1+x2;
      let x2P2 = xCentro2 + x2
      let x2P3 = xCentro3 + x2;

      y2=yCentro+y2;
      
      x2P1=floor(x2P1)
      x2P2=floor(x2P2)
      x2P3 = floor(x2P3)
      y2=floor(y2)
  
      EPP(xCentro1,yCentro,x2P1,y2);
      DDA(xCentro2,yCentro,x2P2,y2)
      Bresenham(xCentro3,yCentro,x2P3,y2) 

      grados+=aux;
    } 

  }else{
    alert("Solo se puede dividir en numeros enteros mayores a 1");
  }

}

function EPP(x1,y1,x2,y2){


  if(x2<x1)
  {
    let aux=x2;
    x2=x1;
    x1=aux

    aux = y2
    y2=y1
    y1=aux
  }

  const dx = x2 - x1
  const dy = y2 - y1

  const m = dy / dx
  const b = y1 - (m * x1)

  
  point( x1, y1 )


  if(x1===x2){
  
    if(y1>y2)
    {
      let aux=y1;
      y1=y2;
      y2=aux
    }
    let y = y1 + 1
    while(y!=y2)
    {
      point(x1,y)
      y++
    }

  }
  else{ 
    let x = x1+ 1
    let y = m * x + b
    
    while(x !=x2){
      y = m * x + b
      y = floor(y)
      point(x, y)
      x++
    }
  }

}


function DDA(x1, y1, x2, y2) {

  let dx=x2-x1
  let dy=y2-y1
  let limite

  if(Math.abs(dx)>Math.abs(dy))
    limite=Math.abs(dx)
  else
    limite=Math.abs(dy)

  let xi=dx/limite
  let yi=dy/limite

  let x=x1
  let y= y1
  
  for(let i=0;i<limite;i++)
  {
      point(x, y)
      x+=xi
      y+=yi
  }
  
} 

function Bresenham(x1, y1, x2, y2) {

  let pY
  let pX
  let x
  let y
  let p
  let aux
  let aux2

  let dx = x2 - x1
  let dy = y2 - y1

  if(dy < 0) {
    dy = -dy
    pY = -1
  }else{
    pY = 1
  }

  if(dx < 0) {
    dx = -dx
    pX = -1
  }else{
    pX = 1
  }

  x = x1
  y = y1
  
  point(x,y)

  if(dx > dy) {
    
    
    p = 2 * dy - dx
    aux = 2 * dy
    aux2 = 2 * (dy - dx)

    while(x != x2) {
      x += pX

      if(p < 0) {
        p += aux
      }else {
        y += pY
        p += aux2
      }

      point(x,y)
    }
  
  }else{
    
    p = 2 * dx - dy
    aux = 2 * dx
    aux2 = 2 * (dx - dy)

    while(y != y2) {
      y += pY

      if(p < 0) {
        p += aux
      }else {
        x += pX
        p += aux2
      }

      point(x,y)
    }
  
  }
}
