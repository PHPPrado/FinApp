var getAllRenda = 'http://localhost:8080/renda/all';
var getAllDespesa = 'http://localhost:8080/despesa/all';


async function popularTabela() {
    try {
        await getDespesas();
        await getRenda();

        var dadosConjunto = renda.concat(despesas);
        dadosConjunto.sort((a, b) => new Date(b.data) - new Date(a.data));

        console.log('Dados:', dadosConjunto);

        var tabela = document.getElementById('tabela');
        var tbody = tabela.getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Limpe a tabela antes de popular

        // Preencha a tabela com os dados
        for (var i = 0; i < dadosConjunto.length; i++) {
            var linha = tbody.insertRow(-1);
            var celulaValor = linha.insertCell(0);
            var celulaTipo = linha.insertCell(1);
            var celulaDescricao = linha.insertCell(2);
            var celulaData = linha.insertCell(3);

            celulaValor.textContent = `R$${dadosConjunto[i].valor.toFixed(2)}`;
            celulaTipo.textContent = dadosConjunto[i].tipo.toUpperCase();
            celulaDescricao.textContent = dadosConjunto[i].descricao;
            celulaData.textContent = formatarData(dadosConjunto[i].data);



            // Adicione classes text-center e font-league
            [celulaValor, celulaTipo, celulaDescricao, celulaData].forEach(celula => {
                celula.classList.add('text-center', 'font-league');
            });

            // Ajuste de estilo diretamente usando a propriedade style
            if (
                dadosConjunto[i].tipo.toLowerCase() === 'salário' ||
                dadosConjunto[i].tipo.toLowerCase() === 'bônus' ||
                dadosConjunto[i].tipo.toLowerCase() === 'presentes' ||
                dadosConjunto[i].tipo.toLowerCase() === 'outro' ||
                dadosConjunto[i].tipo.toLowerCase() === 'prêmios'
                ) {
                celulaValor.style.color = '#00FF00'; // Verde
            } else {
                celulaValor.style.color = '#FF0000'; // Vermelho
            }
        }
    } catch (error) {
        console.error('Erro ao popular a tabela:', error);
    }
}

async function getDespesas() {
    var url = getAllDespesa;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro de rede! Status: ${response.status}`);
        }

        const data = await response.json();
        despesas = data;
        console.log('Despesas:', despesas);
    } catch (error) {
        console.error('Erro na requisição de despesas:', error);
        throw error;
    }
}

async function getRenda() {
    var url = getAllRenda;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro de rede! Status: ${response.status}`);
        }

        const data = await response.json();
        renda = data;
        console.log('Renda:', renda);
    } catch (error) {
        console.error('Erro na requisição de renda:', error);
        throw error;
    }
}

// Função para formatar a data no estilo dd/mm/yyyy
function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Chame a função principal
popularTabela();
