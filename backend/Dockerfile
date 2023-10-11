# Use a imagem oficial do Node.js como imagem base
FROM node:14

# Crie um diretório de trabalho na imagem
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o código-fonte da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação vai escutar
EXPOSE 3001

# Comando para iniciar a aplicação
CMD [ "node", "app.js" ]