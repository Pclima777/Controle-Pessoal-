let dados = {
    receitas: [
        { id: 1, nome: 'Gio', valor: 1000, dia: 5 },
        { id: 2, nome: 'Maria Luiza', valor: 750, dia: 10 },
        { id: 3, nome: 'De Motos', valor: 3450, dia: 10 },
        { id: 4, nome: 'Aparecida', valor: 850, dia: 15 },
        { id: 5, nome: 'Rafael', valor: 800, dia: 20 },
        { id: 6, nome: 'Vitão', valor: 1100, dia: 22 },
        { id: 7, nome: 'Adriana', valor: 850, dia: 30 }
    ],
    despesas: [
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
    ],
    estoque: [
        { id: 1, modelo: 'IGNITE V300', sabor: 'Pineapple Ice', qtdGeral: 3, cidades: { BH: 1, 'Santa Maria': 2 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 2, modelo: 'IGNITE V300', sabor: 'Watermelon Ice', qtdGeral: 3, cidades: { BH: 1, 'Santa Maria': 2 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 3, modelo: 'IGNITE V300', sabor: 'Menthol', qtdGeral: 3, cidades: { BH: 1, 'Santa Maria': 2 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 4, modelo: 'IGNITE V300', sabor: 'Icy Mint', qtdGeral: 3, cidades: { BH: 1, 'Santa Maria': 2 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 5, modelo: 'IGNITE V300', sabor: 'Grape Ice', qtdGeral: 2, cidades: { BH: 1, 'Santa Maria': 1 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 6, modelo: 'IGNITE V300', sabor: 'Aloe Grape', qtdGeral: 1, cidades: { BH: 1, 'Santa Maria': 0 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 7, modelo: 'IGNITE V300', sabor: 'Strawberry Kiwi', qtdGeral: 1, cidades: { BH: 0, 'Santa Maria': 1 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 8, modelo: 'IGNITE V300', sabor: 'Strawberry Ice', qtdGeral: 1, cidades: { BH: 0, 'Santa Maria': 1 }, precoCompra: 79.00, precoVenda: 145.00 },

        { id: 9, modelo: 'IGNITE V500', sabor: 'Pineapple Mango', qtdGeral: 2, cidades: { BH: 1, 'Santa Maria': 1 }, precoCompra: 98.00, precoVenda: 160.00 },
        { id: 10, modelo: 'IGNITE V500', sabor: 'Kiwi Açaí', qtdGeral: 2, cidades: { BH: 1, 'Santa Maria': 1 }, precoCompra: 98.00, precoVenda: 160.00 },
        { id: 11, modelo: 'IGNITE V500', sabor: 'Watermelon Kiwi', qtdGeral: 2, cidades: { BH: 1, 'Santa Maria': 1 }, precoCompra: 98.00, precoVenda: 160.00 },
        { id: 12, modelo: 'IGNITE V500', sabor: 'Grape Ice', qtdGeral: 1, cidades: { BH: 0, 'Santa Maria': 1 }, precoCompra: 98.00, precoVenda: 160.00 },
        { id: 13, modelo: 'IGNITE V500', sabor: 'Strawberry Apple Watermelon', qtdGeral: 1, cidades: { BH: 0, 'Santa Maria': 1 }, precoCompra: 98.00, precoVenda: 160.00 },

        { id: 14, modelo: 'ELF BAR ICE KING 40K', sabor: 'Strawberry Ice', qtdGeral: 3, cidades: { BH: 1, 'Santa Maria': 2 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 15, modelo: 'ELF BAR ICE KING 40K', sabor: 'Watermelon Ice', qtdGeral: 2, cidades: { BH: 0, 'Santa Maria': 2 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 16, modelo: 'ELF BAR ICE KING 40K', sabor: 'Green Apple', qtdGeral: 2, cidades: { BH: 1, 'Santa Maria': 1 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 17, modelo: 'ELF BAR ICE KING 40K', sabor: 'Baja Splash', qtdGeral: 2, cidades: { BH: 1, 'Santa Maria': 1 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 18, modelo: 'ELF BAR ICE KING 40K', sabor: 'Coca', qtdGeral: 2, cidades: { BH: 1, 'Santa Maria': 1 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 19, modelo: 'ELF BAR ICE KING 40K', sabor: 'Dragon Strawberry Banana', qtdGeral: 1, cidades: { BH: 1, 'Santa Maria': 0 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 20, modelo: 'ELF BAR ICE KING 40K', sabor: 'Double Apple Ice', qtdGeral: 1, cidades: { BH: 1, 'Santa Maria': 0 }, precoCompra: 79.00, precoVenda: 145.00 },
        { id: 21, modelo: 'ELF BAR ICE KING 40K', sabor: 'Grape Ice', qtdGeral: 1, cidades: { BH: 1, 'Santa Maria': 0 }, precoCompra: 79.00, precoVenda: 145.00 },

        { id: 22, modelo: 'V80 ULTRA SLIM', sabor: 'Strawberry Kiwi', qtdGeral: 1, cidades: { BH: 0, 'Santa Maria': 1 }, precoCompra: 60.00, precoVenda: 115.00 },
        { id: 23, modelo: 'V80 ULTRA SLIM', sabor: 'Grape Ice', qtdGeral: 1, cidades: { BH: 0, 'Santa Maria': 1 }, precoCompra: 60.00, precoVenda: 115.00 },
        { id: 24, modelo: 'V80 ULTRA SLIM', sabor: 'Passion Fruit Sour Kiwi', qtdGeral: 1, cidades: { BH: 0, 'Santa Maria': 1 }, precoCompra: 60.00, precoVenda: 115.00 }
    ],
    vendas: {}
};

const CHAVE_STORAGE = 'controle_pessoal_novo_2024';

document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    inicializarDatas();
    renderizarDashboard();
    carregarDiaVape();
    renderizarReceitas();
    renderizarDespesas();
    renderizarEstoque();
});

function carregarDados() {
    const saved = localStorage.getItem(CHAVE_STORAGE);
    if (saved) {
        dados = JSON.parse(saved);
    } else {
        salvarDados();
    }
}

function salvarDados() {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(dados));
}

function reiniciarApp() {
    if (confirm('Deseja reiniciar e carregar os dados iniciais?')) {
        localStorage.clear();
        location.reload();
    }
}

function inicializarDatas() {
    const hoje = new Date();
    document.getElementById('vapeData').value = hoje.toISOString().split('T')[0];
}

function tab(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');
    event.target.classList.add('active');
}

function abaModo(modo) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));

    if (modo === 'vendas') {
        document.getElementById('abaVendas').classList.add('active');
        document.querySelectorAll('#abaVendas').previousElementSibling?.querySelectorAll('.sub-tab')[0]?.classList.add('active');
    } else {
        document.getElementById('abaEstoque').classList.add('active');
        document.querySelectorAll('#abaEstoque').previousElementSibling?.querySelectorAll('.sub-tab')[1]?.classList.add('active');
    }
}

function trocarEstoque(view) {
    document.getElementById('estoqueGeral').classList.remove('active');
    document.getElementById('estoqueBH').classList.remove('active');
    document.getElementById('estoqueSM').classList.remove('active');
    document.querySelectorAll('#abaEstoque .sub-tab').forEach(t => t.classList.remove('active'));

    if (view === 'geral') {
        document.getElementById('estoqueGeral').classList.add('active');
    } else if (view === 'bh') {
        document.getElementById('estoqueBH').classList.add('active');
    } else {
        document.getElementById('estoqueSM').classList.add('active');
    }

    event.target.classList.add('active');
}

function carregarDiaVape() {
    const data = document.getElementById('vapeData').value;
    if (!dados.vendas[data]) {
        dados.vendas[data] = [];
    }

    const cidade = document.getElementById('vapeCidade').value;

    const select = document.getElementById('vapeProduto');
    select.innerHTML = '<option value="">Selecione...</option>';

    const produtosUnicos = {};
    dados.estoque.forEach(p => {
        const key = `${p.modelo}`;
        if (!produtosUnicos[key]) {
            produtosUnicos[key] = [];
        }
        produtosUnicos[key].push(p);
    });

    Object.keys(produtosUnicos).forEach(key => {
        const items = produtosUnicos[key];
        const optgroup = document.createElement('optgroup');
        optgroup.label = key;

        items.forEach(p => {
            const qtdCidade = p.cidades[cidade] || 0;
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.sabor} (${qtdCidade})`;
            optgroup.appendChild(option);
        });

        select.appendChild(optgroup);
    });

    renderizarVendas();
}

function preencherPreco() {
    const id = parseInt(document.getElementById('vapeProduto').value);
    const produto = dados.estoque.find(p => p.id === id);
    if (produto) {
        document.getElementById('vapePreco').value = produto.precoVenda.toFixed(2);
    }
}

function registrarVenda() {
    const data = document.getElementById('vapeData').value;
    const produtoId = parseInt(document.getElementById('vapeProduto').value);
    const qtd = parseInt(document.getElementById('vapeQtd').value) || 0;
    const preco = parseFloat(document.getElementById('vapePreco').value) || 0;
    const cidade = document.getElementById('vapeCidade').value;

    if (!produtoId || qtd <= 0 || preco <= 0) {
        alert('Preencha todos os campos corretamente');
        return;
    }

    const produto = dados.estoque.find(p => p.id === produtoId);
    if (!produto) return;

    if ((produto.cidades[cidade] || 0) < qtd) {
        alert(`Estoque insuficiente em ${cidade}`);
        return;
    }

    if (!dados.vendas[data]) {
        dados.vendas[data] = [];
    }

    dados.vendas[data].push({
        id: produtoId,
        nome: `${produto.modelo} - ${produto.sabor}`,
        qtd: qtd,
        preco: preco,
        cidade: cidade
    });

    produto.qtdGeral -= qtd;
    produto.cidades[cidade] -= qtd;

    document.getElementById('vapeProduto').value = '';
    document.getElementById('vapeQtd').value = '1';
    document.getElementById('vapePreco').value = '';

    salvarDados();
    carregarDiaVape();
    renderizarEstoque();
    renderizarDashboard();
}

function removerVenda(dataStr, index) {
    const venda = dados.vendas[dataStr][index];
    const produto = dados.estoque.find(p => p.id === venda.id);
    if (produto) {
        produto.qtdGeral += venda.qtd;
        produto.cidades[venda.cidade] += venda.qtd;
    }

    dados.vendas[dataStr].splice(index, 1);
    salvarDados();
    carregarDiaVape();
    renderizarEstoque();
    renderizarDashboard();
}

function renderizarVendas() {
    const data = document.getElementById('vapeData').value;
    const vendas = dados.vendas[data] || [];
    const tbody = document.getElementById('vapeVendasBody');

    tbody.innerHTML = vendas.map((v, i) => `
        <tr>
            <td>${v.nome}</td>
            <td class="num">${v.qtd}</td>
            <td class="num">R$ ${v.preco.toFixed(2)}</td>
            <td class="num">R$ ${(v.qtd * v.preco).toFixed(2)}</td>
            <td>${v.cidade}</td>
            <td><button class="btn" onclick="removerVenda('${data}', ${i})" style="color: var(--rd);">✕</button></td>
        </tr>
    `).join('');
}

function renderizarEstoque() {
    const renderTable = (tbody, view) => {
        tbody.innerHTML = dados.estoque.map(p => {
            let qtd = p.qtdGeral;
            if (view === 'BH') qtd = p.cidades.BH || 0;
            else if (view === 'Santa Maria') qtd = p.cidades['Santa Maria'] || 0;

            const lucro = p.precoVenda - p.precoCompra;
            const margem = p.precoVenda > 0 ? ((lucro) / p.precoVenda * 100) : 0;

            return `
                <tr>
                    <td>${p.modelo}</td>
                    <td style="font-size: 12px; color: var(--text-secondary);">${p.sabor}</td>
                    <td class="num">${qtd}</td>
                    <td class="num">R$ ${p.precoCompra.toFixed(2)}</td>
                    <td class="num">R$ ${p.precoVenda.toFixed(2)}</td>
                    <td class="num">R$ ${lucro.toFixed(2)}</td>
                    <td class="num margin-positive">${margem.toFixed(1)}%</td>
                </tr>
            `;
        }).join('');
    };

    renderTable(document.getElementById('estoqueGeralBody'), 'Geral');
    renderTable(document.getElementById('estoqueBHBody'), 'BH');
    renderTable(document.getElementById('estoqueSMBody'), 'Santa Maria');
}

function adicionarProduto() {
    const modelo = document.getElementById('novoProdutoModelo').value.trim();
    const sabor = document.getElementById('novoProdutoSabor').value.trim();
    const qtdBH = parseInt(document.getElementById('novoProdutoQtdBH').value) || 0;
    const qtdSM = parseInt(document.getElementById('novoProdutoQtdSM').value) || 0;
    const precoCompra = parseFloat(document.getElementById('novoProdutoCompra').value) || 0;
    const precoVenda = parseFloat(document.getElementById('novoProdutoVenda').value) || 0;

    if (!modelo || !sabor || qtdBH < 0 || qtdSM < 0 || precoCompra <= 0 || precoVenda <= 0) {
        alert('Preencha os campos corretamente');
        return;
    }

    const id = Math.max(...dados.estoque.map(p => p.id), 0) + 1;
    dados.estoque.push({
        id: id,
        modelo: modelo,
        sabor: sabor,
        qtdGeral: qtdBH + qtdSM,
        cidades: { BH: qtdBH, 'Santa Maria': qtdSM },
        precoCompra: precoCompra,
        precoVenda: precoVenda
    });

    document.getElementById('novoProdutoModelo').value = '';
    document.getElementById('novoProdutoSabor').value = '';
    document.getElementById('novoProdutoQtdBH').value = '0';
    document.getElementById('novoProdutoQtdSM').value = '0';
    document.getElementById('novoProdutoCompra').value = '';
    document.getElementById('novoProdutoVenda').value = '';

    salvarDados();
    renderizarEstoque();
    carregarDiaVape();
}

function renderizarDashboard() {
    const totalReceitaFixa = dados.receitas.reduce((sum, r) => sum + r.valor, 0);
    const totalDespesaFixa = dados.despesas.reduce((sum, d) => sum + d.valor, 0);
    const totalVendas = Object.values(dados.vendas).flat().reduce((sum, v) => sum + (v.qtd * v.preco), 0);

    document.getElementById('dashReceitaFixa').textContent = `R$ ${totalReceitaFixa.toLocaleString('pt-BR')}`;
    document.getElementById('dashReceitaVape').textContent = `R$ ${totalVendas.toLocaleString('pt-BR')}`;
    document.getElementById('dashDespesaFixa').textContent = `R$ ${totalDespesaFixa.toLocaleString('pt-BR')}`;
    document.getElementById('dashSaldo').textContent = `R$ ${(totalReceitaFixa + totalVendas - totalDespesaFixa).toLocaleString('pt-BR')}`;

    document.getElementById('dashReceitasBody').innerHTML = dados.receitas.map(r => `
        <tr>
            <td>${r.nome}</td>
            <td class="num text-green">R$ ${r.valor.toLocaleString('pt-BR')}</td>
            <td><span style="background: var(--bg3); padding: 4px 8px; border-radius: 4px;">Dia ${r.dia}</span></td>
        </tr>
    `).join('');

    const ultimasVendas = Object.values(dados.vendas).flat().slice(-5).reverse();
    document.getElementById('dashVendasBody').innerHTML = ultimasVendas.map(v => `
        <tr>
            <td>${v.nome}</td>
            <td class="num">${v.qtd}</td>
            <td class="num">R$ ${(v.qtd * v.preco).toLocaleString('pt-BR')}</td>
        </tr>
    `).join('');
}

function renderizarReceitas() {
    document.getElementById('receitasBody').innerHTML = dados.receitas.map(r => `
        <tr>
            <td>${r.nome}</td>
            <td class="num text-green">R$ ${r.valor.toLocaleString('pt-BR')}</td>
            <td><span style="background: var(--bg3); padding: 4px 8px; border-radius: 4px;">Dia ${r.dia}</span></td>
            <td><button class="btn" onclick="editarReceita(${r.id})" style="color: var(--bl);">Editar</button></td>
        </tr>
    `).join('');
}

function renderizarDespesas() {
    document.getElementById('despesasBody').innerHTML = dados.despesas.map(d => `
        <tr>
            <td>${d.descricao}</td>
            <td class="num text-red">R$ ${d.valor.toLocaleString('pt-BR')}</td>
            <td><span style="background: var(--bg3); padding: 4px 8px; border-radius: 4px;">Dia ${d.dia}</span></td>
            <td><button class="btn" onclick="editarDespesa(${d.id})" style="color: var(--bl);">Editar</button></td>
        </tr>
    `).join('');
}

function editarReceita(id) {
    const receita = dados.receitas.find(r => r.id === id);
    if (!receita) return;

    const novoValor = prompt(`Novo valor para ${receita.nome}:`, receita.valor);
    if (novoValor !== null && novoValor !== '') {
        receita.valor = parseFloat(novoValor) || receita.valor;
        salvarDados();
        renderizarReceitas();
        renderizarDashboard();
    }
}

function editarDespesa(id) {
    const despesa = dados.despesas.find(d => d.id === id);
    if (!despesa) return;

    const novoValor = prompt(`Novo valor para ${despesa.descricao}:`, despesa.valor);
    if (novoValor !== null && novoValor !== '') {
        despesa.valor = parseFloat(novoValor) || despesa.valor;
        salvarDados();
        renderizarDespesas();
        renderizarDashboard();
    }
}
