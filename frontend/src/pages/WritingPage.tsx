import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Select, Input, message } from 'antd'
import DraftEditor from '../components/WritingPageComponents/DraftEditor'
import ImageUploader from '../components/WritingPageComponents/ImageUploader'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import { queryClient } from '@/apis/api'
import htmlToDraft from 'html-to-draftjs'
import MokImage from '@/assets/defaultImg.png'

const WritingPage: React.FC = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const { id: postId } = useParams()

  /**
   * 게시물 불러오는 용도
   *
   * isPending, isError의 경우 상의 후 진행 필요함
   */
  const { data } = useQuery({
    queryKey: ['post-edit', postId],
    queryFn: async () => {
      if (postId) {
        return await postApi.getPostById(postId)
      }
    },
    enabled: !!postId,
  })

  /**
   * 게시물 수정할 때 사용
   *
   * 현재 mutate와 isPending 사용 중
   * isError의 경우 상의 후 진행 필요함
   */
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (postId) {
        return await postApi.updatePost(postId, {
          title,
          content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          category,
          image_url: imageUrl || MokImage,
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      navigate(`/post/${postId}`)
    },
  })

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setCategory(data.category)

      // html to draftjs 변환
      const contentBlock = htmlToDraft(data.content)
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      )
      const editorState = EditorState.createWithContent(contentState)

      setEditorState(editorState)
      setImageUrl(data.image_url)
    }
  }, [data])

  // 버튼 클릭 -> 유효성 검사 및 POST 요청
  const handleSubmit = async () => {
    const contentState = editorState.getCurrentContent() // ContentState 객체 가져오기
    const rawContentState = convertToRaw(contentState) // ContentState를 RawDraftContentState로 변환
    const htmlContent = draftToHtml(rawContentState) // 변환된 RawDraftContentState를 HTML로 변환

    if (!category || !title || !htmlContent.trim()) {
      message.error('모든 필드를 입력해주세요.')
      return
    }
    postId ? mutate() : createPost()
  }

  const createPost = async () => {
    const contentState = editorState.getCurrentContent() // ContentState 객체 가져오기
    const rawContentState = convertToRaw(contentState) // ContentState를 RawDraftContentState로 변환
    const htmlContent = draftToHtml(rawContentState) // 변환된 RawDraftContentState를 HTML로 변환

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        '/api/post',
        {
          title,
          content: htmlContent,
          category,
          image_url: imageUrl || MokImage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      if (response.status === 201) {
        message.success('게시글이 성공적으로 등록되었습니다.')
        navigate('/')
      }
    } catch (error) {
      message.error('게시글 등록에 실패했습니다.')
    }
  }

  // 카테고리 배열
  const categories = [
    '한식',
    '중식',
    '일식',
    '양식',
    '동남아 요리',
    '남미 요리',
    '중동 요리',
    '퓨전 요리',
    '채식 요리',
    '해산물 요리',
    '바베큐 요리',
    '디저트 요리',
  ]

  // 이미지 업로드 성공 핸들러
  const handleImageUploadSuccess = (url: string) => {
    setImageUrl(url)
  }

  // 토큰 확인
  // const token = localStorage.getItem('token')
  // console.log('Token from localStorage:', token)

  return (
    <Container>
      <CategorySelect
        placeholder='카테고리 선택'
        onChange={(value) => setCategory(value as string)}
        value={category || undefined}
      >
        {categories.map((category, index) => (
          <Select.Option
            key={index}
            value={category}
          >
            {category}
          </Select.Option>
        ))}
      </CategorySelect>

      <TitleInput
        placeholder='제목을 입력해주세요'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 이미지 미리보기 */}
      {imageUrl && (
        <UploadedImage
          src={imageUrl}
          alt='Uploaded'
        />
      )}

      {/* 이미지 업로더 컴포넌트, 에디터 컴포넌트 컨테이너 */}
      <PageContainer>
        <UploadContainer>
          <ImageUploader
            onUploadSuccess={handleImageUploadSuccess}
            onLoadingChange={setUploading}
          />
        </UploadContainer>

        <EditorContainer>
          <DraftEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </EditorContainer>
      </PageContainer>

      {/* 버튼 컨테이너 */}
      <ButtonContainer>
        <StyledButton
          type='primary'
          onClick={() => navigate('/')}
          disabled={isPending || uploading}
        >
          나가기
        </StyledButton>
        <StyledButton
          type='primary'
          onClick={handleSubmit}
          disabled={isPending || uploading}
        >
          {postId ? '수정하기' : '게시글 등록'}
        </StyledButton>
      </ButtonContainer>
    </Container>
  )
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding-block: 2.5rem 1.5rem;
`

const CategorySelect = styled(Select)`
  border: none !important;
  .ant-select-selector {
    border: none !important;
    box-shadow: none !important;
    font-size: 1.1rem !important;
    padding: 0 !important;
  }
  width: 220px;
  text-align: left;
  margin-bottom: 0.5rem;
`

const TitleInput = styled(Input)`
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin-bottom: 1rem;
  &:focus,
  &:hover {
    border: none !important;
    box-shadow: none !important;
  }
  font-size: 1.4rem;
  width: 100%;
  text-align: left;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
`

const StyledButton = styled(Button)`
  background-color: black;
  width: 130px;
  height: 45px;
  font-size: 1rem;
  border-radius: 10px;

  &:hover {
    background-color: #333 !important;
    color: white !important;
  }
`

const UploadedImage = styled.img`
  max-width: 300px;
  height: auto;
  margin-top: 20px;
  width: 200px;
  height: 160px;
  object-fit: cover;
`

// 이미지 업로더 컴포넌트와 에디터 컴포넌트를 감싸는 부모 컨테이너
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`

// 에디터 컴포넌트 컨테이너
const EditorContainer = styled.div`
  width: 100%;
`

// 이미지 업로더 컴포넌트 컨테이너
const UploadContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export default WritingPage
