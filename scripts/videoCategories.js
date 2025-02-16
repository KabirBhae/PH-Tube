const loadCategories = () => {
	fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
		.then(res => res.json())
		.then(data => displayCategories(data.categories))
		.catch(err => console.log(err));
};
const loadCategoricalVideos = id => {
	fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
		.then(res => res.json())
		.then(data => {
			removeActiveButtons();
			document.getElementById(`category-button-${id}`).classList.add("active-button");
			displayVideos(data.category);
		})
		.catch(err => console.log(err));
};
const displayCategories = categories => {
	categoryContainer = document.getElementById("categories-container");

	showAllButtonContainer = document.createElement("div");
	showAllButtonContainer.innerHTML = `
		<button id="category-button-all" onclick="loadVideos()" class="btn category-button active-button">
				All Videos
		</button>`;
	categoryContainer.appendChild(showAllButtonContainer);

	categories.forEach(categoryItem => {
		const buttonContainer = document.createElement("div");
		buttonContainer.innerHTML = `
		<button id="category-button-${categoryItem.category_id}" onclick="loadCategoricalVideos(${categoryItem.category_id})" class="btn category-button">
			${categoryItem.category}
		</button>`;
		categoryContainer.appendChild(buttonContainer);
	});
};
loadCategories();