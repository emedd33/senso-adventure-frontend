import Scroll from "./Scroll";
const MAX_CHARACTER = 2000
function recursiveSplitString(content: string): any {
    // Recursive split string into substrings smaller than 2000 characters
    if (content.length <= MAX_CHARACTER) {
        return content
    }

    let middle = Math.floor(content.length / 2);
    let before = content.lastIndexOf(' ', middle);
    let after = content.indexOf(' ', middle + 1);

    if (middle - before < after - middle) {
        middle = before;
    } else {
        middle = after;
    }
    const firstHalf = content.substr(0, middle)
    const secondHalf = content.substr(middle + 1)
    return [recursiveSplitString(firstHalf), recursiveSplitString(secondHalf)]
}

function flatten(arr: Array<any>): any {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
const renderSplitScrolls = (id: string, session: ISession, storyImage: string, clickAction: any, isDungeonMaster: boolean) => {
    if (session.story.length > MAX_CHARACTER) {
        const splitContent = recursiveSplitString(session.story)
        const flatArray = flatten(splitContent)
        const firstContent = flatArray.shift()!
        const ScrollElements = flatArray.map((content: string, index: any) => <Scroll id={id} title={session.title} content={
            index + 1 === splitContent.length ? "......".concat(content) : "......".concat(content).concat("......")
        } date={session.date} storyImage={storyImage} isFirstScroll={false} campaign={session.campaign} onClick={clickAction} isDungeonMaster={isDungeonMaster} />)
        ScrollElements.unshift(<Scroll id={id} title={session.title} content={firstContent.concat("......")} date={session.date} storyImage={storyImage} isFirstScroll={true} campaign={session.campaign} onClick={clickAction} isDungeonMaster={isDungeonMaster} />)
        return ScrollElements
    }
    return <Scroll id={id} title={session.title} content={session.story} date={session.date} storyImage={storyImage} isFirstScroll={true} campaign={session.campaign} onClick={clickAction} isDungeonMaster={isDungeonMaster} />
}

export default renderSplitScrolls
