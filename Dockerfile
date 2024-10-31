# Etapa 1: Usar uma imagem base com Node.js e TypeScript
FROM node:18 AS builder

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o arquivo de dependências para o contêiner
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Compilar o TypeScript para JavaScript
RUN npm run build

# Etapa 2: Configurar o ambiente de produção
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar apenas os arquivos compilados da etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalar apenas as dependências de produção
RUN npm install --only=production

# Expôr a porta usada pela aplicação
EXPOSE 3000

# Definir a variável de ambiente para produção
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]
