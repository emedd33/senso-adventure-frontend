
export const filterUnpublished = (instances: any[], isDungeonMaster: boolean) => {
    return Object.entries(instances).filter(([string, instance]) => isDungeonMaster || instance.isPublished === "TRUE")
}