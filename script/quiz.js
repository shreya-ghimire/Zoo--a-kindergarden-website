quizAdd.addEventListener('click', function () {
    const addQuestion = document.createElement('button');
    addQuestion.type = "button";
    addQuestion.textContent = "Add Chapter";
    const chaptersContainer = document.querySelector('#chapters');
    chaptersContainer.appendChild(addQuestion);

    let chapters = [];  
    addQuestion.addEventListener('click', function () {
        const chapter = document.createElement('div');
        chapter.className = "chapter";
        chapter.innerHTML = `
            <form id="chapter-form${questionIndex}">
                <label for="question${questionIndex}">Enter Question ${questionIndex + 1}:</label>
                <input type="text" id="question${questionIndex}" name="question${questionIndex}" placeholder="Enter Question">

                <label for="questionType${questionIndex}">Question Type:</label>
                <select id="questionType${questionIndex}" name="questionType${questionIndex}">
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                </select>

                <div id="inputContainer${questionIndex}" class="input-container"></div>

                <label>Options for Question ${questionIndex + 1}:</label>
                <input type="text" class="option" placeholder="Option 1">
                <input type="text" class="option" placeholder="Option 2">
                <input type="text" class="option" placeholder="Option 3">
                <input type="text" class="option" placeholder="Option 4">
                <input type="button" value="Add" class="chapterSubmit" data-index="${questionIndex}">
            </form>
        `;

        chaptersContainer.appendChild(chapter);

        const questionTypeSelect = chapter.querySelector(`#questionType${questionIndex}`);
        const inputContainer = chapter.querySelector(`#inputContainer${questionIndex}`);

        questionTypeSelect.addEventListener('change', function () {
            const selectedType = questionTypeSelect.value;
            inputContainer.innerHTML = '';

            if (selectedType === "text") {
                const textInput = document.createElement('input');
                textInput.type = "text";
                textInput.placeholder = "Enter your text here";
                inputContainer.appendChild(textInput);
            } else if (selectedType === "image") {
                const imageInput = document.createElement('input');
                imageInput.type = "url";
                imageInput.placeholder = "Enter image URL";
                inputContainer.appendChild(imageInput);
            } else if (selectedType === "audio") {
                const audioInput = document.createElement('input');
                audioInput.type = "url";
                audioInput.placeholder = "Enter audio URL";
                inputContainer.appendChild(audioInput);
            } else if (selectedType === "video") {
                const videoUrlInput = document.createElement('input');
                videoUrlInput.type = "url";
                videoUrlInput.placeholder = "Enter video URL";
                inputContainer.appendChild(videoUrlInput);
            }
        });

        chapter.querySelector('.chapterSubmit').addEventListener('click', function () {
            saveChapter(chapter, chapters);
        });

        questionIndex++; 
    });

    document.getElementById("submit-quiz").addEventListener('click', function () {
        const quizName = document.getElementById('quiz-name').value;
        if (quizName.trim() === '') {
            alert('Please enter a quiz name.');
            return;
        }

        const quizData = {
            name: quizName,
            chapters: chapters  
        };

        quizzes.push(quizData);  
        localStorage.setItem('quizzes', JSON.stringify(quizzes));  
        console.log("Quizzes saved to local storage:", quizzes);
        alert('Quiz submitted successfully!');

        renderQuizzes();

        document.getElementById('quiz-name').value = ''; 
        document.getElementById('chapters').innerHTML = '';  
        questionIndex = 0;  
    });
});

function saveChapter(chapterElement, chapters) {
    const questionForm = chapterElement.querySelector('form');
    

    const questionText = questionForm.querySelector('input[type="text"]').value;

 
    const questionType = questionForm.querySelector('select').value;

    const chapterData = {
        question: questionText,
        type: questionType,
        url: '', 
        options: []
    };

    if (questionType !== "text") {
        console.log(questionType);
        const urlInput = chapterForm.querySelector('input[type="url"]');
        chapterData.url = urlInput ? urlInput.value : '';
        console.log(urlInput.value)
    }

    const optionInputs = chapterForm.querySelectorAll('.option');
    optionInputs.forEach(input => {
        if (input.value.trim() !== '') {
            chapterData.options.push(input.value.trim());
        }
    });

    chapters.push(chapterData);
    console.log("Chapter saved:", chapterData);
}
