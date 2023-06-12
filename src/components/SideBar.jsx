function SideBar({ sidebarItems }) {
  return (
    <ul>
      {sidebarItems.map((item, index) => (
        <li style={{ marginBottom: "10px" }} key={index}>
          <a href={`/yt-vwr/${item.toLowerCase()}`}><button>{item}</button></a>
        </li>
      ))}
    </ul>
  );
}

export default SideBar;
