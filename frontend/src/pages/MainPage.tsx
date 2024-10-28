import CategoryButtons from '@/components/CategoryButton'
import PostCard from '@/components/PostCard'
import TopPost from '@/components/TopPost'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import styled from 'styled-components'

const Header = styled.h1`
    text-align: center;
    margin: 20px 0; 
`;

const MainPage = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await axios.get('/api/post')
        console.log("ADD ", response.data)
            return response.data
        }
    })

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>오류 발생: {error.message}</p>
    if (!Array.isArray(posts)) {
        return <p>포스트 데이터가 올바르지 않습니다.</p>
    }

    const sortedPosts = posts.sort((a, b) => b.heartCount - a.heartCount)
    const topPost = sortedPosts[0]

    return (
        <div>
            <TopPost post={topPost} />
            <Header>Trending Now</Header>
            {sortedPosts.map((post) => (
                <PostCard
                    key={post.id}
                    category={post.category} 
                    title={post.title} 
                    author={post.author} 
                    date={post.date} 
                    text={post.text} 
                    image_url={post.image_url} 
                />
            ))}
            <Header>Category</Header>
            <CategoryButtons />
        </div>
    );
};

export default MainPage
