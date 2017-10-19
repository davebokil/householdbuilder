
 //  _    _                           _             _      _   ____          _  _      _              _ 
 // | |  | |                         | |           | |    | | |  _ \        (_)| |    | |            | |
 // | |__| |  ___   _   _  ___   ___ | |__    ___  | |  __| | | |_) | _   _  _ | |  __| |  ___  _ __ | |
 // |  __  | / _ \ | | | |/ __| / _ \| '_ \  / _ \ | | / _` | |  _ < | | | || || | / _` | / _ \| '__|| |
 // | |  | || (_) || |_| |\__ \|  __/| | | || (_) || || (_| | | |_) || |_| || || || (_| ||  __/| |   |_|
 // |_|  |_| \___/  \__,_||___/ \___||_| |_| \___/ |_| \__,_| |____/  \__,_||_||_| \__,_| \___||_|   (_)
 // 
 // 
 // by Dave Bokil
 // Cell: 551-587-1285
 // Email: bokild@gmail.com
 // Portfolio: www.davebokil.com
 // LinkedIn: https://www.linkedin.com/in/davebokil/
 // 
 // 
 // Built for Alesh and the good folks at Ad Hoc :) 

                                                                                                     
// ------------------------------------------------------------------------------------------------------                                                                                                     


// Add a Household Member
document.querySelector('.add').addEventListener("click", function() {

    event.preventDefault()

    // Age Validation
    if (document.forms[0].elements.age.value < 1) {
        alert("Please fill the household member's age with a value greater than 0.")
    }

    // Relationship Validation
    else if (document.forms[0].elements.rel.value == "") {
        alert("Enter your relationship to this household member.")
    } 
    // If validation is passed...
    else {
        var newMember = {}
        var age = document.forms[0].elements.age.value;
        var rel = document.forms[0].elements.rel.value;
        var smoker = document.forms[0].elements.smoker.checked;
        newMember.age = age
        newMember.rel = rel
        newMember.smoker = smoker
        var members = getMembers()
        members.push(newMember)
        localStorage.setItem('members', JSON.stringify(members))
        showMembers()
    }
})

// Get members from localStorage
function getMembers() {
    var members = [];
    var storage = localStorage.getItem('members');
    if (storage != null) {
        members = JSON.parse(storage)
    }
    return members
}

// Show members in HTML
function showMembers() {
    var members = getMembers()

    var html = '<ul>';
    for (var i = 0; i < members.length; i++) {
        html += '<li>' + "Age: " + members[i].age + ", Relationship: " + members[i].rel + ", Smoker: " + members[i].smoker + " " + '<button class="remove" id="' + i + '"> x </button></li>';
    };
    html += '</ul>';

    document.getElementsByClassName("household")[0].innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}

// Get and show saved members on Page Load
getMembers()
showMembers()

// Remove Member from list
function remove() {
    var id = this.getAttribute('id');
    var members = getMembers()
    members.splice(id, 1)
    localStorage.setItem('members', JSON.stringify(members));

    showMembers();

    return false;
}

// On Submit JSON
document.querySelectorAll("button[type='submit']")[0].addEventListener("click", function() {

    // display stuff in that debug div
    document.getElementsByClassName('debug')[0].style.display = 'block'
    event.preventDefault()

    // get and parse household members
    var storage = localStorage.getItem('members');
    var parse = JSON.parse(storage)

    document.getElementsByTagName('pre')[0].innerHTML = JSON.stringify(parse, null, 4);
});