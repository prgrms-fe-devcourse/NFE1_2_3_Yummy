import React, { useState } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components'

const DraftEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  // 에디터 상태 변경 핸들러
  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState)
  }

  // 이미지 업로드 콜백
  const uploadImageCallBack = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve({
          data: { link: reader.result as string },
        })
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsDataURL(file) // 파일을 Base64로 변환
    })
  }

  return (
    <EditorContainer>
      <EditorWrapper>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'list',
              'textAlign',
              'link',
              'history',
              'image', // 이미지 옵션 포함
            ],
            image: {
              uploadCallback: uploadImageCallBack, // 이미지 업로드 콜백 함수
              previewImage: true, // 이미지 미리보기 활성화
              alt: { present: true, mandatory: false }, // 이미지 대체 텍스트 설정
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg', // 허용할 이미지 타입
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
            },
          }}
          wrapperClassName='wrapper-class'
          editorClassName='editor-class'
          toolbarClassName='toolbar-class'
        />
      </EditorWrapper>
    </EditorContainer>
  )
}

// Styled Components
const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`

const EditorWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
`

export default DraftEditor
