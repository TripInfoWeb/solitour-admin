// app/page.tsx
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BannerContainer from "@/containers/service/BannerContainer";
import { Banner } from "@/types/BannerDto";

interface PageProps {
  bannerList: Banner[];
}

// 서버 사이드에서 데이터 패칭
async function fetchBannerList(): Promise<Banner[]> {
  const response = await fetch(`${process.env.BACKEND_URL}/api/banner`, {
    cache: "no-cache"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function HomePage() {
  const initBannerList = await fetchBannerList();

  return (
    <DefaultLayout>
      <BannerContainer
        initBannerList={initBannerList.length > 0 ? initBannerList : []}
      />
    </DefaultLayout>
  );
}