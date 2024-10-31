import ky from 'ky'

interface ImageUrl {
  secure_url: string
}

const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'chbo5bze')

  try {
    const response = await ky.post<ImageUrl>(
      'https://api.cloudinary.com/v1_1/dgvqiwljm/image/upload',
      {
        body: formData,
      },
    )

    return response.json()
  } catch (error) {
    const errorBody = (await (error as Response).json()) as Error
    const customError = {
      ...errorBody,
      message: errorBody.message || '알 수 없는 오류가 발생했습니다',
    }

    throw customError
  }
}

export default uploadImage
