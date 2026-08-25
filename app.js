// ===== ESTRUTURA DE DADOS =====
let dadosFinanceiros = {
    receitas: [],
    despesas: [],
    vendas: []
};

// Meses para referência
const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    carregarDados();
    inicializarData();
    atualizarDashboard();
    renderReceipts();
    renderExpenses();
    renderVendas();
});

// ===== FUNÇÕES DE ARMAZENAMENTO =====
function carregarDados() {
    const dados = localStorage.getItem('financeiro');
    if (dados) {
        dadosFinanceiros = JSON.parse(dados);
    } else {
        carregarDadosInicial();
    }
}

function salvarDados() {
    localStorage.setItem('financeiro', JSON.stringify(dadosFinanceiros));
}

function carregarDadosInicial() {
    // Receitas iniciais (baseadas na sua planilha)
    dadosFinanceiros.receitas = [
        { id: 1, nome: 'Gio (Salário)', valor: 1000, dia: 5, tipo: 'fixa' },
        { id: 2, nome: 'Maria Luiza', valor: 750, dia: 10, tipo: 'aluguel' },
        { id: 3, nome: 'De Motos', valor: 3450, dia: 10, tipo: 'aluguel' },
        { id: 4, nome: 'Aparecida', valor: 850, dia: 15, tipo: 'aluguel' },
        { id: 5, nome: 'Rafael', valor: 800, dia: 20, tipo: 'aluguel' },
        { id: 6, nome: 'Vitão', valor: 1100, dia: 22, tipo: 'aluguel' },
        { id: 7, nome: 'Adriana', valor: 850, dia: 30, tipo: 'aluguel' }
    ];

    // Despesas iniciais (resumidas da sua planilha CONTROLE)
    dadosFinanceiros.despesas = [
        { id: 1, descricao: 'Faculdade', valor: 2600, dia: 5, categoria: 'Educação' },
        { id: 2, descricao: 'Vivo (Celular)', valor: 85, dia: 10, categoria: 'Telecom' },
        { id: 3, descricao: 'Internet BH', valor: 100, dia: 15, categoria: 'Telecom' },
        { id: 4, descricao: 'Conta de Luz', valor: 250, dia: 20, categoria: 'Utilidades' },
        { id: 5, descricao: 'Condomínio', valor: 500, dia: 10, categoria: 'Habitação' },
        { id: 6, descricao: 'IPTU', valor: 100, dia: 15, categoria: 'Impostos' },
        { id: 7, descricao: 'Seguro', valor: 210, dia: 25, categoria: 'Seguros' },
        { id: 8, descricao: 'Cartão Nubank', valor: 2000, dia: 5, categoria: 'Cartão' },
        { id: 9, descricao: 'Cartão Bradesco', valor: 3500, dia: 10, categoria: 'Cartão' },
        { id: 10, descricao: 'Cartão Sicoob', valor: 2400, dia: 15, categoria: 'Cartão' }
    ];

    // Vendas iniciais (exemplo)
    dadosFinanceiros.vendas = [];

    salvarDados();
}

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function openTab(evt, tabName) {
    const tabcontent = document.querySelectorAll('.tab-content');
    tabcontent.forEach(tab => tab.classList.remove('active'));

    const tabbuttons = document.querySelectorAll('.tab-button');
    tabbuttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');

    if (tabName === 'projections') {
        atualizarProjecoes();
    } else if (tabName === 'relatorios') {
        atualizarRelatorios();
    }
}

// ===== DASHBOARD =====
function atualizarDashboard() {
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();

    // Calcular receitas do mês
    const totalReceitaMes = calcularReceitaMes(mesAtual);
    const totalDespesaMes = calcularDespesaMes(mesAtual);
    const saldo = totalReceitaMes - totalDespesaMes;

    // Receita fixa mensal
    const receitaFixa = dadosFinanceiros.receitas
        .reduce((sum, r) => sum + r.valor, 0);

    // Média de vendas (fictícia por enquanto)
    const mediaVendas = 3800; // Baseado na planilha

    document.getElementById('totalReceitaMes').textContent = formatarMoeda(totalReceitaMes);
    document.getElementById('totalDespesaMes').textContent = formatarMoeda(totalDespesaMes);
    document.getElementById('saldoMes').textContent = formatarMoeda(saldo);
    document.getElementById('receitaFixaMensal').textContent = formatarMoeda(receitaFixa);
    document.getElementById('receitaLojaMedia').textContent = formatarMoeda(mediaVendas);
    document.getElementById('projecaoAnual').textContent = formatarMoeda((receitaFixa + mediaVendas) * 12);
}

function calcularReceitaMes(mes) {
    const vendaDocumento = dadosFinanceiros.vendas
        .filter(v => new Date(v.data).getMonth() + 1 === mes)
        .reduce((sum, v) => sum + v.valorVenda, 0);

    const receitaFixa = dadosFinanceiros.receitas
        .reduce((sum, r) => sum + r.valor, 0);

    const mediaVendas = 3800 * (mes <= 12 ? 1 : 0);

    return receitaFixa + mediaVendas + vendaDocumento;
}

function calcularDespesaMes(mes) {
    return dadosFinanceiros.despesas
        .reduce((sum, d) => sum + d.valor, 0);
}

// ===== RECEITAS - INQUILINOS =====
function renderReceipts() {
    const tbody = document.getElementById('receitasBody');
    tbody.innerHTML = '';

    dadosFinanceiros.receitas.forEach(receita => {
        const row = document.createElement('tr');
        row.className = 'edit-row';
        row.innerHTML = `
            <td><input type="text" value="${receita.nome}" onchange="editarReceita(${receita.id}, 'nome', this.value)"></td>
            <td><input type="number" value="${receita.valor}" onchange="editarReceita(${receita.id}, 'valor', parseFloat(this.value))" step="0.01"></td>
            <td><input type="number" value="${receita.dia}" min="1" max="31" onchange="editarReceita(${receita.id}, 'dia', parseInt(this.value))"></td>
            <td><span class="badge badge-fixed">${receita.tipo === 'aluguel' ? '🏠 Aluguel' : '💼 Salário'}</span></td>
            <td>
                <button class="btn btn-secondary btn-small" onclick="deletarReceita(${receita.id})">🗑️ Deletar</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    atualizarTotalReceitas();
}

function editarReceita(id, campo, valor) {
    const receita = dadosFinanceiros.receitas.find(r => r.id === id);
    if (receita) {
        receita[campo] = valor;
        salvarDados();
        renderReceipts();
        atualizarDashboard();
        mostrarSucesso('Receita atualizada com sucesso!', 'successMessage');
    }
}

function deletarReceita(id) {
    if (confirm('Tem certeza que deseja deletar esta receita?')) {
        dadosFinanceiros.receitas = dadosFinanceiros.receitas.filter(r => r.id !== id);
        salvarDados();
        renderReceipts();
        atualizarDashboard();
        mostrarSucesso('Receita deletada com sucesso!', 'successMessage');
    }
}

function showAddReceitaForm() {
    const nome = prompt('Nome do inquilino:');
    if (!nome) return;

    const valor = parseFloat(prompt('Valor (R$):'));
    if (isNaN(valor)) return;

    const dia = parseInt(prompt('Dia do pagamento (1-31):'));
    if (isNaN(dia) || dia < 1 || dia > 31) return;

    const novaReceita = {
        id: Math.max(...dadosFinanceiros.receitas.map(r => r.id), 0) + 1,
        nome,
        valor,
        dia,
        tipo: 'aluguel'
    };

    dadosFinanceiros.receitas.push(novaReceita);
    salvarDados();
    renderReceipts();
    atualizarDashboard();
    mostrarSucesso('Receita adicionada com sucesso!', 'successMessage');
}

function atualizarTotalReceitas() {
    const total = dadosFinanceiros.receitas.reduce((sum, r) => sum + r.valor, 0);
    document.getElementById('totalReceitaFixa').textContent = formatarMoeda(total);
}

// ===== DESPESAS =====
function renderExpenses() {
    const tbody = document.getElementById('despesasBody');
    tbody.innerHTML = '';

    dadosFinanceiros.despesas.forEach(despesa => {
        const row = document.createElement('tr');
        row.className = 'edit-row';
        row.innerHTML = `
            <td><input type="text" value="${despesa.descricao}" onchange="editarDespesa(${despesa.id}, 'descricao', this.value)"></td>
            <td><input type="number" value="${despesa.valor}" onchange="editarDespesa(${despesa.id}, 'valor', parseFloat(this.value))" step="0.01"></td>
            <td><input type="number" value="${despesa.dia}" min="1" max="31" onchange="editarDespesa(${despesa.id}, 'dia', parseInt(this.value))"></td>
            <td><input type="text" value="${despesa.categoria}" onchange="editarDespesa(${despesa.id}, 'categoria', this.value)"></td>
            <td>
                <button class="btn btn-secondary btn-small" onclick="deletarDespesa(${despesa.id})">🗑️ Deletar</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    atualizarTotalDespesas();
}

function editarDespesa(id, campo, valor) {
    const despesa = dadosFinanceiros.despesas.find(d => d.id === id);
    if (despesa) {
        despesa[campo] = valor;
        salvarDados();
        renderExpenses();
        atualizarDashboard();
        mostrarSucesso('Despesa atualizada com sucesso!', 'successMessage2');
    }
}

function deletarDespesa(id) {
    if (confirm('Tem certeza que deseja deletar esta despesa?')) {
        dadosFinanceiros.despesas = dadosFinanceiros.despesas.filter(d => d.id !== id);
        salvarDados();
        renderExpenses();
        atualizarDashboard();
        mostrarSucesso('Despesa deletada com sucesso!', 'successMessage2');
    }
}

function showAddDespesaForm() {
    const descricao = prompt('Descrição da despesa:');
    if (!descricao) return;

    const valor = parseFloat(prompt('Valor (R$):'));
    if (isNaN(valor)) return;

    const dia = parseInt(prompt('Dia do pagamento (1-31):'));
    if (isNaN(dia) || dia < 1 || dia > 31) return;

    const categoria = prompt('Categoria:');
    if (!categoria) return;

    const novaDespesa = {
        id: Math.max(...dadosFinanceiros.despesas.map(d => d.id), 0) + 1,
        descricao,
        valor,
        dia,
        categoria
    };

    dadosFinanceiros.despesas.push(novaDespesa);
    salvarDados();
    renderExpenses();
    atualizarDashboard();
    mostrarSucesso('Despesa adicionada com sucesso!', 'successMessage2');
}

function atualizarTotalDespesas() {
    const total = dadosFinanceiros.despesas.reduce((sum, d) => sum + d.valor, 0);
    document.getElementById('totalDespesas').textContent = formatarMoeda(total);
}

// ===== VENDAS - LOJA VAPE =====
function inicializarData() {
    const today = new Date();
    const ano = today.getFullYear();
    const mes = String(today.getMonth() + 1).padStart(2, '0');
    document.getElementById('vendaMesAno').value = `${ano}-${mes}`;
}

function renderVendas() {
    carregarVendas();
}

function carregarVendas() {
    const mesAno = document.getElementById('vendaMesAno').value;
    const [ano, mes] = mesAno.split('-');

    const tbody = document.getElementById('vendasBody');
    tbody.innerHTML = '';

    const vendasFiltradas = dadosFinanceiros.vendas.filter(v => {
        const dataVenda = new Date(v.data);
        return dataVenda.getFullYear() === parseInt(ano) &&
               dataVenda.getMonth() + 1 === parseInt(mes);
    });

    if (vendasFiltradas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">Nenhuma venda registrada neste período</td></tr>';
    }

    vendasFiltradas.forEach(venda => {
        const lucro = venda.valorVenda - venda.valorCompra;
        const row = document.createElement('tr');
        row.className = 'edit-row';
        row.innerHTML = `
            <td><input type="date" value="${venda.data}" onchange="editarVenda(${venda.id}, 'data', this.value)"></td>
            <td><input type="text" value="${venda.produto}" onchange="editarVenda(${venda.id}, 'produto', this.value)"></td>
            <td><input type="number" value="${venda.valorCompra}" onchange="editarVenda(${venda.id}, 'valorCompra', parseFloat(this.value))" step="0.01"></td>
            <td><input type="number" value="${venda.valorVenda}" onchange="editarVenda(${venda.id}, 'valorVenda', parseFloat(this.value))" step="0.01"></td>
            <td><strong class="positive">R$ ${formatarNumero(lucro)}</strong></td>
            <td><input type="text" value="${venda.cliente}" onchange="editarVenda(${venda.id}, 'cliente', this.value)"></td>
            <td>
                <button class="btn btn-secondary btn-small" onclick="deletarVenda(${venda.id})">🗑️ Deletar</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    atualizarTotaisVendas(vendasFiltradas);
}

function editarVenda(id, campo, valor) {
    const venda = dadosFinanceiros.vendas.find(v => v.id === id);
    if (venda) {
        if (campo === 'valorCompra' || campo === 'valorVenda') {
            venda[campo] = parseFloat(valor);
        } else {
            venda[campo] = valor;
        }
        salvarDados();
        carregarVendas();
        atualizarDashboard();
        mostrarSucesso('Venda atualizada com sucesso!', 'successMessage3');
    }
}

function deletarVenda(id) {
    if (confirm('Tem certeza que deseja deletar esta venda?')) {
        dadosFinanceiros.vendas = dadosFinanceiros.vendas.filter(v => v.id !== id);
        salvarDados();
        carregarVendas();
        atualizarDashboard();
        mostrarSucesso('Venda deletada com sucesso!', 'successMessage3');
    }
}

function showAddVendaForm() {
    const data = prompt('Data (YYYY-MM-DD):');
    if (!data) return;

    const produto = prompt('Produto:');
    if (!produto) return;

    const valorCompra = parseFloat(prompt('Valor de Compra (R$):'));
    if (isNaN(valorCompra)) return;

    const valorVenda = parseFloat(prompt('Valor de Venda (R$):'));
    if (isNaN(valorVenda)) return;

    const cliente = prompt('Cliente (opcional):', '');

    const novaVenda = {
        id: Math.max(...dadosFinanceiros.vendas.map(v => v.id), 0) + 1,
        data,
        produto,
        valorCompra,
        valorVenda,
        cliente: cliente || 'N/A'
    };

    dadosFinanceiros.vendas.push(novaVenda);
    salvarDados();
    carregarVendas();
    atualizarDashboard();
    mostrarSucesso('Venda registrada com sucesso!', 'successMessage3');
}

function atualizarTotaisVendas(vendas) {
    const totalVendas = vendas.reduce((sum, v) => sum + v.valorVenda, 0);
    const totalLucro = vendas.reduce((sum, v) => sum + (v.valorVenda - v.valorCompra), 0);
    const mediaVenda = vendas.length > 0 ? totalVendas / vendas.length : 0;

    document.getElementById('totalVendas').textContent = formatarMoeda(totalVendas);
    document.getElementById('totalLucro').textContent = formatarMoeda(totalLucro);
    document.getElementById('mediaVenda').textContent = formatarMoeda(mediaVenda);
    document.getElementById('qtdVendas').textContent = vendas.length;
}

// ===== PROJEÇÕES =====
function atualizarProjecoes() {
    const ano = parseInt(document.getElementById('anoProjecao').value);
    const tbody = document.getElementById('projecoesBody');
    tbody.innerHTML = '';

    let saldoAcumulado = 0;
    const receitaFixaMensal = dadosFinanceiros.receitas.reduce((sum, r) => sum + r.valor, 0);
    const receitaLojaMensal = 3800; // Média da loja
    const despesaMensal = dadosFinanceiros.despesas.reduce((sum, d) => sum + d.valor, 0);

    for (let mes = 1; mes <= 12; mes++) {
        const totalReceita = receitaFixaMensal + receitaLojaMensal;
        const totalDespesa = despesaMensal;
        const saldoMes = totalReceita - totalDespesa;
        saldoAcumulado += saldoMes;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${meses[mes - 1]}</strong></td>
            <td>${formatarMoeda(receitaFixaMensal)}</td>
            <td>${formatarMoeda(receitaLojaMensal)}</td>
            <td>${formatarMoeda(totalReceita)}</td>
            <td>${formatarMoeda(totalDespesa)}</td>
            <td class="${saldoMes >= 0 ? 'positive' : 'negative'}">
                <strong>${formatarMoeda(saldoMes)}</strong>
            </td>
            <td class="${saldoAcumulado >= 0 ? 'positive' : 'negative'}">
                <strong>${formatarMoeda(saldoAcumulado)}</strong>
            </td>
        `;
        tbody.appendChild(row);
    }
}

// ===== RELATÓRIOS =====
function atualizarRelatorios() {
    const receitaFixa = dadosFinanceiros.receitas.reduce((sum, r) => sum + r.valor, 0);
    const receitaLojaMedia = 3800;
    const despesaMensal = dadosFinanceiros.despesas.reduce((sum, d) => sum + d.valor, 0);

    const receitaAnual = (receitaFixa + receitaLojaMedia) * 12;
    const despesaAnual = despesaMensal * 12;
    const lucroAnual = receitaAnual - despesaAnual;

    document.getElementById('receitaAnualProj').textContent = formatarMoeda(receitaAnual);
    document.getElementById('despesaAnualProj').textContent = formatarMoeda(despesaAnual);
    document.getElementById('lucroAnualProj').textContent = formatarMoeda(lucroAnual);
    document.getElementById('mediaReceitaFixa').textContent = formatarMoeda(receitaFixa);

    // Composição de receita
    const alugueis = dadosFinanceiros.receitas
        .filter(r => r.tipo === 'aluguel')
        .reduce((sum, r) => sum + r.valor, 0);
    const salario = dadosFinanceiros.receitas
        .filter(r => r.tipo === 'fixa')
        .reduce((sum, r) => sum + r.valor, 0);
    const lojaVape = receitaLojaMedia;

    const totalReceita = alugueis + salario + lojaVape;

    document.getElementById('totalAlugueis').textContent = formatarMoeda(alugueis);
    document.getElementById('percAlugueis').textContent =
        totalReceita > 0 ? ((alugueis / totalReceita) * 100).toFixed(1) + '%' : '0%';

    document.getElementById('totalSalario').textContent = formatarMoeda(salario);
    document.getElementById('percSalario').textContent =
        totalReceita > 0 ? ((salario / totalReceita) * 100).toFixed(1) + '%' : '0%';

    document.getElementById('totalLojaVape').textContent = formatarMoeda(lojaVape);
    document.getElementById('percLojaVape').textContent =
        totalReceita > 0 ? ((lojaVape / totalReceita) * 100).toFixed(1) + '%' : '0%';
}

// ===== UTILITÁRIOS =====
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function formatarNumero(valor) {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function mostrarSucesso(mensagem, elementId) {
    const element = document.getElementById(elementId);
    element.textContent = mensagem;
    element.classList.add('show');
    setTimeout(() => {
        element.classList.remove('show');
    }, 3000);
}

function exportarRelatorio() {
    alert('Funcionalidade de exportação em desenvolvimento!');
    // Implementar exportação para Excel aqui
}
