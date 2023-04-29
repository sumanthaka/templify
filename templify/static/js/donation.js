document.getElementById('donation_date').valueAsDate = new Date();

async function submitDonation() {
    let name = document.getElementById('name').value
    let donation_date = document.getElementById('donation_date').value
    let donation_type = document.getElementById('donation_type').value
    let amount = document.getElementById('amount').value


    let data = {
        name: name,
        donation_date: donation_date,
        donation_type: donation_type,
        amount: amount
    }
    await fetch('/donation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}