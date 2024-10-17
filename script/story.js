const stories = JSON.parse(localStorage.getItem("stories"));
console.log("hey");

function displayStories(stories) {
    console.log("hi");
    const storyContainer = document.querySelector('.story-gallery');
    if (!storyContainer) return; 

    storyContainer.innerHTML = ""; 

    let i = 1;
    stories.forEach(story => {
        try {
            let storyDiv = document.createElement('div');
            if (i > 6) i = 1; 
            let j = i.toString();
            storyDiv.className = `gallery-item item${j}`; 
            storyDiv.innerHTML = `
                <a href="story-content.html" class="story-link" data-story-id="${story.id}">
                    <img src="images/${story.image}" alt="${story.title}">
                </a>
            `;
 
            storyContainer.appendChild(storyDiv);
            i++; 

        } catch (error) {
            console.error(error);
        }
    });


    document.querySelectorAll('.story-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 

            const storyId = this.getAttribute('data-story-id'); 
            localStorage.setItem('currentStoryId', storyId); 

           
            window.location.href = 'story-content.html';
        });
    });
}


function displayStoryContent(stories) {
    console.log("hi");
    const currentStoryId = localStorage.getItem('currentStoryId');
    if (!currentStoryId) {
        console.error('No story ID found in localStorage');
        return;
    }

    const story = stories.find(story => story.id === currentStoryId);
    if (!story) {
        console.error('Story not found');
        return;
    }

   
    const navContainer = document.querySelector('.nav-pills'); 
    const chaptersContainer = document.querySelector('.chapters'); 

    if (!navContainer || !chaptersContainer) {
        console.error('Required containers not found on the page');
        return;
    }


    navContainer.innerHTML = '';
    chaptersContainer.innerHTML = '';

  
    story.chapters.forEach((chapter, index) => {
        const chapterNumber = index + 1;


        const navItem = document.createElement('li');
        navItem.className = 'nav-item';
        navItem.innerHTML = `
            <a href="#chapter${chapterNumber}" class="nav-link link-dark">
                Chapter ${chapterNumber}
            </a>
        `;
        navContainer.appendChild(navItem);

      
        const chapterDiv = document.createElement('div');
        chapterDiv.id = `chapter${chapterNumber}`;
        chapterDiv.innerHTML = `
            <h2>${chapter.title}</h2>
            <img id="story-img" src="images/${chapter.image}" alt="${chapter.title}">
            <p id="main-content">${chapter.content}</p>
        `;
        chaptersContainer.appendChild(chapterDiv);
    });

    window.location.hash = '#chapter1'; 
}


if (window.location.pathname.includes("story-content.html")) {
    console.log("this s page");
   displayStoryContent(stories);

} else if (window.location.pathname.includes("story.html")) {
    console.log("this is event page");
    displayStories(stories);
}
