# 4PPE_BCNC
 API en Node.js para prueba técnica


Se han realizado los siguientes endpoints 

Obtener todos los usuarios
Obtener un único usuario
Obtener todas las viviendas de un usuario
Obtener todas las viviendas de un usuario aplicando los filtros opcionales de ciudad, calle, país
Crear usuarios
Actualizar usuarios parcialmente
Actualizar usuarios por completo
Crear, borrar, actualizar viviendas de un usuario.
Borrar usuarios, debería dar error si tiene viviendas sin borrar


Se han utilizado los verbos Http indicados para cada caso de uso siguiendo los estándares para una comprensión rápida de los endpoints.
Se ha decidido utilizar pathParams para filtrados obligatorios, query params para filtrados comunes y en los casos de una cantidad de filtros relevante o información “sensible” se ha decidido enviar mediante el body ya que este está encriptado.
Para las respuestas, se ha enviado todo siguiendo el estándar json y los códigos http normales para caso.

El desarrollo se ha realizado en VScode con la finalidad de usar el debugger en los momentos necesarios. haciendo pruebas con postman.
Se ha decidido no introducir ninguna BBDD dada la finalidad de la prueba, pero se han dejado abstraídas y separadas las operaciones en un fichero que seria necesario modificar en el caso de querer añadirla. Mi opción preferida en ese caso sería MongoDB.
Otro de los cambios que yo añadiría seria meter autorización por jwt pero para ello seria necesario un endpoint de iniciar sesión y modificar todos los endpoints sensibles de información de este test.
