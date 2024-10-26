# Use a imagem base que tenha suporte a apt-get (por exemplo, uma imagem base do Node.js)
FROM node:lts-buster-slim AS development

# Etapa de desenvolvimento
WORKDIR /app

# Copie os arquivos de manifesto de pacote e instale as dependências
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm i

# Copie o restante dos arquivos da aplicação
COPY . /app

RUN npm run build

# Exponha a porta 3001
EXPOSE 3001

# Comando para iniciar sua aplicação (por exemplo, node.js)
CMD [ "npm", "run", "start"]
