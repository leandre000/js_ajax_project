document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('addForm').addEventListener('submit', function (event) {
        event.preventDefault();
        facilityManagement();
    });
});

function facilityManagement() {
    var schedules = document.getElementById('schedules').value;
    var logs = document.getElementById('logs').value;
    var inventory = document.getElementById('inventory').value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                window.location.href = "facilities.html"
            } else {
                console.error('Failed to add facility.');
            }
        }
    };
    xhr.open('POST', 'api.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('schedules=' + schedules + '&logs=' + logs + '&inventory=' + inventory);
}
function editFacility(id) {
    console.log(id)
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let facilitiesData = JSON.parse(xhr.responseText);
                facilitiesData.map((d) => {
                    if (d.id == id) {
                        document.getElementById('editId').value = d.id;
                        document.getElementById('editSchedules').value = d.schedules;
                        document.getElementById('editLogs').value = d.logs;
                        document.getElementById('editInventory').value = d.inventory;
                        document.getElementById('addForm').style.display = 'none';
                        document.getElementById('editForm').style.display = 'block';
                    }
                })
            }
            else {
                console.error('Failed to fetch facility data for editing.');
            }
        }
    };
    xhr.open('GET', 'api.php', true);
    xhr.send();
}
function updateFacility() {
    let id = document.getElementById('editId').value;
    let schedules = document.getElementById('editSchedules').value;
    let logs = document.getElementById('editLogs').value;
    let inventory = document.getElementById('editInventory').value;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                loadFacilities();
                cancelEdit();
            } else {
                console.error('Failed to update facility.');
            }
        }
    };
    let data = 'id=' + encodeURIComponent(id) +
        '&schedules=' + encodeURIComponent(schedules) +
        '&logs=' + encodeURIComponent(logs) +
        '&inventory=' + encodeURIComponent(inventory);
    xhr.open('PUT', 'api.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}
function cancelEdit() {
    document.getElementById('addForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
}

function clearAddForm() {
    document.getElementById('schedules').value = '';
    document.getElementById('logs').value = '';
    document.getElementById('inventory').value = '';
}









