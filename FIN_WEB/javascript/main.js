let despesas = [];
const adicionarUrl = 'http://localhost:8080/despesa/adicionar';
const getAllUrl = 'http://localhost:8080/despesa/all';

function enviarDespesa(){
    const url = adicionarUrl;
    const formulario = document.getElementById('formDespesa');

    const dados={
        valor: formulario.valor.value,
        data: formulario.data.value,
        tipo: formulario.tipo.value,
        descricacao: formulario.descricacao.value
    };

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Despesa adicionada com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao adicionar a despesa:', error);
    });
}