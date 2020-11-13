let SERVER = 1;
let TRIBE = 'GAUL';
let BARRACKS = 20;
let GREAT_BARRACKS = 20;
let STABLES = 20;
let GREAT_STABLES = 20;
let WORKSHOP = 20;
let INF_HELMET = 1;
let CAV_HELMET = 1;
let RECRUITMENT = 1;
let ARTIFACT = 1;
let GAUL_COST = [
	[100, 140, 170, 350, 360, 500, 950, 960],
	[130, 150, 150, 450, 330, 620, 555, 1450],
	[55, 185, 20, 230, 280, 675, 330, 630],
	[30, 60, 40, 60, 120, 170, 75, 90],
];
let TEUTON_COST = [
	[95, 145, 130, 160, 370, 450, 1000, 900],
	[75, 70, 120, 100, 270, 515, 300, 1200],
	[40, 85, 170, 50, 290, 480, 350, 600],
	[40, 40, 70, 50, 75, 80, 70, 60],
];
let ROMAN_COST = [
	[120, 100, 150, 140, 550, 550, 900],
	[100, 130, 160, 160, 440, 640, 360, 1350],
	[150, 160, 210, 20, 320, 800, 500, 600],
	[30, 70, 80, 40, 100, 180, 70, 90],
];
let GAUL_TROOPS = [
	{
		name: 'Phalanx',
		amount: 0,
		time: 1040,
		building: 'barracks',
	},
	{
		name: 'Swordsman',
		amount: 0,
		time: 1440,
		building: 'barracks',
	},
	{
		name: 'Pathfinder',
		amount: 0,
		time: 1360,
		building: 'stables',
	},
	{
		name: 'Theutates Thunder',
		amount: 0,
		time: 2480,
		building: 'stables',
	},
	{
		name: 'Druidrider',
		amount: 0,
		time: 2560,
		building: 'stables',
	},
	{
		name: 'Haeduan',
		amount: 0,
		time: 3120,
		building: 'stables',
	},
	{
		name: 'Ram',
		amount: 0,
		time: 5000,
		building: 'workshop',
	},
	{
		name: 'Trebuchet',
		amount: 0,
		time: 9000,
		building: 'workshop',
	},
];
let TEUTON_TROOPS = [
	{
		name: 'Maceman',
		amount: 0,
		time: 720,
		building: 'barracks',
	},
	{
		name: 'Spearman',
		amount: 0,
		time: 1120,
		building: 'barracks',
	},
	{
		name: 'Axeman',
		amount: 0,
		time: 1200,
		building: 'barracks',
	},
	{
		name: 'Scout',
		amount: 0,
		time: 1120,
		building: 'barracks',
	},
	{
		name: 'Paladin',
		amount: 0,
		time: 2400,
		building: 'stables',
	},
	{
		name: 'Teutonic Knight',
		amount: 0,
		time: 2960,
		building: 'stables',
	},
	{
		name: 'Ram',
		amount: 0,
		time: 42000,
		building: 'workshop',
	},
	{
		name: 'Catapult',
		amount: 0,
		time: 9000,
		building: 'workshop',
	},
];
let ROMAN_TROOPS = [
	{
		name: 'Legionnaire',
		amount: 0,
		time: 1600,
		building: 'barracks',
	},
	{
		name: 'Praetorian',
		amount: 0,
		time: 1760,
		building: 'barracks',
	},
	{
		name: 'Imperian',
		amount: 0,
		time: 1920,
		building: 'barracks',
	},
	{
		name: 'Equites Legati',
		amount: 0,
		time: 1360,
		building: 'stables',
	},
	{
		name: 'Equites Imperatoris',
		amount: 0,
		time: 2640,
		building: 'stables',
	},
	{
		name: 'Equites Caesaris',
		amount: 0,
		time: 3520,
		building: 'stables',
	},
	{
		name: 'Battering Ram',
		amount: 0,
		time: 4600,
		building: 'workshop',
	},
	{
		name: 'Fire Catapult',
		amount: 0,
		time: 9000,
		building: 'workshop',
	},
];

function init() {
	populateLevelSelectors();
	setOnSelect();
	populateTroopInput();
}

function arrayMult(origin, multi) {
	let temp = [];
	if (Array.isArray(multi)) {
		console.log('Array!');
	} else if (Number.isInteger(multi)) {
		temp = origin.map((x) => x * 3);
	}

	return temp;
}

function calculateCost() {
	const regInputs = document.querySelectorAll('.regular');
	const greatInputs = document.querySelectorAll('.great');

	const regArray = [];
	for (let i = 0; i < regInputs.length; i++) {
		regArray.push(parseInt(regInputs[i].value));
	}

	const greatArray = [];
	for (let i = 0; i < greatInputs.length; i++) {
		greatArray.push(parseInt(greatInputs[i].value));
	}
}

function populateTroopInput() {
	document.querySelector('.troop-input').innerHTML = `<div class="input-group barracks">
												<div class="grid-container">
													<h3 class="column-name">Barracks</h3>
													<h3 class="column-name">Great Barracks</h3>
												</div>
											</div>

											<div class="input-group stables">
												<div class="grid-container">
													<h3 class="column-name">Stables</h3>
													<h3 class="column-name">Great Stables</h3>
												</div>
											</div>

											<div class="input-group workshop">
												<div class="grid-container">
													<h3 class="column-name" style="grid-column-start: 3; grid-column-end: 4">Workshop</h3>
												</div>
											</div>`;

	const grid = {
		barracks: document.querySelector('.barracks>.grid-container'),
		stables: document.querySelector('.stables>.grid-container'),
		workshop: document.querySelector('.workshop>.grid-container'),
	};

	switch (TRIBE) {
		case 'GAUL':
			GAUL_TROOPS.forEach((troop, index) => {
				let p = document.createElement('p');
				p.innerHTML = troop.name;

				let i = document.createElement('i');
				i.style.backgroundImage = 'url("https://gpack.travian.com/20b0b1f1/mainPage/img_ltr/u/v3_gauls2.gif")';
				i.style.backgroundPosition = `${-19 * index}px 0px`;
				i.style.width = '16px';
				i.style.height = '16px';
				i.style.marginLeft = '10%';

				let input = document.createElement('input');
				input.type = 'number';
				input.value = 0;
				input.style.width = '35%';
				input.style.margin = 'auto';
				input.classList.add('regular');
				input.oninput = () => calculateCost();

				let greatInput = null;

				if (troop.building !== 'workshop') {
					greatInput = document.createElement('input');
					greatInput.type = 'number';
					greatInput.value = 0;
					greatInput.style.width = '35%';
					greatInput.style.margin = 'auto';
					greatInput.classList.add('great');
					greatInput.oninput = () => calculateCost();
				} else {
					p.style.gridColumn = '1';
					i.style.gridColumn = '2';
					input.style.gridColumnStart = '3';
					input.style.gridColumnEnd = '4';
				}

				[p, i, input, greatInput].forEach((el) => (el !== null ? grid[troop.building].appendChild(el) : void 0));
			});
			break;
		case 'ROMAN':
			ROMAN_TROOPS.forEach((troop, index) => {
				let p = document.createElement('p');
				p.innerHTML = troop.name;

				let i = document.createElement('i');
				i.style.backgroundImage = 'url("https://gpack.travian.com/20b0b1f1/mainPage/img_ltr/u/v1_romans2.gif")';
				i.style.backgroundPosition = `${-19 * index}px 0px`;
				i.style.width = '16px';
				i.style.height = '16px';
				i.style.marginLeft = '10%';

				let input = document.createElement('input');
				input.type = 'number';
				input.value = 0;
				input.style.width = '35%';
				input.style.margin = 'auto';
				input.classList.add('regular');
				input.oninput = () => calculateCost();

				let greatInput = null;

				if (troop.building !== 'workshop') {
					greatInput = document.createElement('input');
					greatInput.type = 'number';
					greatInput.value = 0;
					greatInput.style.width = '35%';
					greatInput.style.margin = 'auto';
					greatInput.classList.add('great');
					greatInput.oninput = () => calculateCost();
				} else {
					p.style.gridColumn = '1';
					i.style.gridColumn = '2';
					input.style.gridColumnStart = '3';
					input.style.gridColumnEnd = '4';
				}

				[p, i, input, greatInput].forEach((el) => (el !== null ? grid[troop.building].appendChild(el) : void 0));
			});
			break;
		case 'TEUTON':
			TEUTON_TROOPS.forEach((troop, index) => {
				let p = document.createElement('p');
				p.innerHTML = troop.name;

				let i = document.createElement('i');
				i.style.backgroundImage = 'url("https://gpack.travian.com/20b0b1f1/mainPage/img_ltr/u/v2_teutons2.gif")';
				i.style.backgroundPosition = `${-19 * index}px 0px`;
				i.style.width = '16px';
				i.style.height = '16px';
				i.style.marginLeft = '10%';

				let input = document.createElement('input');
				input.type = 'number';
				input.value = 0;
				input.style.width = '35%';
				input.style.margin = 'auto';
				input.classList.add('regular');
				input.oninput = () => calculateCost();

				let greatInput = null;

				if (troop.building !== 'workshop') {
					greatInput = document.createElement('input');
					greatInput.type = 'number';
					greatInput.value = 0;
					greatInput.style.width = '35%';
					greatInput.style.margin = 'auto';
					greatInput.classList.add('great');
					greatInput.oninput = () => calculateCost();
				} else {
					p.style.gridColumn = '1';
					i.style.gridColumn = '2';
					input.style.gridColumnStart = '3';
					input.style.gridColumnEnd = '4';
				}

				[p, i, input, greatInput].forEach((el) => (el !== null ? grid[troop.building].appendChild(el) : void 0));
			});
			break;
	}

	{
		/* <p>Maceman</p>
						<i id="mace"></i>
						<input type="number" name="maceman-regular" id="maceman-regular" />
						<input type="number" name="maceman-great" id="maceman-great" />
						#mace {
	background-image: url('https://gpack.travian.com/20b0b1f1/mainPage/img_ltr/u/v2_teutons2.gif');
	background-position: 0 0;
	height: 16px;
	width: 16px;
	outline: none;
	margin-left: 10%; */
	}
}

function populateLevelSelectors() {
	let selectors = document.querySelectorAll('.buildings>.selector>select');
	for (let i = 0; i < selectors.length; i++) {
		let selector = selectors[i];
		for (let j = 1; j <= 20; j++) {
			selector.innerHTML += `<option value="${j}"${j === 20 ? ' selected="selected"' : ''}>${j}</option>`;
		}
	}
}

function onSelect(target) {
	switch (target.id) {
		case 'server':
			SERVER = target.options[target.selectedIndex].value;
			break;
		case 'tribe':
			TRIBE = target.options[target.selectedIndex].value;
			break;
		case 'barracks':
			BARRACKS = target.options[target.selectedIndex].value;
			break;
		case 'great-barracks':
			GREAT_BARRACKS = target.options[target.selectedIndex].value;
			break;
		case 'stables':
			STABLES = target.options[target.selectedIndex].value;
			break;
		case 'great-stables':
			GREAT_STABLES = target.options[target.selectedIndex].value;
			break;
		case 'workshop':
			WORKSHOP = target.options[target.selectedIndex].value;
			break;
		case 'inf-helmet':
			INF_HELMET = target.options[target.selectedIndex].value;
			break;
		case 'cav-helmet':
			CAV_HELMET = target.options[target.selectedIndex].value;
			break;
		case 'artifact':
			RECRUITMENT = target.options[target.selectedIndex].value;
			break;
		case 'recruitment':
			ARTIFACT = target.options[target.selectedIndex].value;
			break;
	}
}

function setOnSelect() {
	[
		'server',
		'tribe',
		'barracks',
		'great-barracks',
		'stables',
		'great-stables',
		'workshop',
		'inf-helmet',
		'cav-helmet',
		'artifact',
		'recruitment',
	].forEach((id) => {
		if (id === 'tribe') {
			document.getElementById(id).onchange = (e) => {
				onSelect(e.target);
				populateTroopInput();
			};
		} else {
			document.getElementById(id).onchange = (e) => {
				onSelect(e.target);
			};
		}
	});
}

function toggleTheme(button) {
	if (button.checked) {
		document.getElementById('theme').setAttribute('href', 'style/dark-theme.css');
	} else {
		document.getElementById('theme').setAttribute('href', 'style/light-theme.css');
	}
}

window.onload = () => {
	document.getElementById('theme-toggle').oninput = (e) => toggleTheme(e.target);
	init();
};
