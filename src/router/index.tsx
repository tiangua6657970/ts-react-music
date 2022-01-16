import { useEffect, lazy, Suspense } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'

const Recommend = lazy(() => import('../views/recommend'))
const Singer = lazy(() => import('../views/singer'))
const Search = lazy(() => import('../views/search'))
const CommonDetail = lazy(() => import('../views/common-detail'))
const TopList = lazy(() => import('../views/top-list'))
const UserCenter = lazy(() => import('../views/user-center'))

/**
 *
 * 新版的路由器没有不支持重定向，所以要手动重定向
 */
function Redirect() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/recommend', {replace: true})
  }, [])

  return (
    <></>
  )
}

const Components = () => {
  const components = useRoutes([
    {path: '/', element: <Redirect/>},
    {
      path: '/recommend',
      element: <Recommend/>,
      children: [{path: ':id', element: <CommonDetail/>}]
    },
    {path: '/singer', element: <Singer/>, children: [{path: ':id', element: <CommonDetail/>}]},
    {path: '/top-list', element: <TopList/>, children: [{path: ':id', element: <CommonDetail/>}]},
    {path: '/search', element: <Search/>, children: [{path: ':id', element: <CommonDetail/>}]},
    {path: '/user', element: <UserCenter/>}
  ])
  return (
    <Suspense fallback={<></>}>
      {components}
    </Suspense>
  )
}

const Routers = () => {
  return (
    <Components/>
  )
}
export default Routers
