export const cleanQueryParams = (params: any) => {
  // Remove properties that don't belong to workspaces
  const allParams = { ...params };

  // Check if the category is 'WorkSpace', if yes, remove totalBedrooms and totalBathrooms
  if (allParams.category === "WorkSpace") {
    delete allParams.totalBedrooms;
    delete allParams.totalBathrooms;
  }

  // Convert object to URLSearchParams and return query string
  const cleanedParams = new URLSearchParams(allParams as any).toString();
  console.log("from utils after clean ", cleanedParams);

  return cleanedParams;
};
