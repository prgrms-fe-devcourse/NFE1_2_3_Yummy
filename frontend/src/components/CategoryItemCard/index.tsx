import { HeartFilled } from '@ant-design/icons'
import { CardAuthor, CardContent, CardInfo, Content, ItemCard } from './style'
import mockImg from '@assets/defaultImg.png'
import { Dot } from '../PostPagePostCard/style'

const CategoryItemCard = () => {
  return (
    <ItemCard>
      <img
        src={mockImg}
        alt=''
      />
      <CardContent>
        <Content>
          <h3>title</h3>
          <p>
            asdfsadfasdfasdfasdfsadfasdfasdfasdfsadfasdfasdfsadfasdfasfsadfasdfasfasdfasdfsadfasdfasdfasdfsadfasdfasdf
          </p>
          <CardInfo>
            <p>Nov 1, 2024</p>
            <Dot>·</Dot>
            <p>0개의 댓글</p>
          </CardInfo>
        </Content>
        <CardAuthor>
          <p>author</p>
          <p>
            <HeartFilled style={{ color: '#EE3441' }} />
            <span>10</span>
          </p>
        </CardAuthor>
      </CardContent>
    </ItemCard>
  )
}

export default CategoryItemCard
