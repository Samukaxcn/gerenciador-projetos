# 📊 Gerenciador de Projetos com Supabase

Um aplicativo web moderno para gerenciar projetos e clientes com sincronização em tempo real.

## 🌐 Acesso Rápido

**[Acessar a aplicação →](https://gerenciador-projetos-f8bw.vercel.app)**

---

## ✨ Funcionalidades

### 👥 Gerenciamento de Clientes
- ✅ Adicionar novos clientes
- ✅ Listar clientes em ordem alfabética
- ✅ Deletar clientes (e seus projetos associados)
- ✅ Sincronização em tempo real

### 📋 Gerenciamento de Projetos
- ✅ Criar projetos associados a clientes
- ✅ Editar informações do projeto
- ✅ Mover projetos entre 5 status diferentes
- ✅ Reordenar projetos (drag & drop)
- ✅ Deletar projetos
- ✅ Sincronização em tempo real

### 🎯 Status de Projetos
1. **Recebidos** - Projeto recém-criado
2. **Iniciado** - Trabalho começou
3. **Em Andamento** - Processamento em progresso
4. **Finalizado** - Trabalho concluído
5. **Enviado para Impressão** - Pronto para impressão

### 🎨 Interface
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Tema claro/escuro
- ✅ Componentes modernos com shadcn/ui
- ✅ Notificações de sucesso/erro
- ✅ Sincronização em tempo real

---

## 🚀 Como Usar

### 1. Adicionar um Cliente

1. Clique em **"Adicionar Cliente"**
2. Digite o nome do cliente
3. Clique em **"Adicionar"**

O cliente aparecerá na lista em ordem alfabética.

### 2. Adicionar um Projeto

1. Clique em **"Adicionar Projeto"** dentro de um cliente
2. Preencha os campos:
   - **Título:** Nome do projeto
   - **Tipo:** Tipo de trabalho
   - **Responsável:** Pessoa responsável
   - **Quantidade de Fotos:** Número de fotos
3. Clique em **"Adicionar"**

O projeto será criado no status **"Recebidos"**.

### 3. Mover Projeto Entre Status

Clique e arraste o projeto para a coluna desejada:
- Recebidos → Iniciado → Em Andamento → Finalizado → Enviado para Impressão

### 4. Editar Projeto

1. Clique no projeto
2. Edite os campos desejados
3. Clique em **"Salvar"**

### 5. Deletar Projeto

1. Clique no ícone de lixeira no projeto
2. Confirme a deleção

### 6. Deletar Cliente

1. Clique no ícone de lixeira no cliente
2. Confirme a deleção (todos os projetos serão deletados)

---

## 💻 Desenvolvimento Local

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/Samukaxcn/gerenciador-projetos.git
cd gerenciador-projetos

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
pnpm run build
```

O build será gerado em `dist/public/`

---

## 🏗️ Arquitetura

### Frontend
- **React 19** - Framework UI
- **Vite** - Build tool
- **TypeScript** - Linguagem tipada
- **Tailwind CSS** - Estilos
- **shadcn/ui** - Componentes

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Banco de dados
- **Realtime** - Sincronização em tempo real

### Hosting
- **Vercel** - Hospedagem frontend
- **Supabase** - Hospedagem backend

---

## 🔧 Configuração

### Variáveis de Ambiente

As credenciais do Supabase estão em `client/src/lib/supabase.ts`:

```typescript
const supabaseUrl = 'https://hweyxnxxjctwuqkztgnb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

Para usar suas próprias credenciais:
1. Crie um projeto no [Supabase](https://supabase.com)
2. Copie a URL e Anon Key
3. Atualize os valores em `client/src/lib/supabase.ts`

---

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

---

## 🔒 Segurança

- ✅ HTTPS automático no Vercel
- ✅ Row Level Security (RLS) no Supabase
- ✅ Validação de entrada no frontend
- ✅ Sem armazenamento de senhas localmente

> **Nota:** Para produção, recomenda-se implementar autenticação e políticas RLS mais restritivas.

---

## 📊 Performance

- ⚡ Sincronização em tempo real com Supabase
- ⚡ Build otimizado com Vite
- ⚡ Componentes lazy-loaded
- ⚡ Imagens otimizadas

---

## 🐛 Troubleshooting

### Dados não aparecem
- Verifique a conexão com Supabase
- Abra o console (F12) e procure por erros
- Verifique se as tabelas foram criadas

### Aplicação lenta
- Verifique a conexão de internet
- Limpe o cache do navegador
- Verifique os logs do Vercel

### Erro ao adicionar cliente/projeto
- Verifique se o nome do cliente é único
- Verifique se todos os campos estão preenchidos
- Verifique a conexão com Supabase

---

## 📚 Documentação

- [Documentação de Deployment](./DEPLOYMENT.md)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)

---

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

## 🙋 Suporte

Para dúvidas ou problemas:
1. Verifique a [documentação de deployment](./DEPLOYMENT.md)
2. Abra uma issue no GitHub
3. Entre em contato com o suporte

---

## 🎉 Créditos

Desenvolvido com ❤️ usando React, Supabase e Vercel.

**Última atualização:** 06 de Novembro de 2025
