// ════════════════════════════════════════════════════════════════
// CONTROLE PESSOAL - APP.JS - 6 TABS VERSION
// ════════════════════════════════════════════════════════════════

// ── DADOS GLOBAIS
let dados = {
    receitas: [],
    despesas: [],
    estoque: [],
    vendas: {}
};

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
let chartFluxo = null;
let chartSaldo = null;

// ── INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    inicializarDatas();
    renderizarDashboard();
    carregarDiaVape();
    renderizarEstoque();
    renderizarReceitas();
    renderizarDespesas();
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
        { id: 1, nome: 'Gio', valor: 1000, dia: 5 },
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

    dados.estoque = [
        { id: 1, nome: 'Liquido 20ml', quantidade: 100, preco: 25.00 },
        { id: 2, nome: 'Pod 2ml', quantidade: 50, preco: 15.00 },
        { id: 3, nome: 'Bateria', quantidade: 30, preco: 45.00 },
        { id: 4, nome: 'Coil', quantidade: 75, preco: 8.00 }
    ];

    salvarDados();
}

// ════════════════════════════════════════════════════════════════
// NAVEGAÇÃO
// ════════════════════════════════════════════════════════════════

function tab(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');
    event.target.classList.add('active');

    if (pageId === 'projecao') {
        setTimeout(() => renderizarProjecao(), 100);
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

    document.getElementById('vapeData').value = isoHoje;

    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    document.getElementById('projDataDe').value = primeiroDia.toISOString().split('T')[0];
    document.getElementById('projDataAte').value = ultimoDia.toISOString().split('T')[0];
}

// ════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════

function renderizarDashboard() {
    const totalReceitaFixa = dados.receitas.reduce((sum, r) => sum + r.valor, 0);
    const totalDespesaFixa = dados.despesas.reduce((sum, d) => sum + d.valor, 0);
    const receitaVape = calcularTotalVendas();
    const saldo = totalReceitaFixa + receitaVape - totalDespesaFixa;

    document.getElementById('dashReceitaFixa').textContent = formatarMoeda(totalReceitaFixa);
    document.getElementById('dashReceitaVape').textContent = formatarMoeda(receitaVape);
    document.getElementById('dashDespesaFixa').textContent = formatarMoeda(totalDespesaFixa);
    document.getElementById('dashSaldo').textContent = formatarMoeda(saldo);

    const tbody = document.getElementById('dashReceitasBody');
    tbody.innerHTML = dados.receitas.map(r => `
        <tr>
            <td>${r.nome}</td>
            <td class="num positive editable" onclick="editarReceita(${r.id}, 'valor')" title="Clique para editar">${formatarMoeda(r.valor)}</td>
            <td><span class="badge badge-success editable" onclick="editarReceita(${r.id}, 'dia')" title="Clique para editar">Dia ${r.dia}</span></td>
        </tr>
    `).join('');
}

function calcularTotalVendas() {
    let total = 0;
    Object.values(dados.vendas).forEach(dia => {
        const entrada = (dia.pix || 0) + (dia.dinheiro || 0) + (dia.credito || 0) + (dia.debito || 0);
        total += entrada;
    });
    return total;
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
        novoValor = prompt(`Novo dia para ${receita.nome}:`, receita.dia);
        if (novoValor !== null && novoValor !== '') {
            receita.dia = parseInt(novoValor) || receita.dia;
        }
    }

    salvarDados();
    renderizarDashboard();
}

// ════════════════════════════════════════════════════════════════
// SPEED VAPE
// ════════════════════════════════════════════════════════════════

function carregarDiaVape() {
    const dataInput = document.getElementById('vapeData').value;
    const data = new Date(dataInput + 'T00:00:00');

    const nomeDia = data.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('vapeDataInfo').textContent = nomeDia;

    // Preencher dropdown de produtos
    const select = document.getElementById('vapeProduto');
    select.innerHTML = '<option value="">Selecione um produto</option>';
    dados.estoque.forEach(p => {
        select.innerHTML += `<option value="${p.id}">${p.nome} (${p.quantidade})</option>`;
    });

    const vendaDia = dados.vendas[dataInput] || {
        pix: 0,
        dinheiro: 0,
        credito: 0,
        debito: 0,
        vendidos: []
    };

    document.getElementById('vapePix').value = vendaDia.pix || '';
    document.getElementById('vapeDinheiro').value = vendaDia.dinheiro || '';
    document.getElementById('vapeCredito').value = vendaDia.credito || '';
    document.getElementById('vapeDebito').value = vendaDia.debito || '';

    renderizarVendasVape(vendaDia.vendidos || []);
    calcularVape();
}

function vapeAnterior() {
    const input = document.getElementById('vapeData');
    const data = new Date(input.value + 'T00:00:00');
    data.setDate(data.getDate() - 1);
    input.value = data.toISOString().split('T')[0];
    carregarDiaVape();
}

function vapeProximo() {
    const input = document.getElementById('vapeData');
    const data = new Date(input.value + 'T00:00:00');
    data.setDate(data.getDate() + 1);
    input.value = data.toISOString().split('T')[0];
    carregarDiaVape();
}

function adicionarVendaVape() {
    const produtoId = parseInt(document.getElementById('vapeProduto').value);
    const quantidade = parseInt(document.getElementById('vapeQtd').value) || 1;

    if (!produtoId) {
        alert('Selecione um produto');
        return;
    }

    const produto = dados.estoque.find(p => p.id === produtoId);
    if (!produto) return;

    if (produto.quantidade < quantidade) {
        alert(`Quantidade insuficiente. Disponível: ${produto.quantidade}`);
        return;
    }

    const dataInput = document.getElementById('vapeData').value;
    const vendaDia = dados.vendas[dataInput] || {
        pix: 0,
        dinheiro: 0,
        credito: 0,
        debito: 0,
        vendidos: []
    };

    const vendaExistente = vendaDia.vendidos.find(v => v.id === produtoId);
    if (vendaExistente) {
        vendaExistente.quantidade += quantidade;
    } else {
        vendaDia.vendidos.push({
            id: produtoId,
            nome: produto.nome,
            quantidade: quantidade,
            preco: produto.preco
        });
    }

    renderizarVendasVape(vendaDia.vendidos);
    calcularVape();
    document.getElementById('vapeQtd').value = 1;
    document.getElementById('vapeProduto').value = '';
}

function renderizarVendasVape(vendidos) {
    const list = document.getElementById('vapeVendasList');
    list.innerHTML = vendidos.map((v, i) => `
        <div style="background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-weight: 600;">${v.nome}</div>
                <div style="font-size: 11px; color: var(--text-secondary);">Qtd: ${v.quantidade} × R$ ${v.preco.toFixed(2)}</div>
            </div>
            <button class="btn btn-secondary btn-icon" onclick="removerVendaVape(${i})">✕</button>
        </div>
    `).join('');
}

function removerVendaVape(index) {
    const dataInput = document.getElementById('vapeData').value;
    const vendaDia = dados.vendas[dataInput] || {
        pix: 0,
        dinheiro: 0,
        credito: 0,
        debito: 0,
        vendidos: []
    };

    vendaDia.vendidos.splice(index, 1);
    renderizarVendasVape(vendaDia.vendidos);
    calcularVape();
}

function calcularVape() {
    const pix = parseFloat(document.getElementById('vapePix').value) || 0;
    const dinheiro = parseFloat(document.getElementById('vapeDinheiro').value) || 0;
    const credito = parseFloat(document.getElementById('vapeCredito').value) || 0;
    const debito = parseFloat(document.getElementById('vapeDebito').value) || 0;

    const dataInput = document.getElementById('vapeData').value;
    const vendaDia = dados.vendas[dataInput] || {
        pix: 0,
        dinheiro: 0,
        credito: 0,
        debito: 0,
        vendidos: []
    };

    const totalEntrada = pix + dinheiro + credito + debito;
    const totalSaida = vendaDia.vendidos.reduce((sum, v) => sum + (v.quantidade * v.preco), 0);
    const resultado = totalEntrada - totalSaida;

    document.getElementById('vapeTotalEntrada').textContent = formatarMoeda(totalEntrada);
    document.getElementById('vapeTotalSaida').textContent = formatarMoeda(totalSaida);
    document.getElementById('vapeResultado').textContent = formatarMoeda(resultado);

    renderizarResumoVape(vendaDia.vendidos);
}

function renderizarResumoVape(vendidos) {
    const tbody = document.getElementById('vapeResumoBody');
    tbody.innerHTML = vendidos.map(v => `
        <tr>
            <td>${v.nome}</td>
            <td class="num">${v.quantidade}</td>
            <td class="num negative">${formatarMoeda(v.quantidade * v.preco)}</td>
        </tr>
    `).join('');

    if (vendidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: var(--text-secondary); padding: 20px;">Nenhuma venda</td></tr>';
    }
}

function salvarVape() {
    const dataInput = document.getElementById('vapeData').value;
    const pix = parseFloat(document.getElementById('vapePix').value) || 0;
    const dinheiro = parseFloat(document.getElementById('vapeDinheiro').value) || 0;
    const credito = parseFloat(document.getElementById('vapeCredito').value) || 0;
    const debito = parseFloat(document.getElementById('vapeDebito').value) || 0;

    const vendaDia = dados.vendas[dataInput] || {
        pix: 0,
        dinheiro: 0,
        credito: 0,
        debito: 0,
        vendidos: []
    };

    vendaDia.pix = pix;
    vendaDia.dinheiro = dinheiro;
    vendaDia.credito = credito;
    vendaDia.debito = debito;

    // Reduzir estoque
    vendaDia.vendidos.forEach(venda => {
        const produto = dados.estoque.find(p => p.id === venda.id);
        if (produto) {
            produto.quantidade -= venda.quantidade;
        }
    });

    dados.vendas[dataInput] = vendaDia;
    salvarDados();

    document.getElementById('vapeIndicador').classList.add('show');
    setTimeout(() => {
        document.getElementById('vapeIndicador').classList.remove('show');
    }, 2000);

    renderizarDashboard();
}

// ════════════════════════════════════════════════════════════════
// ESTOQUE
// ════════════════════════════════════════════════════════════════

function renderizarEstoque() {
    const tbody = document.getElementById('estoqueBody');
    tbody.innerHTML = dados.estoque.map(p => {
        const valorTotal = p.quantidade * p.preco;
        return `
            <tr>
                <td>${p.nome}</td>
                <td class="num editable" onclick="editarEstoque(${p.id}, 'quantidade')">${p.quantidade}</td>
                <td class="num editable" onclick="editarEstoque(${p.id}, 'preco')">R$ ${p.preco.toFixed(2)}</td>
                <td class="num">${formatarMoeda(valorTotal)}</td>
                <td>
                    <button class="btn btn-danger btn-small" onclick="deletarProduto(${p.id})">Remover</button>
                </td>
            </tr>
        `;
    }).join('');
}

function adicionarProduto() {
    const nome = document.getElementById('novoProdutoNome').value.trim();
    const quantidade = parseInt(document.getElementById('novoProdutoQtd').value) || 0;
    const preco = parseFloat(document.getElementById('novoProdutoPreco').value) || 0;

    if (!nome) {
        alert('Digite o nome do produto');
        return;
    }

    const novoId = Math.max(...dados.estoque.map(p => p.id), 0) + 1;
    dados.estoque.push({ id: novoId, nome, quantidade, preco });

    salvarDados();
    renderizarEstoque();

    document.getElementById('novoProdutoNome').value = '';
    document.getElementById('novoProdutoQtd').value = '';
    document.getElementById('novoProdutoPreco').value = '';

    carregarDiaVape();
}

function editarEstoque(id, campo) {
    const produto = dados.estoque.find(p => p.id === id);
    if (!produto) return;

    let novoValor;
    if (campo === 'quantidade') {
        novoValor = prompt(`Nova quantidade para ${produto.nome}:`, produto.quantidade);
        if (novoValor !== null) {
            produto.quantidade = parseInt(novoValor) || produto.quantidade;
        }
    } else if (campo === 'preco') {
        novoValor = prompt(`Novo preço para ${produto.nome}:`, produto.preco.toFixed(2));
        if (novoValor !== null) {
            produto.preco = parseFloat(novoValor) || produto.preco;
        }
    }

    salvarDados();
    renderizarEstoque();
    carregarDiaVape();
}

function deletarProduto(id) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
        dados.estoque = dados.estoque.filter(p => p.id !== id);
        salvarDados();
        renderizarEstoque();
        carregarDiaVape();
    }
}

// ════════════════════════════════════════════════════════════════
// RECEITAS
// ════════════════════════════════════════════════════════════════

function renderizarReceitas() {
    const tbody = document.getElementById('receitasBody');
    tbody.innerHTML = dados.receitas.map(r => `
        <tr>
            <td>${r.nome}</td>
            <td class="num positive editable" onclick="editarReceita(${r.id}, 'valor')" title="Clique para editar">${formatarMoeda(r.valor)}</td>
            <td><span class="badge badge-success editable" onclick="editarReceita(${r.id}, 'dia')" title="Clique para editar">Dia ${r.dia}</span></td>
            <td>
                <button class="btn btn-danger btn-small" onclick="deletarReceita(${r.id})">Remover</button>
            </td>
        </tr>
    `).join('');
}

function deletarReceita(id) {
    if (confirm('Remover esta fonte de renda?')) {
        dados.receitas = dados.receitas.filter(r => r.id !== id);
        salvarDados();
        renderizarReceitas();
        renderizarDashboard();
    }
}

// ════════════════════════════════════════════════════════════════
// DESPESAS
// ════════════════════════════════════════════════════════════════

function renderizarDespesas() {
    const tbody = document.getElementById('despesasBody');
    tbody.innerHTML = dados.despesas.map(d => `
        <tr>
            <td>${d.descricao}</td>
            <td class="num negative editable" onclick="editarDespesa(${d.id}, 'valor')" title="Clique para editar">${formatarMoeda(d.valor)}</td>
            <td><span class="badge badge-danger editable" onclick="editarDespesa(${d.id}, 'dia')" title="Clique para editar">Dia ${d.dia}</span></td>
            <td>
                <button class="btn btn-danger btn-small" onclick="deletarDespesa(${d.id})">Remover</button>
            </td>
        </tr>
    `).join('');
}

function editarDespesa(id, campo) {
    const despesa = dados.despesas.find(d => d.id === id);
    if (!despesa) return;

    let novoValor;
    if (campo === 'valor') {
        novoValor = prompt(`Novo valor para ${despesa.descricao}:`, despesa.valor);
        if (novoValor !== null) {
            despesa.valor = parseFloat(novoValor) || despesa.valor;
        }
    } else if (campo === 'dia') {
        novoValor = prompt(`Novo dia para ${despesa.descricao}:`, despesa.dia);
        if (novoValor !== null) {
            despesa.dia = parseInt(novoValor) || despesa.dia;
        }
    }

    salvarDados();
    renderizarDespesas();
    renderizarDashboard();
}

function deletarDespesa(id) {
    if (confirm('Remover esta despesa?')) {
        dados.despesas = dados.despesas.filter(d => d.id !== id);
        salvarDados();
        renderizarDespesas();
        renderizarDashboard();
    }
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
        const diaNum = dataObj.getDate();

        let receita = 0;
        dados.receitas.forEach(r => {
            if (r.dia === diaNum) {
                receita += r.valor;
            }
        });

        let despesa = 0;
        dados.despesas.forEach(d => {
            if (d.dia === diaNum) {
                despesa += d.valor;
            }
        });

        const venda = dados.vendas[isoData];
        if (venda) {
            const entrada = (venda.pix || 0) + (venda.dinheiro || 0) + (venda.credito || 0) + (venda.debito || 0);
            receita += entrada;
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

    document.getElementById('projTotalReceita').textContent = formatarMoeda(totalReceitaGeral);
    document.getElementById('projTotalDespesa').textContent = formatarMoeda(totalDespesaGeral);
    document.getElementById('projSaldoAcum').textContent = formatarMoeda(saldoAcum);
    document.getElementById('projDias').textContent = dias.length;

    const tbody = document.getElementById('projecaoTableBody');
    tbody.innerHTML = dias.map(d => `
        <tr>
            <td>${d.dataFormatada}</td>
            <td class="num positive">${formatarMoeda(d.receita)}</td>
            <td class="num negative">${formatarMoeda(d.despesa)}</td>
            <td class="num" style="color: ${d.saldoDia >= 0 ? 'var(--gr)' : 'var(--rd)'};">${formatarMoeda(d.saldoDia)}</td>
            <td class="num" style="color: ${d.saldoAcum >= 0 ? 'var(--gr)' : 'var(--rd)'};">${formatarMoeda(d.saldoAcum)}</td>
        </tr>
    `).join('');

    gerarGraficos(dias);
}

function gerarGraficos(dias) {
    const labels = dias.map(d => d.dataFormatada);
    const fluxos = dias.map(d => d.saldoDia);
    const saldos = dias.map(d => d.saldoAcum);

    // Gráfico de Fluxo Diário
    const ctxFluxo = document.getElementById('chartFluxo').getContext('2d');
    if (chartFluxo) chartFluxo.destroy();
    chartFluxo = new Chart(ctxFluxo, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Fluxo Diário',
                data: fluxos,
                backgroundColor: fluxos.map(f => f >= 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'),
                borderColor: fluxos.map(f => f >= 0 ? 'var(--gr)' : 'var(--rd)'),
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: 'var(--text-secondary)', font: { size: 12 } }
                }
            },
            scales: {
                y: {
                    ticks: { color: 'var(--text-secondary)' },
                    grid: { color: 'var(--border)' }
                },
                x: {
                    ticks: { color: 'var(--text-secondary)' },
                    grid: { color: 'var(--border)' }
                }
            }
        }
    });

    // Gráfico de Saldo Acumulado
    const ctxSaldo = document.getElementById('chartSaldo').getContext('2d');
    if (chartSaldo) chartSaldo.destroy();
    chartSaldo = new Chart(ctxSaldo, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Saldo Acumulado',
                data: saldos,
                borderColor: 'var(--gr)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointRadius: 3,
                pointBackgroundColor: 'var(--gr)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: 'var(--text-secondary)', font: { size: 12 } }
                }
            },
            scales: {
                y: {
                    ticks: { color: 'var(--text-secondary)' },
                    grid: { color: 'var(--border)' }
                },
                x: {
                    ticks: { color: 'var(--text-secondary)' },
                    grid: { color: 'var(--border)' }
                }
            }
        }
    });
}

// ════════════════════════════════════════════════════════════════
// BACKUP / RESTORE
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
