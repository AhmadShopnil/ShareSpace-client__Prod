import FeaturedFlatList from "@/components/Ui/Home/FeaturedFlatList";
import FeaturedShopSpaceList from "@/components/Ui/Home/FeaturedShopSpaceList";
import FeaturedWorkSpaceList from "@/components/Ui/Home/FeaturedWorkSpaceList";
import Hero from "@/components/Ui/Home/Hero";

const Home = async () => {
  let flatData = null;
  let workspacesData = null;
  let shopSpacesData = null;
  // const basUrl="http://localhost:5000/api"
  const basUrl = "https://server-flate-share.vercel.app/api";

  try {
    // Fetch flats data
    const resFlats = await fetch(`${basUrl}/flats?limit=5`, {
      next: { revalidate: 30 },
    });

    // if (!resFlats.ok) {
    //   throw new Error(`Failed to fetch flats: ${resFlats.statusText}`);
    // }
    flatData = await resFlats.json();

    // Fetch workspaces data
    const resWorkspaces = await fetch(`${basUrl}/workspaces?limit=5`, {
      next: { revalidate: 30 },
    });

    // if (!resWorkspaces.ok) {
    //   throw new Error(
    //     `Failed to fetch workspaces: ${resWorkspaces.statusText}`
    //   );
    // }
    workspacesData = await resWorkspaces.json();

    // Fetch shop spaces data
    const resShopspaces = await fetch(`${basUrl}/shopspaces?limit=5`, {
      next: { revalidate: 30 },
    });

    // if (!resShopspaces.ok) {
    //   throw new Error(
    //     `Failed to fetch shop spaces: ${resShopspaces.statusText}`
    //   );
    // }
    shopSpacesData = await resShopspaces.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // console.log("from home flat", flatData);
  // console.log("from home office", workspacesData);
  // console.log("from home shopSpacesData", shopSpacesData);

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
