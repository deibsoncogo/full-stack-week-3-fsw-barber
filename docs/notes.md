para criar o diagrama utilizamos este site
https://app.diagrams.net/

comando utilizado para criar os arquivos base do projeto
npx create-next-app@latest

para instalar o Prisma utilizamos este comando
npm install prisma --save-dev

comando para definir o provedor do banco de dados
npx prisma init --datasource-provider postgresql

vamos utilizar o Super Base como banco de dados online
vNo7VOTMMHsSoi7q

comando para criar as migrations pendente
npx prisma migrate dev --name create tables

comando para executar o seed depois de finalizar sua configuração
npx prisma db seed

comando utilizado para instalar o Shadcn/UI
npx shadcn-ui@latest init

  √ Which style would you like to use? » Default
  √ Which color would you like to use as base color? » Slate
  √ Would you like to use CSS variables for colors? ... no / yes

comando utilizado para criar adicionar os componentes do Shadcn/UI
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

para lidar com as datas vamos utilizar o Date FNS
npm i date-fns

para criar a autenticação vamos utilizar o Next Auth
npm i next-auth
npm i @auth/prisma-adapter
