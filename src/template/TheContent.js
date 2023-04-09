import React from "react";
import { Route } from "react-router-dom";
import routes from "../routes";
import { BreadCrumb } from "primereact/breadcrumb";
import { useHistory } from "react-router";

const TheContent = () => {
  const { push } = useHistory();

  const flattenRoutes = (routes) => routes.map((route) => [route, route.children ? flattenRoutes(route.children) : []]).flat(Infinity);
  const home = { icon: "pi pi-home", command: () => push("/") };

  return (
    <div className="layout-main-container">
      <div className="layout-main">
        {routes.map((route, idx) => {
          const Component = route.component;

          return (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={(props) => {
                const crumbs = flattenRoutes(routes)
                  .filter(({ path }) => props.location?.pathname?.includes(path))
                  .map(({ path, name, redirect, ...rest }) => {
                    return {
                      path: Object.keys(props.match.params).length ? Object.keys(props.match.params).reduce((path, param) => path.replace(`:${param}`, props.match.params[param]), path) : path,
                      label: name,
                      command: (event) => {
                        push(redirect ? redirect : path);
                      },
                      ...rest,
                    };
                  });
                return (
                  <>
                    <BreadCrumb className="mb-2" model={crumbs} home={home} />
                    <Component />
                  </>
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(TheContent);
