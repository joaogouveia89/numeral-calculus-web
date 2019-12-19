var linearSystemInputRegexPattern = /^\{((\s*?([0-9a-z]+)\s*?[\+\-]\s*?)+\s*?([0-9a-z]+)\s*?\=\s*?\d+\s*?\;)+((\s*?([0-9a-z]+)\s*?[\+\-]\s*?)+\s*?([0-9a-z]+)\s*?\=\s*?\d+\s*?)\}$/

function removeBrackets(expression){
	return expression.replace(/[\{\}]/g, "");
}

function getEquations(expression){
	return removeBrackets(expression).split(';');
}

class LinearSystem{
	constructor(unformatEquation){
		this.unformatEquation = unformatEquation;
	}

	factors = [];
	results = [];

	getEquationCodeCogsCode = function(){
		var link = "\\begin{align*}&space;&\\\\";

		for(var n = 0; n < this.factors.length; n++){
			if(n != 0 && this.factors[n].multiplier > 0){
				link = link + "&plus;" + this.factors[n].multiplier;	
			}else{
				link = link + this.factors[n].multiplier;
			}
			link = link + this.factors[n].variableName + "&space;"
		}
		link = link + "\\end{align*}'";

		var fullLink = "'https://www.codecogs.com/eqnedit.php?latex=" + link;
		var fullLinkImage = "'https://latex.codecogs.com/gif.latex?" + link;
		var str = "<a href = " + fullLink + " target ='_blank'> <img src=" + fullLinkImage + " title='" + link +"'></a>"
		return str;
	}

	parseLinearSystem = function(){
		var input = this.unformatEquation.replace(/\s/g, "");
		const parsingStates = {
			SIGNAL: 0,
			MULTIPLIER: 1,
			VARIABLE: 2,
			RESULT: 3
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
				if(input.charAt(n) != "+" && input.charAt(n) != "-" && input.charAt(n) != "="){
					if(initPosition == -1){
						initPosition = n;
					}else{
						finalPosition = n;
					}
					n++;
				}else{
					if(finalPosition == -1){
						factor.variableName = input.charAt(initPosition);
					}else{
						factor.variableName = input.substring(initPosition, finalPosition + 1);
					}
					initPosition = -1;
					finalPosition = -1;
					if(input.charAt(n) == "="){
						parsingState = parsingStates.RESULT;
						n++;
					}else{
						parsingState = parsingStates.SIGNAL;
					}
					this.factors.push(factor);
					factor = {};
				}
			}else if(parsingState = parsingStates.RESULT){
				if(!Object.is(parseInt(input.charAt(n)), NaN)){
					if(initPosition == -1){
						initPosition = n;
					}else{
						finalPosition = n;
					}
					n++;
					if(n == input.length){
						equationsNumber++;
						if(finalPosition == -1){
							this.results.push(parseInt(input.charAt(initPosition)));
						}else{
							this.results.push(parseInt(input.substring(initPosition, finalPosition + 1)));
						}
					}
				}else{
					if(finalPosition == -1){
						this.results.push(parseInt(input.charAt(initPosition)));
					}else{
						this.results.push(parseInt(input.substring(initPosition, finalPosition + 1)));
					}
					initPosition = -1;
					finalPosition = -1;
					equationsNumber++;
					parsingState = parsingStates.SIGNAL;
					n++;
				}
			}
		}
	}
}