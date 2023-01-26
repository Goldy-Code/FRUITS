const response = fetch("http://localhost:3001/fruits");
const parent = document.querySelector('.parent');
const range = document.querySelector('#range');
const out = document.querySelector('.out');

//! ========================== NETLIFY FUNCTION ==========================

// const fetch = require("node-fetch");

// const API_ENDPOINT = "http://localhost:3001/fruits";

// exports.handler = async (event, context) => {
// 	return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
// 		.then((response) => response.json())
// 		.then((data) => ({
// 			statusCode: 200,
// 			body: data.joke,
// 		}))
// 		.catch((error) => ({ statusCode: 422, body: String(error) }));
// };

//! ========================== NETLIFY FUNCTION END ==========================

response
	.then((fruits) => fruits.json())
	.then((fruits) => {
		const newFruits = fruits.map(({ id, name, img, price }) => {
			return (`
					<article class="child" id="${id}">
					<p class="name">${name}</p>
					<img class="img" src="${img}" alt="" />
					<p class="price">$${price}</p>
					</article>
					`)
		}).join('');

		parent.innerHTML = newFruits;
		return fruits;

	}).then((fruits) => {
		const price = document.querySelectorAll('.price');


		range.addEventListener('change', (e) => {
			out.innerHTML = `$${e.target.value}`;
			let newArr = fruits.filter((el) => el.price >= +e.target.value)


			parent.innerHTML = newArr.map(({ id, name, img, price }) => {
				return (`
						<article class="child" id="${id}">
						<p class="name">${name}</p>
						<img class="img" src="${img}" alt="" />
						<p class="price">$${price}</p>
						</article>
						`)
			}).join('');

			if (newArr.length == 0) {
				parent.innerHTML = `<p style="font-size: 30px;">Ничего не найдено!</p>`;
			}

			// if (newArr.length) {
			// price.forEach((el) => {
			// 	if (+el.innerText.slice(1) >= +e.target.value) {
			// 		el.parentElement.classList.remove('none');
			// 	} else {
			// 		el.parentElement.classList.add('none');
			// 	}
			// });
			// } else {
			// 	parent.innerHTML = `<p style="font-size: 30px;">Ничего не найдено!</p>`;
			// }


		});
	});
