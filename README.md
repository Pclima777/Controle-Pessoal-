# 💰 Controle Financeiro Pessoal

Uma aplicação web interativa para gerenciar suas receitas, despesas e projeções financeiras. Totalmente editável em tempo real!

## 🚀 Como Abrir a Aplicação

### **Opção 1: Abrir direto no navegador (Mais simples)**

1. Navegue até a pasta do projeto
2. Clique duas vezes no arquivo `index.html`
3. A aplicação abrirá no seu navegador padrão

### **Opção 2: Usar Python (Recomendado)**

```bash
# Na pasta do projeto, execute:
python3 -m http.server 8000

# Depois acesse no navegador:
# http://localhost:8000
```

### **Opção 3: Usar Node.js**

```bash
npx http-server
# Acesse: http://localhost:8080
```

---

## 📊 Funcionalidades

### **Dashboard** 📊
- Resumo financeiro em tempo real
- Receita total do mês
- Despesa total do mês
- Saldo mensal
- Projeção anual

### **Receitas** 📥
- Gerenciar inquilinos e salários
- **Editar em tempo real**: nome, valor, dia de pagamento
- Adicionar novos inquilinos
- Deletar receitas
- Inclusos: Gio, Maria Luiza, De Motos, Aparecida, Rafael, Vitão, Adriana

### **Despesas** 📤
- Controlar todas as contas a pagar
- **Editar em tempo real**: descrição, valor, dia, categoria
- Adicionar novas despesas
- Deletar despesas
- Pré-carregadas com seus dados: Faculdade, Internet, Luz, etc.

### **Vendas Loja Vape** 🏪
- Registrar vendas diárias
- **Editar em tempo real**: data, produto, valor compra/venda, cliente
- Filtro por mês/ano
- Cálculo automático de lucro
- Totais: vendas, lucro, média por venda, quantidade

### **Projeções** 📈
- Projeção mensal de receitas e despesas
- Saldo projetado por mês
- Saldo acumulado
- Selecionável por ano (2026, 2027, 2028)

### **Relatórios** 📋
- Receita anual projetada
- Despesa anual projetada
- Lucro anual
- Composição de receita (Aluguéis, Salário, Loja)
- Percentuais de cada fonte

---

## 💾 Dados Persistem Automaticamente

Todos os dados são salvos automaticamente no **LocalStorage** do seu navegador:
- Não precisa salvar manualmente
- Os dados permanecem mesmo após fechar o navegador
- Funciona offline

---

## 📋 Dados Pré-carregados

### **Receitas Fixas (Inquilinos)**
| Inquilino | Valor | Dia |
|-----------|-------|-----|
| Gio (Salário) | R$ 1.000,00 | 5 |
| Maria Luiza | R$ 750,00 | 10 |
| De Motos | R$ 3.450,00 | 10 |
| Aparecida | R$ 850,00 | 15 |
| Rafael | R$ 800,00 | 20 |
| Vitão | R$ 1.100,00 | 22 |
| Adriana | R$ 850,00 | 30 |

**Total: R$ 7.800,00/mês**

### **Despesas Principais**
| Descrição | Valor | Dia |
|-----------|-------|-----|
| Faculdade | R$ 2.600,00 | 5 |
| Vivo | R$ 85,00 | 10 |
| Internet BH | R$ 100,00 | 15 |
| Conta de Luz | R$ 250,00 | 20 |
| Condomínio | R$ 500,00 | 10 |
| Cartões | ~R$ 7.900,00 | Diversos |

---

## 🎯 Como Usar

### **Editar Receitas/Despesas**
1. Vá para aba **Receitas** ou **Despesas**
2. Clique nos campos para editar
3. As mudanças são salvas automaticamente

### **Registrar Venda**
1. Vá para aba **Vendas Loja**
2. Clique em "+ Registrar Venda"
3. Preencha: Data, Produto, Valor Compra, Valor Venda, Cliente
4. O lucro é calculado automaticamente

### **Ver Projeções**
1. Vá para aba **Projeções**
2. Selecione o ano desejado
3. Veja a receita, despesa e saldo de cada mês

### **Analisar Relatórios**
1. Vá para aba **Relatórios**
2. Veja o resumo anual
3. Analise a composição de receita

---

## 🔧 Tecnologias Usadas

- **HTML5** - Estrutura
- **CSS3** - Estilização (Gradientes, Grid, Flexbox)
- **JavaScript Puro** - Sem dependências externas
- **LocalStorage** - Persistência de dados
- **Design Responsivo** - Funciona em desktop e mobile

---

## 📱 Compatibilidade

- ✅ Chrome/Edge/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Qualquer navegador moderno com suporte a LocalStorage

---

## 🚧 Funcionalidades Futuras

- [ ] Gráficos interativos com Chart.js
- [ ] Exportação para Excel
- [ ] Importação de dados da planilha
- [ ] Backup em nuvem
- [ ] App mobile
- [ ] Notificações de pagamentos
- [ ] Relatórios em PDF

---

## 💡 Dicas

1. **Backup seus dados**: Você pode exportar os dados do LocalStorage periodicamente
2. **Adicione mais vendas**: Quanto mais dados, melhor a projeção
3. **Atualize regularmente**: Mantenha os dados sempre atualizados
4. **Teste as edições**: Todos os campos são editáveis em tempo real

---

## 📞 Suporte

Se encontrar qualquer problema:
1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Tente em outro navegador
3. Certifique-se que o JavaScript está habilitado

---

**Desenvolvido com ❤️ para seu controle financeiro pessoal**
