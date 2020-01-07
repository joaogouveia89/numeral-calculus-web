var inputField = $("#linear-system");
var calculateTrigger = $("#calculate-trigger");
var equationUiFriendyDiv = $("#equation-ui-friendly");
var resultArea = $("#result-area");

$(function(){
	calculateTrigger.click(calculateClickListener)
	resultArea.hide();
});

function calculateClickListener(){
	var expression = inputField.val();
	if(expression.match(linearSystemInputRegexPattern)){
		if($("#help-container").is(":visible")){
            $("#help-container").hide(500);
        }
		resultArea.show();
		var linearSystem = new LinearSystem(removeBrackets(inputField.val()));
		linearSystem.parseLinearSystem();
		linearSystem.getOrganizedArray();
		equationUiFriendyDiv.html(linearSystem.getEquationCodeCogsCode());
	}else{
		inputField.addClass("form-control is-invalid");
		inputField.on('keydown', function(){
			inputField.removeClass();
		})
	}
}