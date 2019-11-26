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
	}
}

function octalFieldListener(){
	if(validateOctalNumber()){

	}else{
		alert("invalid octal number");
		octalFieldView.val("");
	}
}

function decimalFieldListener(){
	if(validateDecimalNumber()){

	}else{
		alert("invalid decimal number");
		decimalFieldView.val("");
	}
}

function hexaFieldListener(){
	if(validateHexaNumber()){

	}else{
		alert("invalid hexa number");
		hexaFieldView.val("");
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