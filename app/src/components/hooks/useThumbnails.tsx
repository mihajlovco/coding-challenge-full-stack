import React, { useState } from "react";

const itemData = [
  {
    url: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    name: "Breakfast",
  },
  {
    url: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    name: "Burger",
  },
  {
    url: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    name: "Camera",
  },
  {
    url: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    name: "Coffee",
  },
  {
    url: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    name: "Hats",
  },
  {
    url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    name: "Honey",
  },
  {
    url: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    name: "Basketball",
  },
  {
    url: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    name: "Fern",
  },
  {
    url: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    name: "Mushrooms",
  },
  {
    url: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    name: "Tomato basil",
  },
  {
    url: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    name: "Sea star",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    name: "Bike",
  },
];

/**
 * NOTE: IMPLEMENT GraphQL Query
 */
export default function useThumbnails() {
  const [data, setData] = useState<ThumbnailImg[]>(itemData);
  const [isLoading, setIsLoading] = useState(false);
  return { data, isLoading };
}
