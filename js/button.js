function fecharAviso() {
    const alertBox = document.getElementById('messageOverlay');
    alertBox.style.display = 'none'; // Esconde a caixa de aviso
}

function retornar(){
    window.history.back();
}

function sair(){
    window.location.href = '../index.html'; //Redirect para localhost
    //window.location.href = '/YomuBox/index.html'; //Redirect para GitHub Pages
}

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('list-list');
    const addButton = document.getElementById('adicionarLista');

    // Função para carregar listas salvas no localStorage
    function loadLists() {
        const storedLists = JSON.parse(localStorage.getItem('listas')) || [];
        storedLists.forEach(list => createListElement(list.title));
    }

    // Função para criar e adicionar um novo botão de lista
    function createListElement(title) {
        const li = document.createElement('li');
        const div3 = document.createElement('div');
        const div4 = document.createElement('div');
        div3.className = "list-list";
        div4.className = "buttons-list";


        const input = document.createElement('input');
        input.className = "inputTitleList";
        input.type = 'text';
        input.classList.add('poppins-bold');
        input.value = title;
        input.style.marginRight = '10px';

        input.addEventListener('input', () => {
            saveLists(); // Salva a lista sempre que o título é alterado
        });

        const button = document.createElement('button');
        button.classList.add('poppins-black');
        button.textContent = `Acessar Lista`;
        button.addEventListener('click', () => {
            window.location.href = `listaLivros.html?titulo=${encodeURIComponent(input.value)}`;
        });

        const removeButton = document.createElement('button');
        removeButton.classList.add('poppins-black');
        removeButton.textContent = 'Remover';
        removeButton.style.marginLeft = '10px';
        removeButton.addEventListener('click', () => {
            li.remove();
            saveLists(); // Salvar a lista após remover um item
        });

        li.appendChild(div4);
        li.appendChild(div3);
        div3.appendChild(div4)
        div4.appendChild(button);
        div4.appendChild(removeButton);
        div3.appendChild(input);
        listContainer.appendChild(li);
    }

    // Função para salvar as listas no localStorage
    function saveLists() {
        const lists = [];
        listContainer.querySelectorAll('li').forEach(li => {
            const title = li.querySelector('input').value;
            lists.push({ title });
        });
        localStorage.setItem('listas', JSON.stringify(lists));
    }

    // Função para adicionar uma nova lista
    function adicionarLista() {
        const newListTitle = `Nova Lista ${listContainer.childElementCount + 1}`;
        createListElement(newListTitle);
        saveLists(); // Salvar a nova lista no localStorage
    }

    // Carregar listas salvas ao iniciar a página
    loadLists();

    // Associar a função ao botão "Adicionar Lista"
    addButton.addEventListener('click', adicionarLista);
});