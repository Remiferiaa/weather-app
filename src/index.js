import { site } from "./modules/UI.js"
import { getWeather } from "./modules/weather.js"
import "./style.css"

let text;
let metric;


function listeners() {
    document.querySelector("#search").addEventListener("keydown", (event) => {
        const keyName = event.key
        if (metric === undefined) {
            metric = "metric"
        }
        if (keyName === "Enter") {
            document.querySelector(".error").innerHTML = ""
            document.querySelector(".now").innerHTML = ""
            document.querySelector(".future").innerHTML = ""
            text = event.target.value
            getWeather(text, metric)
            event.target.value = ""
        }
    })

    document.querySelectorAll(".tempBtn").forEach(function (btn) {
        btn.addEventListener("click", function (event) {
            if (event.target.innerHTML === "℃") {
                metric = "metric"
            }
            if (event.target.innerHTML === "℉") {
                metric = "imperial"
            }
            if (text !== undefined) {
                document.querySelector(".now").innerHTML = ""
                document.querySelector(".future").innerHTML = ""
                getWeather(text, metric)
            }
        })
    })
}

site();
listeners();