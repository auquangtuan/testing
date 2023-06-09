"use client";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import { Disclosure } from "@headlessui/react";
import LayoutDashBoard from "@/components/layout/Layout";
import clsx from "clsx";
import { items } from "@/constant/data";

const ChangelogPage = () => {
  return (
    <LayoutDashBoard>
      <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          changelog
        </h4>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-8 col-span-12">
          <Card title="Version's">
            <div>
              <Badge label="new " className="bg-primary-500  text-white" />
            </div>
            <div className="mt-6 space-y-5">
              {items.map((item, i) => (
                <div key={i} className="mb-3">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="bg-slate-50  rounded-t-md flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600  px-8 py-4">
                          <span>
                            {item.version}
                            <span className="font-semibold text-xs text-slate-400">
                              - Published on {item.date}
                            </span>
                          </span>
                          <span
                            className={` ${
                              open && "rotate-180 transform"
                            }  transition-all duration-150 text-xl`}
                          >
                            <Icon icon="heroicons:chevron-down-solid" />
                          </span>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          <div className="text-sm text-slate-600 font-normal bg-white   rounded-b-md border border-slate-100 border-t-0">
                            <div className="px-8 py-4">
                              {item.changes.map((data: any, j: number) => (
                                <div key={j}>
                                  <div className="flex space-x-3 items-center mt-2 text-slate-600  text-sm">
                                    <span className="h-2 w-2 bg-primary-500 rounded-full"></span>
                                    <span>{data.name}</span>

                                    <span
                                      className={clsx(
                                        "px-2 rounded-full text-xs capitalize",
                                        {
                                          "bg-indigo-100 text-indigo-500":
                                            data.tag === "added",
                                          "bg-yellow-100 text-yellow-500":
                                            data.tag === "update",
                                          "bg-red-100 text-red-500":
                                            data.tag === "fixed",
                                        }
                                      )}
                                    >
                                      {data.tag}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="CHANGELOG">
            <h5 className="text-xs font-medium">VERSION HISTORY</h5>
            <ul className="space-y-3 mt-6 divide-y divide-slate-100">
              {items.map((item, i) => (
                <li
                  className="flex justify-between items-center text-xs text-slate-600  pt-3"
                  key={i}
                >
                  <span>{item.version} </span>
                  <span>{item.date}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </LayoutDashBoard>
  );
};
export default ChangelogPage;