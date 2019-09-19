(function() {

  var calcInstance ={
    numArr : document.getElementsByClassName("numbers"),
    operatorArr : document.getElementsByClassName("operators"),
    prevOperand: "0",
    currOperand : "0",
    currOperator : undefined,
    prevOperator : undefined,
    incomingDigitEntry : true,
    incomingOperatorEntry : false,
    otherOperatorIndicator : false,
    dotOperator : false,
    minusSign : false
  };

  this.fetchDigit = function(val) {
      if(calcInstance.incomingDigitEntry ===true){
        if(val === "."){
          if(!calcInstance.dotOperator){
            calcInstance.dotOperator = true;
          }
          else
            return;
        }
        var display =calcInstance.currOperand + val;
        document.getElementById("displayComputed").value = display.substring(1,display.length);
        calcInstance.currOperand += val;
        calcInstance.incomingDigitEntry =true;
        calcInstance.incomingOperatorEntry =false;
      }
   }

   this.fetchOperator = function(val){
     calcInstance.dotOperator = false;
     if(val === "c" ){
       reset();
     }

    if(calcInstance.prevOperator != undefined){
      compute(calcInstance.prevOperand,calcInstance.currOperand,calcInstance.prevOperator);
      calcInstance.prevOperator = undefined;
    }
    if(calcInstance.otherOperatorIndicator === true && val === "+=")
    {
      calcInstance.currOperator = val;
      compute(calcInstance.prevOperand,calcInstance.currOperand,calcInstance.currOperator);
      calcInstance.currOperator = undefined;
    }
     if(calcInstance.currOperator === undefined && calcInstance.incomingOperatorEntry === false && val === "+="){
       calcInstance.currOperator = val;
       calcInstance.incomingOperatorEntry =true;
       compute(calcInstance.prevOperand,calcInstance.currOperand,calcInstance.currOperator);
     }

     if(calcInstance.currOperand !="0" && calcInstance.incomingOperatorEntry === false && val === "+="){
       calcInstance.currOperator = val;
       compute(calcInstance.prevOperand,calcInstance.currOperand,calcInstance.currOperator);
       calcInstance.currOperator = undefined;
     }

     else if(calcInstance.currOperand !="0" && calcInstance.prevOperand !="0" && calcInstance.incomingOperatorEntry === false){
       calcInstance.currOperator = val;
       compute(calcInstance.prevOperand,calcInstance.currOperand,calcInstance.currOperator);
       calcInstance.currOperator = undefined;
     }
     else if(val != "+=" && calcInstance.prevOperand ==="0" || calcInstance.currOperand ==="0"){
       if(calcInstance.prevOperand === "0"){
       calcInstance.prevOperand = calcInstance.currOperand;
       calcInstance.currOperand = "0";
     }
     if(val != "+=" && val != "c")
       calcInstance.prevOperator = val;
 }
}
//Init function was referred from class notes.
//adding event listener and binding was reffered from https://medium.com/@trekinbami/its-not-magic-using-bind-in-javascript-18834e95cd8e
var init = function(){

  for (var i = 0; i < calcInstance.numArr.length; i++) {
       document.getElementById(calcInstance.numArr[i].id).addEventListener("click", fetchDigit.bind(this,calcInstance.numArr[i].value));
      }
  for (var i = 0; i < calcInstance.operatorArr.length; i++) {
      document.getElementById(calcInstance.operatorArr[i].id).addEventListener("click", fetchOperator.bind(this,calcInstance.operatorArr[i].value));
     }
  document.getElementById("displayComputed").value = 0;
    }
  window.addEventListener('load', init, false);

  var compute = function(operand1,operand2,operator){
    switch(operator){
      case "+=":
                if(calcInstance.otherOperatorIndicator === false)
                 {
                  calcInstance.prevOperand = parseFloat(operand1,10) + parseFloat(operand2,10);
                  document.getElementById("displayComputed").value = calcInstance.prevOperand;
                  calcInstance.currOperand = "0";
                 }
                else {
                  document.getElementById("displayComputed").value = calcInstance.prevOperand;
                  calcInstance.currOperand = "0";
                  calcInstance.otherOperatorIndicator = false;
                }
        break;

    case "-":
                calcInstance.prevOperand = parseFloat(operand1,10) - parseFloat(operand2,10);
                calcInstance.otherOperatorIndicator = true;
                calcInstance.currOperand = "0";

       break;

   case "x":
                 calcInstance.prevOperand = parseFloat(operand1,10) * parseFloat(operand2,10);
                 calcInstance.otherOperatorIndicator = true;
                 calcInstance.currOperand = "0";

      break;

  case "/":
                if(operand2 === "0")
                    {
                      calcInstance.prevOperand = "INFINITY";
                      reset();
                    }
                    else{
                    calcInstance.prevOperand = parseFloat(operand1,10) / parseFloat(operand2,10);
                    calcInstance.otherOperatorIndicator = true;
                    calcInstance.currOperand = "0";
                  }
    break;

  }

}
var reset = function(){
  calcInstance.prevOperand = "0";
  calcInstance.currOperand = "0";
  calcInstance.currOperator = undefined;
  calcInstance.prevOperator = undefined;
  calcInstance.incomingDigitEntry = true;
  calcInstance.incomingOperatorEntry = false;
  calcInstance.otherOperatorIndicator = false;
  calcInstance.dotOperator = false;
    document.getElementById("displayComputed").value = 0;
  }
}
)();
