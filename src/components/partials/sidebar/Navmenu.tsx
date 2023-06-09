import useSidebar from "@/hooks/useSidebar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Navmenu = ({ menus, menuHover }: any) => {
  const [collapsed] = useSidebar();
  const router = useRouter();
  const location = router.pathname;
  const [open, setOpen] = useState<number | null>(null);
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  useEffect(() => {
    let submenuIndex = null;
    menus.map((item: any) => {
      if (item.link === location) {
        submenuIndex = item.id;
      } else {
        if (!item.child) return;
        const link = item.child.filter((sp: any) => sp.childlink === location);
        console.log(link);
        if (link.length) return (submenuIndex = link[0]?.id);
      }
    });
    setOpen(submenuIndex);
  }, [location, menus]);
  const checkOpenAngBGWhite = (item: any) =>
    item?.link === location ||
    item.childlink === location ||
    item.childlink === `/${location.split("/")[1]}`;
  const handleHideTitle = (item: any) => {
    if (!collapsed) return item.title || item.childtitle;
    if (collapsed && menuHover) return item.title || item.childtitle;
    if (collapsed) return "";
  };
  return (
    <Card className="h-screen items-start rounded-none w-full py-4 px-0 shadow-xl bg-[#0046B0]">
      <List className="p-0 m-0 gap-0 min-w-[248px]">
        {menus.map((item: any, index: number) => {
          return (
            <>
              {item.child && (
                <Accordion
                  className="bg-[#0046B0] p-0"
                  open={open === item.id}
                  icon={
                    handleHideTitle(item) && (
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform text-white ${
                          open === item.id ? "rotate-180" : ""
                        }`}
                      />
                    )
                  }
                >
                  <ListItem className="p-0" selected={open === item.id}>
                    <AccordionHeader
                      onClick={() => handleOpen(item.id)}
                      className="border-b-0 p-3"
                    >
                      <ListItemPrefix className="grid-1">
                        <Image
                          src={item.icon}
                          width={26}
                          height={26}
                          alt="dashboard"
                          className="menu-icon mb-[2px] mx-3"
                        />
                      </ListItemPrefix>
                      <Typography className="mr-auto text-white font-semibold">
                        {handleHideTitle(item)}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0 gap-0">
                      {item.child.map((item: any, index: number) => {
                        return (
                          <ListItem
                            className={`${
                              checkOpenAngBGWhite(item)
                                ? "text-[#0046B0] bg-white"
                                : "text-white bg-[#0046B0]"
                            } pl-8 py-3 font-semibold rounded-none`}
                            onClick={() => router.push(item.childlink)}
                            key={index}
                          >
                            <ListItemPrefix>
                              <Image
                                src={
                                  checkOpenAngBGWhite(item)
                                    ? item.iconBlue
                                    : item.iconWhite
                                }
                                width={26}
                                height={26}
                                alt="dashboard"
                                className="menu-icon mr-3"
                              />
                            </ListItemPrefix>
                            {handleHideTitle(item)}
                          </ListItem>
                        );
                      })}
                    </List>
                  </AccordionBody>
                </Accordion>
              )}
              {!item.child && (
                <ListItem
                  className={`${
                    checkOpenAngBGWhite(item)
                      ? "bg-white text-[#0341A3]"
                      : "bg-inherit text-white"
                  } rounded-none font-semibold`}
                  onClick={() => router.push(item.link)}
                >
                  <ListItemPrefix>
                    <Image
                      src={
                        checkOpenAngBGWhite(item) ? item.iconBlue : item.icon
                      }
                      width={26}
                      height={26}
                      alt="dashboard"
                      className="menu-icon mb-[2px] mx-3"
                    />
                  </ListItemPrefix>
                  {handleHideTitle(item)}
                </ListItem>
              )}
            </>
          );
        })}
      </List>
    </Card>
  );
};
export default Navmenu;
