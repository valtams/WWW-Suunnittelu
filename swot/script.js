document.addEventListener("DOMContentLoaded", function() {
	const words = document.querySelectorAll(".word");

	words.forEach(word => {
		word.addEventListener("dragstart", drag);
	});

	const swotColumns = document.querySelectorAll(".swot");

	swotColumns.forEach(column => {
		column.addEventListener("dragover", allowDrop);
		column.addEventListener("drop", drop);
	});

	const wordList = document.querySelector(".word-list");

	wordList.addEventListener("dragover", allowDrop);
	wordList.addEventListener("drop", drop);
});

function allowDrop(event) {
	event.preventDefault();
}

function drag(event) {
	event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
	event.preventDefault();
	var data = event.dataTransfer.getData("text");
	var droppedElement = document.getElementById(data);
	if (event.target.classList.contains("swot")) {
		event.target.appendChild(droppedElement);
	} else if (event.target.classList.contains("word")) {
		event.target.parentElement.insertBefore(droppedElement, event.target.nextSibling);
	} else if (event.target.classList.contains("word-list")) {
		event.target.appendChild(droppedElement);
	}
	
	var main = document.getElementById( 'word-list' );
	[].map.call( main.children, Object ).sort( function ( a, b ) {
		return a.id.localeCompare(b.id);
	}).forEach( function ( elem ) {
		main.appendChild( elem );
	});
}

var nl = document.getElementById("Input");
nl.addEventListener("keypress", function (e) {
	if (e.code === "Enter") {
		addUI();
	}
});

var i = 1;
var l = i;
function addUI() {
	if (nl.value != "") {
		if (i < 10) {
			l = '0' + i;
		} else l = i;
		const div = document.createElement( "div" );
			div.setAttribute( "class", "word" );
			div.setAttribute( "id", "UI" + l );
			div.setAttribute( "draggable", "true");
			div.innerHTML = nl.value;
		document.getElementById( "word-list" ).appendChild( div );
		div.addEventListener("dragstart", drag);
		nl.value = "";
		++i;
	}
}