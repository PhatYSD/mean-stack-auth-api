# MERN Stack authentication api

This is a mini project for learn.

- [MERN Stack authentication api](#mern-stack-authentication-api)
  - [Setup](#setup)
  - [Folder Structure](#folder-structure)

## Setup

1. **Init NPM**
   ```bash
   npm init -y
   ```

2. **Install Package follow this**
   ```json
   {
        "devDependencies": {
            "@types/bcrypt": "^5.0.2",
            "@types/cors": "^2.8.17",
            "@types/express": "^4.17.21",
            "@types/jsonwebtoken": "^9.0.5",
            "@types/mongoose": "^5.11.97",
            "@types/morgan": "^1.9.9",
            "@types/node": "^20.10.6",
            "nodemon": "^3.0.2",
            "typescript": "^5.3.3",
            "ts-node": "^10.9.2"
        },
        "dependencies": {
            "bcrypt": "^5.1.1",
            "cors": "^2.8.5",
            "dotenv": "^16.3.1",
            "envalid": "^8.0.0",
            "express": "^4.18.2",
            "express-validator": "^7.0.1",
            "jsonwebtoken": "^9.0.2",
            "mongoose": "^8.0.3",
            "morgan": "^1.10.0"
        }
   }
   ```
   ```bash
   npm install express express-validator bcrypt cors dotenv envalid jsonwebtoken mongoose morgan
   npm install --save-dev typescript nodemon ts-node @types/node @types/morgan @types/mongoose @types/jsonwebtoken @types/express @types/cors @types/bcrypt
   ```

3. **Init Typescript**
    ```bash
    npx tsc --init
    ```

4. **Set `tsconfig.json` follow this**
    ```json
    {
        "compilerOptions": {
            "target": "ES6",
            "module": "commonjs",
            "rootDir": "./src", // Coding in ./src
            "outDir": "./dist", // Build file is here.
            "esModuleInterop": true, 
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "skipLibCheck": true
        },
        "include": ["src/**/*.ts"],
        "exclude": ["node_mondules"]
    }
    ```
5. **Finish Setup project Typescript**

## Folder Structure
    server/
        src/
            controllers/
            middlerwares/
            models/
            routers/
            utils/
            index.ts
            app.ts
        .env
        .package.json
        .tsconfig.json
        .package-lock.json

    Note: Adjust the folder structure section to accurately represent your project's structure. The provided structure is just an example.