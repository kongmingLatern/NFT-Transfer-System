import { useState, useEffect } from "react";
import { NavigateFunction, useLocation, useNavigate, useRoutes } from "react-router-dom";

export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  auth?: boolean;
}
//递归查询对应的路由
function searchroutedetail(
  path: string,
  routes: RouteObject[]
): RouteObject | null {
  for (let item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      return searchroutedetail(path, item.children);
    }
  }
  return null;
}
//全局路由守卫
function guard(
  location: Location,//类型在react-router-dom中导入
  navigate: NavigateFunction,//类型在react-router-dom中导入
  routes: RouteObject[]
) {
  const { pathname } = location;

  //找到对应的路由信息，判断有没有权限控制
  const routedetail = searchroutedetail(pathname, routes);
  //没有找到路由，跳转404
  if (!routedetail) {
    return navigate("/404");
    // return false;
  }
  //如果需要权限验证
  if (routedetail.auth) {
    const token = localStorage.getItem("blogtoken");
    if (!token) {
      return navigate(-1);
    }
  }
}
export const RouterGuard = (routes: RouteObject[]) => {
  const location = useLocation();
  const navigate = useNavigate();
  let [bo, setBo] = useState(false);
  // let bo = guard(location, navigate, routes);
  useEffect(() => {
    setBo(guard(location, navigate, routes));
  }, [location, navigate, routes]);
  const Route = useRoutes(routes);

  return bo ? Route : null;
};
