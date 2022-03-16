# Next.js OpenJira App

* Para reconstruir los módulos de node, ejecutar el comando:
```
npm install
```

* Para iniciar la app en modo desarrollo, ejecutar:
```
npm run dev
```

Para correr la app localmente se necesita la base de datos.

```
docker-compose up -d
```

* El -d significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesDB
```

## Configurar las variables de entorno
Renombrar el archivo __.env.example__ a __.env__

##LLenar la base de datos con información de pruebas al endpoint:
```
http://localhost:3000/api/seed
```