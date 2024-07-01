/* globals getMessage, resizeToContent, initModal*/
"use strict";

function fillText(message){
	document.querySelector("title").textContent = message.title;
	const textNode = document.querySelector(".text");
	let first = true;
	message.text.split(/\n/g).forEach(function(line){
		if (!first){
			textNode.appendChild(document.createElement("br"));
		}
		first = false;
		textNode.appendChild(document.createTextNode(line));
	});
	document.getElementById("ok").textContent = browser.i18n.getMessage("modal.message.ok");
}

initModal({messageCallback: function(message){
	return new Promise(function(resolve){
		fillText(message);
		document.querySelectorAll("button").forEach(function(button){
			button.disabled = false;
			button.addEventListener("click", function(){
				if (button.id === "ok"){
					resolve(true);
					window.close();
				}
			});
		});
		resizeToContent();
	});
}});