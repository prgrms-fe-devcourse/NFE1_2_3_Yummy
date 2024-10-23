import React from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components'

interface DraftEditorProps {
  editorState: EditorState
  onEditorStateChange: (editorState: EditorState) => void
}

const DraftEditor: React.FC<DraftEditorProps> = ({
  editorState,
  onEditorStateChange,
}) => {
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
              'image',
            ],
            image: {
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              alt: { present: true, mandatory: false },
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
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
