export default function () {
    const openedItem = ref<string | number | null>(null)

    const isActive = (itemId: number | string) => {
        return openedItem.value === itemId
    }

    const interact = (itemId: number | string | null) => {
        openedItem.value = openedItem.value === itemId ? null : itemId
    }

    return { interact, isActive }
}
