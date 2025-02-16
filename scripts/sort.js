const sortVideos = async () => {
	const activeCategoryID = findActiveCategory();
	let res;
	if (activeCategoryID) {
		res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${activeCategoryID}`);
	} else {
		res = await fetch("https://openapi.programming-hero.com/api/phero-tube/videos?title=");
	}
	const data = await res.json();
	const videos = data.videos ? data.videos : data.category;

	videos.sort((a, b) => parseViews(b.others.views) - parseViews(a.others.views));
	displayVideos(videos);
};
const findActiveCategory = () => {
	const activeCategory = document.getElementsByClassName("active-button");
	if (activeCategory[0].id.slice(16) === "all") return;
	return activeCategory[0].id.slice(16);
};
const parseViews = views => {
	if (views.endsWith("k")) {
		views = views.slice(0, -1);
	}
	return parseFloat(views);
};
