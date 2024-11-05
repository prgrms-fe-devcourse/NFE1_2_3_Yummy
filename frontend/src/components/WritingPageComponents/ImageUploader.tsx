import React, { useState } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import axios from 'axios'

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void
  onLoadingChange: (isLoading: boolean) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  onLoadingChange,
}) => {
  const [loading, setLoading] = useState(false)

  // 이미지 확장자를 체크하는 함수
  const beforeUpload = (file: File) => {
    const isImage =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif'
    if (!isImage) {
      message.error('JPG/PNG/GIF 파일만 업로드할 수 있습니다.')
    }
    return isImage
  }

  // customRequest 함수 구현
  const handleCustomRequest = async (options: any) => {
    const { file, onSuccess, onError } = options
    setLoading(true)
    onLoadingChange(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default') // Cloudinary 업로드 프리셋

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dee7rlglp/image/upload',
        formData,
      )
      const imageUrl = response.data.secure_url
      onUploadSuccess(imageUrl)
      onSuccess('ok') // 성공 처리
    } catch (error) {
      console.error('Upload error:', error)
      onError({ error }) // 실패 처리
    } finally {
      setLoading(false)
      onLoadingChange(false)
    }
  }

  return (
    <UploadContainer>
      <Upload
        customRequest={handleCustomRequest} // customRequest를 통해 직접 처리
        showUploadList={false} // 파일 목록 숨기기
        beforeUpload={beforeUpload} // 업로드 전 파일 확장자 체크
      >
        <StyledButton
          icon={<UploadOutlined />}
          loading={loading}
        >
          파일 선택
        </StyledButton>
      </Upload>
    </UploadContainer>
  )
}

// Styled Components
const UploadContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
`

const StyledButton = styled(Button)`
  border: 1px solid black;
  color: #000000;
  &:hover {
    border-color: #333 !important;
    color: #333 !important;
  }
`

export default ImageUploader
