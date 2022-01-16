import { Wrapper, SwitchItem, ActiveBar } from './styled'

interface Props {
  items: string[]
  currentIndex?: number
  onUpdateIndex?: (index: number) => void
}

const Switches = (props: Props) => {
  const { items = ['✿', '✿'], currentIndex = 0, onUpdateIndex} = props

  function switchItem(index: number) {
    onUpdateIndex && onUpdateIndex(index)
  }

  const activeStyle = {
    transform: `translate3d(${120 * currentIndex}px,0,0)`
  }
  return (
    <Wrapper>
      {
          items.map((item, index) => (
            <SwitchItem
              key={item}
              active={currentIndex === index}
              onClick={() => switchItem(index)}
            >
              <span>{item}</span>
            </SwitchItem>
          ))
      }
      <ActiveBar
        style={activeStyle}
      />
    </Wrapper>
  )
}

export default Switches

