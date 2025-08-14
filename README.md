# Dashboard de Atendimentos

Dashboard profissional para monitoramento de atendimentos em tempo real.

## 🚀 Como executar

### 1. Instalar dependências
\`\`\`bash
npm install
\`\`\`

### 2. Executar em modo desenvolvimento
\`\`\`bash
npm run dev
\`\`\`

### 3. Abrir no navegador
\`\`\`
http://localhost:3000
\`\`\`

## 📦 Tecnologias utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **shadcn/ui** - Componentes UI

## 🎯 Funcionalidades

- ✅ Dashboard em tempo real
- ✅ Métricas animadas
- ✅ Gráfico de atendimentos por hora
- ✅ Ranking de performance
- ✅ Status da equipe
- ✅ Alertas em tempo real
- ✅ Design responsivo
- ✅ Tema azul escuro profissional

## 📁 Estrutura do projeto

\`\`\`
dashboard-atendimentos/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       └── card.tsx
├── lib/
│   └── utils.ts
├── dashboard.tsx
├── package.json
└── README.md
\`\`\`

## 🛠️ Scripts disponíveis

- `npm run dev` - Executar em desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Executar build de produção
- `npm run lint` - Verificar código

## 📝 Personalização

Para personalizar o dashboard, edite o arquivo `dashboard.tsx` e modifique:

- Dados dos atendentes
- Estatísticas
- Cores do tema
- Layout dos componentes

## 🚀 Deploy

O projeto está pronto para deploy no Vercel, Netlify ou qualquer plataforma que suporte Next.js.
\`\`\`

```text file=".gitignore"
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
