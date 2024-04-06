export default function () {
    const openedItems = reactive(new Set<string | number>())

    const isActive = (itemId: string | number) => {
        return openedItems.has(itemId)
    }

    const interact = (itemId: string | number) => {
        if (openedItems.has(itemId)) {
            openedItems.delete(itemId)
            return
        }

        openedItems.add(itemId)
    }

    return { interact, isActive }
}
