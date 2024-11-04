import { HeartFilled } from '@ant-design/icons'
import {
  CategoryTopRateContainer,
  CategoryTopRateItem,
  PostHeader,
  PostInfo,
  TopRateBedge,
} from './style'

const TopRateItem = () => {
  return (
    <>
      <PostHeader>
        <TopRateBedge>
          <p>{'인기'}</p>
        </TopRateBedge>
        <h3>{'ㅁㄴㅇㄹㄴㅁㅇㄹ ㅁㄴㅇㄹ ㄴㅁㅇㄹ'}</h3>
      </PostHeader>
      <PostInfo>
        <p>{'UserName'}</p>
        <p>{'Nov 1, 2024'}</p>
        <p>
          {<HeartFilled style={{ marginTop: '0.1rem', color: '#EE3441' }} />}
          <span>10</span>
        </p>
      </PostInfo>
    </>
  )
}

const CategoryTopRate = () => {
  return (
    <CategoryTopRateContainer>
      {Array.from({ length: 5 }).map((_, index) => (
        <CategoryTopRateItem key={index}>
          <TopRateItem />
        </CategoryTopRateItem>
      ))}
    </CategoryTopRateContainer>
  )
}

export default CategoryTopRate
