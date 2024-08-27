export const stations = {
  Miyapur: "red",
  "JNTU College": "red",
  "KPHB Colony": "red",
  Kukatpally: "red",
  "Dr.B.R. Ambedkar": "red",
  Balanagar: "red",
  Moosapet: "red",
  "Bharat Nagar": "red",
  Erragadda: "red",
  "ESI Hospital": "red",
  "S R Nagar": "red",
  Ameerpet: "red",
  Punjagutta: "red",
  "Irrum Manzil": "red",
  Khairatabad: "red",
  Lakdikapul: "red",
  Assembly: "red",
  Nampally: "red",
  "Gandhi Bhavan": "red",
  "Osmania Medical College": "red",
  "MG Bus station": "red",
  Malakpet: "red",
  "New Market": "red",
  Musarambagh: "red",
  Dilsukhnagar: "red",
  Chaitanyapuri: "red",
  "Victoria Memorial": "red",
  "L B Nagar": "red",
  "JBS Parade Ground": "green",
  "Secunderabad West": "green",
  "Gandhi Hospital": "green",
  Musheerabad: "green",
  "RTC X Roads": "green",
  Chikkadpally: "green",
  Narayanguda: "green",
  "Sultan Bazar": "green",
  "MG Bus station": "green",
  Nagole: "blue",
  Uppal: "blue",
  Stadium: "blue",
  NGRI: "blue",
  Habsiguda: "blue",
  Tarnaka: "blue",
  Mettuguda: "blue",
  Secunderabad: "blue",
  "JBS Parade Ground": "blue",
  Paradise: "blue",
  RasoolPura: "blue",
  "Prakash Nagar": "blue",
  Begumpet: "blue",
  Ameerpet: "blue",
  "Madhura Nagar": "blue",
  "Yusuf Guda": "blue",
  "Road No 5 Jubilee Hills": "blue",
  "Jubilee Hills Check Post": "blue",
  "Pedamma Temple": "blue",
  Madhapur: "blue",
  "Durgam Chervu": "blue",
  "HITEC City": "blue",
  Raidurg: "blue",
};
const centres = {
  "red-blue": "Ameerpet",
  "red-green": "MG Bus Station",
  "blue-red": "Ameerpet",
  "blue-green": "JBS Parade Ground",
  "green-red": "MG Bus Station",
  "green-blue": "JBS Parade Ground",
};
export const changeStation = (from, to) => {
  if (stations[from?.trim()] == stations[to?.trim()]) return "";

  let string = stations[from.trim()] + "-" + stations[to.trim()];
  return centres[string];
};

export const getPrice = (from, to) => {
  if (stations[from.trim()] == stations[to.trim()]) {
    let i = 0;
    for (let station in stations) {
      if (station == from.trim()) i = 0;
      else i++;

      if (station == to.trim()) {
        break;
      }
    }
    return (i / 2 + 2) * 5;
  } else {
    let string = stations[from.trim()] + "-" + stations[to.trim()];
    let centre = centres[string];

    let i = 0,
      j = 0;

    let seen = false;
    if (from.trim() !== centre) {
      outer1: for (let station in stations) {
        if (stations[from.trim()] == stations[station]) {
          if (station == from.trim() || station == centre) {
            if (seen) break outer1;
            else seen = true;
          } else {
            if (seen) i++;
          }
        }
      }
    }

    seen = false;
    if (to.trim() !== centre) {
      outer2: for (let station in stations) {
        if (stations[to.trim()] == stations[station]) {
          if (station == to.trim() || station == centre) {
            if (seen) break outer2;
            else seen = true;
          } else {
            if (seen) j++;
          }
        }
      }
    }

    let price = ((i + j) / 2) * 5;
    if (price > 65) return 65;
    else return (Math.round(price / 5) - 1) * 5;
  }
};
