# Coink-Test-2021

La web-app se desarrollo en Angular 9 con Node 10.22, se debe hacer npm install y ng serve para ejcutar el proyecto localmente.

### Login
- El login pide el email del usuario(pruebatest@yopmail.com) y contrasena(pwdTest123#), el boton de ingresar no se activa hasta que estos campos hayan sido llenados.
- Una vez se haya ingresado en la ventana de factor de doble autenticacion el codigo es `123456`, otro valor presentara error.

### Menu
- Aqui se realiza las peticion al api de compras donde la respuesta para items es null, entonces asigno manualmente unos items que se encuentran en el archivo `constans.ts`, se desarrollo la caracteristica de cerrar sesion y el paginador

### Pendientes

- Conociendo los parametros corrector para filtros y fechas enlazar los valores del formulario con la peticion.
