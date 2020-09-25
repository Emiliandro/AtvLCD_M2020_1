var stepped = 0, chunks = 0, rows = 0;
var start, end;
var parser;
var pauseChecked = false;
var printStepChecked = false;

$(function () {
	$('#submit-parse').click(function () {
		stepped = 0;
		chunks = 0;
		rows = 0;

		var txt = $('#input').val();
		var localChunkSize = $('#localChunkSize').val();
		var remoteChunkSize = $('#remoteChunkSize').val();
		var files = $('#files')[0].files;
		var config = buildConfig();

		// NOTE: Chunk size does not get reset if changed and then set back to empty/default value
		if (localChunkSize)
			Papa.LocalChunkSize = localChunkSize;
		if (remoteChunkSize)
			Papa.RemoteChunkSize = remoteChunkSize;

		pauseChecked = $('#step-pause').prop('checked');
		printStepChecked = $('#print-steps').prop('checked');


		if (files.length > 0) {
			if (!$('#stream').prop('checked') && !$('#chunk').prop('checked')) {
				for (var i = 0; i < files.length; i++) {
					// if (files[i].size > 1024 * 1024 * 10)
					// {
					// 	alert("A file you've selected is larger than 10 MB; please choose to stream or chunk the input to prevent the browser from crashing.");
					// 	return;
					// }
				}
			}

			start = performance.now();

			$('#files').parse({
				config: config,
				before: function (file, inputElem) {
					console.log("Parsing file:", file);
				},
				complete: function () {
					console.log("Done with all files.");
				}
			});
		}
		else {
			start = performance.now();
			var results = Papa.parse(txt, config);
			document.querySelector("#resposta").innerHTML = results.toString();
			console.log("Synchronous parse results:", results['data']);
		}
	});

	$('#submit-unparse').click(function () {
		var input = $('#input').val();
		var delim = $('#delimiter').val();
		var header = $('#header').prop('checked');

		var results = Papa.unparse(input, {
			delimiter: delim,
			header: header,
		});

		console.log("Unparse complete!");
		console.log("--------------------------------------");
		console.log(results);
		console.log("--------------------------------------");
	});

	$('#insert-tab').click(function () {
		$('#delimiter').val('\t');
	});
});



function buildConfig() {
	return {
		delimiter: $('#delimiter').val(),
		newline: getLineEnding(),
		header: $('#header').prop('checked'),
		dynamicTyping: $('#dynamicTyping').prop('checked'),
		preview: parseInt($('#preview').val() || 0),
		step: $('#stream').prop('checked') ? stepFn : undefined,
		encoding: $('#encoding').val(),
		worker: $('#worker').prop('checked'),
		comments: $('#comments').val(),
		complete: completeFn,
		error: errorFn,
		download: $('#download').prop('checked'),
		fastMode: $('#fastmode').prop('checked'),
		skipEmptyLines: $('#skipEmptyLines').prop('checked'),
		chunk: $('#chunk').prop('checked') ? chunkFn : undefined,
		beforeFirstChunk: undefined,
	};

	function getLineEnding() {
		if ($('#newline-n').is(':checked'))
			return "\n";
		else if ($('#newline-r').is(':checked'))
			return "\r";
		else if ($('#newline-rn').is(':checked'))
			return "\r\n";
		else
			return "";
	}
}

function stepFn(results, parserHandle) {
	stepped++;
	rows += results.data.length;

	parser = parserHandle;

	if (pauseChecked) {
		console.log(results, results.data[0]);
		parserHandle.pause();
		return;
	}

	if (printStepChecked)
		console.log(results, results.data[0]);
}

function chunkFn(results, streamer, file) {
	if (!results)
		return;
	chunks++;
	rows += results.data.length;

	parser = streamer;

	if (printStepChecked)
		console.log("Chunk data:", results.data.length, results);

	if (pauseChecked) {
		console.log("Pausing; " + results.data.length + " rows in chunk; file:", file);
		streamer.pause();
		return;
	}
}

function errorFn(error, file) {
	console.log("ERROR:", error, file);
}

function saveStaticDataToFile(texto, nome) {
	var blob = new Blob([texto],
		{ type: "application/json" }
		/*{ type: "text/plain;charset=utf-8" }*/);
	saveAs(blob, nome + ".json");
}

function completeFn() {
	end = performance.now();
	if (!$('#stream').prop('checked')
		&& !$('#chunk').prop('checked')
		&& arguments[0]
		&& arguments[0].data) {
		rows = arguments[0].data.length;
		// filtragem(arguments[0]);
		// saveStaticDataToFile(JSON.stringify(arguments[0]),'todos');
		filtroLocal(JSON.stringify(arguments[0]), rows);
	}

	console.log("Finished input (async). Time:", end - start, arguments);
	console.log("Rows:", rows, "Stepped:", stepped, "Chunks:", chunks);
}


function filtroLocal(valor, maxim) {
	let objetoEmFoco = JSON.parse(valor);
	/** 8 - pais
	 * 10 - latitude
	 */
	let filtro = 10;
	let jsonFormatado = { data: [] }
	for (i = 0; i < maxim; i++) {
		if (i < 10) {
			console.log(objetoEmFoco['data'][i][filtro]);
		}
		if (objetoEmFoco['data'][i][filtro] != "") {
			jsonFormatado.data.push(objetoEmFoco['data'][i]);
		}
		if (i == maxim - 1) {
			if (filtro == 8) {
				saveStaticDataToFile(JSON.stringify(jsonFormatado), 'comlocal');
			}
			if (filtro == 10) {
				saveStaticDataToFile(JSON.stringify(jsonFormatado), 'comlat');
			}
		}
	}
	/**
	 *  Exemplo de Output
	 * {
	   "data":[
		  "2020-03-23 18:51:14",
		  "Gaboardi",
		  "fraslee",
		  "@BolsonaroSP Cade o fundão deputado??? Congresso está sentado em 3BI olhando a pandemia da janela.",
		  "0",
		  "138",
		  "pt",
		  "",
		  "", LOCAL É AQUI
		  "",
		  "",
		  "",
		  "[]"
	   ],}
	   Objetivo data[i][8]
	 */

}

valor = {
	"data": [
		"2020-03-23 18:51:14",
		"Gaboardi",
		"fraslee",
		"@BolsonaroSP Cade o fundão deputado??? Congresso está sentado em 3BI olhando a pandemia da janela.",
		"0",
		"138",
		"pt",
		"",
		"",
		"",
		"",
		"",
		"[]"
	],
}

console.log(valor['data'][8])