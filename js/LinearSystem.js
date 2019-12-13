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

class LinearSystem{
	constructor(unformatEquation){
		this.unformatEquation = unformatEquation;
	}

	buildLinearSystem = function(){
		var input = this.unformatEquation;
		const parsingStates = {
			SIGNAL: 0,
			MULTIPLIER: 1,
			VARIABLE: 2
		}
		this.factors = {};
		//for a valid linear system, the equations number must be the same as the variables array length
		var equationsNumber = 0;
		var variables = [];
		var parsingState = parsingStates.SIGNAL;
		var factor = {};
		var multiplierInitPosition = -1;
		var multiplierEndPosition = -1;

		for(var n = 0; n < input.length; n++){
			if(parsingState == parsingStates.SIGNAL){
				if(input.charAt(n) == "-"){
					factor.signal = "-"
				}else{
					factor.signal = "+"
				}
				parsingState = parsingStates.MULTIPLIER;
			}else if(parsingState == parsingStates.MULTIPLIER){
				if(parseInt(input.charAt(n)) == NaN){
					factor.multiplier = 1;
					parsingState = parsingStates.VARIABLE;
				}else if(multiplierInitPosition == -1){
					multiplierInitPosition = n;
				}else{
					if(parseInt(input.charAt(n)) != NaN){
						multiplierEndPosition = n;
					}else{
						if(multiplierEndPosition != -1){
							factor.multiplier = parseInt(input.substring(multiplierInitPosition, multiplierEndPosition))
						}else if(multiplierInitPosition != -1){
							factor.multiplier = parseInt(input.charAt(multiplierInitPosition));
						}else{
							factor.multiplier = 1;
						}
						parsingState = parsingStates.VARIABLE;
					}
				}
			}else if(parsingState == parsingStates.VARIABLE){
				//continue the parsing
			}
		}
	}
}