var inputField = $("#linear-system");
var calculateTrigger = $("#calculate-trigger");
var equationUiFriendyDiv = $("#equation-ui-friendly");

$(function(){
	calculateTrigger.click(calculateClickListener)
});

function calculateClickListener(){
	var expression = inputField.val();
	if(expression.match(linearSystemInputRegexPattern)){
		var linearSystem = new LinearSystem(removeBrackets(inputField.val()));
		linearSystem.parseLinearSystem();
		equationUiFriendyDiv.html(linearSystem.getEquationCodeCogsCode());
	}else{
		inputField.addClass("form-control is-invalid");
		inputField.on('keydown', function(){
			inputField.removeClass();
		})
	}
}