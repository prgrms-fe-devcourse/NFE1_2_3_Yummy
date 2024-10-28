import React from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components'

interface DraftEditorProps {
  editorState: EditorState
  setEditorState: (editorState: EditorState) => void
}

const DraftEditor: React.FC<DraftEditorProps> = ({
  editorState,
  setEditorState,
}) => {
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
            ], // 이미지 옵션 제거
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
  /* align-items: flex-end;  */
  margin: 0 auto;
`

const EditorWrapper = styled.div`
  width: auto;
  min-height: 300px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
`

export default DraftEditor
