// Este script es para generar los iconos necesarios para la PWA
// Puedes ejecutarlo con Node.js si tienes instalado el paquete sharp

/*
Para usar este script:
1. Instala Node.js si aún no lo tienes
2. Instala el paquete sharp: npm install sharp
3. Coloca una imagen base en la carpeta raíz llamada "icon-base.png" (preferiblemente 512x512 o mayor)
4. Ejecuta este script: node create-icons.js
*/

const fs = require('fs');
const path = require('path');

console.log('Para generar los iconos necesarios para la PWA:');
console.log('1. Instala Node.js si aún no lo tienes: https://nodejs.org/');
console.log('2. Instala el paquete sharp: npm install sharp');
console.log('3. Coloca una imagen base en la carpeta raíz llamada "icon-base.png" (preferiblemente 512x512 o mayor)');
console.log('4. Ejecuta este script: node create-icons.js');

console.log('\nAlternativamente, puedes crear los iconos manualmente con cualquier editor de imágenes:');
console.log('- Crea los siguientes tamaños de iconos: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512');
console.log('- Guárdalos en la carpeta "icons" con los nombres correspondientes: icon-72x72.png, icon-96x96.png, etc.');

// Si sharp está instalado, este código funcionará
try {
    const sharp = require('sharp');
    
    // Asegúrate de que existe la carpeta icons
    if (!fs.existsSync('./icons')) {
        fs.mkdirSync('./icons');
    }
    
    // Tamaños de iconos necesarios
    const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
    
    // Verifica si existe la imagen base
    if (fs.existsSync('./icon-base.png')) {
        // Genera los iconos en diferentes tamaños
        sizes.forEach(size => {
            sharp('./icon-base.png')
                .resize(size, size)
                .toFile(`./icons/icon-${size}x${size}.png`, (err, info) => {
                    if (err) {
                        console.error(`Error al generar el icono de ${size}x${size}:`, err);
                    } else {
                        console.log(`Icono generado: icon-${size}x${size}.png`);
                    }
                });
        });
    } else {
        console.error('No se encontró la imagen base "icon-base.png". Por favor, coloca una imagen en la carpeta raíz.');
    }
} catch (error) {
    console.log('El paquete sharp no está instalado. Sigue las instrucciones anteriores para generar los iconos.');
} 