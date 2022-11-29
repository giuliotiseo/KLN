import TopNavigation from "../navigation/TopNavigation";

const MainPage = ({ header, children }) => {
  const { title, menu } = header;
  return (
    <div id="mainPage" className="relative bg-base-200 min-h-screen flex flex-col flex-1 w-full">
      <div className="mx-4">
        <TopNavigation title={title} menu={menu} />
      </div>

      { children }
    </div>
  )
}

export default MainPage;