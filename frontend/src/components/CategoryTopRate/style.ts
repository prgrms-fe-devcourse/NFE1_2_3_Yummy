import styled from 'styled-components'

export const CategoryTopRateContainer = styled.ul`
  width: 50%;
  list-style: none;
  border: 1px solid #eeeeee;
  background-color: white;
`
export const CategoryTopRateItem = styled.li`
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  font-size: 0.8rem;
  color: #1c1c1c;
`

export const TopRateBedge = styled.div`
  width: 2.3rem;
  height: 1.5rem;
  font-size: 0.85rem;
  border-radius: 0.3rem;
  background-color: #1c1c1c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PostHeader = styled.div`
  display: flex;
  gap: 0.5rem;

  & h3 {
    font-size: 1rem;
    max-width: 20ch;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: -0.08rem;
  }
`

export const PostInfo = styled.div`
  display: flex;
  gap: 3rem;
  color: #666666;

  & p:last-child {
    display: flex;
    gap: 0.2rem;
  }
`
