
const modal = document.querySelector(".modal");
const paragraph = document.querySelector(".para");
const heading = document.querySelector(".heading");
const images = document.querySelector(".image");
const video = document.querySelector(".video");

let courses = [];

document.addEventListener('keydown', function(event) {

    if (event.key === "Tab") {
    
        event.preventDefault(); 
        document.querySelector('.navBar').style.display = 'block'; 
    } 

    else if (event.key === "Escape") {
        document.querySelector('.navBar').style.display = 'none'; 
    }
});

function courseDisplay() {
    console.log('some');
    const addCourse = document.querySelector("#add-new-course");

    addCourse.addEventListener('click', function () {
        const title = document.querySelector('#Title').value.trim();
        try {
            if (title) {
                const xhr = new XMLHttpRequest();
                const course = {
                    name: title
                };

                xhr.open('POST', 'http://localhost:8080/course', true);
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            console.log('Success:', JSON.parse(xhr.responseText));
                            displayCourses();  
                        } else {
                            console.error('Error:', xhr.statusText);
                        }
                    }
                };
                xhr.send(JSON.stringify(course));

            } else {
                alert("Course title cannot be empty!");
            }

        } catch (e) {
            console.error(e);
        }
    });

    displayCourses();
}

async function displayCourses() {
    try {
        const response = await fetch('http://localhost:8080/courses');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const courses = data;
        console.log(courses);
        
        const div = document.querySelector(".display-courses");
        div.innerHTML = "";  

        courses.forEach(course => {
            const divbox = document.createElement('div');
            divbox.classList.add("course-box");

            const h2 = document.createElement('h2');
            h2.textContent = course.name;

            const buttonEdit = document.createElement('button');
            buttonEdit.textContent = 'Edit';
            buttonEdit.className = 'editCourse';

            const buttonDel = document.createElement('button');
            buttonDel.textContent = 'Delete';
            buttonDel.className = 'deleteCourse';

       
            divbox.appendChild(h2);
            divbox.appendChild(buttonEdit);
            divbox.appendChild(buttonDel);
            div.appendChild(divbox);

            buttonEdit.addEventListener('click', function () {
                localStorage.setItem('currentCourse', JSON.stringify(course.id));
                window.location.href = "CourseEditor.html";
            });

          
            buttonDel.addEventListener('click', function () {
                deleteCourse(course.id);
            });
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

function deleteCourse(id) {
    if (confirm("Are you sure you want to delete this course?")) {
        fetch('http://localhost:8080/course/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete course');
            }
            console.log('Course deleted successfully');
            displayCourses(); 
        })
        .catch(error => {
            console.error('Error deleting course:', error);
        });
    }
}

function displayFormParagraph(form,modal){

        form.id = "paragraphForm";
        form.innerHTML = `
    <label for="fontStyle">Font Style:</label>
            <div class="paragraph-tool">
                <select id="fontStyle">
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
            
                <label for="fontSize">Font Size:</label>
                <select id="fontSize">
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="24">24</option>
                    <option value="28">28</option>
                </select>
            </div>
                
                <label for="textContent">Text:</label>
                <textarea id="textContent"></textarea>
                    <button type="submit" class="submit">Add</button>        
   `;
        modal.innerHTML = "";
        modal.appendChild(form)


}
function displayFormHeading(form,modal){
    form.id = "headingForm";
        form.innerHTML = `
               <label for="fontSize">Heading Size:</label>
                    <select id="fontSize">
                        <option value="32">H1 (32px)</option>
                        <option value="28">H2 (28px)</option>
                        <option value="24">H3 (24px)</option>
                        <option value="20">H4 (20px)</option>
                        <option value="18">H5 (18px)</option>
                        <option value="16">H6 (16px)</option>
                    </select>
                
                <label for="textContent">Text:</label>
                <textarea id="textContent"></textarea>
                    <button type="submit" class="submit">Add </button>
   `;
        modal.innerHTML = "";
        modal.appendChild(form)
}

function displayFormImages(form,modal){
    form.id = "imageForm";
    form.innerHTML = `
        <label for="uploadImg">Upload Image:</label>
        <input type="file" id="uploadImg" accept="image/*">
        <label for="width">Width in px:</label>
        <input type="text" id="width" >
        <label for="height">Height in px:</label>
        <input type="text" id="height" >
        <button type="submit" class="submit">Add</button>
    `;

    modal.innerHTML = "";
    modal.appendChild(form);

}
function displayFormVideos(form,modal){
    form.id = "videoForm";
    form.innerHTML = `
        <label for="uploadVid">Upload Video link:</label>
        <input type="text" id="uploadVid" placeholder="Enter YouTube URL" required>
        <label for="width">Width in px:</label>
        <input type="number" id="width" placeholder="e.g., 640" required>
        <label for="height">Height in px:</label>
        <input type="number" id="height" placeholder="e.g., 360" required>
        <button type="submit" class="submit">Add</button>
    `;

    modal.innerHTML = ""; 
    modal.appendChild(form); 
}

function editCourse(id) {

  
    paragraph.addEventListener('click', function () {
        const form = document.createElement('Form');
        displayFormParagraph(form,modal);

        form.addEventListener('submit', function (event) {
            console.log("paragraph");
            event.preventDefault();
            const fontStyle = document.getElementById("fontStyle").value;
            const fontSize = document.getElementById("fontSize").value;
            const textContent = document.getElementById("textContent").value;
            const type = "Paragraph";
            console.log(fontStyle + " " + fontSize + " " + type + " " + textContent);




            const courseContent = {
                "type": type,
                "fontSize": fontSize,
                "fontType": fontStyle,
                "url": "",
                "upload": "",
                "textContent": textContent,
                "width": "",
                "height": ""
            }
            console.log(courseContent);
            postContent(id, courseContent);






        });
    });

    heading.addEventListener('click', function () {
        const form = document.createElement('Form');
        displayFormHeading(form,modal);
        
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const fontSize = document.getElementById("fontSize").value;
            const textContent = document.getElementById("textContent").value;
            const type = "Heading";

            const courseContent = {
                "type": type,
                "fontSize": fontSize,
                "fontType": "",
                "url": "",
                "upload": "",
                "textContent": textContent,
                "width": "",
                "height": ""
            }
            console.log(courseContent);
            postContent(id, courseContent);



        });
    });

    images.addEventListener('click', function () {
        const form = document.createElement('form');
        displayFormImages(form,modal);
        
        form.addEventListener('submit', function (event) {
            event.preventDefault();
     

            const imgInput = document.getElementById("uploadImg");
        
            const file = imgInput.files[0];
            console.log(file);



            const width = document.getElementById("width").value;
            const height = document.getElementById("height").value;
            const type = "Images";


            if (!file) {
                alert("Please select an image file.");
                return;
            }


            const formData = new FormData();
            formData.append('courseId', id);
            formData.append('Image', file);
            formData.append('type', type);
            formData.append('height', height);
            formData.append('width', width);

            console.log("FormData being sent: ");
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }


            axios.post('http://localhost:8080/api/courseContent/upload', formData)
                .then(response => {
                    console.log('Success:', response.data);
                    alert('Course content added successfully!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error uploading course content!');
                });
        });

    });

    video.addEventListener('click', function () {
        const form = document.createElement('form');
        displayFormVideos(form,modal);
    
        form.addEventListener('submit', function (event) {
            event.preventDefault();
    
            const url = document.getElementById("uploadVid").value;
            const width = document.getElementById("width").value;
            const height = document.getElementById("height").value;
            const type = "Videos";
    
            const embedUrl = getEmbedUrl(url);
    
            if (!embedUrl) {
                alert("Please enter a valid YouTube URL.");
                return;
            }
    
            const courseContent = {
                "type": type,
                "fontSize": "",
                "fontType": "",
                "url": embedUrl, 
                "upload": "",
                "textContent": "",
                "width": width,
                "height": height
            }
    
            console.log(courseContent); 
            postContent(id, courseContent);
    

            const div = document.createElement('div');
            createIframe(div, courseContent); 
            modal.appendChild(div); 
        });
    });
}

function getEmbedUrl(videoUrl) {
    try {
        const url = new URL(videoUrl);
        let videoId;

       
        if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
        
            videoId = url.searchParams.get("v");
        } else if (url.hostname === 'youtu.be') {
      
            videoId = url.pathname.substring(1);
        }

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        } else {
            throw new Error("Invalid YouTube URL");
        }
    } catch (error) {
        console.error(error);
        return null; 
    }
}



function getImage(courseId, upload, div, width, height) {
    const img = document.createElement('img');
    img.style.height = height;
    img.style.width = width;



    img.src = `data:image/png;base64,${upload}`;
    img.alt = "Base64 Image";


    div.appendChild(img);
}
async function displayCourseContent(id) {
    console.log("displayCourseContent");
    const courseEditor = document.querySelector(".course-editor")
    try {
        const response = await fetch(`http://localhost:8080/course/${id}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        coursesCon = data;
        console.log("what");
        console.log(coursesCon);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
    courseEditor.innerHTML = "";
    coursesCon.courseContent.forEach((content) => {
        const div = document.createElement("div");
        const button=document.createElement("button");
        button.id="edit-content";
        button.textContent="Edit";
        const delButton=document.createElement("button");
        delButton.id="delete-content";
        delButton.textContent="delete";

        if (content.type === "Paragraph") {
            div.classList = "paraContent";
            const p = document.createElement('p');
            p.textContent = content.textContent;
            p.style.fontSize = `${parseInt(content.fontStyle)}px`;
            p.style.fontStyle = `${content.fontStyle}`;
            // div.appendChild(button);
            div.appendChild(delButton);
            div.appendChild(p);
        } else if (content.type === "Heading") {
            div.classList = "headContent";
            const h1 = document.createElement('h1');
            h1.textContent = content.textContent;
            h1.style.fontSize = `${parseInt(content.fontStyle)}px`;
            div.appendChild(button);
            div.appendChild(delButton);
            div.appendChild(h1);
        }
        else if (content.type === "Images") {
            getImage(content.id, content.upload, div, content.width, content.height);
            div.appendChild(delButton);
            console.log(typeof (content.upload));
        }
        else if (content.type === "Videos") {
            const iframe = document.createElement('iframe');
            iframe.src = content.url + "?autoplay=1&controls=0&showinfo=0&modestbranding=1";
            iframe.width = content.width; 
            iframe.height = content.height; 
            iframe.allowFullscreen = true; 
            // div.appendChild(button);
            div.appendChild(delButton);
            div.appendChild(iframe); 
        }

        courseEditor.appendChild(div);
        button.addEventListener('click', function () {
            modal.innerHTML = '';

            if (content.type === "Paragraph") {
                const form = document.createElement('form');
                displayFormParagraph(form, modal); 
                
           
                console.log("Paragraph form added to modal", form);
                
         
                document.getElementById("textContent").value = content.textContent;
                document.getElementById("fontSize").value = content.fontSize;
                document.getElementById("fontStyle").value = content.fontType;
                
                form.addEventListener('submit', function (event) {
                    console.log("para")
                    event.preventDefault();
        
                    const fontSize = document.getElementById("fontSize").value;
                    const fontStyle=document.getElementById("fontStyle").value;
                    const textContent = document.getElementById("textContent").value;
                    const type = "Parahgraph";
        
                    const courseContent = {
                        "type": type,
                        "fontSize": fontSize,
                        "fontType": fontStyle,
                        "url": "",
                        "upload": "",
                        "textContent": textContent,
                        "width": "",
                        "height": ""
                    }
                    console.log(courseContent);
                    const currentCourse=localStorage.getItem('currentCourse');
                    updateContent(id, content.id,courseContent);
        
        
        
                });
        
            } else if (content.type === "Heading") {
                const form = document.createElement('form');
                displayFormHeading(form, modal);  
        
            
                console.log("Heading form added to modal", form);
        
              
                document.getElementById("textContent").value = content.textContent;
                document.getElementById("fontSize").value = content.fontSize;
           
        
                form.addEventListener('submit', function (event) {
                    console.log("para")
                    event.preventDefault();
        
                    const fontSize = document.getElementById("fontSize").value;
              
                    const textContent = document.getElementById("textContent").value;
                    const type = "Heading";
        
                    const courseContent = {
                        "type": type,
                        "fontSize": fontSize,
                        "fontType":"",
                        "url": "",
                        "upload": "",
                        "textContent": textContent,
                        "width": "",
                        "height": ""
                    }
                    console.log(courseContent);
                    const currentCourse=localStorage.getItem('currentCourse');
                    updateContent(id, content.id,courseContent);
                });
                
        
            } else if (content.type === "Images") {
                const form = document.createElement('form');
                displayFormImages(form, modal);  
                console.log("Images form added to modal", form);
        
                document.getElementById("width").value = content.width;
                document.getElementById("height").value = content.height;
        
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    console.log("Form submit intercepted for images");
        
                    const imgInput = document.getElementById("uploadImg");
                    const file = imgInput.files[0];  
                    const width = document.getElementById("width").value;
                    const height = document.getElementById("height").value;
                    const type = "Images";
        
                    const formData = new FormData();
                    formData.append('upload', file);  
                    formData.append('type', type);
                    formData.append('height', height);
                    formData.append('width', width);
        
                  
                    for (let pair of formData.entries()) {
                        console.log(`${pair[0]}: ${pair[1]}`);
                    }
        
                    axios.put(`http://localhost:8080/course/${id}/courseContent/${content.id}`, formData)
                        .then(response => {
                            console.log('Image content updated successfully:', response.data);
                            alert('Image content updated successfully!');
                        })
                        .catch(error => {
                            console.error('Error updating image content:', error);
                            alert('Error updating image content.');
                        });
                });
        
            } else if (content.type === "Videos") {
                const form = document.createElement('form');
                displayFormVideos(form, modal);  
                
                
                console.log("Videos form added to modal", form);
        
               
                document.getElementById("uploadVid").value = content.url;
                document.getElementById("width").value = content.width;
                document.getElementById("height").value = content.height;
        
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    console.log("Form submit intercepted for videos");
        
                    const url = document.getElementById("uploadVid").value;
                    const width = document.getElementById("width").value;
                    const height = document.getElementById("height").value;
                    const type = "Videos";
        
                    const embedUrl = getEmbedUrl(url); 
        
                    if (!embedUrl) {
                        alert("Please enter a valid YouTube URL.");
                        return;
                    }
        
                    const courseContent = {
                        "type": type,
                        "fontSize": "",
                        "fontType": "",
                        "url": embedUrl,
                        "upload": "",
                        "textContent": "",
                        "width": width,
                        "height": height
                    };
        
              
                    console.log("Videos course content", courseContent);
        
                 
                    updateContent(id, content.id, courseContent);
                });
            }
        });
        delButton.addEventListener('click', function () {
            if (confirm("Are you sure you want to delete this content?")) {
                axios.delete(`http://localhost:8080/course/${id}/courseContent/${content.id}`)
                    .then(response => {
                        alert('Course content deleted successfully.');
               
                        div.remove();
                    })
                    .catch(error => {
                        console.error('Error deleting course content:', error);
                        alert('Error deleting course content.');
                    });
            }
        });
        
        
    });  
}
async function updateContent(courseId, contentId, courseContent) {
    try {
      const response = await axios.put(`http://localhost:8080/course/${courseId}/courseContent/${contentId}`, courseContent, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Success:', response.data);
      alert('Course content updated successfully!');
      displayCourseContent(contentId);  
    } catch (error) {
      console.error('Error updating course content:', error);
      alert('Error updating course content.');
    }
  }
  


function postContent(id, courseContent) {
    console.log(id);
    try {
        fetch(`http://localhost:8080/course/${id}/courseContent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseContent)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Course content added successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } catch (e) {
        console.error(e);
    }
}



if (window.location.pathname.includes("CourseAdmin.html")) {
    console.log("Course Admin page");
    courseDisplay();
} else if (window.location.pathname.includes("CourseEditor.html")) {
    const id = JSON.parse(localStorage.getItem("currentCourse"));
    displayCourseContent(id);
    editCourse(id);


}