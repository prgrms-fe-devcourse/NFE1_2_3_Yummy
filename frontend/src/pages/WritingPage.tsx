import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components'
import { EditorState } from 'draft-js'
import { Button, Select, Input, message } from 'antd' // Ant Design의 컴포넌트 사용

const { Option } = Select // Ant Design Select

const WritingPage: React.FC = () => {
  const navigate = useNavigate()

  const [category, setCategory] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  // 카테고리 토글
  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  // 에디터 상태 변경
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  // 게시글 등록 버튼 클릭 시 유효성 검사
  const handleSubmit = () => {
    if (!category || !title || !editorState.getCurrentContent().hasText()) {
      message.error('모든 필드를 입력해주세요.')
      setErrorMessage('모든 필드를 입력해주세요.')
      setSuccessMessage('')
    } else {
      message.success('게시글이 성공적으로 등록되었습니다.')
      setSuccessMessage('게시글이 성공적으로 등록되었습니다.')
      setErrorMessage('')
    }
  }

  return (
    <Container>
      <CategorySelect
        placeholder='카테고리 선택'
        onChange={handleCategoryChange}
        value={category || undefined}
      >
        <Option value='category1'>카테고리 1</Option>
        <Option value='category2'>카테고리 2</Option>
      </CategorySelect>

      <TitleInput
        placeholder='제목을 입력해주세요'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <EditorContainer>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName='wrapper-class'
          editorClassName='editor-class'
          toolbarClassName='toolbar-class'
        />
      </EditorContainer>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

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

const EditorContainer = styled.div`
  width: 80%; /* 에디터 컨테이너의 너비를 80%로 설정 */
  min-height: 300px;
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;

  .editor-class {
    min-height: 200px;
    padding: 10px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
