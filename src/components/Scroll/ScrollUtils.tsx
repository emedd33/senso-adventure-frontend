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
const renderSplitScrolls = (adv: IAdventure, storyImage: string) => {
    if (adv.body.length > MAX_CHARACTER) {
        const splitContent = recursiveSplitString(adv.body)
        const flatArray = flatten(splitContent)
        const firstContent = flatArray.shift()!
        const ScrollElements = flatArray.map((content: string, index: any) => <Scroll title={adv.title} content={
            index + 1 === splitContent.length ? "......".concat(content) : "......".concat(content).concat("......")
        } date={adv.date} storyImage={storyImage} isFirstScroll={false} />)
        ScrollElements.unshift(<Scroll title={adv.title} content={firstContent.concat("......")} date={adv.date} storyImage={storyImage} isFirstScroll={true} />)
        return ScrollElements
    }
    return <Scroll title={adv.title} content={adv.body} date={adv.date} storyImage={storyImage} isFirstScroll={true} />


}
export default renderSplitScrolls
