# 🚀 Guia de Deployment - Gerenciador de Projetos com Firebase

## Visão Geral

Sua aplicação de gerenciamento de projetos está pronta para ser publicada na internet usando **Firebase Hosting** + **Firebase Firestore**. Isso permite que qualquer pessoa acesse a aplicação e todos vejam os mesmos dados em tempo real.

## ✨ Funcionalidades Implementadas

- ✅ **Dados Compartilhados em Tempo Real:** Todos os usuários veem os mesmos dados sincronizados via Firebase Firestore
- ✅ **5 Colunas de Status:** Recebidos, Iniciado, Em Andamento, Finalizado, Enviado para Impressão
- ✅ **Gerenciamento de Clientes:** Adicione clientes e organize projetos por cliente
- ✅ **Campos Customizáveis:** Título, Responsável, Quantidade de Fotos
- ✅ **Edição de Projetos:** Edite qualquer projeto com um clique
- ✅ **Ordenação Alfabética:** Clientes organizados em ordem A-Z
- ✅ **Interface Compacta e Profissional:** Design otimizado com Tailwind CSS

## 📋 Pré-requisitos

Para fazer o deployment, você precisa de:

1. **Conta Google** (gratuita)
2. **Firebase CLI** instalado no seu computador

## 🔧 Passos para Fazer o Deployment

### 1. Criar uma Conta Firebase (Se não tiver)

1. Acesse [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Digite o nome do projeto: `gerenciador-projetos`
4. Siga as instruções para criar o projeto

### 2. Instalar Firebase CLI

Abra o terminal e execute:

```bash
npm install -g firebase-tools
```

### 3. Fazer Login no Firebase

```bash
firebase login
```

Isso abrirá uma janela do navegador para você fazer login com sua conta Google.

### 4. Inicializar Firebase no Projeto

Na pasta do projeto (`/home/ubuntu/gerenciador-projetos`), execute:

```bash
firebase init
```

Quando perguntado:
- **Selecione "Hosting"** (use espaço para selecionar)
- **Selecione "Firestore"** (use espaço para selecionar)
- Pressione Enter para continuar

### 5. Configurar Firestore

1. Acesse [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Selecione seu projeto
3. No menu esquerdo, clique em **"Firestore Database"**
4. Clique em **"Criar banco de dados"**
5. Selecione **"Iniciar no modo de teste"** (para desenvolvimento)
6. Selecione a localização mais próxima
7. Clique em **"Criar"**

### 6. Fazer o Build da Aplicação

```bash
cd /home/ubuntu/gerenciador-projetos
pnpm run build
```

### 7. Fazer o Deploy

```bash
firebase deploy
```

Após alguns segundos, você verá uma mensagem com a URL da sua aplicação. Exemplo:

```
Hosting URL: https://gerenciador-projetos-demo.web.app
```

## 🌐 Acessar a Aplicação

Após o deployment, qualquer pessoa pode acessar a aplicação usando a URL fornecida pelo Firebase.

## 🔐 Segurança do Firestore

**IMPORTANTE:** O Firestore está configurado em "modo de teste", o que significa que qualquer pessoa pode ler e escrever dados. Para produção, você deve configurar regras de segurança.

### Configurar Regras de Segurança (Recomendado)

1. Acesse [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Vá para **Firestore Database** → **Regras**
4. Substitua o conteúdo pelas regras abaixo:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública
    match /{document=**} {
      allow read: if true;
      allow write: if true;  // Para desenvolvimento
      // Para produção, adicione autenticação aqui
    }
  }
}
```

5. Clique em **"Publicar"**

## 📝 Variáveis de Ambiente

A aplicação usa as seguintes variáveis de ambiente (já configuradas):

- `VITE_FIREBASE_API_KEY`: Chave de API do Firebase
- `VITE_FIREBASE_AUTH_DOMAIN`: Domínio de autenticação
- `VITE_FIREBASE_PROJECT_ID`: ID do projeto Firebase
- `VITE_FIREBASE_STORAGE_BUCKET`: Bucket de armazenamento
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: ID do remetente de mensagens
- `VITE_FIREBASE_APP_ID`: ID da aplicação

## 🆘 Troubleshooting

### Erro: "Firebase CLI not found"

Instale o Firebase CLI:
```bash
npm install -g firebase-tools
```

### Erro: "Permission denied"

Certifique-se de que você está logado no Firebase:
```bash
firebase login
```

### Erro: "Firestore not initialized"

Verifique se o Firestore foi criado no console do Firebase.

## 📞 Suporte

Para mais informações, consulte:
- [Documentação do Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Documentação do Firebase Firestore](https://firebase.google.com/docs/firestore)

---

**Sua aplicação está pronta para ser publicada!** 🎉

