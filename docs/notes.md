para criar o diagrama utilizamos este site
```
https://app.diagrams.net/
```

comando utilizado para criar os arquivos base do projeto
```bash
npx create-next-app@latest
```

para instalar o Prisma utilizamos este comando
```bash
npm install prisma --save-dev
```

comando para definir o provedor do banco de dados
```bash
npx prisma init --datasource-provider postgresql
```

vamos utilizar o Super Base como banco de dados online

comando para criar as migrations pendente
```bash
npx prisma migrate dev --name create tables
```

comando para executar o seed depois de finalizar sua configuração
```bash
npx prisma db seed
```

comando utilizado para instalar o Shadcn/UI
```bash
npx shadcn-ui@latest init
```
```
√ Which style would you like to use? » Default
√ Which color would you like to use as base color? » Slate
√ Would you like to use CSS variables for colors? ... no / yes
```

comando utilizado para criar adicionar os componentes do Shadcn/UI
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add sonner
npx shadcn-ui@latest add alert-dialog
npx shadcn-ui@latest add form
```

para lidar com as datas vamos utilizar o Date FNS
```bash
npm i date-fns
```

para criar a autenticação vamos utilizar o Next Auth
```bash
npm i next-auth @auth/prisma-adapter
```
