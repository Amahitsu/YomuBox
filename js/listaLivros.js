document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('itemInput');
    const button = document.getElementById('buttonAdd');
    const itemList = document.getElementById('list-livros');
    const tituloElemento = document.getElementById('tituloLista'); // Elemento <h1> para o título
    let editingItem = null; // Variável para armazenar o item que está sendo editado

    // Captura o título da lista da URL
    const urlParams = new URLSearchParams(window.location.search);
    const listTitle = urlParams.get('titulo') || 'Minha Lista de Livros'; // Título padrão se não houver parâmetro

    // Atualiza o elemento <h1> com o título da lista
    tituloElemento.textContent = `${listTitle}`;

    // Função para adicionar um item
    function addItem() {
        const itemText = input.value.trim();

        if (itemText !== '') {
            if (editingItem) {
                // Atualizar item existente
                const textNode = editingItem.querySelector('.divList').childNodes[1];
                textNode.textContent = itemText;
                editingItem = null; // Limpar a referência ao item editado
            } else {
                const li = document.createElement('li');
                const div = document.createElement('div');
                const div2 = document.createElement('div');
                div.className = "divList";
                div2.className = "divButton";

                // Criar uma checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';

                // Criar um elemento para o texto do item
                const textNode = document.createTextNode(itemText);

                // Adicionar a checkbox e o texto ao item da lista
                div.appendChild(checkbox);
                div.appendChild(textNode);

                // Adicionar visor de contador
                const counterDisplay = document.createElement('span');
                counterDisplay.textContent = '0';
                counterDisplay.className = 'counter-display';
                div2.appendChild(counterDisplay);

                // Adicionar botões de incremento e decremento para o contador
                const buttonIncrement = document.createElement('button');
                buttonIncrement.textContent = '+';
                buttonIncrement.addEventListener('click', () => {
                    updateCounter(counterDisplay, 1);
                });
                div2.appendChild(buttonIncrement);

                const buttonDecrement = document.createElement('button');
                buttonDecrement.textContent = '-';
                buttonDecrement.addEventListener('click', () => {
                    updateCounter(counterDisplay, -1);
                });
                div2.appendChild(buttonDecrement);

                // Adicionar um botão de remover
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remover';
                removeButton.addEventListener('click', () => {
                    itemList.removeChild(li);
                    saveList(); // Salvar a lista após remover um item
                });

                // Adicionar um botão de editar
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.classList.add('edit-button');
                editButton.addEventListener('click', () => {
                    input.value = textNode.textContent;
                    editingItem = li; // Armazena o item que está sendo editado
                });

                li.appendChild(div);
                li.appendChild(div2);
                div2.appendChild(editButton);
                div2.appendChild(removeButton);
                itemList.appendChild(li);
            }

            // Limpar o campo de input
            input.value = '';

            // Salvar a lista
            saveList();
        }
    }

    // Função para atualizar o valor do contador
    function updateCounter(counterDisplay, delta) {
        const currentValue = parseInt(counterDisplay.textContent) || 0;
        const newValue = currentValue + delta;
        if (newValue >= 0) { // Evita valores negativos
            counterDisplay.textContent = newValue;
            saveList(); // Salvar a lista após atualizar o contador
        }
    }

    // Função para salvar a lista no Local Storage
    function saveList() {
        const items = [];
        itemList.querySelectorAll('li').forEach(li => {
            const itemText = li.querySelector('.divList').childNodes[1].textContent;
            const checked = li.querySelector('input').checked;
            const counter = li.querySelector('.counter-display').textContent;
            items.push({ text: itemText, checked: checked, counter: parseInt(counter) });
        });
        localStorage.setItem(`itemList_${listTitle}`, JSON.stringify(items));
    }

    // Função para carregar a lista do Local Storage
    function loadList() {
        const items = JSON.parse(localStorage.getItem(`itemList_${listTitle}`)) || [];
        items.forEach(item => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            const div2 = document.createElement('div');
            div.className = "divList";
            div2.className = "divButton";

            // Criar uma checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.checked;

            // Criar um elemento para o texto do item
            const textNode = document.createTextNode(item.text);

            // Adicionar a checkbox e o texto ao item da lista
            div.appendChild(checkbox);
            div.appendChild(textNode);

            // Adicionar visor de contador
            const counterDisplay = document.createElement('span');
            counterDisplay.textContent = item.counter || '0';
            counterDisplay.className = 'counter-display';
            div2.appendChild(counterDisplay);

            // Adicionar botões de incremento e decremento para o contador
            const buttonIncrement = document.createElement('button');
            buttonIncrement.textContent = '+';
            buttonIncrement.addEventListener('click', () => {
                updateCounter(counterDisplay, 1);
            });
            div2.appendChild(buttonIncrement);

            const buttonDecrement = document.createElement('button');
            buttonDecrement.className = "buttonIncrementDecrement";
            buttonDecrement.textContent = '-';
            buttonDecrement.addEventListener('click', () => {
                updateCounter(counterDisplay, -1);
            });
            div2.appendChild(buttonDecrement);

            // Adicionar um botão de remover
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => {
                itemList.removeChild(li);
                saveList(); // Salvar a lista após remover um item
            });

            // Adicionar um botão de editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', () => {
                input.value = textNode.textContent;
                editingItem = li; // Armazena o item que está sendo editado
            });

            li.appendChild(div);
            li.appendChild(div2);
            div2.appendChild(editButton);
            div2.appendChild(removeButton);
            itemList.appendChild(li);
        });
    }

    // Adicionar item ao clicar no botão
    button.addEventListener('click', addItem);

    // Adicionar item ao pressionar Enter
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItem();
            event.preventDefault(); // Evita a submissão do formulário se houver um
        }
    });

    // Carregar a lista quando a página for carregada
    loadList();
});
