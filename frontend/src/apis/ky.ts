import ky from 'ky'

const END_POINT = '/api'

const prepareRequestsWithAuth = (request: Request) => {
  const authToken = localStorage.getItem('authToken')

  request.headers.set('Authorization', `Bearer ${authToken}`)
}

const api = ky.extend({
  prefixUrl: END_POINT,
  hooks: {
    beforeRequest: [prepareRequestsWithAuth],
    beforeError: [
      async (error) => {
        const errorBody = (await error.response.json()) as Error
        const customError = {
          ...errorBody,
          message: errorBody.message || '알 수 없는 오류가 발생했습니다',
        }

        throw customError
      },
    ],
  },
})

export default api
