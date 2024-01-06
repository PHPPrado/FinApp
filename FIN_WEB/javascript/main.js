const btnAddRenda = document.querySelector('.btnAddRenda');
const formRenda = document.querySelector('#formRenda');
const btnAddDespesa = document.querySelector('.btnAddDespesa');
const formDespesa = document.querySelector('#formDespesa');

function gerarFormulario(){

}

btnAddRenda.addEventListener('click', ()=>{
    formRenda.classList.toggle('hidden');
    formDespesa.classList.add('hidden');

})
btnAddDespesa.addEventListener('click', ()=>{
    formDespesa.classList.toggle('hidden');
    formRenda.classList.add('hidden');

})