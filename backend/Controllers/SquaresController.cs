using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace SquareGridApi.Controllers
{
    [Route("api/squares")]
    [ApiController]
    public class SquaresController : ControllerBase
    {
        private const string JsonFilePath = "squares.json";

        // En statisk lista som håller data
        private static List<Square> squares;

        // Konstruktor som körs när controllern instansieras, laddar kvadrater från fil
        public SquaresController()
        {
            squares = LoadSquaresFromFile();
        }

        // Hanterar GET-förfrågningar till "api/squares" och returnerar alla data
        [HttpGet]
        public ActionResult<List<Square>> GetSquares()
        {
            return Ok(squares); // Returnerar data som en HTTP 200-svar
        }

        // Hanterar POST-förfrågningar till "api/squares" för att lägga till en ny 
        [HttpPost]
        public ActionResult<Square> PostSquare([FromBody] Square newSquare)
        {
            // Om inkommande data är null, returnera ett dåligt svar
            if (newSquare == null)
            {
                return BadRequest("Invalid square data");
            }

            // Loggar den mottagna kvadratens data till konsolen
            Console.WriteLine($"Received square: {JsonConvert.SerializeObject(newSquare)}");

            // Tilldelar ett unikt ID till den nya kvadraten
            newSquare.Id = squares.Count > 0 ? squares[^1].Id + 1 : 1;

            // Lägger till den i listan
            squares.Add(newSquare);

            // Sparar den uppdaterade listan
            SaveSquaresToFile();

            // Returnerar en CreatedAtAction med det nya objektet och dess ID
            return CreatedAtAction(nameof(GetSquares), new { id = newSquare.Id }, newSquare);
        }


        [HttpDelete]
        public ActionResult ClearSquares()
        {
            squares.Clear();
            SaveSquaresToFile();
            return NoContent();
        }

        // Metod som läser in data från en JSON-fil
        private List<Square> LoadSquaresFromFile()
        {
            // Om filen inte existerar, returnera en tom lista
            if (!System.IO.File.Exists(JsonFilePath))
            {
                return new List<Square>();
            }

            // Läser innehållet från JSON-filen
            var jsonData = System.IO.File.ReadAllText(JsonFilePath);

            // Deserialiserar JSON-data till en lista eller returnerar en tom lista om filen är tom
            return JsonConvert.DeserializeObject<List<Square>>(jsonData) ?? new List<Square>();
        }

        // Metod som sparar listan till JSON-filen
        private void SaveSquaresToFile()
        {
            // Serialiserar listan med kvadrater till JSON-format
            var jsonData = JsonConvert.SerializeObject(squares, Formatting.Indented);

            // Skriver JSON-data till fil
            System.IO.File.WriteAllText(JsonFilePath, jsonData);
        }
    }
}
