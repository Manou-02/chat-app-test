import { Select, Tag } from "antd";
import { useEffect, useState } from "react";

export const TestComponent = () => {

    const sortByKey = (array: any[], key: string) => {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    // const uniqueArray = (array: any[]) => {
    //     const uniqueMap = new Map();
    //     array.forEach(item => uniqueMap.set(item.id, item));

    //     // Convert the Map values back to an array
    //     const result = Array.from(uniqueMap.values());
    //     return result;
    // }

    // initial choices
    const initialState = [
        { id: 1, label: 'Terminal 1' },
        { id: 2, label: 'Terminal 2' },
        { id: 3, label: 'Terminal 3' },
        { id: 4, label: 'Terminal 4' },
        { id: 5, label: 'Terminal 5' },
        { id: 6, label: 'Terminal 6' },
        { id: 7, label: 'Terminal 7' }
    ];
    const [tags, setTags] = useState<any[]>([]);
    const [selected, setSelected] = useState<any[]>([
        {
            id: 0, name: "", availableInSelect: [
                // initialState !== selected
            ]
        },
        { id: 0, name: "", availableInSelect: [] },
        { id: 0, name: "", availableInSelect: [] },
        { id: 0, name: "", availableInSelect: [] }
    ]);

    const handleClose = (tagRemoved: any) => {
        const tagsLeft = tags?.filter((tag: any) => tag?.id !== tagRemoved?.id);
        setTags(tagsLeft);
    }

    useEffect(() => {
        console.log("selected ", selected)
    }, [selected]);



    const dataToLoop = [{}, {}]
    const handleChange = (tagSelected: any, index: number) => {
        console.log("Tag selected ", tagSelected);
        console.log("On index ", index);

        setSelected((prev: any) => {
            return prev?.map((option: any, indexOption: number) => {
                console.log("tags ", tags)

                // console.log("SELECTED PREV ", prev[index]);
                // libere from tags prev[index] view
                handleClose(prev[index]);
                // feature background
                const tagsTemp = [
                    // libere from tags prev[index] view
                    ...tags.filter((tagItem: any) => (tagItem?.id !== prev[index]?.id)),
                    { id: tagSelected?.value, name: tagSelected?.label }
                ]


                console.log("tagsTemp ", tagsTemp);
                if (index === indexOption) {
                    return {
                        ...option,
                        ...{
                            id: tagSelected?.value,
                            name: tagSelected?.label,
                            availableInSelect: sortByKey([
                                ...initialState?.filter((initState: any) => !tagsTemp?.some((tagItem: any) => tagItem?.id === initState?.id)),
                                {
                                    id: tagSelected?.value,
                                    label: tagSelected?.label,
                                }
                            ], "id")

                        }
                    };
                }
                else {
                    // fill 
                    return {
                        ...option,
                        ...{
                            availableInSelect: [
                                ...initialState?.filter((initState: any) => !tagsTemp?.some((tagItem: any) => tagItem?.id === initState?.id))
                            ],
                        }
                    };
                }
                return option;
            })
        })
        // set tags on selected
        setTags((prev: any) => {
            if (prev) {
                return [...prev, {
                    id: tagSelected?.value, name: tagSelected?.label,
                }]
            }
            return prev;
        })
    }

    // const a = [{ id: 1, name: "terminal 1" }, { id: 2, name: "terminal 2" }]
    // const b = [{ id: 1, name: "terminal 1" }, { id: 2, name: "terminal 2" }, { id: 3, name: "terminal 3" }, { id: 4, name: "terminal 4" }]
    // // Elements in 'a' that are not in 'b'
    // const nonIntersectionA = a.filter(itemA => !b.some(itemB => itemB.id === itemA.id));

    // // Elements in 'b' that are not in 'a'
    // const nonIntersectionB = b.filter(itemB => !a.some(itemA => itemA.id === itemB.id));

    // console.log("nonIntersectionA ",nonIntersectionA)
    // console.log("nonIntersectionB ",nonIntersectionB)

    return (
        <>
            <div>List tags</div>
            <div>
                {tags?.map((tag: any) => (
                    <Tag closable onClose={(e) => {
                        e.preventDefault()
                        console.log("Tag To Close ", tag);
                        handleClose(tag);
                    }}>{tag?.name}</Tag>
                ))}
            </div>
            <div>OR: {JSON.stringify((selected?.length || dataToLoop.length))}</div>
            <div>
                {selected?.map((d, index) => (
                    <><br /><br /><br /><br />
                        <div>
                            SELECTED:
                            {JSON.stringify(d)}
                        </div><br />
                        <div>
                            <Select
                                labelInValue
                                style={{ width: 120 }}
                                onChange={(e) => handleChange(e, index)}
                                options={[
                                    { value: 1, label: 'Terminal 1' },
                                    { value: 2, label: 'Terminal 2' },
                                    { value: 3, label: 'Terminal 3' },
                                    { value: 4, label: 'Terminal 4' },
                                    { value: 5, label: 'Terminal 5' },
                                    { value: 6, label: 'Terminal 6' },
                                    { value: 7, label: 'Terminal 7' },
                                ]}
                            />
                            {JSON.stringify(selected[index])}
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}