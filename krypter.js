const alph = ["a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	"æ",
	"ø",
	"å",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"Æ",
	"Ø",
	"Å",
	"%",
	"_",
	":",
	",",
	".",
	"<",
	"\"",
	"\'",
	" "

]
const alphLen = alph.length;

function encrypt(text, cipher) {
	let r = "";
	let counter = 0;
	text.split("").forEach(c => {
		if (counter < 8){
			counter++
		}else{
			x = alph[(alph.indexOf(c) + cipher) % alphLen]
			r += x;
		}

	})
	return r;
}

exports.encrypt = encrypt