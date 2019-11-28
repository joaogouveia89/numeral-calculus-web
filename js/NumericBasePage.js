var binaryFieldView = $("#binary-input-field")
var octalFieldView = $("#octal-input-field")
var decimalFieldView = $("#decimal-input-field")
var hexaFieldView = $("#hexa-input-field")
var errorMessage = $("#error-message");

$(function(){
	binaryFieldView.focusout(callback);
	octalFieldView.focusout(callback);
	decimalFieldView.focusout(callback);
	hexaFieldView.focusout(callback);
})

function callback(){
	var baseNumber;
	if($(this).attr('id') == "binary-input-field"){
		baseNumber = new NumericBase($(this).val(), 2);
	}else if($(this).attr('id') == "octal-input-field"){
		baseNumber = new NumericBase($(this).val(), 8);
	}else if($(this).attr('id') == "decimal-input-field"){
		baseNumber = new NumericBase($(this).val(), 10);
	}else {
		baseNumber = new NumericBase($(this).val(), 16);
	}
	if(baseNumber.build()){
		errorMessage.hide();
		binaryFieldView.val(baseNumber.conversions[2]);
		octalFieldView.val(baseNumber.conversions[8]);
		decimalFieldView.val(baseNumber.conversions[10]);
		hexaFieldView.val(baseNumber.conversions[16]);
	}else if($(this).val().trim().length != 0){
		$(this).focus();
		errorMessage.show();
	}
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
			if(this.conversions[2] == undefined){
				this.conversions[2] = this.convertTo(2);
			}
			if(this.conversions[8] == undefined){
				this.conversions[8] = this.convertTo(8);
			}
			if(this.conversions[16] == undefined){
				this.conversions[16] = this.convertTo(16);
			}	
			return true;
		}else{
			return false;
		}
	}

	convertTo(base){
		var num = parseInt(this.conversions[10]);
		var result = "";

		while(num != 0) {
			result = this.getNumberChar((num%base)) + result;
			num = Math.floor(num/base);
		}
		return result;
	}

	getNumberChar(n) {
		var c;
		if(n >= 0 && n < 10) {
			c = String.fromCharCode(n + 48);
		}else {
			n -= 10;
			c = String.fromCharCode(n + 65);
		}
		return c;
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