# API con GraphQL sin cliente

Desarrollo de APIs básica con GraphQL (queries, mutations, types, interface y union) para hacer CRUD en colecciones de Mongo Atlas.

Para realizar una búsqueda en los documentos de Mongo es necesario crear un indice:
`db.courses.createIndex({"$**": "text"})`

```
"$**": permitira crear un indice sobre cualquier campo del documento
"text": nombre del indice
```
