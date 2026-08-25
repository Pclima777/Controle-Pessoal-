// ════════════════════════════════════════════════════════════════
// CONTROLE PESSOAL - APP.JS
// ════════════════════════════════════════════════════════════════

// ── DADOS GLOBAIS
let dados = {
    receitas: [],
    despesas: [],
    lancamentos: {},
    vendas: []
};

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

// ── INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    inicializarDatas();
    renderizarDashboard();
    carregarDia();
    renderizarEdicao();
});

// ════════════════════════════════════════════════════════════════
// ARMAZENAMENTO
// ════════════════════════════════════════════════════════════════

function carregarDados() {
    const saved = localStorage.getItem('controle_pessoal_dados');
    if (saved) {
        dados = JSON.parse(saved);
    } else {
        carregarDadosIniciais();
    }
}

function salvarDados() {
    localStorage.setItem('controle_pessoal_dados', JSON.stringify(dados));
}

function carregarDadosIniciais() {
    dados.receitas = [
        { id: 1, nome: 'Gio (Salário)', valor: 1000, dia: 5 },
        { id: 2, nome: 'Maria Luiza', valor: 750, dia: 10 },
        { id: 3, nome: 'De Motos', valor: 3450, dia: 10 },
        { id: 4, nome: 'Aparecida', valor: 850, dia: 15 },
        { id: 5, nome: 'Rafael', valor: 800, dia: 20 },
        { id: 6, nome: 'Vitão', valor: 1100, dia: 22 },
        { id: 7, nome: 'Adriana', valor: 850, dia: 30 }
    ];

    dados.despesas = [
        { id: 1, descricao: 'Faculdade', valor: 2600, dia: 5 },
        { id: 2, descricao: 'Vivo', valor: 85, dia: 10 },
        { id: 3, descricao: 'Internet BH', valor: 100, dia: 15 },
        { id: 4, descricao: 'Conta de Luz', valor: 250, dia: 20 },
        { id: 5, descricao: 'Condomínio', valor: 500, dia: 10 },
        { id: 6, descricao: 'IPTU', valor: 100, dia: 15 },
        { id: 7, descricao: 'Seguro', valor: 210, dia: 25 },
        { id: 8, descricao: 'Cartão Nubank', valor: 2000, dia: 5 },
        { id: 9, descricao: 'Cartão Bradesco', valor: 3500, dia: 10 },
        { id: 10, descricao: 'Cartão Sicoob', valor: 2400, dia: 15 }
    ];

    salvarDados();
}

// ════════════════════════════════════════════════════════════════
// NAVEGAÇÃO
// ════════════════════════════════════════════════════════════════

function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');
    event.target.classList.add('active');

    if (pageId === 'projecao') {
        renderizarProjecao();
    } else if (pageId === 'edicao') {
        renderizarEdicao();
    }
}

// ════════════════════════════════════════════════════════════════
// FORMATAÇÃO
// ════════════════════════════════════════════════════════════════

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valor);
}

function formatarData(data) {
    if (typeof data === 'string') {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }
    return data.toLocaleDateString('pt-BR');
}

// ════════════════════════════════════════════════════════════════
// INICIALIZAR DATAS
// ════════════════════════════════════════════════════════════════

function inicializarDatas() {
    const hoje = new Date();
    const isoHoje = hoje.toISOString().split('T')[0];

    document.getElementById('lancData').value = isoHoje;
    document.getElementById('filtroDataDe').valueAsDate = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    document.getElementById('filtroDataAte').value = isoHoje;
    document.getElementById('projDataDe').value = isoHoje;
    document.getElementById('projDataAte').value = isoHoje;
}

function preencherPeriodoAtual() {
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    document.getElementById('projDataDe').value = primeiroDia.toISOString().split('T')[0];
    document.getElementById('projDataAte').value = ultimoDia.toISOString().split('T')[0];
    renderizarProjecao();
}

// ════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════

function renderizarDashboard() {
    const totalReceitaFixa = dados.receitas.reduce((sum, r) => sum + r.valor, 0);
    const totalDespesa = dados.despesas.reduce((sum, d) => sum + d.valor, 0);
    const receitaLoja = 3800; // Média estimada
    const saldo = totalReceitaFixa + receitaLoja - totalDespesa;

    document.getElementById('dashReceitaFixa').textContent = formatarMoeda(totalReceitaFixa);
    document.getElementById('dashReceitaLoja').textContent = formatarMoeda(receitaLoja);
    document.getElementById('dashDespesa').textContent = formatarMoeda(totalDespesa);
    document.getElementById('dashSaldo').textContent = formatarMoeda(saldo);

    const tbody = document.getElementById('dashReceitasBody');
    tbody.innerHTML = dados.receitas.map(r => `
        <tr>
            <td>${r.nome}</td>
            <td class="num positive editable" onclick="editarReceita(${r.id}, 'valor')" title="Clique para editar">${formatarMoeda(r.valor)}</td>
            <td><span class="badge editable" onclick="editarReceita(${r.id}, 'dia')" title="Clique para editar">Dia ${r.dia}</span></td>
        </tr>
    `).join('');
}

function editarReceita(id, campo) {
    const receita = dados.receitas.find(r => r.id === id);
    if (!receita) return;

    let novoValor;
    if (campo === 'valor') {
        novoValor = prompt(`Novo valor para ${receita.nome}:`, receita.valor);
        if (novoValor !== null && novoValor !== '') {
            receita.valor = parseFloat(novoValor) || receita.valor;
        }
    } else if (campo === 'dia') {
        novoValor = prompt(`Novo dia do mês para ${receita.nome}:`, receita.dia);
        if (novoValor !== null && novoValor !== '') {
            receita.dia = parseInt(novoValor) || receita.dia;
        }
    }

    salvarDados();
    renderizarDashboard();
}

// ════════════════════════════════════════════════════════════════
// LANÇAMENTO
// ════════════════════════════════════════════════════════════════

function carregarDia() {
    const dataInput = document.getElementById('lancData').value;
    const data = new Date(dataInput + 'T00:00:00');

    const nomeDia = data.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('lancDataInfo').textContent = nomeDia;

    const lancamento = dados.lancamentos[dataInput] || { pix: 0, dinheiro: 0, credito: 0, debito: 0, saidas: [] };

    document.getElementById('lancPix').value = lancamento.pix || '';
    document.getElementById('lancDinheiro').value = lancamento.dinheiro || '';
    document.getElementById('lancCredito').value = lancamento.credito || '';
    document.getElementById('lancDebito').value = lancamento.debito || '';

    const saidasList = document.getElementById('lancSaidasList');
    saidasList.innerHTML = '';
    (lancamento.saidas || []).forEach(saida => adicionarSaidaRow(saida.descricao, saida.valor));

    calcularSaldo();
    renderizarResumo();
}

function adicionarSaida() {
    adicionarSaidaRow('', '');
}

function adicionarSaidaRow(descricao = '', valor = '') {
    const id = 'saida_' + Date.now();
    const html = `
        <div class="list-item" id="${id}">
            <div class="list-item-content" style="flex: 1;">
                <input type="text" placeholder="Descrição" value="${descricao}" style="width: 100%; background: transparent; border: none; color: var(--text); margin-bottom: 6px;" onchange="calcularSaldo()">
                <input type="number" placeholder="0,00" value="${valor}" step="0.01" min="0" style="width: 100%; background: transparent; border: none; color: var(--text); font-family: 'Courier New';" onchange="calcularSaldo()">
            </div>
            <button class="btn btn-secondary btn-small btn-icon" onclick="document.getElementById('${id}').remove(); calcularSaldo()">✕</button>
        </div>
    `;
    document.getElementById('lancSaidasList').insertAdjacentHTML('beforeend', html);
}

function coletarSaidas() {
    const saidas = [];
    document.querySelectorAll('#lancSaidasList .list-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        const descricao = inputs[0].value.trim();
        const valor = parseFloat(inputs[1].value) || 0;
        if (descricao || valor > 0) {
            saidas.push({ descricao, valor });
        }
    });
    return saidas;
}

function calcularSaldo() {
    const pix = parseFloat(document.getElementById('lancPix').value) || 0;
    const dinheiro = parseFloat(document.getElementById('lancDinheiro').value) || 0;
    const credito = parseFloat(document.getElementById('lancCredito').value) || 0;
    const debito = parseFloat(document.getElementById('lancDebito').value) || 0;

    const totalEntrada = pix + dinheiro + credito + debito;
    const saidas = coletarSaidas();
    const totalSaida = saidas.reduce((sum, s) => sum + s.valor, 0);
    const resultado = totalEntrada - totalSaida;

    document.getElementById('lancTotalEntrada').textContent = formatarMoeda(totalEntrada);
    document.getElementById('lancTotalSaida').textContent = formatarMoeda(totalSaida);
    document.getElementById('lancResultado').textContent = formatarMoeda(resultado);

    renderizarResumo();
}

function renderizarResumo() {
    const tbody = document.getElementById('lancResumoBody');
    const pix = parseFloat(document.getElementById('lancPix').value) || 0;
    const dinheiro = parseFloat(document.getElementById('lancDinheiro').value) || 0;
    const credito = parseFloat(document.getElementById('lancCredito').value) || 0;
    const debito = parseFloat(document.getElementById('lancDebito').value) || 0;
    const saidas = coletarSaidas();

    let html = '';

    if (pix > 0) html += `<tr><td>Pix</td><td class="num positive">+${formatarMoeda(pix)}</td><td><span class="badge badge-accent">Entrada</span></td></tr>`;
    if (dinheiro > 0) html += `<tr><td>Dinheiro</td><td class="num positive">+${formatarMoeda(dinheiro)}</td><td><span class="badge badge-accent">Entrada</span></td></tr>`;
    if (credito > 0) html += `<tr><td>Crédito</td><td class="num positive">+${formatarMoeda(credito)}</td><td><span class="badge badge-accent">Entrada</span></td></tr>`;
    if (debito > 0) html += `<tr><td>Débito</td><td class="num positive">+${formatarMoeda(debito)}</td><td><span class="badge badge-accent">Entrada</span></td></tr>`;

    saidas.forEach(s => {
        html += `<tr><td>${s.descricao}</td><td class="num negative">-${formatarMoeda(s.valor)}</td><td><span class="badge badge-danger">Saída</span></td></tr>`;
    });

    if (!html) {
        html = '<tr><td colspan="3" style="text-align: center; color: var(--text-secondary); padding: 20px;">Nenhum lançamento</td></tr>';
    }

    tbody.innerHTML = html;
}

function salvarLancamento() {
    const data = document.getElementById('lancData').value;
    const pix = parseFloat(document.getElementById('lancPix').value) || 0;
    const dinheiro = parseFloat(document.getElementById('lancDinheiro').value) || 0;
    const credito = parseFloat(document.getElementById('lancCredito').value) || 0;
    const debito = parseFloat(document.getElementById('lancDebito').value) || 0;
    const saidas = coletarSaidas().map(s => ({ descricao: s.descricao, valor: s.valor }));

    dados.lancamentos[data] = { pix, dinheiro, credito, debito, saidas };
    salvarDados();

    alert('✓ Lançamento salvo com sucesso!');
    renderizarEdicao();
}

// ════════════════════════════════════════════════════════════════
// EDIÇÃO
// ════════════════════════════════════════════════════════════════

function renderizarEdicao() {
    const dataDe = document.getElementById('filtroDataDe').value;
    const dataAte = document.getElementById('filtroDataAte').value;

    let lancamentos = Object.keys(dados.lancamentos).sort();

    if (dataDe) lancamentos = lancamentos.filter(d => d >= dataDe);
    if (dataAte) lancamentos = lancamentos.filter(d => d <= dataAte);

    let totalEntrada = 0, totalSaida = 0, saldoAcum = 0;
    const tbody = document.getElementById('edicaoTableBody');
    tbody.innerHTML = '';

    lancamentos.forEach(data => {
        const lanc = dados.lancamentos[data];
        const entrada = (lanc.pix || 0) + (lanc.dinheiro || 0) + (lanc.credito || 0) + (lanc.debito || 0);
        const saida = (lanc.saidas || []).reduce((sum, s) => sum + s.valor, 0);
        const resultado = entrada - saida;

        totalEntrada += entrada;
        totalSaida += saida;
        saldoAcum += resultado;

        const dataFormatada = formatarData(data);
        const dataObj = new Date(data + 'T00:00:00');
        const dia = DIAS_SEMANA[dataObj.getDay()];

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dataFormatada} (${dia})</td>
            <td class="num positive">${formatarMoeda(entrada)}</td>
            <td class="num negative">${formatarMoeda(saida)}</td>
            <td class="num" style="color: ${resultado >= 0 ? 'var(--accent)' : 'var(--danger)'}">${formatarMoeda(resultado)}</td>
            <td>
                <button class="btn btn-secondary btn-small" onclick="editarDia('${data}')">Editar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('edicaoTotalEntrada').textContent = formatarMoeda(totalEntrada);
    document.getElementById('edicaoTotalSaida').textContent = formatarMoeda(totalSaida);
    document.getElementById('edicaoSaldo').textContent = formatarMoeda(saldoAcum);
}

function editarDia(data) {
    document.getElementById('lancData').value = data;
    switchPage('lancamento');
    carregarDia();
}

function limparFiltros() {
    document.getElementById('filtroDataDe').value = '';
    document.getElementById('filtroDataAte').value = '';
    renderizarEdicao();
}

// ════════════════════════════════════════════════════════════════
// PROJEÇÃO
// ════════════════════════════════════════════════════════════════

function renderizarProjecao() {
    const dataDe = document.getElementById('projDataDe').value;
    const dataAte = document.getElementById('projDataAte').value;

    if (!dataDe || !dataAte) return;

    const diaInicio = new Date(dataDe + 'T00:00:00');
    const diaFim = new Date(dataAte + 'T00:00:00');

    const dias = [];
    let saldoAcum = 0;
    let totalReceitaGeral = 0;
    let totalDespesaGeral = 0;

    for (let d = new Date(diaInicio); d <= diaFim; d.setDate(d.getDate() + 1)) {
        const isoData = d.toISOString().split('T')[0];
        const dataObj = new Date(d);
        const dia = dataObj.getDate();

        // Receitas fixas
        let receita = 0;
        dados.receitas.forEach(r => {
            if (r.dia === dia) {
                receita += r.valor;
            }
        });

        // Despesas fixas
        let despesa = 0;
        dados.despesas.forEach(d => {
            if (d.dia === dia) {
                despesa += d.valor;
            }
        });

        // Lançamentos reais
        const lanc = dados.lancamentos[isoData];
        if (lanc) {
            const entrada = (lanc.pix || 0) + (lanc.dinheiro || 0) + (lanc.credito || 0) + (lanc.debito || 0);
            const saida = (lanc.saidas || []).reduce((sum, s) => sum + s.valor, 0);
            receita += entrada;
            despesa += saida;
        }

        const saldoDia = receita - despesa;
        saldoAcum += saldoDia;

        totalReceitaGeral += receita;
        totalDespesaGeral += despesa;

        dias.push({
            data: isoData,
            dataFormatada: formatarData(isoData),
            dia: DIAS_SEMANA[dataObj.getDay()],
            receita,
            despesa,
            saldoDia,
            saldoAcum
        });
    }

    // Renderizar tabela
    const tbody = document.getElementById('projecaoTableBody');
    tbody.innerHTML = dias.map(d => `
        <tr>
            <td>${d.dataFormatada}</td>
            <td>${d.dia}</td>
            <td class="num positive">${formatarMoeda(d.receita)}</td>
            <td class="num negative">${formatarMoeda(d.despesa)}</td>
            <td class="num" style="color: ${d.saldoDia >= 0 ? 'var(--accent)' : 'var(--danger)'};">${formatarMoeda(d.saldoDia)}</td>
            <td class="num" style="color: ${d.saldoAcum >= 0 ? 'var(--accent)' : 'var(--danger)'};">${formatarMoeda(d.saldoAcum)}</td>
        </tr>
    `).join('');

    // Atualizar totais
    document.getElementById('projTotalReceita').textContent = formatarMoeda(totalReceitaGeral);
    document.getElementById('projTotalDespesa').textContent = formatarMoeda(totalDespesaGeral);
    document.getElementById('projSaldoAcum').textContent = formatarMoeda(saldoAcum);
}

// ════════════════════════════════════════════════════════════════
// EXPORTAÇÃO DE DADOS
// ════════════════════════════════════════════════════════════════

function exportarDados() {
    salvarDados();
    const dadosJSON = JSON.stringify(dados, null, 2);
    const blob = new Blob([dadosJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `controle-pessoal-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importarDados(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            dados = JSON.parse(e.target.result);
            salvarDados();
            location.reload();
        } catch (err) {
            alert('Erro ao importar arquivo: ' + err.message);
        }
    };
    reader.readAsText(file);
}
