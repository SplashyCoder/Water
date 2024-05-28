
function toggleVisibility(state) {
    // Cambiar la visibilidad del div
    if (state == true) {
        hourglass.style.display = 'block';
    } else if (state == false) {
        hourglass.style.display = 'none';
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// console.log(width, height)
// Array para guardar las ondas
const waves = [];

function drawWave(x, y, radius, opacity) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = `rgba(0, 0, 255, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawConcentricCircle(x, y, radius, opacity) {
    ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 255, ${opacity})`; // Establecer el color del borde
        ctx.lineWidth = 2; // Ancho del borde
        ctx.stroke();
        ctx.closePath();
}



function update() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height);

    // Actualizar y dibujar cada onda
    for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        drawWave(wave.x, wave.y, wave.radius, wave.opacity);

        // Incrementar el radio y disminuir la opacidad para simular el desvanecimiento
        wave.radius += 2;
        wave.opacity -= 0.009;

        // Eliminar las ondas que ya no son visibles
        if (wave.opacity <= 0) {
            waves.splice(i, 1);
        }
    }
    // Volver a llamar la función de actualización para animar el canvas
    requestAnimationFrame(update);
}

// Iniciar la animación
update();


const waveCreator = (x,y) => {
    waves.push({
        x,
        y,
        radius: 0,
        opacity: 1,
    });
}

const centralWave = () =>{
    // const rect = canvas.getBoundingClientRect();
    const x =  width/2
    const y =  height/2

    waveCreator(x, y)

}


const multiWaveI = (cantidad, intervalo) => {

    let contador = 0;
    const intervalId = setInterval(() => {
        centralWave();
        contador++;
        if (contador == cantidad) {
            clearInterval(intervalId);
        }
        // console.log(contador)
    }, intervalo);
}

const multiWaveD = (cantidad, intervalo) => {
    let contador = 0;
    const intervalId = setInterval(() => {
        const x = width
        // const xx = 
        const y = height/2
        waveCreator(x/3,y);
        waveCreator(x*(2/3),y);
        contador++;
        if (contador == cantidad) {
            clearInterval(intervalId);
        }
        console.log(contador)
    }, intervalo);
}


const doppler = (cantidad, intervalo) =>{

    const x = width/3
    const y = height-100

    let waveCount = 0;
    waveOriginX = 0;
    const waveDistance = 5;

    const intervalId = setInterval(() => {
        if (waveCount >= cantidad) {
            clearInterval(intervalId);
            return;
        }

        const x = waveOriginX;
        waveCreator(x,y);
        waveOriginX += waveDistance;

        if (waveOriginX > canvas.width) {
            waveOriginX = 0;
        }

        waveCount++;
    }, intervalo);
}

// Agregar un evento para crear una nueva onda cuando se hace clic en el canvas
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    waveCreator(x, y)
    console.log(waves)
    
});



document.getElementById('multiWaveForm').addEventListener('submit', (e)=>{

    e.preventDefault(); // Evita el comportamiento por defecto (recargar la página)

    const cantidad = document.getElementById('cantidad').value
    const intervalo = document.getElementById('intervalo').value
    const funciones = document.getElementById('funciones').value
    
    switch (funciones){
        case '1': 
            doppler(cantidad,intervalo)
            toggleVisibility(false)

            break
        case '2': 
            multiWaveI(cantidad, intervalo)
            toggleVisibility(false)

            break
        case '3': 
            multiWaveD(cantidad, intervalo)
            toggleVisibility(true)

            break
    }
    // console.log(waves)

})  

