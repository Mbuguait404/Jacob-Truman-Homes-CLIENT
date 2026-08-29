// SEO location landing links shown on the homepage.
// Each entry points at the listings filter so visitors land on relevant
// inventory. Group regions link by city; the areas within link by
// neighbourhood. Anchor text is keyword-rich ("Properties in <area>").

export const buildAreaHref = (area, type, value) =>
  type === "city"
    ? `/listings?city=${encodeURIComponent(value)}`
    : `/listings?neighborhood=${encodeURIComponent(area)}`;

export const AREA_GROUPS = [
  {
    region: "Nairobi",
    type: "city",
    value: "Nairobi",
    areas: [
      "Kilimani",
      "Kileleshwa",
      "Lavington",
      "Westlands",
      "Karen",
      "Muthaiga",
      "Parklands",
      "Spring Valley",
      "Ridgeways",
      "Garden Estate",
      "Roysambu",
      "Kasarani",
      "Embakasi",
      "South B",
      "South C",
      "Lang'ata",
      "Upper Hill",
      "Eastleigh",
    ],
  },
  {
    region: "Kiambu",
    type: "city",
    value: "Kiambu",
    areas: [
      "Kiambu Town",
      "Kikuyu",
      "Ruaka",
      "Kiambu Road",
      "Ruiru",
      "Juja",
      "Thika",
      "Kahawa Sukari",
      "Kahawa Wendani",
      "Tatu City",
      "Kenyatta Road",
    ],
  },
  {
    region: "Eldoret / Uasin Gishu",
    type: "city",
    value: "Eldoret",
    areas: [
      "Elgon View",
      "Kapsoya",
      "Annex",
      "Pioneer",
      "West Indies",
      "Elgon View Estate",
      "Kapsoya Estate",
      "Racecourse",
      "Eldoret CBD",
    ],
  },
  {
    region: "Kajiado",
    type: "city",
    value: "Kajiado",
    areas: [
      "Kitengela",
      "Ongata Rongai",
      "Kiserian",
      "Ngong",
      "Acacia",
      "Milimani, Kitengela",
      "Yukos",
      "New Valley",
      "Kajiado Town",
    ],
  },
];
