import { Breadcrumb } from "antd"
import { ReactNode, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

export type BreadcrumbType = {
    title: ReactNode;
    href?: string;
};

export const CustomBreadcrumb = () => {
    const [items, setItems] = useState()
    const location = useLocation()

    useEffect(() => {
        setItems(getBreadcrumbFromLocation())
    }, [location])

    const getBreadcrumbFromLocation: any = () => {
        const paths: any = []
        const pathnames = location.pathname
        pathnames.split('/').filter(x => x).map((index) => {
          paths.push({
              title: index.replace(/-/g, ' ').replace(/(^|\s)\S/g, match => match.toUpperCase()),
              href: index
          })  
        })
        console.log();
        return paths
    }

    return (
        <Breadcrumb
            className="mt-[16px] text-[10px]"
            separator=">"
            items={items} />
    )
}
