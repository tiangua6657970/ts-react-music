import { Link } from "react-router-dom"
import { Wrapper, Icon, Text } from './styled'

const Header = () => {
  return (
    <Wrapper>
      <Icon/>
      <Text>Chicken Music-2</Text>
      <Link className="mine" to={'/user'}>
        <i className="icon-mine"></i>
      </Link>
    </Wrapper>
  )
}

export default Header
