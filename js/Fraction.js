class Fraction{
	constructor(arga, argb){
		if(typeof arga == "number"){
			if(typeof argb == "number"){
				this.numerator = arga;
				this.denominator = argb;
			}else{
				if(Number(arga) === arga && arga % 1 === 0){
					/* if is arga is a int */
					this.numerator = arga;
					this.denominator = 1;
				} 
				else if (Number(arga) === arga && arga % 1 !== 0) {
					/* if is arga is a float */
			        var mult = 0;
			        var integerUp = Math.floor(arga);
			        while((integerUp - arga) != 0) {
						mult++;
						arga *= 10;
						integerUp = Math.floor(arga);
					}
					this.numerator = arga;
					this.denominator = Math.pow(10, mult);
				}
			}
		}
	}

	toDouble = function(){
		return this.numerator/this.denominator;
	}

	euclidGreatterCommonDivisor = function(a, b){
		var aux = 0;
		if(a == 0){
			aux = a;
			a = b;
			b = aux;
		}
		if(b == 0){
			return a;
		}else{
			return this.euclidGreatterCommonDivisor(b, a % b);
		}
	}

	simplify = function(){
		var gdc = this.euclidGreatterCommonDivisor(this.numerator, this.denominator);
		this.numerator = this.numerator/gdc;
		this.denominator = this.denominator/gdc;
	}
	
}