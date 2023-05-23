import React from "react";
import style from "./Landingpage.module.css";
import { NavLink } from "react-router-dom";

export default function Landingpage () {
    return(
        <div className={style.background} >
            <div className={style.card}>
                <div className={style.socialDiv}>
                    <a className={style.redes} target="_blank" href="https://github.com/VicenteDeBlasi" ><img className={style.redesimg} src="https://i.postimg.cc/kVrbZ0dt/githublogo.png" alt="github" /></a>
                    <a className={style.redes} target="_blank" href="https://www.instagram.com/vicente.dblasi/" ><img className={style.redesimg} src="https://i.postimg.cc/rdSrLf8Z/instalogo.png" alt="instagram" /></a>
                </div>
                <NavLink to="/recipes">
                    <button className={style.button} >DESCRUBRIR SABORES</button>
                </NavLink>
            </div>
        </div>
    );
}