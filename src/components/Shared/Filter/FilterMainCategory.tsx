import { Dispatch, SetStateAction } from "react";

const FilterMainCategory = ({
  listCategory,
  setListCategory,
  setQueries,
}: {
  listCategory: string;
  setListCategory: Dispatch<SetStateAction<string>>;
  setQueries: Dispatch<SetStateAction<{}>>;
}) => {
  const categories = ["Home", "OfficeSpace", "ShopSpace"];

  const handleSetCategory = (cat: string) => {
    setListCategory(cat);
    setQueries({});
  };

  return (
    <div className="flex justify-center">
      {/* Categories */}
      <div className="mb-3  ">
        <h2 className="text-xl mb-4 text-center">What You Need</h2>
        <div className="flex gap-2 text-xs md:text-md space-x-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSetCategory(cat)}
              className={`p-3 rounded ${
                listCategory === cat ? "bg-teal-600 text-white" : "bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterMainCategory;
