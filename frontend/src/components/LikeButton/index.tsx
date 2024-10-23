import { LikeButtonContainer, ButtonLike } from './style'
import { HeartFilled, MergeFilled } from '@ant-design/icons'
const LikeButton = () => {
  return (
    <LikeButtonContainer>
      <ButtonLike>
        <HeartFilled style={{ fontSize: '2.8rem', color: '#1c1c1c' }} />
      </ButtonLike>
      <p>0</p>
      <ButtonLike>
        <MergeFilled style={{ fontSize: '2.8rem', color: '#1c1c1c' }} />
      </ButtonLike>
    </LikeButtonContainer>
  )
}

export default LikeButton
