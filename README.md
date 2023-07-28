CREACION DE APPS CON IONIC

Comandos basicos de ionic:

Instalar ionic desde la pagina con el comando de npm: npm i -g @ionic/cli
Crear app de ionic y seleccionar preferencias de creacion: ionic start nombre-app
Levantar proyecto: ionic serve
Crear componentes/paginas/etc: ionic g page pages/auth
Instalar firebase para autenticación:

Instalar capacitor: npm install @capacitor/cli@latest @capacitor/core@latest -> npm install @capacitor/android -> npx cap init

Instalar android studio

Comprimir aplicacion: ionic build

Convertir a android: npx cap add android / npx cap open android

convertir apk en android studio: build > build apk

Editar icono de app android: abrir proyecto, buscar carpeta "res", click derecho en la carpeta y seleccionar new -> image asset, agregar y editar icono y fondo
