import { RootState } from "@/store";
import { handleSkin } from "@/store/layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const useSkin = () => {
  const dispatch = useDispatch();
  const skin = useSelector((state : RootState) => state.layout.skin);
  const setSkin = (mod : string) => dispatch(handleSkin(mod));
  useEffect(() => {
    if (typeof window !== "undefined") {
      const body = window.document.body;
      const classNames = {
        default: "skin--default",
        bordered: "skin--bordered",
      };
      if (skin === "default") {
        body.classList.add(classNames.default);
        body.classList.remove(classNames.bordered);
      } else if (skin === "bordered") {
        body.classList.add(classNames.bordered);
        body.classList.remove(classNames.default);
      }
    }
  }, [skin]);
  return [skin, setSkin];
};
export default useSkin;