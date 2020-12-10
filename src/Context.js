import React, { useState, useEffect, useRef } from "react";
import { getCookie, setCookie } from "./utils/cookieHelper";
import * as api from "./utils/api";

import { v4 } from "uuid";
import { arrayToMap } from "./utils/data.util";

const Context = React.createContext();

export function Provider(props) {
  const [auth, setAuth] = useState({ isAuth: null, user: null });
  const [photos, setPhotos] = useState({
    fetching: false,
    data: {},
  });

  const photosRef = useRef();

  useEffect(() => (photosRef.current = photos), [photos]);

  useEffect(() => {
    const isLogin = getCookie("auth");
    if (isLogin) {
      refreshToken();
    } else setAuth({ isAuth: false, user: null });
  }, []);

  const __setUser = (data) => {
    const { user, refreshTTL } = data;
    api.setToken(user.token);
    setCookie("auth", v4(), refreshTTL);
    setAuth({
      isAuth: true,
      user,
    });
  };

  const signIn = async (req) => {
    try {
      const { data } = await api.requestLogin(req);
      if (data.status === "success") {
        __setUser(data.data);
      }
      return data;
    } catch (err) {
      setAuth({ isAuth: false, user: null });
      console.log(err);
      return err;
    }
  };

  const refreshToken = async () => {
    try {
      const {
        data: { data },
      } = await api.requestTokenRefresh();
      if (data) __setUser(data);
    } catch (err) {
      setAuth({ isAuth: false, user: null });
    }
  };

  const reactPhoto = async (photoId) => {
    try {
      if (auth.user) {
        setPhotos((photos) => {
          let photo = photos.data[photoId];
          let likes;

          if (!photo.likes.includes(auth.user._id)) {
            likes = [...photo.likes, auth.user._id];
          } else {
            likes = Array.from(new Set(photo.likes).delete(auth.user._id));
          }
          console.log(likes);
          return {
            ...photos,
            data: {
              ...photos.data,
              [photoId]: {
                ...photo,
                likes,
              },
            },
          };
        });
        await api.reactPhoto(photoId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPhoto = async (photoId) => {
    const { data } = await api.getPhoto(photoId);
    if (data.status === "success") {
      const photo = data.data.photo;

      setPhotos((photos) => ({
        ...photos,
        data: {
          ...photos.data,
          [photo._id]: photo,
        },
      }));
      return photo;
    }

    return null;
  };

  return (
    <Context.Provider
      value={{
        auth,
        signIn,
        refreshToken,
        photos,
        getPhoto,
        setPhotos,
        reactPhoto,
        setAuth,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context;
