import React from 'react';
import styled from 'styled-components';

interface TopPostProps {
    post: {
        category: string;
        title: string;
        author: string;
        date: string;
        text: string;
        imgUrl: string;
        heartCount: number;
        viewCount: number;
    };
}

const TopPostContainer = styled.div<{ $imgUrl: string }>`
    position: relative;
    background-image: url(${(props) => props.$imgUrl});
    background-size: cover;
    background-position: center;
    height: 300px;
    display: flex;
    align-items: flex-start;
`;

const ContentContainer = styled.div`
    background-color: rgba(255, 255, 255, 1);
    padding: 16px;
    margin: 16px;
    max-width: 400px;
`;

const PostCategory = styled.p`
  font-size: 20px;
  color: #7d7d7d;
  margin: 0;
  font-weight: bold;
`;

const PostTitle = styled.h2`
  font-size: 33px;
  margin: 8px 0;
`;

const PostAuthor = styled.p`
  font-size: 16px;
  color: #7d7d7d;
  margin: 0;
`;

const PostText = styled.p`
  font-size: 16px;
  color: #1C1C1C;
  margin-top: 8px;
`;

const TopPost: React.FC<TopPostProps> = ({ post }) => {
    const { imgUrl, category, title, author, date, text } = post;

    return (
        <TopPostContainer $imgUrl={imgUrl}> 
            <ContentContainer>
                <PostCategory>{category}</PostCategory>
                <PostTitle>{title}</PostTitle>
                <PostAuthor>{author} | {date}</PostAuthor>
                <PostText>{text}</PostText>
            </ContentContainer>
        </TopPostContainer>
    );
};

export default TopPost;
