import type { CustomFlowbiteTheme, TabsProps } from 'flowbite-react';

import { Tabs } from "flowbite-react"
import React from 'react';

const customTheme: CustomFlowbiteTheme['tab'] = {
    tablist: {
        tabitem: {
            base: "flex flex-1 items-center justify-center p-2 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-0 focus:outline-none",
            styles: {
                underline: {
                    base: "font-bold",
                    active: {
                        on: "border-b-2 border-red-600 dark:border-red-500 text-red-600 dark:text-red-500",
                        off: "border-b-2 border-transparent hover:border-zinc-300 dark:hover:border-zinc-400 text-zinc-500 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 bg-zinc-200 dark:bg-zinc-700"
                    }
                },
            }
        }
    }
};

export default function UITabs(props: TabsProps) {
    const { children, ...rest } = props;
    return <Tabs.Group theme={customTheme} {...rest}>
        {children}
    </Tabs.Group>
}