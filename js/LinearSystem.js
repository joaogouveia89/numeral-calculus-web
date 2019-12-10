var linearSystemInputRegexPattern = /^\{((\s*?([0-9a-z]+)\s*?[\+\-]\s*?)+\s*?([0-9a-z]+)\s*?\=\s*?\d+\s*?\;)+((\s*?([0-9a-z]+)\s*?[\+\-]\s*?)+\s*?([0-9a-z]+)\s*?\=\s*?\d+\s*?)\}$/

function removeBrackets(expression){
	return expression.replace(/[\{\}]/g, "");
}

function getEquations(expression){
	return removeBrackets(expression).split(';');
}

function getEquationFactors(equation){
	factors = []
	//getting plus factors
	var temp = equation.split('+');
	for(var n = 0; n < factors.length; n++){
		if(temp[n].indexOf('-') === -1){
			
		}
	}
	return factors;
}