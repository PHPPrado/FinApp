let despesas = [];
var adicionarUrlDespesa = 'http://localhost:8080/despesa/adicionar';
var getAllUrlDespesa = 'http://localhost:8080/despesa/all';

function enviarDespesa() {
    var url = adicionarUrlDespesa;
    var formularioDespesa = document.getElementById('formDespesa');

    console.log(formularioDespesa);
    var dadosDespesa={
        valor: formularioDespesa.valor.value,
        data: formularioDespesa.date.value,
        tipo: formularioDespesa.tipo.value,
        descricao: formularioDespesa.descricao.value
    };

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosDespesa),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
        alert("Dados enviados com sucesso!");
        return response.json();
        
    })
    .then(data => {
        console.log('Despesa adicionada com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao adicionar a despesa:', error);
    });
};
