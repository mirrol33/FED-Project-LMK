// 📌 설정 변수
const ACCESS_TOKEN = 'IGAAHAt4zDyOhBZAE5iWkN5a19KWi1GNkhpc3ZAfZAEtsaEVrVVhpa1VBNHVuWUQ1SHB4YXRkcy1INjJzMmU5a1pJUDZAfMHRrLXh0ZAmd6bFNFUXRyTzlidmdYTzJFYUlfSjJ5cTJvUl9YU21YSjd3Q29JdElQT2lFYXgwQ1V0cllBbwZDZD'; // Instagram Access Token
const IMAGE_LIMIT = 8; // 가져올 이미지 최대 개수

const INSTAGRAM_API_URL = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&limit=${IMAGE_LIMIT}&access_token=${ACCESS_TOKEN}`;

// 📌 Instagram 피드 가져오기
async function fetchInstagramFeed() {
  try {
    const response = await fetch(INSTAGRAM_API_URL);
    const data = await response.json();
    
    if (data && data.data) {
      const feedContainer = document.getElementById('instagram-feed');
      
      data.data.forEach(post => {
        if (post.media_url && post.permalink) {
          const postElement = document.createElement('a');
          postElement.href = post.permalink;
          postElement.target = '_blank';
          postElement.innerHTML = `<img src="${post.media_url}" alt="${post.caption || 'Instagram Image'}">`;
          
          feedContainer.appendChild(postElement);
        }
      });
    }
  } catch (error) {
    console.error('Instagram API 오류:', error);
  }
}

// 📌 페이지 로드 시 피드 불러오기
document.addEventListener('DOMContentLoaded', fetchInstagramFeed);
