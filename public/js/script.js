// When the "Find Now" button is clicked
document.getElementById('find-btn').addEventListener('click', function() {
    var location = document.getElementById('location').value;
    var when = document.getElementById('when').value;
    var tourType = document.getElementById('tourType').value;

    // Send the data to the server using Fetch API
    fetch('/find-tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, when, tourType })
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            var ticketDetails = '';
            data.forEach(ticket => {
                ticketDetails += `
                    <p><strong>Location:</strong> ${ticket.location}</p>
                    <p><strong>Ticket Type:</strong> ${ticket.ticket_type}</p>
                    <p><strong>Season:</strong> ${ticket.when}</p>
                    <p><strong>Tour Type:</strong> ${ticket.tour_type}</p>
                    <p><strong>Price:</strong> ${ticket.price}</p>
                    <p><strong>Availability:</strong> ${ticket.availability}</p>
                    <hr>
                `;
            });
            // Insert ticket details into the modal
            document.getElementById('ticketDetails').innerHTML = ticketDetails;
            // Show the modal with animation
            openModal();
        } else {
            document.getElementById('ticketDetails').innerHTML = 'No tickets found for the selected criteria.';
            openModal();
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

// Function to open the modal with animation
function openModal() {
    const modal = document.getElementById('ticketModal');
    modal.classList.add('show');
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('ticketModal');
    modal.classList.remove('show');
}
