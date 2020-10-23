const setup = () =>
{
	const url = 'data.json';
	const ul = document.querySelector('#colors');
	var imie = 'Adam';
	fetch(url)
		.then(response => {
			return response.json();
		})
		.then(colors => {
			for (let color of colors){
				let li = document.createElement('li');
				let span = document.createElement('span');
				span.append(`${color.name} ${color.hexString}`);
				li.appendChild(span);
				li.style.backgroundColor = `${color.hexString}`;
				ul.appendChild(li);
			}
		})
		.catch(err => console.error(err));
};

window.onload = setup;
