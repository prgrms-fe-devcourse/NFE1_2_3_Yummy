import CategoryButtons from '@/components/CategoryButton';
import PostCard from '@/components/PostCard';
import { mockPosts } from '@/utils/mockPosts';

const MainPage = () => {
    return (
        <div>
            {mockPosts.map((post, index) => (
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
            <CategoryButtons/>
        </div>
    );
};

export default MainPage;
