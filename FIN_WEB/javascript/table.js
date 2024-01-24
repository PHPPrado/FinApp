//const axios = require('axios');

var getAllRenda = 'http://localhost:8080/renda/all';
var getAllDespesa = 'http://localhost:8080/despesa/all';

var mes = document.getElementById('filtroMes').value;

async function conjunto(){

        await getDespesas();
        await getRenda();

        calcularFinanceiro(renda, despesas);
        resumoGeral(renda, despesas)

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

        // ...

        // Calcular a diferença entre renda e despesas
        var diferenca = somaRenda - somaDespesas;

        console.log('Soma Total Renda:', somaRenda.toFixed(2));
        console.log('Soma Total Despesas:', somaDespesas.toFixed(2));
        console.log('Diferença (Renda - Despesas):', diferenca.toFixed(2));

        // Preencher os elementos HTML com os valores calculados
        document.getElementById('valorConta').textContent = `R$${(somaRenda - valorInvestido - somaDespesas).toFixed(2)}`;
        document.getElementById('valorDespesas').textContent = `-R$${somaDespesas.toFixed(2)}`;
        document.getElementById('valorInvestido').textContent = `R$${valorInvestido.toFixed(2)}`;
        document.getElementById('valorTotal').textContent = `R$${(diferenca + valorInvestido).toFixed(2)}`;



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

    document.getElementById('editValor').value = valor;
    document.getElementById('editTipo').value = tipo;
    document.getElementById('editDescricao').value = descricao;
    document.getElementById('editDate').value = data;

    formEdit.classList.toggle('hidden');

    document.getElementById('btnEditar').onclick = async function () {
        var novoValor = document.getElementById('editValor').value;
        var novoTipo = document.getElementById('editTipo').value;
        var novaDescricao = document.getElementById('editDescricao').value;
        var novaData = document.getElementById('editDate').value;

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
        method: 'PUT',
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


function getMonthName() {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const currentDate = new Date();
    return months[currentDate.getMonth()];
    
  }
  
  // Função para calcular a receita e despesa mensal considerando apenas o mês atual
  function calcularFinanceiro(renda, despesas) {
    const currentDate = new Date(); // Adicionando esta linha para obter a data atual
    const mesAtual = getMonthName();
    document.getElementById("mesAtual").textContent = mesAtual;
    console.log("Mês Atual:", mesAtual);
  
    const receitasDoMes = renda.filter(item => {
      const [ano, mes] = item.data.split('-');
      console.log("Item de Renda:", item);
      console.log("Ano e Mês:", ano, mes);
      return parseInt(mes, 10) === (currentDate.getMonth() + 1) && parseInt(ano, 10) === currentDate.getFullYear();
    });
  
    const despesasDoMes = despesas.filter(despesa => {
      const [ano, mes] = despesa.data.split('-');
      console.log("Item de Despesa:", despesa);
      console.log("Ano e Mês:", ano, mes);
      return parseInt(mes, 10) === (currentDate.getMonth() + 1) && parseInt(ano, 10) === currentDate.getFullYear();
    });
  
    const receitaMensal = receitasDoMes.reduce((total, item) => total + item.valor, 0);
    const despesaMensal = despesasDoMes.reduce((total, despesa) => total + despesa.valor, 0);
  
    // Atualizar o HTML com os valores calculados
    console.log("Receita Mensal:", receitaMensal);
    console.log("Despesa Mensal:", despesaMensal);
  
    document.getElementById("rendaMes").textContent = `+R$${receitaMensal.toFixed(2)}`;
    document.getElementById("despesaMes").textContent = `-R$${despesaMensal.toFixed(2)}`;
  }


  function resumoGeral(renda, despesas){

    
    var somaRenda = 0;
    var somaDespesas = 0;
    var somaDespesasAno = 0;
    var valorInvestido = 1650;

    for (var i = 0; i < renda.length; i++) {
        somaRenda += renda[i].valor;
    }
    for (var i = 0; i < despesas.length; i++) {
        somaDespesas += despesas[i].valor;
    }

    // Filtrar as despesas do ano atual
    var despesasDoAnoAtual = despesas.filter(function (despesa) {
        var anoDespesa = new Date(despesa.data).getFullYear();
        var anoAtual = new Date().getFullYear();
        return anoDespesa === anoAtual;
    });

    for (var i = 0; i < despesasDoAnoAtual.length; i++) {
        somaDespesasAno += despesasDoAnoAtual[i].valor;
    }    

    // Calcular a diferença entre renda e despesas
    var diferenca = somaRenda - somaDespesas;

    var dataVar = new Date();
    var anoAtual = dataVar.getFullYear();

    console.log('Soma Total Renda:', somaRenda.toFixed(2));
    console.log('Soma Total Despesas:', somaDespesas.toFixed(2));
    console.log('Diferença (Renda - Despesas):', diferenca.toFixed(2));

    // Preencher os elementos HTML com os valores calculados
    document.getElementById('valorConta').textContent = `R$${(somaRenda - valorInvestido - somaDespesas).toFixed(2)}`;
    document.getElementById('textDespesasResumo').textContent = `Despesas ${anoAtual}`;
    document.getElementById('valorDespesas').textContent = `-R$${somaDespesasAno.toFixed(2)}`;
    document.getElementById('valorInvestido').textContent = `R$${valorInvestido.toFixed(2)}`;
    document.getElementById('valorTotal').textContent = `R$${(diferenca + valorInvestido).toFixed(2)}`;

  }


// Chame a função principal
conjunto();

