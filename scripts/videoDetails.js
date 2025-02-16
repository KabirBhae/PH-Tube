const loadDetails = async videoID => {
	const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`);
	const data = await res.json();
	displayDetails(data.video);
};


const displayDetails = video => {
	const modalContent = document.getElementById("modal-content");
	modalContent.innerHTML = `
	<img src="${video.thumbnail}" class="modal-img"/>
	<p class="mt-4">${video.description} </p>`;

	document.getElementById("detailsModal").showModal();
};