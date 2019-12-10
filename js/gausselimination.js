var inputField = $("#linear-system");
var calculateTrigger = $("#calculate-trigger");

$(function(){
	calculateTrigger.click(calculateClickListener)
});

function calculateClickListener(){
	var expression = inputField.val();
	if(expression.match(linearSystemInputRegexPattern)){
		var equations = getEquations(expression);
		var factors = getEquationFactors(equations[0]);
	}else{
		inputField.addClass("form-control is-invalid");
		inputField.on('keydown', function(){
			inputField.removeClass();
		})
	}
}