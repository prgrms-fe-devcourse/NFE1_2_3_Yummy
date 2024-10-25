import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Select, Input, message } from 'antd' // Ant Design의 컴포넌트 사용
import DraftEditor from '../components/DraftEditor'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import axios from 'axios'

const { Option } = Select // Ant Design Select

const WritingPage: React.FC = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  // 카테고리 토글
  const handleCategoryChange = (value: unknown) => {
    setCategory(value as string) // value를 string으로 변환
  }

  // 버튼 클릭 -> 유효성 검사 및 POST 요청
  const handleSubmit = async () => {
    const contentState = editorState.getCurrentContent() // ContentState 객체 가져오기
    const rawContentState = convertToRaw(contentState) // ContentState를 RawDraftContentState로 변환
    const htmlContent = draftToHtml(rawContentState) // 변환된 RawDraftContentState를 HTML로 변환

    // 정규식으로 src 속성 추출
    const imgTagRegex = /<img[^>]+src="([^">]+)"/g
    const imgMatch = imgTagRegex.exec(htmlContent) // 첫 번째 이미지 src 추출
    let imageUrl = null
    if (imgMatch) {
      imageUrl = imgMatch[1] // img 태그의 첫 번째 src 값
    }

    // img 태그 삭제
    const cleanedContent = htmlContent.replace(/<img[^>]*>/g, '')

    // 필드 검증
    if (!category || !title || !htmlContent.trim()) {
      message.error('모든 필드를 입력해주세요.')
    } else {
      try {
        const response = await axios.post('/api/post', {
          title: title,
          content: cleanedContent,
          category: category,
          image_url: imageUrl || 'http://example.com/image.jpg',
        })

        if (response.status === 201) {
          message.success('게시글이 성공적으로 등록되었습니다.')
          navigate('/') // 요청 성공 후 홈으로 이동
        }
      } catch (error) {
        message.error('게시글 등록에 실패했습니다.')
      }
    }
  }

  // 카테고리 배열
  const categories = [
    '전체',
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

  return (
    <Container>
      <CategorySelect
        placeholder='카테고리 선택'
        onChange={handleCategoryChange}
        value={category || undefined}
      >
        {categories.map((category, index) => (
          <Option key={index}>{category}</Option>
        ))}
      </CategorySelect>

      <TitleInput
        placeholder='제목을 입력해주세요'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 에디터 컴포넌트 */}
      <DraftEditor
        editorState={editorState}
        setEditorState={setEditorState}
      />

      <ButtonContainer>
        <StyledButton
          type='primary'
          onClick={() => navigate('/')}
        >
          나가기
        </StyledButton>
        <StyledButton
          type='primary'
          onClick={handleSubmit}
        >
          게시글 등록
        </StyledButton>
      </ButtonContainer>
    </Container>
  )
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; 모든 요소를 중앙 정렬 */
  width: 100%;
  padding: 20px;
  margin-top: 40px;
  box-sizing: border-box; /* padding과 border를 포함하여 크기 계산 */
  max-width: 100%; /* 화면 너비를 넘지 않도록 제한 */
`

const CategorySelect = styled(Select)`
  border: none !important; /* border 제거 */
  .ant-select-selector {
    border: none !important; /* Select 내부 박스의 border 제거 */
    box-shadow: none !important; /* 선택 시 생기는 그림자 제거 */
    font-size: 28px !important;
  }

  width: 220px;
  margin-bottom: 20px;
  text-align: left;
`

const TitleInput = styled(Input)`
  border: none !important; /* border 제거 */
  box-shadow: none !important; /* 포커스 시 그림자 제거 */
  &:focus,
  &:hover {
    border: none !important; /* 포커스 및 호버 시에도 border 제거 */
    box-shadow: none !important; /* 포커스 시 그림자 제거 */
  }
  font-size: 42px;
  width: 100%;
  margin-bottom: 20px;
  text-align: left; /* 제목 인풋창 왼쪽 정렬 */
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 60px;
`

const StyledButton = styled(Button)`
  width: 150px;
  height: 50px;
  background-color: black;
  font-size: 18px;
  border-radius: 10px;
`

export default WritingPage
