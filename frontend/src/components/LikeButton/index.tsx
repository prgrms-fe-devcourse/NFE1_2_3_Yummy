import { useState } from 'react'
import { LikeButtonContainer, ButtonLike } from './style'
import { HeartFilled, MergeFilled } from '@ant-design/icons'
const LikeButton = () => {
  const [like, setLike] = useState(0)
  const [isLiked, setIsLiked] = useState<boolean | null>(null)

  const handleLike = () => {
    if (isLiked) {
      setLike(like - 1)
      setIsLiked(false)
    } else {
      setLike(like + 1)
      setIsLiked(true)
    }
  }

  return (
    <LikeButtonContainer>
      <ButtonLike onClick={handleLike}>
        <HeartFilled
          style={{ fontSize: '2rem', color: isLiked ? '#FD3747' : '#1c1c1c' }}
        />
      </ButtonLike>
      <p>{like}</p>
      <ButtonLike>
        <MergeFilled style={{ fontSize: '2rem', color: '#1c1c1c' }} />
      </ButtonLike>
    </LikeButtonContainer>
  )
}

export default LikeButton
