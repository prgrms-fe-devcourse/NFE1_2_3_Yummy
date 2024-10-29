import { PostPageContainer } from './style'
import PostContainer from '@/components/PostContainer'
import PostCommentContainer from '@/components/PostCommentContainer'
import PostSideButton from '@/components/PostSideButton'
import { useState } from 'react'
import DeleteModal from '@/components/DeleteModal'

const PostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDeleteModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  return (
    <PostPageContainer>
      <DeleteModal
        isModalOpen={isModalOpen}
        onhandleDeleteModal={handleDeleteModal}
      />
      <PostContainer />
      <PostCommentContainer />
      <PostSideButton onhandleDeleteModal={handleDeleteModal} />
    </PostPageContainer>
  )
}

export default PostPage
