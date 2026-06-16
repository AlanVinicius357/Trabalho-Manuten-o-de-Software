# 1. Usa uma imagem oficial estável e leve do Node.js
FROM node:20-alpine

# 2. Define a pasta de trabalho onde o código vai rodar dentro do container
WORKDIR /usr/src/app

# 3. Copia os arquivos de dependências primeiro (ajuda a deixar o build mais rápido)
COPY package*.json ./

# 4. Instala as dependências do projeto
RUN npm install

# 5. Copia todo o restante do código do backend para dentro do container
COPY . .

# 6. Informa ao Docker que o container vai rodar na porta 3000
EXPOSE 3000

# 7. Comando para iniciar a aplicação (ajuste 'app.js' se o arquivo principal tiver outro nome)
CMD ["node", "app.js"]