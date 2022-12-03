$(document).ready(function () {
  $("#applicants-list").hide();
  $("button").click(function () {
    $("#applicants-list").toggle();
  });
});

function getApplicants() {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      let data = response.data;
      data.map((element) => {
        $("#applicants").after(`
           <li class="single-applicant" id="${element.id}" onclick="selectApplicant(${element.id})">
            <h3 class="name">${element.name}</h3>
            <h5 class="email">${element.email}</h5>
            <h5 class="phone">${element.phone}</h5>
           </li>
           `);
      });
      $("#header").append(`(${data.length})`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function selectApplicant(id) {
  sessionStorage.setItem("applicantId", id);
  window.location = "applicantDetails.html";
  return false;
}

function showApplicantDetails() {
  let applicantId = sessionStorage.getItem("applicantId");
  axios
    .get(`https://jsonplaceholder.typicode.com/users/${applicantId}`)
    .then((response) => {
      console.log(response);
      let details = response.data;

      $(".applicant-details").html(`
             <div id="${applicantId}">
                <h1>${details.name}</h1>
                <h5>Website: ${details.website}</h5>
                <h5>Last Company: ${details.company.name}</h5>
                <h5>Email: ${details.email}</h5>
                <h5>Phone: ${details.phone}</h5>
                <h5>Address: ${details.address.city}</h5>
              <div>
            `);
    })
    .catch((err) => {
      console.log(err);
    });
}
