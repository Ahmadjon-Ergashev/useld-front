import { useState } from "react";

import { UsersContext, ScrollContext } from "./context";

export let newsActions = null;
export let smallActions = null;
export let userActions = null;
export const baseUrl = "https://api.useldservice.com/";

export const UsersProvider = ({ children }) => {
  // Scroll value handled here
  const [scrollValue, setScrollValue] = useState(0);

  const [media, setMedia] = useState([]);
  const [banner, setBanner] = useState([]);
  const [photos, setPhotos] = useState([]);

  // Action states for UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [modalClose, setModalClose] = useState(false);

  const config = {
    "Content-type": "application/json",
  };

  smallActions = {
    handleScroll: (newValue) => {
      setScrollValue(newValue);
    },
    getMedia: async (url) => {
      setIsLoading(true);
      const data = (
        await fetch(`${baseUrl}/${url}`, { headers: config })
      ).json();
      data.then((res) => {
        if (res.success) {
          setMedia(res.data);
          setIsLoading(false);
        } else {
          setError(true);
          setIsLoading(false);
          setMedia([]);
        }
      });
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    },

    getBanner: async (url) => {
      setIsLoading(true);
      const data = (
        await fetch(`${baseUrl}/${url}`, { headers: config })
      ).json();
      data.then((res) => {
        if (res.success) {
          setBanner(res.data);
          setIsLoading(false);
        } else {
          setError(true);
          setIsLoading(false);
          setBanner([]);
        }
      });
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    },
  };


  return (
    <UsersContext.Provider
      value={{
        scrollValue,
        isLoading,
        error,
        alert,
        modalClose,
        banner,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const ScrollProvider = ({ children }) => {
  const [scrollValue, setScrollValue] = useState(0);

  smallActions = {
    handleScroll: (newValue) => {
      setScrollValue(newValue);
    },
  };

  return (
    <ScrollContext.Provider value={scrollValue}>
      {children}
    </ScrollContext.Provider>
  );
};
