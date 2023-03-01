const temp = document.getElementById("temp");
const loc = document.getElementById("loc");
const time = document.getElementById("time");
const emoji = document.getElementById("emoji");
const emjType = document.getElementById("emjType");
const input = document.querySelector("input");

let target = "Lucknow";

const disp = (data) => {
	loc.textContent = data.location.name;
	time.textContent = data.location.localtime;
	temp.textContent = data.current.temp_c;
	const sup = document.createElement("sup");
	sup.classList.add("deg")
	sup.textContent = "o";
	temp.appendChild(sup);
	emjType.textContent = data.current.condition.text;
	emoji.src = data.current.condition.icon;
}

const fetchData = async () => {
	const url = `https://api.weatherapi.com/v1/current.json?key=0196414b3b9144f9a26200354230103&q=${target}`;
	const response = await fetch(url);
	const data = await response.json()
		.then((data) => disp(data))
		.catch((e) => {
			alert("Enter proper name");
			window.location.reload();
		});
}

input.onkeydown = function (e) {
	if (e.keyCode == 13) {
		target = input.value;
		fetchData();
		input.value = "";
	}
};

const find = () => {
	target = input.value;
	fetchData();
	input.value = "";
}
window.addEventListener('load', fetchData);