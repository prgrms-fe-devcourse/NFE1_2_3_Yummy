import { SearchOutlined } from '@ant-design/icons'
import { SearchPageInputContainer } from './style'

const SearchPageInput = () => {
  return (
    <SearchPageInputContainer>
      <button>
        <span>
          <SearchOutlined
            style={{ fontSize: '1.8rem', color: 'rgb(176, 184, 193)' }}
          />
        </span>
      </button>
      <input
        type='text'
        placeholder='검색어를 입력하세요.'
      />
    </SearchPageInputContainer>
  )
}

export default SearchPageInput
