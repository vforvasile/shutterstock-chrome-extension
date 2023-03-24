export const parseImageData = () => {
  const photoData: any = [];
  const parent = document.getElementById("gallery-table");
  if (!parent) return [];

  Array.from(parent.children).forEach((element) => {
    const imageChild = element.querySelector(".image-wrapper > img");
    const infoChild = element.querySelector(".media-description > a");

    // parent
    if (infoChild?.textContent) {
      const ID =
        infoChild && infoChild?.textContent
          ? infoChild.textContent.split(/[\n\r\s]+/g)[2]
          : "";
      const imageSource =
        imageChild && "src" in imageChild ? imageChild.src : "";

      photoData.push({
        image: imageSource,
        id: ID,
      });
    }
  });

  const labelsData: any = [];

  Array.from(document.getElementsByClassName("list-unstyled")).forEach(
    (element) => {
      [...element.children].forEach((child, index) => {
        const keyword = child.querySelector(".keyword-text");
        const percentage = child.querySelector(".keyword-percentage");

        if (!keyword) return;
        labelsData.push({
          className: child.className,
          keyword: keyword.textContent,
          percentage: percentage?.textContent,
        });
      });
    }
  );

  const finalArr = photoData.map((photo: any) => {
    const photoLabels = labelsData
      .filter((label: any) => label.className.includes(photo.id))
      .map((el: any) => ({ name: el.keyword, percentage: el.percentage }));
    return {
      ...photo,
      labels: photoLabels,
    };
  });

  return finalArr;
};

export const getCurrentTab = async () => {
  let queryOptions = { active: true };
  let data = await chrome.tabs.query(queryOptions);
  return data;
};
