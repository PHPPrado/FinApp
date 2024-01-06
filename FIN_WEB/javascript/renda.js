let rendas = [];
var adicionarUrlRenda = 'http://localhost:8080/renda/adicionar';
var getAllUrlRenda = 'http://localhost:8080/renda/all';
const formRenda2 = document.querySelector('#formRenda');

function enviarRenda() {
    var url = adicionarUrlRenda;
    var formularioRenda = document.getElementById('formRenda');
    console.log(formularioRenda)

    console.log(formularioRenda);
    var dadosRenda={
        valor: formularioRenda.valor.value,
        data: formularioRenda.date.value,
        tipo: formularioRenda.tipo.value,
        descricao: formularioRenda.descricao.value
    };

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosRenda),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        formRenda2.classList.toggle('hidden');
        alert("Dados enviados com sucesso!");
        return response.json();
        
    })
    .then(data => {
        console.log('Renda adicionada com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao adicionar a renda:', error);
    });
};