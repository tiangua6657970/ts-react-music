import { NavLink } from "react-router-dom";
import { Tabs } from "./styled";

const Tab = () => {
  const tabs = [
    {name: '推荐', path: '/recommend'},
    {name: '歌手', path: '/singer'},
    {name: '排行', path: '/top-list'},
    {name: '搜索', path: '/search'}
  ]
  return (
    <Tabs>
      {
        tabs.map(tab => (
          <NavLink
            className="tab-item"
            to={tab.path}
            key={tab.path}
          >
            <span className="tab-link">{tab.name}</span>
          </NavLink>
        ))
      }
    </Tabs>
  )
}

export default Tab
