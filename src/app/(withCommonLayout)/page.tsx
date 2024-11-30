import FeaturedFlatList from "@/components/Ui/Home/FeaturedFlatList/FeaturedFlatList";
import FeaturedShopSpaceList from "@/components/Ui/Home/FeaturedShopSpaceList/FeaturedShopSpaceList";
import FeaturedWorkSpaceList from "@/components/Ui/Home/FeaturedWorkSpaceList/FeaturedWorkSpaceList";
import Hero from "@/components/Ui/Home/Hero/Hero";

const Home = async () => {
  let flatData;
  let workspacesData;
  let shopSpacesData;

  try {
    // Fetch flats data
    const resFlats = await fetch(
      "https://server-flate-share.vercel.app/api/flats",
      {
        next: {
          revalidate: 30, // Revalidate every 10 seconds
        },
      }
    );

    flatData = await resFlats.json();

    // Fetch workspaces data
    const resWorkspaces = await fetch(
      "https://server-flate-share.vercel.app/api/workspaces",
      {
        next: {
          revalidate: 30, // Revalidate every 10 seconds
        },
      }
    );

    workspacesData = await resWorkspaces.json();

    // Fetch workspaces data
    const resShopspaces = await fetch(
      "https://server-flate-share.vercel.app/api/shopspaces",
      {
        next: {
          revalidate: 30, // Revalidate every 10 seconds
        },
      }
    );

    shopSpacesData = await resShopspaces.json();
  } catch (error) {}

  return (
    <>
      <Hero />
      <div className="flex flex-col gap-10 md:gap-20">
        <FeaturedFlatList flatData={flatData} />
        <FeaturedWorkSpaceList workspacesData={workspacesData} />
        <FeaturedShopSpaceList shopSpacesData={shopSpacesData} />
      </div>
    </>
  );
};

export default Home;
