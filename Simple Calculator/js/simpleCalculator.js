function calculator(input1, input2, op){
    num1 = parseInt(input1);
    num2 = parseInt(input2);
    var answer = 0;
    switch(op){
        case '*':
            answer = num1 * num2;
            return answer;
        case '+':
            answer = num1 + num2;
            return answer;
        case '-':
            answer = num1 - num2;
            return answer;
        case 'div':
            answer = num1 / num2;
            return answer;
        default:
            return NaN;
    }
}