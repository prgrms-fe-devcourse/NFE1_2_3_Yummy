import styled from 'styled-components'

interface CardProps {
  category: string
  title: string
  author: string
  date: string
  text: string
  imgUrl: string
}

const Card = styled.div`
  display: flex;
  padding: 16px;
  margin: 0 50px;
  margin-bottom: 16px;
  background-color: #fff;
`

const PostImage = styled.img`
  width: 150px;
  height: 150px;
  height: auto;
  margin-right: 20px;
`

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
`

const PostCategory = styled.p`
  font-size: 20px;
  color: #7d7d7d;
  margin: 0;
  font-weight: bold;
`

const PostTitle = styled.h2`
  font-size: 33px;
  margin: 8px 0;
`

const PostAuthor = styled.p`
  font-size: 16px;
  color: #7d7d7d;
  margin: 0;
`

const PostDate = styled.p`
  font-size: 16px;
  color: #7d7d7d;
  margin: 4px 0;
`

const PostText = styled.p`
  font-size: 1rem;
  color: #1c1c1c;
  margin-top: 8px;
`

function PostCard({ title, author, date, text, category, imgUrl }: CardProps) {
  return (
    <Card>
      <PostImage
        src={imgUrl}
        alt='Post Thumbnail'
      />
      <PostContent>
        <PostCategory>{category}</PostCategory>
        <PostTitle>{title}</PostTitle>
        <PostAuthor>{author}</PostAuthor>
        <PostDate>{date}</PostDate>
        <PostText>{text}</PostText>
      </PostContent>
    </Card>
  )
}

export default PostCard
