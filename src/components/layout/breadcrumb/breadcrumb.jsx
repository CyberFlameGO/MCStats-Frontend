import styles from "./breadcrumb.module.sass";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link, withRouter } from "react-router-dom";
import React from "react";

function getPathObjects(path) {
  const result = [
    {
      name: "Home",
      url: "/",
    },
  ];

  const paths = path.split("/");
  let urls = [];

  for (let path of paths) {
    if (path !== "") {
      urls.push(path);
      result.push({
        name: path,
        url: urls.join("/"),
      });
    }
  }

  return result;
}

function getPathComponents(path) {
  const paths = getPathObjects(path);
  const last = paths.pop();

  const components = [];
  for (let path of paths) {
    components.push(
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to={path.url}>
          {path.name}
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
  }

  components.push(
    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink as={Link} to={last.url} color="#877aff">
        {last.name}
      </BreadcrumbLink>
    </BreadcrumbItem>
  );

  return components;
}

function PageBreadcrumb({ history }) {
  const [path, setPath] = React.useState(window.location.pathname);
  const items = getPathComponents(path);

  React.useEffect(() => {
    history.listen((location, action) => {
      setPath(location.pathname);
    });
  }, [history]);

  return (
    <div className={styles["breadcrumb"]}>
      <Breadcrumb
        className={styles["container"]}
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        {items}
      </Breadcrumb>
    </div>
  );
}

export default withRouter(PageBreadcrumb);
