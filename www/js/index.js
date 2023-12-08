/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}


var myObj= new Object(), myJSON, obj;

var text=[];

let arrayStops = [];

let tiempoActual = 0;
let cronometro;
let segundero;
const tiempoElement = document.querySelector('.tiempo');
const estado = document.querySelector('.estado');
const estados = document.querySelector('.estados');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const saveButton = document.getElementById('saveButton');
const softStopButton = document.getElementById('softStopButton');

const miniReloj = document.querySelector(".loader")
let animationIsRunning = false;

function actualizarCronometro() {
    
    tiempoActual++;
    const horas = Math.floor(tiempoActual / 3600);
    const minutos = Math.floor((tiempoActual % 3600) / 60);
    const segundos = tiempoActual % 60;
    console.log('tiempo'+tiempoActual)
    tiempoElement.textContent = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

startButton.addEventListener('click', function () {

    console.log('click Start')
    cronometro = setInterval(actualizarCronometro, 1000);
    segundero =setInterval(actualizarFondo, (1000/12));

    console.log(localStorage)

    if (saveButton.classList.contains("hide")) {
        
        saveButton.classList.remove("hide");
    }
    
    
    if (softStopButton.classList.contains("hide")) {       
        softStopButton.classList.remove("hide");
    
    }    
    if (!startButton.classList.contains("hide")) {
        startButton.classList.add("hide");
    }
    if (stopButton.classList.contains("hide")&&localStorage.length===0) {
        tiempoActual=0
        backgroundImage=`radial-gradient(white 60%, transparent 61%)
        ,repeating-conic-gradient(white 1deg, rgba(38, 133, 221, 0.168) 1deg 2deg, white 2deg 3deg)
        , conic-gradient(from 0deg, white 1% 75%,rgba(38, 133, 221, 0.654))`
        transform= `rotate(0deg)`
        
    }else if(stopButton.classList.contains("hide")&&localStorage.length!=0) {
        angulo= (tiempoActual % 60)*6
        backgroundImage=`radial-gradient(white 60%, transparent 61%)
        ,repeating-conic-gradient(white 1deg, rgba(38, 133, 221, 0.168) 1deg 2deg, white 2deg 3deg)
        , conic-gradient(from ${angulo}deg, white 1% 75%,rgba(38, 133, 221, 0.654))`
        transform= `rotate(${angulo}deg)`
        console.log(angulo)
        
    }
    if (!stopButton.classList.contains("hide")) {
        stopButton.classList.add("hide");
    }







    

});

softStopButton.addEventListener('click', function () {
    clearInterval(cronometro);
    clearInterval(segundero);
});



startButton.addEventListener("click", function() {

    setTimeout(function() {
        if (!animationIsRunning) {
            miniReloj.style.animation = "rotation 1s linear infinite";
            animationIsRunning = true;
        }
    }, (1000/24)); 
});

softStopButton.addEventListener("click", function() {
    if (animationIsRunning) {
        

        currentAnimationState = window.getComputedStyle(miniReloj).getPropertyValue("animation-play-state");
        console.log('estoy en fin animacion')
        miniReloj.style.animationPlayState = "paused";
        animationIsRunning = false;
    }
});


let contador=0

saveButton.addEventListener('click', function () {
    contador++
    registrarEstado();

    const estados = document.querySelector(".estados");

    let contenidoAltura = estados.offsetHeight;

    estados.scrollTop -= contenidoAltura;

    
    
});





function registrarEstado() {

    
    let flag = document.createElement("div");
    flag.classList.add("flag")

    let newEstado = document.createElement("p");
    
    newEstado.classList.add('estado'+contador)
    newEstado.textContent=tiempoElement.textContent;
    
    estados.appendChild(flag)
    flag.appendChild(newEstado)
    obtenerdiff(flag);
     
   
}

function obtenerdiff(flag){


    var newDiff = document.createElement("p");
    newDiff.classList.add('diff')

    var order= document.createElement("p");
    order.textContent=`${String(contador).padStart(2, '0')}`;
    let contadorJson= contador

    let horaMayor = document.querySelector('.estado'+contador).textContent;
    let horaMenor =`00:00:00`;
    
    if(contador!=1){


        horaMayor = document.querySelector('.estado'+contador).textContent;
        horaMenor = document.querySelector('.estado'+(contador-1)).textContent;
        console.log('hora mayor:'+horaMayor)
        console.log('hora menor:'+horaMenor)
    
    }

    
    console.log('hora mayor:'+horaMayor)
    console.log('hora menor:'+horaMenor)
    let horasMayores = horaMayor.split(":")
    let horasMenores = horaMenor.split(":")

    parseInt(horasMayores)
    parseInt(horasMenores)

    let diferenciaSegundos
    console.log(parseInt(horasMayores[2]))
    let horaMayorparse= parseInt(horasMayores[2])
    if((horasMayores[2]<horasMenores[2])&&(horasMayores[1]===1)){
        
        
        horaMayorparse=horaMayorparse+60
        horasMayores[2] =horaMayorparse
        horasMayores[1]=0
    }
    console.log(horaMayorparse)
    let diferenciaMinutos
    let diferenciaHoras

    let diferencia = `${String(horasMayores[0]-horasMenores[0]).padStart(2, '0')}:${String(horasMayores[1]-horasMenores[1]).padStart(2, '0')}:${String(horasMayores[2]-horasMenores[2]).padStart(2, '0')}`;
    newDiff.textContent= `+ `+diferencia
    flag.appendChild(newDiff)

    let flagsLocalS= document.querySelectorAll('.flag')
    console.log(flagsLocalS)
    if(localStorage.length>0){

        

    }

    flag.appendChild(order)
    myObj = { "orden":contadorJson,"diferencia":diferencia,"hora":horaMayor };

    //insercion de json al localStorage
    arrayStops.push(myObj)
    console.log(arrayStops)
    myJSON = JSON.stringify(arrayStops);
    console.log(myJSON)
    //arrayStops.push(myJSON);
    localStorage.setItem("flags",myJSON)


    
}


let arrayJson = [];

window.addEventListener("load", function() {

    if(this.localStorage.getItem("flags")!=null){

    
    text = localStorage.getItem("flags");
    console.log(text)
    obj = JSON.parse(text);


    console.log(obj.findLast((element) => element).hora)
    tiempoElement.textContent=obj.findLast((element) => element).hora
    let cronometroLocalStorage = obj.findLast((element) => element).hora.split(':')
    console.log(parseInt(cronometroLocalStorage[2]))

    if((parseInt(cronometroLocalStorage[0])>0)){

        tiempoActual=tiempoActual+parseInt(cronometroLocalStorage[0])*3600

    }
    if((parseInt(cronometroLocalStorage[1])>0)){
        console.log('dentro 2 if')
        tiempoActual=tiempoActual+parseInt(cronometroLocalStorage[1])*60
        console.log(tiempoActual)

    }
    if((parseInt(cronometroLocalStorage[2])>0)){

        tiempoActual= tiempoActual + parseInt(cronometroLocalStorage[2])
        console.log('dentro del 3 if')
        console.log(tiempoActual)

    }

    
    
    obj.forEach(ob => {

        flag = document.createElement("div");
        flag.classList.add("flag")
    
        newEstado = document.createElement("p");
        newEstado.classList.add('estado'+ob.orden)
        newEstado.textContent=ob.hora
    
        newDiff = document.createElement("p");
        newDiff.classList.add('diff')
        newDiff.textContent =`+ `+ ob.diferencia

        order= document.createElement("p");
        order.textContent=  '0'+ob.orden
        estados.appendChild(flag)
        flag.appendChild(newEstado)
        flag.appendChild(newDiff)
        flag.appendChild(order)
        contador=ob.orden
        console.log(ob.orden)
        console.log('contador:'+contador)
    });
 }
  });
  



stopButton.addEventListener('click', function () {

    localStorage.clear();


    if (!stopButton.classList.contains("hide")) {
        stopButton.classList.add("hide");
    }

    clearInterval(cronometro);
    clearInterval(segundero);
    backgroundImage = backgroundImage.replace(`from ${angulo}deg`, `from 0deg`);
    angulo=0;
    console.log(backgroundImage)
    backgroundImage= `radial-gradient(white 60%, transparent 61%)
    ,repeating-conic-gradient(white 1deg, rgba(38, 133, 221, 0.168) 1deg 2deg, white 2deg 3deg)`
    transform= `rotate(0deg)`
    box2.style.transform= transform
    tiempoElement.textContent = `00:00:00`;

    reloj.style.backgroundImage = backgroundImage;

    let hijos =document.getElementsByClassName(`flag`)
    console.log(hijos)

    while (estados.firstChild) {
        estados.removeChild(estados.firstChild);
      }

      contador=0;


  
    


});




softStopButton.addEventListener('click', function () {
    console.log('click')

    if (stopButton.classList.contains("hide")) {
        stopButton.classList.remove("hide"); 
    }
    
    if (!saveButton.classList.contains("hide")) {
        saveButton.classList.add("hide"); 
    }
    
    if (!softStopButton.classList.contains("hide")) {
        softStopButton.classList.add("hide"); 
    
    }    
    if (startButton.classList.contains("hide")) {
        startButton.classList.remove("hide");
    }

});

stopButton.addEventListener('click', function () {
    miniReloj.style.animation = ""


    
});



var reloj = document.querySelector(".donut-gradient");
var box2 = document.querySelector(".box-2");

var backgroundImage = getComputedStyle(reloj).getPropertyValue("background-image");
var transform = getComputedStyle(box2).getPropertyValue("transform");
console.log(transform)
var angulo = 0;

console.log(box2.style.transform)
function actualizarFondo() {

    
    angulo += (6/12); // Incrementa el ángulo en 1 cada segundo (puedes ajustar la velocidad)
    // Reemplaza el valor "from 0deg" con el nuevo ángulo
    transform= transform.replace(`rotate(${angulo-(6/12)}deg)`, `rotate(${angulo}deg)`);
    backgroundImage = backgroundImage.replace(`from ${angulo-(6/12)}deg`, `from ${angulo}deg`);
    // Aplica la propiedad modificada al elemento
    console.log(angulo)
    reloj.style.backgroundImage = backgroundImage;
    box2.style.transform= transform
  }

