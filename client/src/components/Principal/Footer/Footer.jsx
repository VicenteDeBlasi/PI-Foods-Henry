import React, { Component } from "react";
import style from "./Footer.module.css";

class Footer extends Component {

    render() {
        return (
            <div className={style.footer}>

                <div className={style.infoLeft}>
                    <h5>Informacion</h5>
                    <span>Proyecto Individual<br />
                        por Vicente De Blasi <br />
                        vicentedb67@gmail.com<br />
                        Capital Federal, Buenos Aires (Arg)
                    </span>
                </div>
                <div className={style.infoRight}>
                    <a target="_blank" href="https://www.instagram.com/vicente.dblasi/">INSTAGRAM<img src="https://i.postimg.cc/rdSrLf8Z/instalogo.png" alt="instagram" /></a>
                    <a target="_blank" href="https://github.com/VicenteDeBlasi">GITHUB<img src="https://i.postimg.cc/Vs9NRcSz/logo-Git-Hub.png" alt="github" /></a>
                </div>


            </div>
        )
    }
}

export default Footer;