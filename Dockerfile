# Använder Node.js 18 som bas-image
FROM node:18-alpine

# Skapar en arbetsmapp i containern
WORKDIR /app

# Kopierar package.json och package-lock.json för att installera beroenden
COPY package*.json ./

# Installerar beroenden
RUN npm install

# Kopierar resten av applikationens kod
COPY . .

# Exponerar port 3000
EXPOSE 3000

# Definierar kommandot som körs när containern startar
CMD ["npm", "start"] 