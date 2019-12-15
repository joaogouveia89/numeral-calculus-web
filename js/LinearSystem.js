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

	factors = [];

	buildLinearSystem = function(){
		var input = this.unformatEquation.replace(/\s/g, "");
		const parsingStates = {
			SIGNAL: 0,
			MULTIPLIER: 1,
			VARIABLE: 2
		}
		//for a valid linear system, the equations number must be the same as the variables array length
		var equationsNumber = 0;
		var variables = [];
		var parsingState = parsingStates.SIGNAL;
		var factor = {};
		var initPosition = -1;
		var finalPosition = -1;
		var n = 0;
		var signal;
		while(n < input.length){
			if(parsingState == parsingStates.SIGNAL){
				if(input.charAt(n) == "-"){
					signal = -1;
					n++;
				}else{
					signal = 1;
					if(input.charAt(n) == "+"){
						n++;
					}
				}
				parsingState = parsingStates.MULTIPLIER;
			}else if(parsingState == parsingStates.MULTIPLIER){
				if(!Object.is(parseInt(input.charAt(n)), NaN)){
					if(initPosition == -1){
						initPosition = n;
					}else{
						finalPosition = n;
					}
					n++;
				}else{
					if(initPosition == -1){
						factor.multiplier = signal;
					}else{
						if(finalPosition == -1){
							factor.multiplier = signal * parseInt(input.charAt(initPosition));
						}else{
							factor.multiplier = signal * parseInt(input.substring(initPosition, finalPosition + 1));
						}
					}
					initPosition = -1;
					finalPosition = -1;
					signal = 1;
					parsingState = parsingStates.VARIABLE;;
				}
			}else if(parsingState == parsingStates.VARIABLE){
				if(input.charAt(n) != "+" && input.charAt(n) != "-" && input.charAt(n) != ";"){
					if(initPosition == -1){
						initPosition = n;
					}else{
						finalPosition = n;
					}
					n++;
					if(n == input.length){
						if(finalPosition == -1){
							factor.variableName = input.charAt(initPosition);
						}else{
							factor.variableName = input.substring(initPosition, finalPosition + 1);
						}
						this.factors.push(factor);
						break;
					}
				}else{
					if(finalPosition == -1){
						factor.variableName = input.charAt(initPosition);
					}else{
						factor.variableName = input.substring(initPosition, finalPosition + 1);
					}
					initPosition = -1;
					finalPosition = -1;
					if(input.charAt(n) == ";"){
						n++;
					}
					parsingState = parsingStates.SIGNAL;
					this.factors.push(factor);
					factor = {};
				}
			}
		}
	}
}