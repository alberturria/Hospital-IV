---
title: Hospital IV
repository: https://github.com/alberturria/Hospital-IV
---

# SERVICIO WEB PARA UN CENTRO DE SALUD

En este repositorio desarrollaremos un servicio que permita gestionar citas en un determinado centro de salud.

Cabe destacar que la base de dicho proyecto ha sido realizada sobre una página web desarrollada junto a Francisco Coca Cruz y
Joaquín León Martínez.

A continuación muestro un pequeño resumen del estado actual.

## FRONT-END PART

[Template usado](http://www.templatemo.com/tm-488-classic)


## BACK-END PART

La página web ha sido subida a [Heroku](https://polimi-hyp-2018-team-10623424.herokuapp.com/).


NOTA: El servidor de Heroku no muestra todos los eventos cargados en la tabla llamada 'eventos' (solo muestra 2 de los 5). Al testear la página en un local host funciona correctamente.


### Descripción de la REST API:

* /locations/:id (:id = Identificador de la localización en la DB)

* /locations (Obtiene la lista de localizaciones de la DB)

* /news (Obtiene la lista de noticias de la DB)

* /services (Obtiene la lista de servicios de la DB)

* /services/:id (:id = Identificador del servicio en la DB)

* /people (Obtiene la lista de personas de la DB)

* /people/numberPeople (Obtiene el número de personas de la DB)

* /people/:id (:id = Identificador de la persona de la DB)

* /events (Obtiene la lista de eventos de la DB)

* /events/:id (:id = Identificador de la persona en la DB)

* /locations/:id_l/services (:id_l = Identificador de la localización en la DB, obtiene el servicio localizado en id_l )

* /services/:id_s/locations (:id_s = Identificador del servicio en la DB, obtiene las localizaciones en las cuales el servicio id_s toma lugar)

* /people/:id_p/services (:id_p = Identificador de la persona en la DB, obtiene los servicios en los cuales la persona id_p participa)

* /services/:id_s/people (:id_s = Identificador del servicio en la DB, obtiene las personas que participan en el servicio id_s)
