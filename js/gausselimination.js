var inputField = $("#linear-system");
var calculateTrigger = $("#calculate-trigger");
var equationUiFriendyDiv = $("#equation-ui-friendly");

$(function(){
	calculateTrigger.click(calculateClickListener)
});

function calculateClickListener(){
	var expression = inputField.val();
	if(expression.match(linearSystemInputRegexPattern)){
		var equations = getEquations(expression);
		equationUiFriendyDiv.html(getEquationCodeCogsCode(equations));
		var factors = getEquationFactors(equations[0]);
	}else{
		inputField.addClass("form-control is-invalid");
		inputField.on('keydown', function(){
			inputField.removeClass();
		})
	}
}