#Next.js TesloShop App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__ 

## Configurar las variables de entorno
Renombrar el archivo _.env.template_ a _.env_
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

*Reconstruir los módulos de node y levantar Next
```
npm install
npm run dev
```

## Llenar la base de datos con información de pruebas


Llamarla: 
```
http://localhost:3000/api/seed
```