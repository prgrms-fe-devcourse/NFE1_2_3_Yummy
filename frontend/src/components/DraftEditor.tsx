import React from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components'
import axios from 'axios'
import { message } from 'antd'

interface DraftEditorProps {
  editorState: EditorState
  setEditorState: (editorState: EditorState) => void
}

const DraftEditor: React.FC<DraftEditorProps> = ({
  editorState,
  setEditorState,
}) => {
  // 이미지 Cloudinary에 업로드
  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default') // Cloudinary의 업로드 프리셋

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dee7rlglp/image/upload',
        formData,
      )
      return { data: { link: response.data.secure_url } } // Cloudinary에서 받은 이미지 URL 반환
    } catch (error) {
      message.error('이미지 업로드에 실패했습니다.')
      return null
    }
  }

  // 이미지 업로드 콜백
  const imageUploadCallback = async (file: File) => {
    const uploadedImage = await uploadImageToCloudinary(file)
    if (uploadedImage && uploadedImage.data) {
      return { data: { link: uploadedImage.data.link } } // 에디터에 삽입될 이미지 URL 반환
    }
    return null
  }

  return (
    <EditorContainer>
      <EditorWrapper>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
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
              uploadCallback: imageUploadCallback,
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
