var binaryFieldView = $("#binary-input-field")
var octalFieldView = $("#octal-input-field")
var decimalFieldView = $("#decimal-input-field")
var hexaFieldView = $("#hexa-input-field")

$(function(){
	binaryFieldView.change(binaryFieldListener);
	octalFieldView.change(octalFieldListener);
	decimalFieldView.change(decimalFieldListener);
	hexaFieldView.change(hexaFieldListener);
})

function binaryFieldListener(){
	if(validateBinaryNumber()){

	}else{
		alert("invalid binary number");
		binaryFieldView.val("");
		binaryFieldView.focus();
	}
}

function octalFieldListener(){
	if(validateOctalNumber()){

	}else{
		alert("invalid octal number");
		octalFieldView.val("");
		octalFieldView.focus()
	}
}

function decimalFieldListener(){
	if(validateDecimalNumber()){

	}else{
		alert("invalid decimal number");
		decimalFieldView.val("");
		decimalFieldView.focus();
	}
}

function hexaFieldListener(){
	if(validateHexaNumber()){

	}else{
		alert("invalid hexa number");
		hexaFieldView.val("");
		hexaFieldView.focus();
	}
}


function validateBinaryNumber(){
	return binaryFieldView.val().length == 0 || binaryFieldView.val().match(/^[0-1]{1,}$/g)
}

function validateOctalNumber(){
	return octalFieldView.val().length == 0 || octalFieldView.val().match(/^[0-7]{1,}$/g)
}

function validateDecimalNumber(){
	return decimalFieldView.val().length == 0 || decimalFieldView.val().match(/^[0-9]{1,}$/g)
}

function validateHexaNumber(){
	return hexaFieldView.val().length == 0  || hexaFieldView.val().match(/^[0-9A-F]{1,}$/ig)
}

class NumericBase{
	conversions = {};

	constructor(n, base){

		if(base != 2 && base != 8 && base !=10 && base != 16){
			throw "This class only supports bases 2, 8, 10 and 16";
		}
		this.conversions[base] = n;
		this.inputBase = base;
	}

	build(){
		if(this.validate()){
			//if the base is different from 10, calculate the base 10 position first
			if(this.inputBase != 10){
				var decimal = 0;
				var strVal = String(this.conversions[this.inputBase]);
				for(var i = strVal.length - 1; i >= 0; i--){
					decimal += Math.pow(this.inputBase, i) * parseInt(strVal.charAt(strVal.length - i - 1), 36);
				}
				this.conversions[10] = decimal;
			}
			return true;
		}else{
			return false;
		}
	}
		
	getRegexPattern(base){
		if(base == 2){
			return /^[0-1]{1,}$/g;
		}else if(base  == 8){
			return /^[0-7]{1,}$/g;
		}else if(base == 10){
			return /^[0-9]{1,}$/g;
		}else{
			return /^[0-9A-F]{1,}$/ig;
		}
	}

	validate(){
		return String(this.conversions[this.inputBase]).match(this.getRegexPattern(this.inputBase)) != null;
	}
}