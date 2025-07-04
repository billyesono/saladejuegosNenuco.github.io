# GAMENENUCO - Progressive Web App

Este proyecto es una Progressive Web App (PWA) para una sala de juegos llamada GAMENENUCO, especializada en PlayStation 2, PC gaming y simuladores de carreras.

## Características de la PWA

- **Instalable**: Los usuarios pueden instalar la aplicación en sus dispositivos móviles y escritorio
- **Funciona offline**: Gracias al service worker, la aplicación puede funcionar sin conexión a internet
- **Experiencia nativa**: Una vez instalada, se comporta como una aplicación nativa
- **Actualizaciones automáticas**: Cuando hay cambios en la web, la PWA se actualiza automáticamente

## Requisitos para que funcione como PWA

1. **HTTPS**: La aplicación debe ser servida a través de HTTPS (excepto en localhost para desarrollo)
2. **Service Worker**: Ya está implementado en `sw.js`
3. **Web App Manifest**: Ya está implementado en `manifest.json`
4. **Iconos**: Necesitas crear los iconos en la carpeta `icons/` (ver instrucciones abajo)

## Cómo generar los iconos

### Opción 1: Usar el script de Node.js

1. Instala Node.js si aún no lo tienes: https://nodejs.org/
2. Instala el paquete sharp: `npm install sharp`
3. Coloca una imagen base en la carpeta raíz llamada "icon-base.png" (preferiblemente 512x512 o mayor)
4. Ejecuta el script: `node create-icons.js`

### Opción 2: Crear manualmente

1. Usa cualquier editor de imágenes (como Photoshop, GIMP, o incluso herramientas online)
2. Crea versiones de tu logo en los siguientes tamaños:
   - 72x72
   - 96x96
   - 128x128
   - 144x144
   - 152x152
   - 192x192
   - 384x384
   - 512x512
3. Guárdalos en la carpeta `icons/` con los nombres correspondientes (ej: `icon-72x72.png`)

## Cómo probar la PWA

1. Sube el sitio a un servidor con HTTPS o usa un servicio como GitHub Pages
2. Visita la página desde un dispositivo móvil
3. Deberías ver un banner o una opción para instalar la aplicación
4. También puedes usar el botón de instalación que aparece en la esquina inferior derecha

## Cómo probar localmente

Para probar la PWA localmente, puedes usar un servidor local como:

```bash
# Si tienes Python instalado
python -m http.server 8000

# Si tienes Node.js instalado
npx serve
```

Luego visita `http://localhost:8000` en tu navegador.

Nota: Algunas características de PWA como la instalación pueden requerir HTTPS incluso en desarrollo. Puedes usar herramientas como [ngrok](https://ngrok.com/) para crear un túnel HTTPS a tu servidor local. 