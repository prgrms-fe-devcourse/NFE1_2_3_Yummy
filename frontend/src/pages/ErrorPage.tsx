import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/')
  }

  return (
    <div style={{ textAlign: 'center', padding: '260px 20px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>404</h1>
      <p style={{ fontSize: '50px', margin: '10px 0' }}>
        페이지를 찾을 수 없습니다.
      </p>
      <p style={{ color: '#000', fontWeight: 'bold' }}>
        죄송합니다. 더 이상 존재하지 않는 페이지입니다.
      </p>
      <button
        onClick={goToHome}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          //   marginBottom:'410px'
        }}
      >
        홈으로 이동
      </button>
    </div>
  )
}

export default ErrorPage
