"use client";
import React, { createContext, useState, ReactNode } from "react";

export interface TabContextValue<T> {
  tabs: T[];
  activeTab: T | null;
  setActiveTab: (tab: T) => void;
}

const TabContext = createContext<TabContextValue<any> | undefined>(undefined);

const TabProvider = <T extends string | number>({
  tabs,
  children,
}: {
  tabs: T[];
  children: ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<T | null>(null);

  return (
    <TabContext.Provider value={{ tabs, activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export { TabProvider, TabContext };
