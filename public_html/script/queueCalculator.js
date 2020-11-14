let SERVER = 3;
let TRIBE = 'TEUTON';
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
	setupCustomSelect();
	populateTroopInput();
}

function arrayMult(origin, multi) {
	let temp = [];
	if (Array.isArray(multi)) {
		temp = origin.map((x, i) => x * (multi[i] ? multi[i] : 1));
	} else if (Number.isInteger(multi)) {
		temp = origin.map((x) => x * 3);
	}

	return temp;
}

function arrayAdd(origin, add) {
	let temp = [];
	if (Array.isArray(add)) {
		temp = origin.map((x, i) => x + (add[i] ? add[i] : 0));
	}

	return temp;
}

function calculateCost() {
	const regInputs = document.querySelectorAll('.regular>input');
	const greatInputs = document.querySelectorAll('.great>input');

	const regArray = [];
	for (let i = 0; i < regInputs.length; i++) {
		regArray.push(parseInt(regInputs[i].value));
	}

	const greatArray = [];
	for (let i = 0; i < greatInputs.length; i++) {
		greatArray.push(parseInt(greatInputs[i].value));
	}

	let cost, troops;

	if (TRIBE === 'GAUL') {
		cost = GAUL_COST;
		troops = GAUL_TROOPS;
	} else if (TRIBE === 'ROMAN') {
		cost = ROMAN_COST;
		troops = ROMAN_TROOPS;
	} else if (TRIBE === 'TEUTON') {
		cost = TEUTON_COST;
		troops = TEUTON_TROOPS;
	}

	let wood = arrayAdd(arrayMult(regArray, cost[0]), arrayMult(arrayMult(greatArray, 3), cost[0])).reduce(
		(acc, curr) => {
			return acc + curr;
		}
	);
	let clay = arrayAdd(arrayMult(regArray, cost[1]), arrayMult(arrayMult(greatArray, 3), cost[1])).reduce(
		(acc, curr) => {
			return acc + curr;
		}
	);
	let iron = arrayAdd(arrayMult(regArray, cost[2]), arrayMult(arrayMult(greatArray, 3), cost[2])).reduce(
		(acc, curr) => {
			return acc + curr;
		}
	);
	let crop = arrayAdd(arrayMult(regArray, cost[3]), arrayMult(arrayMult(greatArray, 3), cost[3])).reduce(
		(acc, curr) => {
			return acc + curr;
		}
	);

	document.getElementById('result-wood').innerHTML = wood;
	document.getElementById('result-clay').innerHTML = clay;
	document.getElementById('result-iron').innerHTML = iron;
	document.getElementById('result-crop').innerHTML = crop;
	document.getElementById('result-sum').innerHTML = wood + clay + iron + crop;
}

function populateTroopInput() {
	const container = document.querySelector('.container.troops');
	container.innerHTML = `<h3 class="container-title">Troops</h3>`;

	let foundBarracks = false;
	let foundStables = false;
	let foundWorkshop = false;
	let foundGreatBarracks = false;
	let foundGreatStables = false;

	switch (TRIBE) {
		case 'GAUL':
			GAUL_TROOPS.forEach((troop, index) => {
				let row = document.createElement('div');
				row.classList.add('row');

				let name = document.createElement('p');
				name.innerHTML = troop.name;

				let icon = document.createElement('i');
				icon.style.backgroundImage = 'url("https://gpack.travian.com/20b0b1f1/mainPage/img_ltr/u/v3_gauls2.gif")';
				icon.style.backgroundPosition = `${-19 * index}px 0px`;
				icon.style.width = '16px';
				icon.style.height = '16px';
				icon.style.marginLeft = '10%';

				let customInputReg = document.createElement('div');
				let input = document.createElement('input');
				customInputReg.classList.add('custom-input', 'regular');
				input.type = 'number';
				input.value = 0;
				input.oninput = () => calculateCost();

				if (troop.building === 'barracks' && !foundBarracks) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Barracks';
					customInputReg.appendChild(buildingTitle);
					foundBarracks = true;
				} else if (troop.building === 'stables' && !foundStables) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Stables';
					customInputReg.appendChild(buildingTitle);
					foundStables = true;
				} else if (troop.building === 'workshop' && !foundWorkshop) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Workshop';
					customInputReg.appendChild(buildingTitle);
					foundWorkshop = true;
				}

				let customInputGreat = document.createElement('div');
				let greatInput = document.createElement('input');
				customInputGreat.classList.add('custom-input', 'great');
				greatInput.type = 'number';
				greatInput.value = 0;
				greatInput.oninput = () => calculateCost();

				if (troop.building === 'barracks' && !foundGreatBarracks) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Great Barracks';
					customInputGreat.appendChild(buildingTitle);
					foundGreatBarracks = true;
				} else if (troop.building === 'stables' && !foundGreatStables) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Great Stables';
					customInputGreat.appendChild(buildingTitle);
					foundGreatStables = true;
				}

				if (troop.building === 'workshop') {
					greatInput.classList.remove('great');
					greatInput.classList.add('hidden');
				}

				customInputGreat.appendChild(greatInput);
				customInputReg.appendChild(input);
				[name, icon, customInputReg, customInputGreat].forEach((el) => row.appendChild(el));
				container.appendChild(row);
			});
			break;
		case 'ROMAN':
			ROMAN_TROOPS.forEach((troop, index) => {
				let row = document.createElement('div');
				row.classList.add('row');

				let name = document.createElement('p');
				name.innerHTML = troop.name;

				let icon = document.createElement('i');
				icon.style.backgroundImage = 'url("https://gpack.travian.com/20b0b1f1/mainPage/img_ltr/u/v1_romans2.gif")';
				icon.style.backgroundPosition = `${-19 * index}px 0px`;
				icon.style.width = '16px';
				icon.style.height = '16px';
				icon.style.marginLeft = '10%';

				let customInputReg = document.createElement('div');
				let input = document.createElement('input');
				customInputReg.classList.add('custom-input', 'regular');
				input.type = 'number';
				input.value = 0;
				input.oninput = () => calculateCost();

				if (troop.building === 'barracks' && !foundBarracks) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Barracks';
					customInputReg.appendChild(buildingTitle);
					foundBarracks = true;
				} else if (troop.building === 'stables' && !foundStables) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Stables';
					customInputReg.appendChild(buildingTitle);
					foundStables = true;
				} else if (troop.building === 'workshop' && !foundWorkshop) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Workshop';
					customInputReg.appendChild(buildingTitle);
					foundWorkshop = true;
				}

				let customInputGreat = document.createElement('div');
				let greatInput = document.createElement('input');
				customInputGreat.classList.add('custom-input', 'great');
				greatInput.type = 'number';
				greatInput.value = 0;
				greatInput.oninput = () => calculateCost();

				if (troop.building === 'barracks' && !foundGreatBarracks) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Great Barracks';
					customInputGreat.appendChild(buildingTitle);
					foundGreatBarracks = true;
				} else if (troop.building === 'stables' && !foundGreatStables) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Great Stables';
					customInputGreat.appendChild(buildingTitle);
					foundGreatStables = true;
				}

				if (troop.building === 'workshop') {
					greatInput.classList.remove('great');
					greatInput.classList.add('hidden');
				}

				customInputGreat.appendChild(greatInput);
				customInputReg.appendChild(input);
				[name, icon, customInputReg, customInputGreat].forEach((el) => row.appendChild(el));
				container.appendChild(row);
			});
			break;
		case 'TEUTON':
			TEUTON_TROOPS.forEach((troop, index) => {
				let row = document.createElement('div');
				row.classList.add('row');

				let name = document.createElement('p');
				name.innerHTML = troop.name;

				let icon = document.createElement('i');
				icon.style.backgroundImage = 'url("https://gpack.travian.com/20b0b1f1/mainPage/img_ltr/u/v2_teutons2.gif")';
				icon.style.backgroundPosition = `${-19 * index}px 0px`;
				icon.style.width = '16px';
				icon.style.height = '16px';
				icon.style.marginLeft = '10%';

				let customInputReg = document.createElement('div');
				let input = document.createElement('input');
				customInputReg.classList.add('custom-input', 'regular');
				input.type = 'number';
				input.value = 0;
				input.oninput = () => calculateCost();

				if (troop.building === 'barracks' && !foundBarracks) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Barracks';
					customInputReg.appendChild(buildingTitle);
					foundBarracks = true;
				} else if (troop.building === 'stables' && !foundStables) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Stables';
					customInputReg.appendChild(buildingTitle);
					foundStables = true;
				} else if (troop.building === 'workshop' && !foundWorkshop) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Workshop';
					customInputReg.appendChild(buildingTitle);
					foundWorkshop = true;
				}

				let customInputGreat = document.createElement('div');
				let greatInput = document.createElement('input');
				customInputGreat.classList.add('custom-input', 'great');
				greatInput.type = 'number';
				greatInput.value = 0;
				greatInput.oninput = () => calculateCost();

				if (troop.building === 'barracks' && !foundGreatBarracks) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Great Barracks';
					customInputGreat.appendChild(buildingTitle);
					foundGreatBarracks = true;
				} else if (troop.building === 'stables' && !foundGreatStables) {
					let buildingTitle = document.createElement('p');
					buildingTitle.innerHTML = 'Great Stables';
					customInputGreat.appendChild(buildingTitle);
					foundGreatStables = true;
				}

				if (troop.building === 'workshop') {
					greatInput.classList.remove('great');
					greatInput.classList.add('hidden');
				}

				customInputGreat.appendChild(greatInput);
				customInputReg.appendChild(input);
				[name, icon, customInputReg, customInputGreat].forEach((el) => row.appendChild(el));
				container.appendChild(row);
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
	let selectors = document.querySelectorAll('.row>.custom-select.level>select');
	for (let i = 0; i < selectors.length; i++) {
		let selector = selectors[i];
		for (let j = 0; j <= 20; j++) {
			selector.innerHTML += `<option value="${j}">${j}</option>`;
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
			populateTroopInput();
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

window.onload = () => {
	init();
};

function setupCustomSelect() {
	var x, i, j, l, ll, selElmnt, a, b, c;
	/* Look for any elements with the class "custom-select": */
	x = document.getElementsByClassName('custom-select');
	l = x.length;
	for (i = 0; i < l; i++) {
		selElmnt = x[i].getElementsByTagName('select')[0];
		ll = selElmnt.length;
		/* For each element, create a new DIV that will act as the selected item: */
		a = document.createElement('DIV');
		a.setAttribute('class', 'select-selected');
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/* For each element, create a new DIV that will contain the option list: */
		b = document.createElement('DIV');
		b.setAttribute('class', 'select-items select-hide');
		for (j = 1; j < ll; j++) {
			/* For each option in the original select element,
    		create a new DIV that will act as an option item: */
			c = document.createElement('DIV');
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener('click', function (e) {
				/* When an item is clicked, update the original select box,
				and the selected item: */
				var y, i, k, s, h, sl, yl;
				s = this.parentNode.parentNode.getElementsByTagName('select')[0];
				sl = s.length;
				h = this.parentNode.previousSibling;
				for (i = 0; i < sl; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName('same-as-selected');
						yl = y.length;
						for (k = 0; k < yl; k++) {
							y[k].removeAttribute('class');
						}
						this.setAttribute('class', 'same-as-selected');
						break;
					}
				}
				h.click();
				onSelect(s);
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener('click', function (e) {
			/* When the select box is clicked, close any other select boxes,
    		and open/close the current select box: */
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle('select-hide');
			this.classList.toggle('select-arrow-active');
		});
	}
}

function closeAllSelect(elmnt) {
	/* A function that will close all select boxes in the document,
  	except the current select box: */
	var x,
		y,
		i,
		xl,
		yl,
		arrNo = [];
	x = document.getElementsByClassName('select-items');
	y = document.getElementsByClassName('select-selected');
	xl = x.length;
	yl = y.length;
	for (i = 0; i < yl; i++) {
		if (elmnt == y[i]) {
			arrNo.push(i);
		} else {
			y[i].classList.remove('select-arrow-active');
		}
	}
	for (i = 0; i < xl; i++) {
		if (arrNo.indexOf(i)) {
			x[i].classList.add('select-hide');
		}
	}
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener('click', closeAllSelect);
