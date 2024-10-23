import React, { useState } from 'react';
import styled from 'styled-components';
import { mockPosts } from '@/utils/mockPosts';
import PostCard from '@/components/PostCard';

interface CategoryButtonProps {
    label: string;
    onClick: () => void;
}

const Button = styled.button`
    height: 125px;
    width: 125px;
    border: 1px solid #7d7d7d;
    background-color: #ffffff;
    color: #1C1C1C;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background-color: #1C1C1C;
        color: #ffffff;
    }
    padding: 0;
`;

const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0;
`;

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
`;

const PostsContainer = styled.div`
    margin-top: 20px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, onClick }) => {
    return <Button onClick={onClick}>{label}</Button>;
};

const categories = [
    '한식', '중식', '일식', '양식', '동남아 요리', '남미 요리', 
    '중동 요리', '퓨전 요리', '채식 요리', '해산물 요리', 
    '바베큐 요리', '디저트'
];

const CategoryButtons: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleClick = (category: string) => {
        setSelectedCategory(category);
    };

    // 선택된 카테고리에 따라 포스트 필터링
    const filteredPosts = selectedCategory 
        ? mockPosts.filter((post) => post.category === selectedCategory) 
        : [...mockPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 최신순 정렬

    return (
        <CenteredContainer>
            <ButtonGrid>
                {categories.map((category) => (
                    <CategoryButton 
                        key={category} 
                        label={category} 
                        onClick={() => handleClick(category)} 
                    />
                ))}
            </ButtonGrid>
            <PostsContainer>
                {filteredPosts.map((post, index) => (
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
            </PostsContainer>
        </CenteredContainer>
    );
};

export default CategoryButtons;
