let pooja_dropdown = document.getElementById("pooja")
let gods_dropdown = document.getElementById("gods")
let prices_list = document.currentScript.getAttribute("prices_list")
let delete_icon_link = document.currentScript.getAttribute("delete_icon")
let add_button = document.getElementById("add")
let added_poojas = document.getElementById("added_poojas")
// let poojas_list = document.currentScript.getAttribute("pooja_list")
prices_list = JSON.parse(prices_list)
// poojas_list = JSON.parse(poojas_list)

pooja_dropdown.addEventListener("change", async () => { await getGods(pooja_dropdown.value) })
add_button.addEventListener("click", () => { addSeva() })
getGods(pooja_dropdown.value)
document.getElementById('seva_date').valueAsDate = new Date();

async function getGods(pooja_id) {
    await fetch('/seva/'+pooja_id)
        .then(response => response.json())
        .then(data => {
            if(isEmpty(data)) {
                gods_dropdown.innerHTML = ""
                gods_dropdown.style.display = "none"
                return
            } else
                data = data.gods
                if(data.length <= 1) {
                    gods_dropdown.innerHTML = ""
                    gods_dropdown.style.display = "none"
                } else {
                    gods_dropdown.innerHTML = ""
                    gods_dropdown.style.display = "block"
                    for(let i=0; i<data.length; i++) {
                        let option = document.createElement("option")
                        option.value = data[i]
                        option.textContent = data[i]
                        gods_dropdown.appendChild(option)
                    }
                }
        })
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

function addSeva() {
    let pooja = pooja_dropdown.options[pooja_dropdown.selectedIndex].text
    let pooja_index = pooja_dropdown.selectedIndex
    let god = ''
    if(gods_dropdown.style.display === "block") {
        god = gods_dropdown.options[gods_dropdown.selectedIndex].text
    }
    let price = prices_list[pooja_index]
    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let td4 = document.createElement("td")
    let delete_button = document.createElement("button")
    let delete_icon = document.createElement("img")
    delete_icon.src = delete_icon_link
    delete_icon.style.width = "20px"
    delete_icon.style.height = "20px"
    delete_button.appendChild(delete_icon)
    delete_button.style.border = "none"
    delete_button.style.backgroundColor = "transparent"
    delete_button.style.cursor = "pointer"
    delete_button.addEventListener("click", () => { deleteSeva(tr) })
    td1.textContent = pooja
    td1.name = pooja_dropdown.value
    td2.textContent = price
    td3.textContent = god
    td4.appendChild(delete_button)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    added_poojas.appendChild(tr)
    updateTotal()
}

function deleteSeva(tr) {
    tr.remove()
    updateTotal()
}

function updateTotal() {
    let total = 0
    let rows = added_poojas.getElementsByTagName("tr")
    for(let i=0; i<rows.length; i++) {
        let row = rows[i]
        let price = row.getElementsByTagName("td")[1].textContent
        total += parseInt(price)
    }
    document.getElementById("total").textContent = total.toString()
}


async function submitSeva() {
    let name = document.getElementById("name").value
    let star = document.getElementById("star").value
    let seva_date = document.getElementById("seva_date").value
    let total = document.getElementById("total").textContent
    let rows = added_poojas.getElementsByTagName("tr")
    let poojas = []
    for(let i=0; i<rows.length; i++) {
        let row = rows[i]
        let pooja_id = row.getElementsByTagName("td")[0].name
        let pooja = row.getElementsByTagName("td")[0].textContent
        let god = row.getElementsByTagName("td")[2].textContent
        poojas.push({pooja_id: pooja_id,  pooja: pooja, god: god})
    }
    let data = {name: name, star: star, seva_date: seva_date, total: total, poojas: poojas}
    await fetch('/seva', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data => {
            location.href = data
        })
}