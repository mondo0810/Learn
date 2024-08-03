import ArticleList from "./homeComponents/ArticleList";
import NotificationBar from "./homeComponents/NotificationBar";
import TopBanner from "./homeComponents/TopBanner";

export default function Home() {
  return (
    <div className="py-4 px-1 md:py-10 max-w-6xl mx-auto">
      <TopBanner />
      <NotificationBar />
      <ArticleList />
    </div>
  );
}
