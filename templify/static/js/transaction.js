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
                    </tr>`
        await fetch(url, {
            method: 'POST',
            body: 'seva'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
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
                tr = document.createElement('tr')
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)
                transactions.appendChild(tr)
            })
        })
    }
}