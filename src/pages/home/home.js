import styled from 'styled-components'
import dnd_background  from "../../assets/backgroundImage/dnd_background.jpg";
function Home() {
    return (

        <div style={{backgroundImage: `url(${dnd_background})`, height:"100vh"}}>
            <p>Home</p>
        </div>
        )
  }
export default Home