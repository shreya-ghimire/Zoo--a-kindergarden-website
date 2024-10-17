        const currentUser = localStorage.getItem('currentUser');
        const who = document.querySelector(".user-who");
        console.log("lala")

        function sign() {
            if (!currentUser) {
                who.innerHTML = `Sign In`;
                who.id = `login`;


                const login = document.querySelector('#login');
                if (login) {
                    login.addEventListener("click", function () {
                        window.location.href = "signup.html";
                    });
                }
            } else {
                who.innerHTML = `Log Out`;
                who.id = "logout";

                const logout = document.querySelector('#logout');
                if (logout) {
                    logout.addEventListener('click', function () {
                        console.log("Logging out...");
                        localStorage.removeItem('currentUser');
                        window.location.href = "index.html";
                    });
                }
            }
        }
        document.getElementById('user-login').addEventListener('click',sign());


        let currenUser = localStorage.getItem('currentUser'); 
        let users = JSON.parse(localStorage.getItem('users'));


        const nowuser = users.find(user => user.username === currenUser); 
        console.log(currentUser);
        console.log(users);
        console.log(nowuser);
        if(!currentUser){
            console.log("no login");
            disableLinks(['story.html','quiz.html','courses.html','games.html', 'drawing.html']);
        }
        
    
        if (nowuser) {
           
            if (nowuser.membership === "Bronze") {
                disableLinks(['courses.html','games.html', 'drawing.html']);
            } else if (nowuser.membership === "Silver") {
                disableLinks(['drawing.html']);
            }else if(nowuser.membership===""){
                disableLinks(['story.html','quiz.html','courses.html','games.html', 'drawing.html']);
            }
        }

        function disableLinks(linksToDisable) {
            linksToDisable.forEach(link => {
                const navLink = document.querySelector(`a[href="${link}"]`);
                if (navLink) {
                    navLink.classList.add('disabled'); 
                    navLink.onclick = (e) => {
                        e.preventDefault(); 
                        alert('Access denied. Upgrade your membership for access.'); 
                    };
                }
            });
        }
        sign();