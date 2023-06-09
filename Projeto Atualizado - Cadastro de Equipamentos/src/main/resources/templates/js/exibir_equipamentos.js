fetch('http://localhost:8080/equipamentos') // substitua com a URL da sua API
    .then(response => response.json()) // converte a resposta para JSON
    .then(data => {
        // 'data' contém os dados da resposta da API
        console.log(data); // exibe os dados no console

        // Exemplo de exibição em uma lista HTML
        const lista = document.getElementById('equipamentos-lista'); // substitua com o ID do elemento HTML onde você deseja exibir a lista

        data.forEach(equipo => {
            const listEquipo = document.createElement('li'); // cria linha para armazenar descrição e observação do equipamento
            listEquipo.className = "lista-equipamentos__item";
            const equipoInfo = `${equipo.descricao} - ${equipo.observacao}`; // Concatenando descrição e observação
            listEquipo.textContent = equipoInfo;

            const editButton = document.createElement('button');
            editButton.className = "lista-equipamentos__item__botao";
            editButton.textContent = 'Editar';
            listEquipo.appendChild(editButton);

            let isEditMode = false; //variável para controlar o modo de edição
            let inputEquipoDescricao;
            let inputEquipoObservacao;

            editButton.addEventListener('click', () => {
                if (isEditMode) {
                    if (inputEquipoDescricao.value !== equipo.descricao || inputEquipoObservacao.value !== equipo.observacao) {
                        const updateEquipo = {
                            descricao: inputEquipoDescricao.value,
                            observacao: inputEquipoObservacao.value
                        };

                        fetch(`http://localhost:8080/equipamentos/update/${equipo.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updateEquipo)
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log("Alterações salvas", data);
                            })
                            .catch(error => {
                                console.error("Ocorreu um erro ao salvar as alterações.", error);
                            });
                    }
                    // Atualiza a exibição erro esta aqui, falta o .value de input EquipoObservação
                    listEquipo.textContent = `${inputEquipoDescricao.value} - ${inputEquipoObservacao}`;
                    editButton.textContent = 'Editar';
                } else {
                    // Habilitar o modo de edição
                    inputEquipoDescricao = document.createElement('input');
                    inputEquipoDescricao.value = equipo.descricao;
                    listEquipo.insertBefore(inputEquipoDescricao, editButton);

                    inputEquipoObservacao = document.createElement('input');
                    inputEquipoObservacao.value = equipo.observacao;
                    listEquipo.insertBefore(inputEquipoObservacao, editButton);

                    editButton.textContent = 'Salvar';
                }
                isEditMode = !isEditMode; // Alternar o modo de edição
            });
            lista.appendChild(listEquipo);
        });
    })
    .catch(error => {
        // Trate erros de solicitação ou resposta da API
        console.error('Ocorreu um erro:', error);
    });
