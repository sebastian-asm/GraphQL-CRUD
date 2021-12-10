Para realizar una búsqueda en MongoDB es necesario crear un indice:
`db.courses.createIndex({"$**": "text"})`

```
"$**": permitira crear un indice sobre cualquier campo
"text": nombre del indice
```
