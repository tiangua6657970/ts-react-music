import { useEffect, useState, ChangeEvent, useCallback } from 'react'
import styled from "styled-components";
import {
  color_highlight_background,
  color_text,
  color_text_d,
  font_size_medium
} from "../../assets/js/style-const";
import { debounce } from "throttle-debounce"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: ${color_highlight_background};
  border-radius: 6px;
  .icon-search{
    font-size: 24px;
    color: ${color_text_d};
  }
  .input-inner{
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${color_highlight_background};
    color: ${color_text};
    font-size: ${font_size_medium};
    outline: 0;
    &::placeholder{
      color: ${color_text_d};
    }
  }
  .icon-dismiss{
    font-size: 16px;
    color: ${color_text_d};
  }
`


function useDebounce(delay: number, fn: (query: string) => void) {
  const fnc = useCallback(
    debounce(delay, fn),
    []
  )
  return {fnc}
}

interface Props {
  inputValue?: string
  placeholder?: string
  debounceDelay?: number
  updateInputValue: (query: string) => void
}

const SearchInput = (props: Props) => {
  const {
    inputValue = '', placeholder = ' 搜索歌曲、歌手', updateInputValue,
    debounceDelay = 500
  } = props
  const [query, setQuery] = useState('')
  const {fnc} = useDebounce(debounceDelay, updateInputValue)
  useEffect(() => {
    setQuery(inputValue)
  }, [inputValue])
  useEffect(() => {
    fnc(query.trim())
  }, [query])

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }

  function clear() {
    setQuery('')
  }

  return (
    <Wrapper>
      <i className="icon-search"/>
      <input
        className="input-inner"
        value={query}
        placeholder={placeholder}
        onChange={handleInput}
      />
      <i className="icon-dismiss" onClick={clear}/>
    </Wrapper>
  )
}

export default SearchInput
