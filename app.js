console.log('This is working');
function attachEvents() {
    let btnLoadPosts = document.getElementById('btnLoadPosts');
    let btnViewPost = document.getElementById('btnViewPost');
    let postBody = document.getElementById('post-body');
    let postSelect = document.getElementById('posts');
    let postTitle = document.getElementById('post-title');
    let postComments = document.getElementById('post-comments');

    btnLoadPosts.addEventListener('click', async function() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let responseArray = [];
        let resultFromFirst;
        fetch("https://blog-apps-c12bf.firebaseio.com/posts.json", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            for (let post in result) {
                let option = document.createElement('option');
                resultFromFirst = result;
                console.log(post);
                console.log(result[post].title);
                option.value = post;
                option.textContent = result[post].title;
                responseArray.push(result[post]);
                postSelect.appendChild(option);
            }
        })
        .catch(error => console.log('error', error)); 
        btnViewPost.addEventListener('click', async function() {
            requestOptions = {
                method: 'GET',
                redirect: 'follow',
                //mode: 'no-cors'
            };
            let index = postSelect.options.selectedIndex;
            let value = postSelect.options[index].value;
            console.log('selected index:',index);
            let postID = resultFromFirst[value].id;
            console.log('Post ID:', postID);
            fetch(`https://blog-apps-c12bf.firebaseio.com/comments.json`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('test');
                console.log(result);
                postComments.textContent = '';
                for (let comment in result) {
                    console.log(comment);
                    console.log(result[comment].postId);
                    if (result[comment].postId === postID) {
                        //create element and append it
                        let newComment = document.createElement('li');
                        newComment.textContent = result[comment].text;
                        postComments.appendChild(newComment);
                    }
                }
                console.log(resultFromFirst[value]);
                postTitle.innerText = resultFromFirst[value].title;
                postBody.innerText = resultFromFirst[value].body;
            });
        });
    });
}
attachEvents();