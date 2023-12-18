import React, { FC } from "react";
import classes from "../../assets/styles/components/loader.module.scss";
import Image from "next/image";
import LoaderSVG from "../../assets/svg/Loader.svg";

interface ILoader {
  isFullPageLoader?: boolean;
}

export const Loader: FC<ILoader> = ({ isFullPageLoader = false }) => {

  if (isFullPageLoader) {
    return (
      <div className={classes["loader__container"]}>
        <Image
          className={classes["loader__content"]}
          src={LoaderSVG}
          alt="Loader"
        />
      </div>
    );
  }
  return (
    <div className="w-full flex items-center justify-center">
      <Image
        className="w-12"
        src={LoaderSVG}
        alt="Loader"
      />
    </div>
  );
};
