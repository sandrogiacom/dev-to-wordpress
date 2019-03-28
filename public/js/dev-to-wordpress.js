async function DTW_getPosts(params) {
  const DTW_url = 'https://ye5y9r600c-3.algolianet.com/1/indexes/ordered_articles_production/query?x-algolia-agent=Algolia for vanilla JavaScript 3.20.3&x-algolia-application-id=YE5Y9R600C&x-algolia-api-key=OTU1YjU5MWNlZTk1MjQ0YmExOTRjZmY4NDM2ZTM2YWZiYTM2ODA2NThhMzNjMDkzYTEzYjFmNDY0MDcwNjRkOHJlc3RyaWN0SW5kaWNlcz1zZWFyY2hhYmxlc19wcm9kdWN0aW9uJTJDVGFnX3Byb2R1Y3Rpb24lMkNvcmRlcmVkX2FydGljbGVzX3Byb2R1Y3Rpb24lMkNvcmRlcmVkX2FydGljbGVzX2J5X3B1Ymxpc2hlZF9hdF9wcm9kdWN0aW9uJTJDb3JkZXJlZF9hcnRpY2xlc19ieV9wb3NpdGl2ZV9yZWFjdGlvbnNfY291bnRfcHJvZHVjdGlvbiUyQ29yZGVyZWRfY29tbWVudHNfcHJvZHVjdGlvbg==';
  const response = await fetch(
    DTW_url,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        params: params
      })
    });

  const body = await response.json();

  return body.hits;
}

async function DTW_showPosts(container) {
  let posts;

  const n = container.getAttribute('data-n');
  const userID = container.getAttribute('data-userID');

  const params = `query=*&hitsPerPage=${n}&page=0&attributesToHighlight=[]&tagFilters=["${userID}"]`;

  try {
    posts = await DTW_getPosts(params);
  } catch(err) {
    console.log(err);
    return container.innerHTML = `<p> <span style = 'color: red'>Something bad has happened :( </span></p>`;
  }

  container.innerHTML = '';

  for(let post of posts) {
    const HTMLpost = `
    <div class="DTW-container__post">
      <div class="post__title">
        <h5><a href="https://dev.to${post.path}">${post.title}</a></h5>
      </div>

      <div class="post__content">

        <p class="content__date">${post.readable_publish_date}</p>

        <a href="https://dev.to${post.path}">
          <figure class="content__likes">
            <p>${post.positive_reactions_count}</p>
            <img src="/wp-content/plugins/dev-to-wordpress/public/img/reactions.png">
          </figure>
        </a>

        <a href="https://dev.to${post.path}#comments">
          <figure class="content__comments">
            <p>${post.comments_count}</p>
            <img src="/wp-content/plugins/dev-to-wordpress/public/img/comments.png">
          </figure>
        </a>
      </div>
    </div>
    `;
    
    container.innerHTML += HTMLpost;
  }
};

const DTW_containers = document.querySelectorAll('.DTW-container');
DTW_containers.forEach((container) => {
  DTW_showPosts(container);
});
