var inputField = $("#linear-system");
var calculateTrigger = $("#calculate-trigger");

$(function(){
	calculateTrigger.click(calculateClickListener)
});

function calculateClickListener(){
	var expression = inputField.val();
	if(expression.match(linearSystemInputRegexPattern)){
		alert("matches");
	}else{
		alert("no matches");
	}
}