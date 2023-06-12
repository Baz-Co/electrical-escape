function Breadcrumb() {
  const clientPath = window.location.pathname;
  const clientPathSplayed = clientPath.split("/").slice(1);

  return (
    <div>
      {clientPathSplayed.map((item, index) => {
        let crumbs = "";
        for (let i = 0; i < index; i++) {
          crumbs += "/" + clientPathSplayed[i];
        }
        return (
          <a href={crumbs + "/" + item} key={index} style={{ padding: 2 }}>
            /{item}
          </a>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
