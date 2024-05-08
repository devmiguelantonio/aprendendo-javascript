document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display"); /* Campo de entrada */
    const buttons = document.querySelectorAll(".buttons button"); /* Seleciona todos os botões */
    
    let currentInput = ""; /* Armazena a entrada atual */
    let previousInput = ""; /* Armazena a entrada anterior */
    let operator = null; /* Armazena o operador atual */

    buttons.forEach((button) => { /* Itera sobre todos os botões */
        const action = button.getAttribute("data-action"); /* Obtém o tipo de ação do botão */
        const value = button.textContent; /* Obtém o valor do botão */

        button.addEventListener("click", () => { /* Adiciona um evento de clique ao botão */
            switch (action) { /* Verifica o tipo de ação */
                case "clear":
                    /* Limpa todas as variáveis */
                    currentInput = "";
                    previousInput = "";
                    operator = null;
                    display.value = ""; /* Limpa a exibição */
                    break;

                case "delete":
                    /* Apaga o último caractere da entrada atual */
                    currentInput = currentInput.slice(0, -1); 
                    display.value = currentInput; /* Atualiza a exibição */
                    break;

                case "number":
                    /* Adiciona o número ao final da entrada atual */
                    currentInput += value;
                    display.value = currentInput; /* Mostra na exibição */
                    break;

                case "operator":
                    /* Salva a entrada atual como entrada anterior e define o operador */
                    previousInput = currentInput; 
                    currentInput = ""; /* Limpa a entrada atual */
                    operator = value; /* Define o operador atual */
                    break;

                case "equals":
                    /* Executa o cálculo quando o botão de igual é pressionado */
                    if (operator && previousInput) { /* Verifica se há operador e entrada anterior */
                        const num1 = parseFloat(previousInput); /* Converte a entrada anterior para número */
                        const num2 = parseFloat(currentInput); /* Converte a entrada atual para número */

                        switch (operator) { /* Realiza a operação com base no operador */
                            case "+":
                                currentInput = (num1 + num2).toString(); /* Soma */
                                break;

                            case "-":
                                currentInput = (num1 - num2).toString(); /* Subtrai */
                                break;

                            case "*":
                                currentInput = (num1 * num2).toString(); /* Multiplica */
                                break;

                            case "/":
                                currentInput = (num1 / num2).toString(); /* Divide */
                                break;
                        }

                        /* Reseta a entrada anterior e o operador após o cálculo */
                        previousInput = "";
                        operator = null;
                        display.value = currentInput; /* Atualiza a exibição */
                    }
                    break;

                default:
                    break; /* Para ações não especificadas */
            }
        });
    });
});
