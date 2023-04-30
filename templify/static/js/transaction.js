let transactions = document.getElementById('transactions')
let type = document.getElementById('type')

type.addEventListener('change', getTransactions)
getTransactions()

async function getTransactions() {
    let url = '/transactions'
    if(type.value === 'seva') {
        let thead = document.getElementById('t_head')
        thead.innerHTML = ''
        thead.innerHTML = `
                    <tr>
                        <th>Transaction ID</th>
                        <th>Transaction Date</th>
                        <th>Name</th>
                        <th>Poojas</th>
                        <th>Gods</th>
                        <th>Transaction Amount</th>
                        <th>Print</th>
                    </tr>`
        await fetch(url, {
            method: 'POST',
            body: 'seva'
        })
        .then(response => response.json())
        .then(data => {
            transactions.innerHTML = ''
            data.forEach(transaction => {
                td1 = document.createElement('td')
                td1.textContent = transaction._id
                td2 = document.createElement('td')
                td2.textContent = transaction.seva_date
                td3 = document.createElement('td')
                td3.textContent = transaction.name
                td4 = document.createElement('td')
                for(let i=0; i<transaction.poojas.length; i++) {
                    td4.textContent += transaction.poojas[i].pooja + ','
                }
                td5 = document.createElement('td')
                for(let i=0; i<transaction.poojas.length; i++) {
                    td5.textContent += transaction.poojas[i].god + ','
                }
                td6 = document.createElement('td')
                td6.textContent = transaction.total
                td7 = document.createElement('td')
                td7.innerHTML = `<a href="/bill/${transaction._id}" target="_blank"><i class="fas fa-print">Print</i></a>`
                tr = document.createElement('tr')
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)
                tr.appendChild(td6)
                tr.appendChild(td7)
                transactions.appendChild(tr)
            })
        })
    }
    else if(type.value === 'donation') {
        let thead = document.getElementById('t_head')
        thead.innerHTML = ''
        thead.innerHTML = `
                    <tr>
                        <th>Transaction ID</th>
                        <th>Transaction Date</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Print</th>
                    </tr>`
        await fetch(url, {
            method: 'POST',
            body: 'donation'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            transactions.innerHTML = ''
            data.forEach(transaction => {
                td1 = document.createElement('td')
                td1.textContent = transaction._id
                td2 = document.createElement('td')
                td2.textContent = transaction.donation_date
                td3 = document.createElement('td')
                td3.textContent = transaction.name
                td4 = document.createElement('td')
                td4.textContent = transaction.amount
                td5 = document.createElement('td')
                td5.textContent = transaction.donation_type
                td6 = document.createElement('td')
                td6.innerHTML = `<a href="/dono_bill/${transaction._id}" target="_blank"><i class="fas fa-print">Print</i></a>`
                tr = document.createElement('tr')
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)
                tr.appendChild(td6)
                transactions.appendChild(tr)
            })
        })
    }
    else if(type.value === 'daily') {
        let day_select = document.getElementById('day_select')
        let select = document.createElement('select')
        select.setAttribute('id', 'day_dropdown')
        select.setAttribute('class', 'form-control')
        await fetch(url, {
            method: 'POST',
            body: 'daily_date'
        })
        .then(response => response.json())
        .then(data => {
            select.innerHTML = ''
            data.forEach(date => {
                option = document.createElement('option')
                option.textContent = date
                select.appendChild(option)
                day_select.appendChild(select)
            })
        })
        select.addEventListener('change', getDailyTransactions)
        let thead = document.getElementById('t_head')
        thead.innerHTML = ''
        thead.innerHTML = `
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>`
        getDailyTransactions()
    }
}

async function getDailyTransactions() {
    let day = document.getElementById('day_dropdown').value
    let url = '/transactions'
    await fetch(url, {
        method: 'POST',
        body: day
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        transactions.innerHTML = ''
        for(let i=0; i<data.seva.length; i++) {
            td1 = document.createElement('td')
            td1.textContent = data.seva[i]
            td2 = document.createElement('td')
            td2.textContent = data.price[i]
            tr = document.createElement('tr')
            tr.appendChild(td1)
            tr.appendChild(td2)
            transactions.appendChild(tr)
        }

        for(let i=0; i<Object.keys(data.donations).length; i++) {
            td1 = document.createElement('td')
            td1.textContent = Object.keys(data.donations)[i]
            td2 = document.createElement('td')
            td2.textContent = Object.values(data.donations)[i]
            tr = document.createElement('tr')
            tr.appendChild(td1)
            tr.appendChild(td2)
            transactions.appendChild(tr)
        }
    })
}