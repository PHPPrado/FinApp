//const axios = require('axios');

var getAllRenda = 'http://localhost:8080/renda/all';
var getAllDespesa = 'http://localhost:8080/despesa/all';

var mes = document.getElementById('filtroMes').value;

async function conjunto(){

        await getDespesas();
        await getRenda();

        var dadosConjunto = renda.concat(despesas);
        dadosConjunto.sort((a, b) => new Date(b.data) - new Date(a.data));

        popularTabela(dadosConjunto);
}


async function popularTabela(dadosConjunto) {
    try {


        document.getElementById('filtroMes').addEventListener('change', function () {
            
            getDespesas();
            getRenda();
    
            dadosConjunto = renda.concat(despesas);
            dadosConjunto.sort((a, b) => new Date(b.data) - new Date(a.data));


            var mesSelecionado = parseInt(this.value);
            console.log(mesSelecionado);

            if(mesSelecionado == 0){
                conjunto()
            }
        
            var dadosMes = dadosConjunto.filter(function (dado) {
                var mesDado = new Date(dado.data).getMonth() + 1;
                return mesDado === mesSelecionado;
            });
        
            dadosMes.sort((a, b) => new Date(b.data).getDate() - new Date(a.data).getDate());
            dadosConjunto = dadosMes;
        
            popularTabela(dadosConjunto);
        });
        
        

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
            
            // Criar botões de Editar e Excluir
            var celulaEditar = linha.insertCell(4);
            var celulaExcluir = linha.insertCell(5);

            // Adicionar botões aos seus respectivos registros
            celulaEditar.innerHTML = '<button class="hover:scale-95 transition duration-500" onclick="abrirModalEdicao(' + dadosConjunto[i].id + ', \'' + dadosConjunto[i].tipo + '\', \'' + dadosConjunto[i].descricao + '\', ' + dadosConjunto[i].valor + ', \'' + dadosConjunto[i].data + '\')"> <img class="w-8" src="images/editar.png"> </button>';
            celulaExcluir.innerHTML = '<button class="hover:scale-95 transition duration-500" onclick="excluirRegistro(' + dadosConjunto[i].id + ', \'' + dadosConjunto[i].tipo + '\')"> <img class="w-8" src="images/remover.png"> </button>';
            

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



async function excluirRegistro(id, tipo){

    console.log('Excluir registro com ID:', id);
    console.log(tipo)


    var modal = document.getElementById('popup-modal');
    modal.classList.remove('hidden');
    var confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.onclick = async function () {

        if(tipo == 'salário' || tipo == 'bônus' || tipo == 'prêmios' || tipo == 'presentes' || tipo == 'outro'){
            var url = `http://localhost:8080/renda/deletar/${id}`;
        } else{
            var url = `http://localhost:8080/despesa/deletar/${id}`;
        }

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Erro ao excluir registro! Status: ${response.status}`);
            }

            console.log('Registro excluído com sucesso!');
            modal.classList.add('hidden');
            conjunto();
        } catch (error) {
            console.error('Erro na exclusão do registro:', error);
        }
    }

    modal.onclick = cancelBtn.onclick = function () {
        modal.classList.add('hidden');
    };
}


function abrirModalEdicao(id, tipo, descricao, valor, data) {
    var formEdit = document.getElementById('formEdit');

    document.getElementById('valor').value = valor;
    document.getElementById('tipo').value = tipo;
    document.getElementById('descricao').value = descricao;
    document.getElementById('date').value = data;




    formEdit.classList.remove('hidden');

    document.getElementById('btnEditar').onclick = async function () {
        var novoValor = document.getElementById('valor').value;
        var novoTipo = document.getElementById('tipo').value;
        var novaDescricao = document.getElementById('descricao').value;
        var novaData = document.getElementById('date').value;

        await editarRegistro(id, novoTipo, novaDescricao, novoValor, novaData);

        formEdit.classList.add('hidden');
    };
}

function editarRegistro(id, tipo, descricao, valor, data){

    
    if(tipo == 'salário' || tipo == 'bônus' || tipo == 'prêmios' || tipo == 'presentes' || tipo == 'outro'){
        var url = `http://localhost:8080/renda/editar/${id}`;
    } else{
        var url = `http://localhost:8080/despesa/editar/${id}`;
    }

    console.log(formEdit);
    var dadosEditar={
        valor: formEdit.valor.value,
        data: formEdit.date.value,
        tipo: formEdit.tipo.value,
        descricao: formEdit.descricao.value
    };

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosEditar),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        alert("Dados editados com sucesso!");
        conjunto();
        return response.json();
        
    })
    .then(data => {
        console.log('Dados editados com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao editar dados:', error);
    });


}


// Chame a função principal
conjunto();
