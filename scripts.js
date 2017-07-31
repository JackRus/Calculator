
// STORAGE FOR OPERATIONS  
var actions = [];
var len = 10;

// LINKS
var span1 = document.getElementById("span1");
var span2 = document.getElementById("span2");
var span3 = document.getElementById("span3");
var span4 = document.getElementById("span4");
var span5 = document.getElementById("span5");

// BUFFERS
var curSpan;
var lastEntry;
var equal;
var math;

// RETURNS STORED VALUES FOR LAST OPERATIONS
var check = JSON.parse(localStorage.getItem("calculations"));

// IF lacalStorage ISN'T EMPTY FILL THE ARRAY
if (check) actions = check;

// RESETS ALL TEMPORARY VALUES AND CLEANS THE DISPLAYS || LAST VALUE and CURREENT DISPLAY
var reset = function () {
	if (equal || lastEntry == "C") {
		span1.innerHTML = "0";
		span2.innerHTML = "";
		span3.innerHTML = "";
		span4.innerHTML = "";
		span5.innerHTML = "";
		curSpan = span1;
		equal = false;
	}
	else
		curSpan.innerHTML = "0";
	lastEntry = "C";
}

// ADDS DIGITS
var add = function (v) {
	if (!equal) {
		span2.innerHTML == "" ? curSpan = span1 : curSpan = span3;
		if (curSpan.innerText.length < 21)
		{
			if (curSpan.innerHTML == "0" || curSpan.innerHTML == "") {
				curSpan.innerHTML = "";
				if (v == ".")
					curSpan.innerHTML = "0.";
				else
					curSpan.innerHTML = v;
			}
			else {
				if (curSpan.innerHTML.includes(".") && v == ".") {/* SKIP */}
				else
					curSpan.innerHTML = curSpan.innerHTML + v;
			}
			lastEntry = v;
		}
	}
}

// ADDS OPERATIONS
var addMath = function (v) {
	if (!equal) {
		if (curSpan == span1) {
			span2.innerHTML = v;
		}
		lastEntry = v;
	}
	else {
		var temp = span5.innerHTML;
		reset();
		span1.innerHTML = temp;
		equal = false;
		span2.innerHTML = v;
		lastEntry = v;
	}
}

// CHANGES SIGN +/-
var addSign = function () {
	if (!equal) {
		if (curSpan.innerHTML != "0" && curSpan.innerHTML != "") {
			if (curSpan.innerHTML.charAt(0) == "-")
				curSpan.innerHTML = curSpan.innerHTML.slice(1);
			else
				curSpan.innerHTML = "-" + curSpan.innerHTML;
		}
	}
}

// PERFORMS SQRT()
var root = function () {
	if (!equal) {
		if (curSpan == span1) {
			span2.innerHTML = "square root";
			var res = Math.sqrt(curSpan.innerHTML);
			span4.innerHTML = "=";
			equal = true;

			if (!isNaN(res)) {
				span5.innerHTML = res.toString();
				math = "sqrt( " + span1.innerHTML + " ) = " + span5.innerHTML
				addAction(math);
				curSpan == span5;
			}
			else
				span5.innerHTML = "Error";
		}
	}
	else {
		var temp = span5.innerHTML;
		reset();
		span1.innerHTML = temp;
		equal = false;
		curSpan = span1;
		root();
	}
	lastEntry = "sqrt";
}

// EVALUATES THE ENTRY
var result = function () {
	if (!equal) {
		var math = "(" + span1.innerHTML + ")" + span2.innerHTML + "(" + span3.innerHTML + ")";
		var val = parseFloat(eval(math).toFixed(4));
		var str = val.toString();
		span5.innerHTML = "=";
		if (str != "NaN" && str != "Infinity" && str != "Error") {
			span4.innerHTML = "=";
			span5.innerHTML = val.toString();
			math = span1.innerHTML + " " + span2.innerHTML + " " + span3.innerHTML + " = " + span5.innerHTML;
			addAction(math);
		}
		else
			span5.innerHTML = "Error";
		curSpan = span5;
		equal = true;
	}
	else {
		span1.innerHTML = span5.innerHTML;
		span5.innerHTML = "";
		equal = false;
		result();
	}
}

// ADDS OPERATION TO THE ARRAY
var addAction = function (v) {
	for (var i = 0; i < len - 1; i++)
		actions[i] = actions[i + 1];
	actions[len - 1] = v;
	lines();
	localStorage.setItem("calculations", JSON.stringify(actions));
};

// DISPLAYS LIST OF LAST 10 OPERATIONS
window.onload = lines();
function lines() {
	var line = "";
	for (var i = 0; i < len; i++) {
		if (!actions[len - 1 - i])
			actions[len - 1 - i] = " ";
		var line = line + (len - i).toString() + ") " + actions[len - 1 - i] + "<br/>";
	}
	document.getElementById("actions").innerHTML = line;
};