// script.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// Array para guardar las ondas
const waves = [];

function drawWave(x, y, radius, opacity) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = `rgba(0, 0, 255, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
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
        wave.opacity -= 0.02;

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

// Agregar un evento para crear una nueva onda cuando se hace clic en el canvas
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    waves.push({
        x,
        y,
        radius: 0,
        opacity: 1,
    });
});
