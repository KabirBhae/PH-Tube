const loadVideos = (searchText = "") => {
	fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
		.then((res) => res.json())
		.then((data) => {
			removeActiveButtons()
			document.getElementById(`category-button-all`).classList.add("active-button")
			displayVideos(data.videos)})
		.catch((err) => console.log(err))
}
const displayVideos = (videos) => {
	videoContainer = document.getElementById("videos-container")
	videoContainer.innerHTML=""

	if(videos.length === 0){
	videoContainer.classList.remove("grid")
	videoContainer.innerHTML = `
		<div class="min-h-[500px] flex flex-col justify-center items-center">
			<img class="mb-5" src="assets/Icon.png"
			<h2 class="text-center text-xl font-bold">
				Sorry! No content available in this category.
			</h2>
		</div>
	`
	}
	else{
		videoContainer.classList.add("grid")
		videos.forEach((videoItem) => {
			const card = document.createElement("div")
			card.classList = "card card-compact"
			card.innerHTML = `
			<figure class="h-[200px] relative">
				<img class="h-full w-full object-cover"
				src=${videoItem.thumbnail}
				alt="Thumbnail"/>
				${
					videoItem.others.posted_date
						? `<span class="absolute bottom-2 right-2 bg-black text-white rounded p-1">
					${convertSeconds(videoItem.others.posted_date)}</span>`
						: ""
				}
			</figure>
			<div class="px-0 py-2 flex gap-2">
				<div>
					<img class="w-10 h-10 rounded-full object-cover" src=${videoItem.authors[0].profile_picture} />
				</div>
				<div>
					<h2 class="font-bold">${videoItem.title}</h2>
					<div class="flex items-center gap-2">
						<p class="text-gray-600">${videoItem.authors[0].profile_name}</p>
						${videoItem.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/color/48/verified-badge.png"/>` : ""}
					</div>
					<p class="text-gray-400">${videoItem.others.views} Views</p>
					<button class="btn btn-sm btn-outline mt-1" onclick="loadDetails('${videoItem.video_id}')">Show Details</button>
				</div>
			</div>`
			videoContainer.appendChild(card)
		})
	}
}
//utility function
const convertSeconds = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let weeks = Math.floor(days / 7);
    let years = Math.floor(weeks / 52);

    minutes = minutes % 60;
    hours = hours % 24;
    days = days % 7;
    weeks = weeks % 52;

    if (years === 1) return `${years} year ago`;
    if (years > 1) return `${years} years ago`
    if (weeks === 1) return `${weeks} week ago`;
    if (weeks > 1) return `${weeks} weeks ago`;
    if (days === 1) return `${days} day ago`;
    if (days > 1) return `${days} days ago`;
    if (hours === 1) return `${hours} hr ${minutes} min ago`
    if (hours > 1) return `${hours} hrs ${minutes} min ago`;
    return `${minutes} min ago`;
}
const removeActiveButtons = () =>{
	categoryButtons = document.getElementsByClassName("category-button")

	for (const categoryButtonsItem of categoryButtons) {
		categoryButtonsItem.classList.remove("active-button")
	}
}
//search functionality
document.getElementById("searchVideoBox").addEventListener("keyup", (e)=>{
	loadVideos(e.target.value)
})

loadVideos("")