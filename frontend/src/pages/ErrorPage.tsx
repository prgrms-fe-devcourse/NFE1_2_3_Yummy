import { useNavigate } from 'react-router-dom'

const ErrorPage = ({
  title,
  message,
}: {
  title?: string
  message?: string
}) => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBlock: 'auto',
      }}
    >
      <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>
        {title ? '' : '404'}
      </h1>
      <p style={{ fontSize: '50px', margin: '10px 0' }}>
        {title || '페이지를 찾을 수 없습니다.'}
      </p>
      <p style={{ color: '#000', fontWeight: 'bold' }}>
        {message || '죄송합니다. 더 이상 존재하지 않는 페이지입니다.'}
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
        }}
      >
        홈으로 이동
      </button>
    </div>
  )
}

export default ErrorPage
