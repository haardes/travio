function toggleTheme(button) {
	if (button.checked) {
		document.getElementById('theme').setAttribute('href', 'style/dark-theme.css');
	} else {
		document.getElementById('theme').setAttribute('href', 'style/light-theme.css');
	}
}

const iframe = document.createElement('iframe');
iframe.setAttribute('id', 'iframe');

function clipboardEvent(clipboardEvent, event) {
	let clipboardData = event.clipboardData;
	if (clipboardEvent == 'paste') {
		console.log('Clipboard HTML: ' + clipboardData.getData('text/html'));
		iframe.srcdoc = clipboardData.getData('text/html');
		document.body.appendChild(iframe);
	}
}

function parseVillageInput() {
	const iDoc = document.getElementById('iframe').contentWindow.document;
	const city = {
		warehouse: {},
		granary: {},
		production: {},
	};
	city.name = iDoc.querySelector('.villageInput').value;
	city.warehouse = {
		capacity: parseInt(
			iDoc
				.querySelector('.warehouse>.capacity>.value')
				.innerText.replace(/[^0-9.]/g, '')
				.replace('.', '')
		),
	};

	city.granary = {
		capacity: parseInt(
			iDoc
				.querySelector('.granary>.capacity>.value')
				.innerText.replace(/[^0-9.]/g, '')
				.replace('.', '')
		),
	};

	const stockBars = iDoc.querySelectorAll('.stockBarButton');
	for (let i = 0; i < 4; i++) {
		switch (i) {
			case 0:
				city.warehouse.wood = parseInt(stockBars[i].innerText.replace(/[^\x20-\x7E]/g, '').replace('.', ''));
				break;
			case 1:
				city.warehouse.clay = parseInt(stockBars[i].innerText.replace(/[^\x20-\x7E]/g, '').replace('.', ''));
				break;
			case 2:
				city.warehouse.iron = parseInt(stockBars[i].innerText.replace(/[^\x20-\x7E]/g, '').replace('.', ''));
				break;
			case 3:
				city.granary.crop = parseInt(stockBars[i].innerText.replace(/[^\x20-\x7E]/g, '').replace('.', ''));
				break;
		}
	}

	const productionRows = iDoc.querySelector('#production').tBodies[0].rows;

	for (let i = 0; i < productionRows.length; i++) {
		switch (i) {
			case 0:
				city.production.wood = parseInt(productionRows[i].innerText.replace(/[^0-9.]/g, ''));
				break;
			case 1:
				city.production.clay = parseInt(productionRows[i].innerText.replace(/[^0-9.]/g, ''));
				break;
			case 2:
				city.production.iron = parseInt(productionRows[i].innerText.replace(/[^0-9.]/g, ''));
				break;
			case 3:
				city.production.crop = parseInt(productionRows[i].innerText.replace(/[^0-9.]/g, ''));
				break;
		}
	}

	decideTableAction(city);
}

function decideTableAction(city) {
	const table = document.querySelector('.village-table');
	if (table.tBodies[0].rows) {
		const rows = table.tBodies[0].rows;
		let exists = false;
		let index = 0;

		while (!exists && index < rows.length) {
			if (city.name == rows[index].cells[0].innerText) {
				exists = true;
			}

			index++;
		}

		if (!exists) {
			appendTableRow(city);
		} else {
			updateTableRow(city);
		}
	}
}

function appendTableRow(city) {
	const table = document.querySelector('.village-table');
	const row = table.tBodies[0].insertRow(-1);
	row.insertCell(-1).innerHTML = city.name;
	row.insertCell(-1).innerHTML = city.warehouse.capacity;
	row.insertCell(-1).innerHTML = city.granary.capacity;
	row.insertCell(-1).innerHTML = city.warehouse.wood;
	row.insertCell(-1).innerHTML = city.warehouse.clay;
	row.insertCell(-1).innerHTML = city.warehouse.iron;
	row.insertCell(-1).innerHTML = city.granary.crop;
	row.insertCell(-1).innerHTML = city.production.wood;
	row.insertCell(-1).innerHTML = city.production.clay;
	row.insertCell(-1).innerHTML = city.production.iron;
	row.insertCell(-1).innerHTML = city.production.crop;
	updateTableFoot();
}

function updateTableRow(city) {
	console.log('Updating table...');
	updateTableFoot();
}

function updateTableFoot() {
	const table = document.querySelector('.village-table');
	const foot = table.tFoot;
	foot.deleteRow(-1);

	const row = foot.insertRow(-1);
	row.insertCell(-1).innerHTML = 'Sum';
	for (let i = 1; i < table.tBodies[0].rows[0].cells.length; i++) {
		row.insertCell(-1).innerHTML = getTableColumn(i).reduce((acc, curr) => {
			return parseInt(acc) + parseInt(curr);
		});
	}
}

function getTableColumn(col) {
	const table = document.querySelector('.village-table');
	const body = table.tBodies[0];
	const n = body.rows.length;
	const tempArray = [];

	for (let i = 0; i < n; i++) {
		row = body.rows[i];
		if (row.cells.length > col) {
			data = row.cells[col];
			tempArray.push(row.cells[col].innerHTML);
		} else {
			console.error('Column index out of bounds');
			return null;
		}
	}

	return tempArray;
}

['paste'].forEach(function (event) {
	document.addEventListener(event, function (e) {
		console.log(event);
		clipboardEvent(event, e);
	});
});

window.onload = () => {
	document.getElementById('theme-toggle').oninput = (e) => toggleTheme(e.target);
	//initiateInputTable();
};

/*

Varehus kapasitet:
document.getElementById("iframe").contentWindow.document.querySelector(".warehouse>.capacity>.value").innerText.replace(/[^\x20-\x7E]/g, '');

*/

/* --------- OLD CODE ---------
    const warehouseCapacity = parseInt(
		iDoc
			.querySelector('.warehouse>.capacity>.value')
			.innerText.replace(/[^0-9.]/g, '')
			.replace('.', '')
	);
	const granaryCapacity = parseInt(
		iDoc
			.querySelector('.granary>.capacity>.value')
			.innerText.replace(/[^0-9.]/g, '')
			.replace('.', '')
	);
*/

/* function initiateInputTable() {
    const table = document.querySelector('.input-table');

    const headers = document.createElement('tr');
    const inputs = document.createElement('tr');

    headers.appendChild(createTableHeader(''));
    inputs.appendChild(createTableData('td', 'New village:'));

    headers.appendChild(createTableHeader('Name'));
    inputs.appendChild(
        createTableData(
            'td',
            `<input type="text" name="village-name" id="village-name" placeholder="Village name"/>`
        )
    );

    headers.appendChild(createTableHeader('WH'));
    inputs.appendChild(
        createTableData(
            'td',
            `<input type="number" name="warehouse-cap" id="warehouse-cap" placeholder="Warehouse capacity"/>`
        )
    );

    headers.appendChild(createTableHeader('Silo'));
    inputs.appendChild(
        createTableData(
            'td',
            `<input type="number" name="silo-cap" id="silo-cap" placeholder="Silo capacity"/>`
        )
    );

    headers.appendChild(createTableHeader('Layout'));
    inputs.appendChild(
        populateSelect(document.createElement('select'), [
            '1-1-1-15',
            '3-3-3-9',
            '4-4-4-6',
            '4-4-3-7',
            '4-3-4-7',
            '3-4-4-7',
            '3-4-5-6',
            '4-5-3-6',
            '5-3-4-6',
            '3-5-4-6',
            '4-3-5-6',
            '5-4-3-6',
        ])
    );

    headers.appendChild(createTableHeader('Wood'));
    headers.appendChild(createTableHeader('Clay'));
    headers.appendChild(createTableHeader('Iron'));
    headers.appendChild(createTableHeader('Grain'));

    table.appendChild(headers);
    table.appendChild(inputs);
}

function populateSelect(select, items) {
    items.forEach((item) => {
        const option = document.createElement('option');
        option.value = item;
        option.innerHTML = item.toString();
        select.appendChild(option);
    });

    return select;
}

function createTableHeader(text) {
    const header = document.createElement('th');
    header.innerHTML = text;
    return header;
}

function createTableData(type, text) {
    const data = document.createElement(type);
    data.innerHTML = text;
    return data;
} */
