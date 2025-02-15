const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched Data:', data);
    displayData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const displayData = (data) => {
  const container = document.getElementById('data-container');
  data.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.innerHTML = `<h2>${user.name}</h2>`;
    user.posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.innerHTML = `<p>Post ID: ${post.id}</p><p>Timestamp: ${post.timestamp}</p><p>Likes: ${post.likes}</p>`;
      userDiv.appendChild(postDiv);
    });
    container.appendChild(userDiv);
  });
};

fetchData();