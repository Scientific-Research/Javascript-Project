//const apiFlight = {
//base: "http://api.aviationstack.com/v1/",
// base: "http://api.aviationstack.com/v1/flights?access_key=0fb51295b712b9c0be26db517e285b7b",
//key: "074aec8cf4db2c3c0868d568a990b75e",
//};

let params = new URLSearchParams({
  access_key: "074aec8cf4db2c3c0868d568a990b75e",
  limit: 7,
});
const getFlight = () => {
  fetch(`http://api.aviationstack.com/v1/flights?${params}`)
    .then((flights) => {
      return flights.json();
    })
    .then((flights) => {
      console.log(flights);
      populateTable(flights);
    })
    .catch((err) => console.log(err));
};

getFlight();

const tableBody = document.getElementById("table-body");

const populateTable = (flights) => {
  for (const flight of flights.data) {
    const tableRow = document.createElement("tr");
    const tableIcon = document.createElement("td");
    // tableIcon.textContent = "https://www.flaticon.com/free-icon/airplane_7118033";
    //tableIcon.textContent = image;
    tableRow.append(tableIcon);

    const flightDetails = {
      airline: flight.airline.name.toUpperCase(),
      arrival: flight.arrival.airport.toUpperCase(),
      departure: flight.departure.airport.toUpperCase(),
      flight: flight.flight.number,
      date: flight.flight_date,
      status: flight.flight_status.toUpperCase(),
    };

    for (const flightDetail in flightDetails) {
      const tableCell = document.createElement("td");
      const word = Array.from(flightDetails[flightDetail]);

      for (const [index, letter] of word.entries()) {
        const letterElement = document.createElement("div");

        setTimeout(() => {
          letterElement.classList.add("flip");
          letterElement.textContent = letter;
          tableCell.append(letterElement);
        }, 100 * index);
      }
      tableRow.append(tableCell);
    }
    tableBody.append(tableRow);
  }
};
