function sendTheReq(){
	data = {"testsend":"Testing"};

	var xhr = new XMLHttpRequest();
	xhr.open("POST","http://lmsolutions.tech/content/Sites/",true);
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.send(JSON.stringify(data));

	xhr.onload = function() {
	  if (xhr.status != 200) { // analyze HTTP status of the response
	    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
	  } else { // show the result
	    alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
	    console.log(xhr);
	  }
	};

}

