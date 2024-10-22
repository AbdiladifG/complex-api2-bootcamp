document.getElementById('searchButton').addEventListener('click', function () {
    let playerName = document.getElementById('playerName').value;

    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
        .then(res => res.json())
        .then(data => {
            let player = data.player[0];
            let playerFullName = player.strPlayer;

            let firstName = playerFullName.split(' ')[0];
            fetch(`https://api.genderize.io/?name=${firstName}`)
                .then(res => res.json())
                .then(genderData => {
                    // Display player info and guessed gender
                    document.querySelector('ul').innerHTML = `<li>
                            Player: ${playerFullName}
                            <br>
                            Sport: ${player.strSport}
                            <br>
                            Gender Guess: ${genderData.gender} (Probability: ${genderData.probability * 100}%)
                        </li>`;
                })
                .catch(err => console.error('Error with Genderize API:', err));
        })
        .catch(err => console.error('Error with SportsDB API:', err));
});
