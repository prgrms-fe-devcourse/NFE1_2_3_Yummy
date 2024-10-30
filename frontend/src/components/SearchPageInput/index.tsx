import { SearchOutlined } from '@ant-design/icons'
import { SearchPageInputContainer } from './style'
import { Radio, RadioChangeEvent } from 'antd'

interface SearchPageInputProps {
  onHandleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchParam: (e: RadioChangeEvent) => void
}

const SearchPageInput = ({
  onHandleSearch,
  handleSearchParam,
}: SearchPageInputProps) => {
  return (
    <>
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
          onChange={onHandleSearch}
        />
      </SearchPageInputContainer>
      <Radio.Group
        style={{ marginLeft: '1rem' }}
        defaultValue='title'
        onChange={handleSearchParam}
      >
        <Radio value='title'>제목</Radio>
        <Radio value='content'>내용</Radio>
        <Radio value='nickname'>작성자</Radio>
      </Radio.Group>
    </>
  )
}

export default SearchPageInput
