const result = document.querySelector(".result")
const buttons = document.querySelectorAll(".buttons button") 

let currentNumber = "";
let firstOperand = null
let operador = null
let restart = false 

//Função para atualizar o Resultado
function updateResult(originClear = false){
    result.innerHTML = originClear ?0 : currentNumber.replace (".", ",");
}

function addDigit(digit){
    if(digit === "," && (currentNumber.includes(",") || !currentNumber))
    return

    if(restart){
        //Numero atual = digito
        currentNumber = digit
        restart = false
    }else{
        //Caso contrário vai concatenando
        currentNumber += digit
    }

    updateResult();

}

function setOperator(newOperator){
    //Verificando se tem algum número atual
    if(currentNumber){
        //Se por exemplo teclar 9-7, ao inves de cliclar em =, escolher outro operador já executa o calculo do 9-7
        calculate()

        firstOperand = parseFloat(currentNumber.replace(",", "."))
        //Numero atual vazio
        currentNumber = ""
    }
    
    operador = newOperator
}
function clearCalculator(){
    let currentNumber = "";
    let firstOperand = null
    let operador = null
    updateResult(true)
}
function calculate(){
    //Se não tiver nenhum número ou operador digitado, retorna
    if(operador===null || firstOperand === null)return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."))
    let resultValue
    switch (operador) {
        case "+":
            resultValue = firstOperand + secondOperand
            break;
        case "-":
            resultValue = firstOperand - secondOperand
            break
        case "x":
            resultValue = firstOperand * secondOperand
            break
        case "÷":
            resultValue = firstOperand / secondOperand
            break
        default:
            return;
    }
    //Verificação para ver se o resultado tem mais de 5 casas 
    if(resultValue.toString().split(".")[1]?.length > 5){
        //Se tiver to.Fixed(5) para carregar até 5 casas 
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    }else{
        currentNumber = resultValue.toString()
    }
//Set das variaveis
operador = null
firstOperand = null
restart = true //Após clicar em = o próximo número clicado já começar uma nova conta
porcentageValue = null
updateResult()
}
function setPercentage(){
    let result = parseFloat(currentNumber)/100

    if(["+", "-"].includes(operador)){
        result = result* (firstOperand || 1)
    }
    if(result.toString().split(".")[1]?.length>5){
        result = result.toFixed(5).toString();
    }
    currentNumber = result.toString()
    updateResult()
}
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText
        //Verificação se o texto clicado tiver valor de 0-9 passa no test, e adiciona o valor no Calculo
        if(/^[0-9,]+$/.test(buttonText)){
            addDigit(buttonText)
        }
        //Verificando se o número clicado é um operador
        else if(["+", "-", "x", "÷"].includes(buttonText)){
            setOperator(buttonText);
        }else if(buttonText==="="){
            calculate()
        }else if(buttonText==="C"){
            clearCalculator()
        }else if(buttonText==="±"){
            currentNumber = (parseFloat(currentNumber || firstOperand)*(-1)).toString()
            updateResult()
        }else if(buttonText==="%"){
            setPercentage()
        }   
    })
})