document.getElementById('kettunira_date').valueAsDate = new Date();

async function submitKettunira() {
    let name = document.getElementById('name').value
    let n_of_persons = document.getElementById('n_of_persons').value
    let kettunira_date = document.getElementById('kettunira_date').value


    let data={
        name: name,
        n_of_persons: n_of_persons,
        kettunira_date: kettunira_date,
    }
    console.log(data)
    await fetch('/kettunira',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => {
            location.href = data
        })
}
