## Following Code with Antonios Tutorial: Trello Clone 

## TODO: 
- [ ] Prisma + MySQL Docker setup
- [ ] Server Actions Setup
- [ ] Custom ts hooks 
- [ ] Board Server / Page segments 

## Using... 
* Next.JS
* Clerk Auth
* Prisma 
* ShadCN UI

### Notes / Links for Prisma setup 
Make sure to add DB URL in .env
* [Walk-through vid](https://www.youtube.com/watch?v=CORQo5rooX8)  
* [Prisma Docs](https://v1.prisma.io/docs/1.34/prisma-server/local-prisma-setup-je3i/) 
* [MySQL + Docker Setup Vid](https://www.youtube.com/watch?v=U0paw01g_KU)  

/// From the CLI 
Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
  
