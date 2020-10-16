function toggleTheme(button) {
    if (button.checked) {
        document
            .getElementById('theme')
            .setAttribute('href', 'style/dark-theme.css');
    } else {
        document
            .getElementById('theme')
            .setAttribute('href', 'style/light-theme.css');
    }
}

function initiateInputTable() {
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
}

window.onload = () => {
    document.getElementById('theme-toggle').oninput = (e) =>
        toggleTheme(e.target);
    initiateInputTable();
};
