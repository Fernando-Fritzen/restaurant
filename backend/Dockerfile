# Use a imagem base que tenha suporte a apt-get (por exemplo, uma imagem base do Node.js)
FROM node:lts-buster-slim AS development

# Etapa de desenvolvimento
WORKDIR /usr/src/app

# Copie os arquivos de manifesto de pacote e instale as dependências
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm i

# Copie o restante dos arquivos da aplicação
COPY . /usr/src/app

# Exponha a porta 3001
EXPOSE 3001

# Comando para iniciar sua aplicação (por exemplo, node.js)
CMD [ "npm", "run", "dev"]

# Crie uma nova etapa para configurações de desenvolvimento
FROM development AS dev-envs

# Instale o Git e outras ferramentas
RUN apt-get update && apt-get install -y --no-install-recommends git

# Crie um novo usuário e grupo
RUN useradd -s /bin/bash -m vscode
RUN groupadd docker
RUN usermod -aG docker vscode
