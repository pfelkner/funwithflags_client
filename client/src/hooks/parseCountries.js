import byPopulation from "../assets/country-by-population.json";
import byAbbreviation from "../assets/country-by-abbreviation.json";
import byContinent from "../assets/country-by-continent.json";
import popCont from "../assets/popCont.json";
import prev from "../countries.json";

function parse() {
  // let missing = [];
  // const result = byPopulation.map((byPop) => {
  //   const matchingCountry = byContinent.find(
  //     (byCont) => byCont.country === byPop.country
  //   );
  //   if (matchingCountry) {
  //     return {
  //       ...matchingCountry,
  //       population: byPop.population,
  //     };
  //   } else {
  //     console.log("no matching country found for:", byPop.country);
  //     missing.push(byPop.country);
  //   }
  // });
  // console.log(missing);
  // let missing = [];
  // const final = byAbbreviation.map((byAb) => {
  //   const matchingCountry = popCont.find(
  //     (item) => item.country === byAb.country
  //   );
  //   if (matchingCountry) {
  //     // console.log(matchingCountry);
  //     return {
  //       country: matchingCountry.country,
  //       population: matchingCountry.population,
  //       continent: matchingCountry.continent,
  //       abbreviation: byAb.abbreviation,
  //     };
  //   } else {
  //     console.log("No matching country found for:", byAb.country);
  //     missing.push(byAb.country);
  //     return null;
  //   }
  // });
  // console.log(missing);
  // console.log(JSON.stringify(final));
  // const matchingCountry = popCont.find(
  //   (item) => item.country === byAb.country
  // );
  // console.log(matchingCountry);
  // if (matchingCountry) {
  //   return {
  //     ...matchingCountry,
  //     abbreviation: byAb.abbreviation,
  //   };
  // }
  // });
  // console.log(JSON.stringify(popCont));
  // const final = popCont.map((i) => {
  //   return byAbbreviation.find((byAbbr) => {
  //     if (byAbbr.country === i.country) {
  //       const res = {
  //         country: i.country,
  //         population: i.population,
  //         continent: i.continent,
  //         abbreviation: byAbbr.abbreviation,
  //       };
  //       console.log(res);
  //       return res;
  //     }
  //   });
  // });
}

export default parse;
