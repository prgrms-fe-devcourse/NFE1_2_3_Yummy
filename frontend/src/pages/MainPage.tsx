import CategoryButtons from '@/components/CategoryButton';
import PostCard from '@/components/PostCard';
import TopPost from '@/components/TopPost';
import { mockPosts } from '@/utils/mockPosts';
import styled from 'styled-components';

const Header = styled.h1`
    text-align: center;
    margin: 20px 0; 
`;


const MainPage = () => {
    // 인기순으로 정렬
    const sortedPosts = mockPosts.sort((a, b) => (b.heartCount + b.viewCount) - (a.heartCount + a.viewCount));
    const topPost = sortedPosts[0];

    return (
        <div>
            <TopPost post={topPost}/>
            <Header>Trending Now</Header>
            {sortedPosts.map((post, index) => (
                <PostCard 
                    key={index} 
                    category={post.category} 
                    title={post.title} 
                    author={post.author} 
                    date={post.date} 
                    text={post.text} 
                    imgUrl={post.imgUrl} 
                />
            ))}
            <Header>Category</Header>
            <CategoryButtons/>
        </div>
    );
};

export default MainPage;
