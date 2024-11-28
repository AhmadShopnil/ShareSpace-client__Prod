import FeaturedFlatList from "@/components/Ui/Home/FeaturedFlatList/FeaturedFlatList";
import FeaturedWorkSpaceList from "@/components/Ui/Home/FeaturedWorkSpaceList/FeaturedWorkSpaceList";
import Hero from "@/components/Ui/Home/Hero/Hero";

const Home = async () => {
  let flatData;
  let workspacesData;

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
  } catch (error) {}

  return (
    <>
      <Hero />
      <div className="flex flex-col gap-10 md:gap-20">
        <FeaturedFlatList flatData={flatData} />
        <FeaturedWorkSpaceList workspacesData={workspacesData} />
      </div>
    </>
  );
};

export default Home;
