import styled from "styled-components";
import { color_theme, color_theme_d } from "../../../assets/js/style-const"

const Wrapper = styled.div`
  position: relative;
  circle{
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background{
      transform: scale(0.9);
      stroke: ${color_theme_d};
    }
    &.progress-bar{
      transform: scale(0.9) rotate(-90deg);
      stroke: ${color_theme};
    }
  }
`

interface Props {
  radius: number
  progress: number
  children: any
}

const ProgressCircle = (props: Props) => {
  const {progress = 0, radius = 100, children} = props
  const dasharray = Math.PI * 100
  const dashOffset = (1 - progress) * dasharray
  return (
    <Wrapper>
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="progress-background"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        />
        <circle
          className="progress-bar"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dasharray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {children}
    </Wrapper>
  )
}

export default ProgressCircle
