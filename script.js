/*eslint-disable no-undef-expression */
function getProductInfo() {
	var id = document.getElementById("product_id").value;
	
	if (id === null || id === "") {
		alert("Insira o código do produto.");
		return;
	}
	
	getRemoteProductInfo(document.getElementById("product_id").value);
}

function getRemoteProductInfo(id) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			showProductInfo(this.responseText);
		}
	};
	
	xhttp.open("GET", "https://api.mercadolibre.com/items/" + id, true);
	xhttp.send();
}

function showProductInfo(text) {
	var p = JSON.parse(text);
	
	document.getElementById("id").innerHTML = p.id;
	document.getElementById("site_id").innerHTML = p.site_id;
	document.getElementById("title").innerHTML = p.title;
	document.getElementById("permalink").href = p.permalink;
	document.getElementById("permalink").innerHTML = p.permalink;
	document.getElementById("picture").src = p.pictures[0].url;
}

function save() {
	var productField = document.getElementById("product_id");
	var targetField = document.getElementById("target_value");
	var emailField = document.getElementById("email");
	
	if (! productField.checkValidity()) {
		alert("Código do produto é inválido");
		return;
	}
	
//	if (! targetField.checkValidity()) {
//		alert("Valor alvo é inválido");
//		return;
//	}
//
//	if (! emailField.checkValidity()) {
//		alert("Email é inválido");
//		return;
//	}

//TODO Fazer tratamento dos parâmetros

  	var url = "https://script.google.com/macros/s/AKfycbzXN6tMmOciCCPdJXAPyrI-UX-Q9JjBysbM2_NplJz0alRW5NQ/exec";
  	
	var params = "?product_id=" + productField.value;
	params = params + "&target_value=" + targetField.value;
	params = params + "&email=" + emailField.value;
	params = params + "&callback=saveCallback";

	console.log(url + params);
	
	//Definir charset no header
  	
  	$.ajax({
	    url: url + params,
	    type: "GET",
	    dataType: 'jsonp',
	    jsonpCallback: "saveCallback",
	    cache: true,
	    success: function (data, status, error) {
	      console.log('success', data);
	    },
	    error: function (data, status, error) {
	    	alert("Algo deu errado. Tente novamente");
	    	console.log('error', data, status, error);
	    }
	});
}

function saveCallback(json) {
	alert(JSON.stringify(json));
}