ejecutar npm init -y para iniciar nuestro proyecto node

luego
Instalar expres dentro de visual code en nuestra carpeta
npm i express

y ya empezamos a trabajar

para ejecutar node index.js
nodemon index.js // utilizar promt si usamos vscode

instalar nodemon de forma global
usar cmd como administrador y dentro d ela ruta del proyecto
npm i -g nodemon

para puertos dinamicos
npm i dotenv

agregar lo siguiente en package.json
 "start":"node index.js",
 "start:dev":"nodemon index.js"

ddentro de scripts:

luego podemos usar npm start y corre la aplicacion
y para desarrollo npm run start:dev


