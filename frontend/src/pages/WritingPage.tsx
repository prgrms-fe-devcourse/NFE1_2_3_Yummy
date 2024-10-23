import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Select, Input, message } from 'antd' // Ant Design의 컴포넌트 사용
import DraftEditor from '../components/DraftEditor'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import axios from 'axios'

const { Option } = Select // Ant Design Select

const WritingPage: React.FC = () => {
  const navigate = useNavigate()

  const [category, setCategory] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  // 카테고리 토글
  const handleCategoryChange = (value: unknown) => {
    setCategory(value as string) // value를 string으로 변환
  }

  // 게시글 등록 버튼 클릭 시 유효성 검사
  const handleSubmit = () => {
    const content = editorState.getCurrentContent()
    const plainText = content.getPlainText().trim() // 공백 제거한 텍스트

    if (!category || !title || !plainText) {
      message.error('모든 필드를 입력해주세요.')
    } else {
      message.success('게시글이 성공적으로 등록되었습니다.')
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
`

export default WritingPage
